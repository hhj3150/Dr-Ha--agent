import { NextRequest } from "next/server";
import { getJSON, putJSON, KEY_FEEDBACK } from "@/lib/intel/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Feedback {
  tracked: { title: string; url: string; note?: string }[];
  important: string[];
  ignored: string[];
}
const DEFAULT: Feedback = { tracked: [], important: [], ignored: [] };

function authed(req: NextRequest): boolean {
  const appPw = process.env.APP_PASSWORD;
  if (!appPw) return true;
  return req.headers.get("x-app-password") === appPw;
}

/** 사용자가 항목에 '중요/관심없음/추적계속' 표시 */
export async function POST(req: NextRequest) {
  if (!authed(req)) return Response.json({ error: "인증 필요" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const action = body.action as "important" | "ignore" | "track";
  const title = (body.title as string) || "";
  const url = (body.url as string) || "";
  if (!action || !title) {
    return Response.json({ error: "action, title 필요" }, { status: 400 });
  }

  const fb = await getJSON<Feedback>(KEY_FEEDBACK, DEFAULT);
  if (action === "important" && !fb.important.includes(title)) fb.important.push(title);
  if (action === "ignore" && !fb.ignored.includes(title)) fb.ignored.push(title);
  if (action === "track" && !fb.tracked.some((t) => t.title === title)) {
    fb.tracked.push({ title, url });
  }
  await putJSON(KEY_FEEDBACK, fb);
  return Response.json({ ok: true });
}
