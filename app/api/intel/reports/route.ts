import { NextRequest } from "next/server";
import { listReportDates, getText, keyReport } from "@/lib/intel/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authed(req: NextRequest): boolean {
  const appPw = process.env.APP_PASSWORD;
  if (!appPw) return true;
  return req.headers.get("x-app-password") === appPw;
}

/** ?date=YYYY-MM-DD → 해당 리포트 본문 / 없으면 날짜 목록 */
export async function GET(req: NextRequest) {
  if (!authed(req)) return Response.json({ error: "인증 필요" }, { status: 401 });

  const date = req.nextUrl.searchParams.get("date");
  if (date) {
    const report = await getText(keyReport(date));
    if (!report) return Response.json({ error: "리포트 없음" }, { status: 404 });
    return Response.json({ date, report });
  }
  const dates = await listReportDates();
  return Response.json({ dates });
}
