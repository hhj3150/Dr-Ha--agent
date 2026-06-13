import { promises as fs } from "fs";
import path from "path";
import { getClient, ANSWER_MODEL } from "../anthropic";
import { searchAll, searchAvailable, SearchResult } from "./search";
import {
  Category,
  CATEGORY_LABEL,
  URGENT_CONDITIONS,
  INTEREST_KEYWORDS,
} from "./keywords";
import {
  getJSON,
  putJSON,
  putText,
  KEY_SEEN,
  KEY_FEEDBACK,
  keyRaw,
  keyReport,
} from "./store";

/** 한국시간 기준 오늘 날짜 (YYYY-MM-DD) */
export function kstDate(d = new Date()): string {
  const kst = new Date(d.getTime() + 9 * 3600 * 1000);
  return kst.toISOString().slice(0, 10);
}

async function ownerProfile(): Promise<string> {
  try {
    return await fs.readFile(
      path.join(process.cwd(), "context", "assistant_context.md"),
      "utf8"
    );
  } catch {
    return "";
  }
}

interface SeenMap {
  [url: string]: number;
}

interface Feedback {
  tracked: { title: string; url: string; note?: string }[];
  important: string[];
  ignored: string[];
}

const DEFAULT_FEEDBACK: Feedback = { tracked: [], important: [], ignored: [] };

/** 30일 지난 seen 항목은 정리 */
function pruneSeen(seen: SeenMap): SeenMap {
  const cutoff = Date.now() - 30 * 24 * 3600 * 1000;
  const out: SeenMap = {};
  for (const [url, ts] of Object.entries(seen)) if (ts >= cutoff) out[url] = ts;
  return out;
}

function buildSystemPrompt(profile: string): string {
  return [
    "당신은 하현제 회장님(D2O / Genetics / 고려동물병원) 전용 인텔리전스 분석관입니다.",
    "아래 회장님 프로필·사업 방향을 깊이 이해하고, 그 관점에서 정보를 평가하세요.",
    "",
    "===== 회장님 프로필 (assistant_context.md) =====",
    profile,
    "",
    "===== 임무 =====",
    "주어진 후보 정보들(정책/국내/국외/전략기회 4개 카테고리)을 평가해 일일 인텔리전스 리포트를 작성합니다.",
    "각 항목을 다음 기준으로 1~10점 평가: 정책 관련성, 사업 기회성, 기술 관련성, 긴급성, 경쟁 중요성, D2O/ECO-BIT 적용 가능성. 최종 점수=가중 평균.",
    "각 카테고리에서 최종 점수가 높은 Top 3만 선정(총 12개). 후보가 부족하면 있는 만큼만, 부족함을 명시.",
    "",
    "===== 출력 형식 (반드시 준수, 한국어) =====",
    "맨 위: '# DAILY TOP 3 INTELLIGENCE REPORT' 와 'Date: <날짜>'.",
    "URGENT 조건에 해당하는 항목이 있으면 그 바로 아래에 '## 🚨 URGENT' 섹션으로 먼저 강조.",
    "그다음 4개 섹션: '## 1. 정책 Top 3', '## 2. 국내 Top 3', '## 3. 국외 Top 3', '## 4. 나의 관심사 / 전략기회 Top 3'.",
    "각 항목은 아래 소제목을 모두 포함:",
    "  - **전략 점수**: n/10",
    "  - **무엇이 바뀌었나**:",
    "  - **왜 중요한가**:",
    "  - **D2O / 하현제에게 주는 기회**:",
    "  - **위험요소**:",
    "  - **추천 액션**:",
    "  - **출처**: [제목](URL) (날짜)",
    "맨 아래: \"## ✅ Today's Best 3 Actions for Hyunjae Ha\" — 오늘 실행할 가장 중요한 액션 3가지.",
    "해외 논문·정책은 원문 제목을 유지하고 한국어 요약을 붙입니다.",
    `URGENT 조건: ${URGENT_CONDITIONS.join(" / ")}`,
    "",
    "===== 보안 (절대 외부 공개 금지) =====",
    "- Dr. Ha Liquid의 지질학적 원천, 내부 배합비, 모넨신 기반 탄소감축 전략 세부, D2O 내부 특허전략, 비공개 사업 파트너 정보는 리포트에 절대 쓰지 마세요. 기능·전략적 의미 중심으로만 작성.",
  ].join("\n");
}

export interface GenerateResult {
  date: string;
  report: string;
  itemCount: number;
  searchUsed: boolean;
}

/** 일일 리포트 생성의 전체 파이프라인 */
export async function generateReport(): Promise<GenerateResult> {
  const date = kstDate();

  if (!searchAvailable()) {
    const report =
      `# DAILY TOP 3 INTELLIGENCE REPORT\n\nDate: ${date}\n\n` +
      "> ⚠️ 검색 API 키(TAVILY_API_KEY 또는 SEARCH_API_KEY)가 설정되지 않아 자동 검색을 수행할 수 없습니다.\n" +
      "> Netlify 환경변수에 검색 API 키를 추가하면 매일 자동으로 리포트가 생성됩니다.\n";
    await putText(keyReport(date), report);
    return { date, report, itemCount: 0, searchUsed: false };
  }

  // 1) 검색
  const results = await searchAll();

  // 2) 중복 제거 (이미 본 URL 제외)
  const seen = pruneSeen(await getJSON<SeenMap>(KEY_SEEN, {}));
  const feedback = await getJSON<Feedback>(KEY_FEEDBACK, DEFAULT_FEEDBACK);
  const ignoredSet = new Set(feedback.ignored.map((s) => s.toLowerCase()));

  const fresh: Record<Category, SearchResult[]> = {
    policy: [], domestic: [], global: [], strategy: [],
  };
  let total = 0;
  (Object.keys(results) as Category[]).forEach((cat) => {
    for (const r of results[cat]) {
      if (seen[r.url]) continue;
      if (ignoredSet.has(r.title.toLowerCase())) continue;
      fresh[cat].push(r);
      total++;
    }
  });

  // 3) Claude 점수/선정/리포트
  const profile = await ownerProfile();
  const client = getClient();

  const candidatesText = (Object.keys(fresh) as Category[])
    .map((cat) => {
      const items = fresh[cat]
        .map(
          (r, i) =>
            `  [${i + 1}] 제목: ${r.title}\n      출처: ${r.source} | 날짜: ${r.date || "미상"}\n      URL: ${r.url}\n      요약: ${r.summary}`
        )
        .join("\n");
      return `### ${CATEGORY_LABEL[cat]} (${cat}) 후보 ${fresh[cat].length}건\n${items || "  (신규 후보 없음)"}`;
    })
    .join("\n\n");

  const trackedText = feedback.tracked.length
    ? `\n\n[우선 추적 항목 — 후속 변화가 있으면 우선 보고]\n${feedback.tracked
        .map((t) => `- ${t.title} (${t.url})${t.note ? ` : ${t.note}` : ""}`)
        .join("\n")}`
    : "";

  const user =
    `오늘 날짜: ${date}\n관심 키워드: ${INTEREST_KEYWORDS.join(", ")}\n\n` +
    `아래 후보 정보를 평가해 형식에 맞는 일일 리포트를 작성하세요.\n\n${candidatesText}${trackedText}`;

  let report: string;
  try {
    const msg = await client.messages.create({
      model: ANSWER_MODEL,
      max_tokens: 8000,
      system: buildSystemPrompt(profile),
      messages: [{ role: "user", content: user }],
    });
    report = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
  } catch (err) {
    const m = err instanceof Error ? err.message : String(err);
    report =
      `# DAILY TOP 3 INTELLIGENCE REPORT\n\nDate: ${date}\n\n> ⚠️ 리포트 생성 중 오류: ${m}\n`;
  }

  // 4) 저장 + seen 갱신
  await putText(keyReport(date), report);
  await putJSON(keyRaw(date), results);
  const now = Date.now();
  (Object.keys(results) as Category[]).forEach((cat) =>
    results[cat].forEach((r) => (seen[r.url] = now))
  );
  await putJSON(KEY_SEEN, seen);

  return { date, report, itemCount: total, searchUsed: true };
}
