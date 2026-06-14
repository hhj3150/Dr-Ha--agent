import { NextRequest } from "next/server";
import { generateReport } from "@/lib/intel/report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300; // 검색+생성에 시간이 걸릴 수 있음

/** 수동(UI 버튼) 또는 예약함수(cron)에서 호출 → 오늘 리포트 생성 */
export async function POST(req: NextRequest) {
  const appPw = process.env.APP_PASSWORD;
  const cronSecret = process.env.CRON_SECRET;
  const headerPw = req.headers.get("x-app-password");
  const headerCron = req.headers.get("x-cron-secret");

  const okByApp = !appPw || headerPw === appPw;
  const okByCron = cronSecret && headerCron === cronSecret;

  if (!okByApp && !okByCron) {
    return Response.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  try {
    const result = await generateReport();
    return Response.json({
      ok: true,
      date: result.date,
      itemCount: result.itemCount,
      searchUsed: result.searchUsed,
    });
  } catch (err) {
    const m = err instanceof Error ? err.message : "리포트 생성 실패";
    return Response.json({ ok: false, error: m }, { status: 500 });
  }
}
