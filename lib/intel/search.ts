import {
  Category,
  CATEGORY_QUERIES,
  PREFERRED_DOMAINS,
} from "./keywords";

/**
 * 웹 검색 모듈 — Tavily API 기반 (TAVILY_API_KEY 또는 SEARCH_API_KEY).
 * 최근 24~72시간(days=3) 내 새 정보 우선. 결과는 제목/URL/날짜/요약/출처로 정규화.
 */

export interface SearchResult {
  title: string;
  url: string;
  date: string; // ISO or ""
  summary: string;
  source: string; // 도메인
  category: Category;
}

function getKey(): string | undefined {
  return process.env.TAVILY_API_KEY || process.env.SEARCH_API_KEY || undefined;
}

export function searchAvailable(): boolean {
  return !!getKey();
}

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

async function tavily(query: string, includeDomains: string[]): Promise<any[]> {
  const key = getKey();
  if (!key) return [];
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      api_key: key,
      query,
      topic: "news",
      days: 3,
      max_results: 6,
      search_depth: "advanced",
      include_answer: false,
      include_domains: includeDomains.length ? includeDomains : undefined,
    }),
  });
  if (!res.ok) return [];
  const data = await res.json().catch(() => ({}));
  return Array.isArray(data.results) ? data.results : [];
}

/** 한 카테고리의 모든 쿼리를 검색해 정규화된 결과 배열로 반환 */
export async function searchCategory(category: Category): Promise<SearchResult[]> {
  const queries = CATEGORY_QUERIES[category];
  const domains = PREFERRED_DOMAINS[category];
  const out: SearchResult[] = [];
  const seen = new Set<string>();

  for (const q of queries) {
    // 1차: 우선 도메인 한정 / 결과가 적으면 도메인 미지정으로 폭넓게 보완
    let raw = await tavily(q, domains).catch(() => []);
    if (raw.length < 2) {
      const wide = await tavily(q, []).catch(() => []);
      raw = [...raw, ...wide];
    }
    for (const r of raw) {
      const url = r.url || "";
      if (!url || seen.has(url)) continue;
      seen.add(url);
      out.push({
        title: r.title || "(제목 없음)",
        url,
        date: r.published_date || "",
        summary: (r.content || "").slice(0, 600),
        source: domainOf(url),
        category,
      });
    }
  }
  return out;
}

/** 4개 카테고리 전부 검색 */
export async function searchAll(): Promise<Record<Category, SearchResult[]>> {
  const cats: Category[] = ["policy", "domestic", "global", "strategy"];
  const entries = await Promise.all(
    cats.map(async (c) => [c, await searchCategory(c)] as const)
  );
  return Object.fromEntries(entries) as Record<Category, SearchResult[]>;
}
