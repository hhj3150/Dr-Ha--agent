import { NextRequest } from "next/server";
import { getClient, ANSWER_MODEL } from "@/lib/anthropic";
import { buildSystemPrompt, getAgent } from "@/lib/agents";
import { routeToAgent, resolveOverride } from "@/lib/router";

// 파일시스템(agents/, context/)을 읽고 스트리밍하므로 Node.js 런타임 필요.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Attachment {
  name: string;
  mediaType: string; // "application/pdf" | "image/png" | "image/jpeg" | ...
  data: string; // base64 (no data: prefix)
}

const ALLOWED_IMAGE = ["image/png", "image/jpeg", "image/gif", "image/webp"];

/** 마지막 사용자 메시지를 텍스트 + 첨부(문서/이미지) 블록으로 구성 */
function buildUserContent(text: string, attachments: Attachment[]): any {
  const blocks: any[] = [];
  if (text) blocks.push({ type: "text", text });
  for (const a of attachments) {
    if (a.mediaType === "application/pdf") {
      blocks.push({
        type: "document",
        source: { type: "base64", media_type: "application/pdf", data: a.data },
      });
    } else if (ALLOWED_IMAGE.includes(a.mediaType)) {
      blocks.push({
        type: "image",
        source: { type: "base64", media_type: a.mediaType, data: a.data },
      });
    }
  }
  return blocks.length > 0 ? blocks : text;
}

function checkAuth(req: NextRequest): boolean {
  const required = process.env.APP_PASSWORD;
  if (!required) return true; // 비밀번호 미설정 시 잠금 없음
  const provided = req.headers.get("x-app-password");
  return provided === required;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return new Response(JSON.stringify({ error: "인증이 필요합니다." }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  let body: {
    messages?: ChatMessage[];
    agentKey?: string | null;
    attachments?: Attachment[];
  };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "잘못된 요청입니다." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const messages = (body.messages ?? []).filter(
    (m) => m && (m.role === "user" || m.role === "assistant") && m.content
  );
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  if (!lastUser) {
    return new Response(JSON.stringify({ error: "메시지가 비어 있습니다." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const attachments = (body.attachments ?? []).filter(
    (a) => a && a.data && a.mediaType
  );

  // 1) 에이전트 결정 (수동 지정 우선, 없으면 자동 라우팅)
  const override = resolveOverride(body.agentKey);
  const agentKey = override ?? (await routeToAgent(lastUser.content));
  const agent = getAgent(agentKey)!;

  // 2) 시스템 프롬프트 조립
  const system = await buildSystemPrompt(agent);

  // 3) 답변 스트리밍
  const client = getClient();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const messageStream = client.messages.stream({
          model: ANSWER_MODEL,
          max_tokens: 8000,
          system,
          messages: messages.map((m, i) => {
            // 마지막 사용자 메시지에만 첨부(문서/이미지)를 실어 보낸다
            if (i === messages.length - 1 && m.role === "user" && attachments.length > 0) {
              return { role: "user" as const, content: buildUserContent(m.content, attachments) };
            }
            return { role: m.role, content: m.content };
          }),
        });

        messageStream.on("text", (text) => {
          controller.enqueue(encoder.encode(text));
        });

        await messageStream.finalMessage();
        controller.close();
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "답변 생성 중 오류가 발생했습니다.";
        controller.enqueue(encoder.encode(`\n\n⚠️ 오류: ${msg}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-agent-key": agent.key,
      "x-agent-label": encodeURIComponent(agent.label),
    },
  });
}
