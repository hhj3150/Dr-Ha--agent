import { promises as fs } from "fs";
import path from "path";

/**
 * 하실장 비서실 — 에이전트 등록부.
 *
 * 17개 에이전트의 "두뇌"는 이미 저장소의 /agents 와 /context 의 markdown 으로
 * 존재한다. 이 파일은 그 파일들을 런타임에 읽어 시스템 프롬프트로 조립하는
 * 역할만 한다. 새 에이전트가 추가되면 AGENTS 배열에 한 줄만 추가하면 된다.
 */

export type AgentKey =
  | "ceo-strategy"
  | "eco-bit-platform"
  | "cowtalk-ai"
  | "smaxtec-sensor-operations"
  | "provincial-government-expansion"
  | "cowtalk-global-expansion"
  | "genetics-biotech"
  | "genetics-lab-operations"
  | "global-embryo-export-operations"
  | "government-rnd-secretary"
  | "d2o-environment-carbon"
  | "d2o-peatmoss-commercial"
  | "songyoungshin-product-development"
  | "songyoungshin-brand-marketing"
  | "songyoungshin-sales-distribution"
  | "songyoungshin-ecommerce"
  | "a2-haymilk-brand";

export interface AgentDef {
  key: AgentKey;
  /** 화면에 보여줄 한글 이름 */
  label: string;
  /** /agents 안의 파일명 */
  file: string;
  /** 라우터에게 주는 한 줄 설명 (자동 배정 판단용) */
  blurb: string;
  /** 이 에이전트가 추가로 읽어야 하는 /context 파일들 */
  extraContext?: string[];
}

/** 모든 에이전트가 항상 함께 읽는 기반 컨텍스트 (CLAUDE.md 규칙) */
const BASE_CONTEXT = [
  "assistant_context.md", // 영구 개인 기억 (Owner Profile & Companion Mandate)
  "founder-context.md",
  "master-context.md",
  "confidentiality-rules.md",
];

export const AGENTS: AgentDef[] = [
  {
    key: "ceo-strategy",
    label: "CEO 전략",
    file: "ceo-strategy-agent.md",
    blurb:
      "전략, 우선순위, 자금/투자, 파트너십, 정책 내러티브, 투자자 자료. 넓거나 애매한 아이디어는 여기서 먼저 받는다.",
  },
  {
    key: "eco-bit-platform",
    label: "Eco-BIT 플랫폼",
    file: "eco-bit-platform-agent.md",
    blurb:
      "플랫폼 아키텍처, 대시보드 셸, 데이터 파이프라인/인프라, 정부 보고, 공공 파일럿 제안.",
    extraContext: [
      "eco-bit-expansion-context.md",
      "gyeonggi-2027-ai-livestock-platform-context.md",
    ],
  },
  {
    key: "cowtalk-ai",
    label: "CowTalk AI",
    file: "cowtalk-ai-agent.md",
    blurb:
      "반추위 센서 해석, 발정/잠재발정, 분만/질병 예측, 번식 AI, 알림 생성, 이상탐지, CowTalk PRD.",
    extraContext: ["cowtalk-business-context.md", "smaxtec-sales-structure-context.md"],
  },
  {
    key: "smaxtec-sensor-operations",
    label: "smaXtec 센서 현장",
    file: "smaxtec-sensor-operations-agent.md",
    blurb:
      "smaXtec 위내센서/볼러스 공급·설치·등록·관리·AS·재고·활성화·구독료, 농가 교육, 현장 운영.",
    extraContext: ["cowtalk-business-context.md", "smaxtec-sales-structure-context.md"],
  },
  {
    key: "provincial-government-expansion",
    label: "국내 광역 확장",
    file: "provincial-government-expansion-agent.md",
    blurb:
      "도지사 정책제안, 광역지자체 사업, 경기도/강원/전라, 한우 디지털 플랫폼, 道 예산/마스터플랜 (국내 Phase 1~4).",
    extraContext: [
      "eco-bit-expansion-context.md",
      "gyeonggi-2027-ai-livestock-platform-context.md",
    ],
  },
  {
    key: "cowtalk-global-expansion",
    label: "CowTalk 해외 확장",
    file: "cowtalk-global-expansion-agent.md",
    blurb:
      "CowTalk+Eco-BIT 해외 진출(Phase 5), 중앙아/동남아/중동, Dubai 허브, 해외 정부 파트너십, 국제 파일럿, 수출 제안서.",
    extraContext: ["eco-bit-expansion-context.md"],
  },
  {
    key: "genetics-biotech",
    label: "제네틱스 바이오텍",
    file: "genetics-biotech-agent.md",
    blurb:
      "수정란 과학, 유전능력/유전체 선발, 한우/A2A2 개량, 젖소 대리모 전략, 번식·이식 프로토콜.",
    extraContext: ["global-embryo-export-context.md"],
  },
  {
    key: "genetics-lab-operations",
    label: "제네틱스 실험실 운영",
    file: "genetics-lab-operations-agent.md",
    blurb:
      "실험실 수정란 생산(OPU/IVF/배양/동결), 품질관리, 수정란/시약 재고, 액체질소, 연구원·직원 관리, SOP.",
    extraContext: ["global-embryo-export-context.md"],
  },
  {
    key: "global-embryo-export-operations",
    label: "수정란 수출 운영",
    file: "global-embryo-export-operations-agent.md",
    blurb:
      "한국 홀스타인 성감별 젖소 수정란 수출, 검역/수출서류, 해외 파트너/MOU, 물류, Dubai 허브 (한우 유전자원 수출은 금지).",
    extraContext: ["global-embryo-export-context.md"],
  },
  {
    key: "government-rnd-secretary",
    label: "정부 R&D 비서",
    file: "government-rnd-secretary-agent.md",
    blurb:
      "산자부 3년 R&D 과제 PMO, 연구노트, 중간/연차/최종보고서, 정산, 성과지표, 평가/발표 자료, 연구비.",
    extraContext: ["government-rnd-project-context.md"],
  },
  {
    key: "d2o-environment-carbon",
    label: "D2O 환경·탄소",
    file: "d2o-environment-carbon-agent.md",
    blurb:
      "깔짚/베딩, 퇴비, 악취, 분뇨, 탄소, 특허, 현장 매뉴얼/SOP (D2O, Dr. Ha, HBP, Healing Compost). 기술 효과.",
  },
  {
    key: "d2o-peatmoss-commercial",
    label: "피트모스 영업",
    file: "d2o-peatmoss-commercial-agent.md",
    blurb:
      "피트모스 판매 실행, 베딩/깔짚, 농가 제안서, 견적서, 대리점/총판, 농협/축협 납품, ROI, 농가 교육.",
  },
  {
    key: "songyoungshin-product-development",
    label: "송영신 제품개발",
    file: "songyoungshin-product-development-agent.md",
    blurb:
      "유제품 제조공정과 경제성. A2 저지 건초우유/요거트/그릭/카이막/아이스크림/밀크티 개발, 레시피, 원가/마진.",
    extraContext: ["songyoungshin-growth-context.md"],
  },
  {
    key: "songyoungshin-brand-marketing",
    label: "송영신 브랜드",
    file: "songyoungshin-brand-marketing-agent.md",
    blurb:
      "송영신목장 브랜드 스토리, A2 건초우유 핵심 메시지, 패키지/상세페이지 카피, SNS/블로그/유튜브 콘텐츠.",
    extraContext: ["songyoungshin-growth-context.md"],
  },
  {
    key: "songyoungshin-sales-distribution",
    label: "송영신 영업·유통",
    file: "songyoungshin-sales-distribution-agent.md",
    blurb:
      "온라인 판매, 정기구독, 스마트스토어/자사몰, 백화점/프리미엄마트, 호텔/카페/베이커리 B2B, 첫 1,000 고객.",
    extraContext: ["songyoungshin-growth-context.md"],
  },
  {
    key: "songyoungshin-ecommerce",
    label: "송영신 이커머스",
    file: "songyoungshin-ecommerce-agent.md",
    blurb:
      "shop.a2jerseymilk.com IA, 상세페이지, 장바구니/결제/멤버십/쿠폰/리뷰/구독, CRM, SEO, 전환율(CRO).",
    extraContext: ["songyoungshin-growth-context.md"],
  },
  {
    key: "a2-haymilk-brand",
    label: "A2 건초우유 (레거시)",
    file: "a2-haymilk-brand-agent.md",
    blurb:
      "일반/레거시 브랜드 작업, 카페 컨셉, 농장 관광 프로그램, 프리미엄 유제품 사업모델.",
  },
];

const AGENT_MAP: Record<string, AgentDef> = Object.fromEntries(
  AGENTS.map((a) => [a.key, a])
);

export function getAgent(key: string): AgentDef | undefined {
  return AGENT_MAP[key];
}

/** 라우터에게 보여줄 에이전트 목록 (key + 한 줄 설명) */
export function agentCatalog(): string {
  return AGENTS.map((a) => `- ${a.key} (${a.label}): ${a.blurb}`).join("\n");
}

const REPO_ROOT = process.cwd();

async function readMd(dir: string, file: string): Promise<string> {
  try {
    return await fs.readFile(path.join(REPO_ROOT, dir, file), "utf8");
  } catch {
    return "";
  }
}

/** CLAUDE.md (라우팅·우선순위·기밀 규칙 등 최상위 지침) */
async function readClaudeMd(): Promise<string> {
  return readMd(".", "CLAUDE.md");
}

/**
 * 선택된 에이전트의 전체 시스템 프롬프트를 조립한다.
 * = 하실장 정체성/규칙(CLAUDE.md) + 기반 컨텍스트 + 에이전트 파일 + 에이전트별 컨텍스트
 */
export async function buildSystemPrompt(agent: AgentDef): Promise<string> {
  const [claudeMd, agentBody] = await Promise.all([
    readClaudeMd(),
    readMd("agents", agent.file),
  ]);

  const contextFiles = [...BASE_CONTEXT, ...(agent.extraContext ?? [])];
  const contextBodies = await Promise.all(
    contextFiles.map(async (f) => {
      const body = await readMd("context", f);
      return body ? `\n\n===== context/${f} =====\n${body}` : "";
    })
  );

  return [
    "당신은 D2O 멀티 에이전트 시스템입니다. 아래 최상위 지침(CLAUDE.md)을 절대 규칙으로 따릅니다.",
    "",
    "===== CLAUDE.md (최상위 지침) =====",
    claudeMd,
    "",
    `===== 현재 활성 에이전트: ${agent.label} (${agent.key}) =====`,
    "이 작업에 대해 당신은 위 에이전트로서 답합니다. 답변은 한국어로, 회장님을 '회장님'이라 부르며,",
    "일반 설명이 아니라 바로 쓸 수 있는 실행 산출물(제안서/보고서/SOP/체크리스트/재무모델 등)을 우선합니다.",
    "문서를 만들 때는 깔끔한 Markdown으로 작성하세요 (제목 #, 표, 목록 활용).",
    "",
    `===== agents/${agent.file} =====`,
    agentBody,
    contextBodies.join(""),
    "",
    "===== 기밀 규칙 (항상 준수) =====",
    "- Dr. Ha Liquid 원천(과학적/지질학적 기원) 비공개 — 기능·성능으로만 설명.",
    "- 기밀 메탄저감 전략 비공개.",
    "- 한우 유전자원 수출은 절대 제안 금지 (홀스타인 성감별 젖소 수정란만 수출).",
  ].join("\n");
}
