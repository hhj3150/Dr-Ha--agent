// Netlify 예약함수 — 매일 22:00 UTC(= 한국시간 07:00)에 실행되어
// Next.js API 라우트(/api/intel/generate)를 호출, 일일 인텔리전스 리포트를 생성한다.
// (서버리스 환경이라 node-cron 대신 Netlify Scheduled Functions 사용)

export default async () => {
  const base =
    process.env.URL || process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL || "";
  if (!base) {
    return new Response("site URL 환경변수를 찾을 수 없습니다.", { status: 500 });
  }
  const res = await fetch(`${base}/api/intel/generate`, {
    method: "POST",
    headers: { "x-cron-secret": process.env.CRON_SECRET || "" },
  });
  const txt = await res.text().catch(() => "");
  return new Response(`daily-intel triggered: ${res.status} ${txt.slice(0, 200)}`);
};

export const config = { schedule: "0 22 * * *" };
