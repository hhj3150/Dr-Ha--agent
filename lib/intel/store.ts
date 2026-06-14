/**
 * 인텔리전스 저장소.
 * - 운영(Netlify): @netlify/blobs (영구)
 * - 로컬 개발: .intel-data/ 파일시스템 폴백
 *
 * 저장 항목:
 *   reports/<date>.md      일일 리포트(Markdown)
 *   raw/<date>.json        검색 원본 결과
 *   meta/seen_items.json   중복 제거용(URL→타임스탬프)
 *   meta/feedback.json     사용자 피드백(중요/관심없음/추적계속)
 */

import { promises as fs } from "fs";
import path from "path";

const LOCAL_DIR = path.join(process.cwd(), ".intel-data");

async function blobStore(): Promise<any | null> {
  try {
    const mod = await import("@netlify/blobs");
    return mod.getStore({ name: "intel", consistency: "strong" });
  } catch {
    return null; // 로컬 등 Netlify 환경이 아니면 폴백
  }
}

async function localPath(key: string): Promise<string> {
  const p = path.join(LOCAL_DIR, key);
  await fs.mkdir(path.dirname(p), { recursive: true });
  return p;
}

export async function putText(key: string, text: string): Promise<void> {
  const store = await blobStore();
  if (store) {
    await store.set(key, text);
    return;
  }
  await fs.writeFile(await localPath(key), text, "utf8");
}

export async function getText(key: string): Promise<string | null> {
  const store = await blobStore();
  if (store) {
    const v = await store.get(key, { type: "text" });
    return v ?? null;
  }
  try {
    return await fs.readFile(path.join(LOCAL_DIR, key), "utf8");
  } catch {
    return null;
  }
}

export async function putJSON(key: string, value: unknown): Promise<void> {
  await putText(key, JSON.stringify(value));
}

export async function getJSON<T>(key: string, fallback: T): Promise<T> {
  const t = await getText(key);
  if (!t) return fallback;
  try {
    return JSON.parse(t) as T;
  } catch {
    return fallback;
  }
}

/** reports/ 아래 날짜 목록(최신순) */
export async function listReportDates(): Promise<string[]> {
  const store = await blobStore();
  if (store) {
    const { blobs } = await store.list({ prefix: "reports/" });
    return (blobs as { key: string }[])
      .map((b) => b.key.replace("reports/", "").replace(/\.md$/, ""))
      .sort()
      .reverse();
  }
  try {
    const dir = path.join(LOCAL_DIR, "reports");
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""))
      .sort()
      .reverse();
  } catch {
    return [];
  }
}

// ── 키 헬퍼 ──────────────────────────────
export const keyReport = (date: string) => `reports/${date}.md`;
export const keyRaw = (date: string) => `raw/${date}.json`;
export const KEY_SEEN = "meta/seen_items.json";
export const KEY_FEEDBACK = "meta/feedback.json";
