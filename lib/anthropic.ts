import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

/** 환경변수의 API 키로 Anthropic 클라이언트를 (한 번만) 생성한다. */
export function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY 가 설정되지 않았습니다. .env.local 에 키를 넣어주세요."
    );
  }
  if (!client) {
    client = new Anthropic({ apiKey });
  }
  return client;
}

export const ANSWER_MODEL = process.env.ANSWER_MODEL || "claude-opus-4-8";
export const ROUTER_MODEL =
  process.env.ROUTER_MODEL || "claude-haiku-4-5-20251001";
