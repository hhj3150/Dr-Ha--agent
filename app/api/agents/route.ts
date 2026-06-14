import { AGENTS } from "@/lib/agents";

export const runtime = "nodejs";

/** 프론트엔드 드롭다운용 — 에이전트 key/label 목록 */
export async function GET() {
  const list = AGENTS.map((a) => ({ key: a.key, label: a.label, blurb: a.blurb }));
  return Response.json({ agents: list });
}
