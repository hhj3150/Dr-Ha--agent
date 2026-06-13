import { getClient, ROUTER_MODEL } from "./anthropic";
import { AGENTS, AgentKey, agentCatalog, getAgent } from "./agents";

/**
 * 사용자의 메시지를 보고 17개 에이전트 중 하나를 고른다.
 * 1차로 빠른 모델에게 분류를 맡기고, 실패하면 키워드 폴백으로 떨어진다.
 */
export async function routeToAgent(userMessage: string): Promise<AgentKey> {
  // LLM 라우팅 시도
  try {
    const client = getClient();
    const res = await client.messages.create({
      model: ROUTER_MODEL,
      max_tokens: 30,
      system:
        "당신은 D2O 비서실의 라우터입니다. 사용자의 업무 요청을 읽고 가장 적합한 에이전트 1개의 key만 고르세요.\n" +
        "반드시 아래 목록의 key 중 하나만, 다른 말 없이 그 key 문자열만 출력하세요.\n\n" +
        agentCatalog() +
        "\n\n판단이 애매하거나 넓은 전략/우선순위/투자 관련이면 ceo-strategy 를 고르세요.",
      messages: [{ role: "user", content: userMessage }],
    });

    const text = res.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();

    const matched = AGENTS.find((a) => text.includes(a.key));
    if (matched) return matched.key;
  } catch {
    // 네트워크/키 문제 등 → 키워드 폴백
  }

  return keywordFallback(userMessage);
}

/** API 키나 라우터 호출이 막혔을 때 쓰는 단순 키워드 기반 폴백 */
export function keywordFallback(msg: string): AgentKey {
  const m = msg.toLowerCase();
  const has = (...words: string[]) => words.some((w) => msg.includes(w) || m.includes(w.toLowerCase()));

  if (has("피트모스", "깔짚", "베딩 판매", "대리점", "총판", "견적", "농협", "축협")) return "d2o-peatmoss-commercial";
  if (has("산자부", "연구노트", "중간보고", "연차보고", "최종보고", "정산", "성과지표", "참여기업")) return "government-rnd-secretary";
  if (has("smaxtec", "스마스텍", "위내센서", "볼러스", "센서 설치", "센서 공급", "구독료", "AS")) return "smaxtec-sensor-operations";
  if (has("발정", "분만", "질병 예측", "반추", "알림", "이상탐지", "cowtalk", "카우톡", "번식 ai")) return "cowtalk-ai";
  if (has("수출", "성감별", "홀스타인", "검역", "두바이", "dubai", "중앙아", "동남아", "우즈벡", "카자흐", "말레이", "인도네시아", "베트남", "필리핀", "태국", "koica", " oda")) return "global-embryo-export-operations";
  if (has("실험실", "opu", "ivf", "배양", "동결", "수정란 등급", "액체질소", "시약", "연구원", "직원관리", "재고")) return "genetics-lab-operations";
  if (has("수정란", "유전체", "유전능력", "공혈우", "이식 프로토콜", "대리모", "a2a2")) return "genetics-biotech";
  if (has("도지사", "지방선거", "광역", "경기도", "강원", "전라", "道", "지자체")) return "provincial-government-expansion";
  if (has("해외 진출", "수출 플랫폼", "국제 파일럿", "해외 정부", "글로벌 확장")) return "cowtalk-global-expansion";
  if (has("대시보드", "플랫폼 아키텍처", "데이터 파이프라인", "인프라", "eco-bit", "에코빗")) return "eco-bit-platform";
  if (has("특허", "퇴비", "악취", "분뇨", "탄소", "hbp", "healing compost", "매뉴얼", "sop")) return "d2o-environment-carbon";
  if (has("shop.a2jerseymilk", "상세페이지", "장바구니", "결제", "멤버십", "쿠폰", "리뷰", "구독", "전환율", "cro", "이커머스")) return "songyoungshin-ecommerce";
  if (has("정기구독", "백화점", "b2b", "호텔", "카페 납품", "스마트스토어", "유통")) return "songyoungshin-sales-distribution";
  if (has("브랜드 스토리", "sns", "콘텐츠", "패키지", "유튜브", "블로그", "메시지")) return "songyoungshin-brand-marketing";
  if (has("제품개발", "레시피", "공정", "원가", "마진", "요거트", "그릭", "카이막", "밀크티", "아이스크림")) return "songyoungshin-product-development";
  if (has("송영신", "a2 jersey", "건초우유", "저지")) return "songyoungshin-brand-marketing";
  if (has("카페", "관광", "투어")) return "a2-haymilk-brand";

  return "ceo-strategy";
}

/** 사용자가 수동으로 에이전트를 지정했을 때 검증 */
export function resolveOverride(key?: string | null): AgentKey | undefined {
  if (!key) return undefined;
  return getAgent(key)?.key;
}
