/**
 * 일일 인텔리전스 리포트 — 관심사·검색 쿼리·소스·URGENT 조건.
 * 회장님(하현제 / D2O / Genetics / 고려동물병원)의 사업 방향에 맞춤.
 */

export type Category = "policy" | "domestic" | "global" | "strategy";

export const CATEGORY_LABEL: Record<Category, string> = {
  policy: "정책",
  domestic: "국내",
  global: "국외",
  strategy: "나의 관심사 / 전략기회",
};

/** 최우선 관심 키워드 (필터링·점수 기준) */
export const INTEREST_KEYWORDS = [
  "ECO-BIT", "D2O Bedding", "Dr. Ha Bedding", "Humus Bedded Pack", "HBP",
  "피트모스 축사 베딩", "축산 악취 저감", "가축분뇨 퇴비화", "Healing Compost",
  "행복한 퇴비", "Dr. Ha Liquid", "풀빅산", "휴믹산 축산", "축산 탄소감축",
  "메탄 저감", "탄소배출권", "저탄소 축산물 인증", "스마트축산", "정밀축산",
  "위내센서", "CowTalk", "smaXtec", "젖소 번식관리", "한우 산업 정책",
  "한우 유전체", "수정란 이식", "소 수정란 IVF ET", "A2 우유", "A2 Hay Milk",
  "Jersey milk", "기능성 요거트", "Lacticaseibacillus casei KACC 92338",
  "동물복지 인증", "경축순환농업", "축산 데이터 플랫폼", "가축 질병 역학관리",
  "정부 공모사업", "경기도 축산 정책", "농림축산식품부", "농촌진흥청 연구",
  "농림식품기술기획평가원", "특허 경쟁기술 경쟁사",
];

/** 카테고리별 검색 쿼리 (Tavily에 그대로 전달) */
export const CATEGORY_QUERIES: Record<Category, string[]> = {
  policy: [
    "농림축산식품부 축산 정책 공고 저탄소 스마트축산",
    "정부 R&D 공모사업 축산 가축분뇨 퇴비 메탄저감 농촌진흥청 농림식품기술기획평가원",
    "경기도 축산 정책 실증사업 동물복지 공고",
  ],
  domestic: [
    "스마트축산 정밀축산 위내센서 CowTalk 국내 뉴스",
    "한우 낙농 A2 우유 수정란 이식 산업 뉴스",
    "축산 악취 저감 가축분뇨 퇴비화 피트모스 베딩 국내",
  ],
  global: [
    "precision livestock methane reduction dairy news",
    "humus bedded pack peat moss bedding fulvic acid livestock research",
    "dairy A2 milk embryo transfer genomics patent global",
  ],
  strategy: [
    "ECO-BIT D2O livestock platform carbon credit opportunity",
    "축산 탄소배출권 저탄소 축산물 인증 시장 기회",
    "livestock odor reduction compost patent competitor 경쟁사 특허",
  ],
};

/** 우선 검색 소스 (Tavily include_domains 힌트 / 점수 참고) */
export const PREFERRED_DOMAINS: Record<Category, string[]> = {
  policy: [
    "mafra.go.kr", "rda.go.kr", "ipet.re.kr", "qia.go.kr", "gg.go.kr",
    "law.go.kr", "likms.assembly.go.kr", "g2b.go.kr",
  ],
  domestic: [
    "chuksannews.co.kr", "nongmin.com", "agrinet.co.kr", "dailyvet.co.kr",
    "naknong.or.kr", "hanwooboard.or.kr", "thekpm.com",
  ],
  global: [
    "fao.org", "usda.gov", "ec.europa.eu", "wur.nl", "cornell.edu",
    "ucdavis.edu", "dairyglobal.net", "allaboutfeed.net", "feednavigator.com",
    "agfundernews.com", "nature.com", "science.org", "frontiersin.org",
    "mdpi.com", "patents.google.com", "wipo.int",
  ],
  strategy: [],
};

/** URGENT 표시 조건 (리포트 상단 강조) */
export const URGENT_CONDITIONS = [
  "정부 공모사업 마감 임박",
  "경기도 축산 관련 사업 공고",
  "스마트축산 실증사업",
  "저탄소 축산 정책 변화",
  "가축분뇨/퇴비 규제 변화",
  "A2 우유 경쟁사 출시",
  "메탄저감 기술 돌파구",
  "D2O/Dr. Ha/Healing Compost와 겹치는 특허",
  "수정란 수출입 규정 변화",
  "주요 가축 질병 발생",
];
