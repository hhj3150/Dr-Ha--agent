# D2O Agent System — 운영 가이드 (회장님용)

> 하현제 대표의 실제 사업 수행 비서실. **17개 에이전트**가 13개 사업을 담당합니다.
> 평소 말로 지시하면 적절한 에이전트가 자동 배정되고, 실행 가능한 산출물이 나옵니다.

## 1. 쓰는 법 (3가지)
1. **그냥 말한다** — 업무 내용을 보고 자동 배정.
   `3번 소 반추 이틀째 떨어졌어. 뭘 해야 하지?`
2. **에이전트 지정** — 이름을 앞에 붙인다.
   `cowtalk-global-expansion 로: 카자흐스탄 정부 도입 제안서 써줘`
3. **섞인 업무는 통으로** — 여러 에이전트가 자동 조합되어 하나의 결과물로 나옴.
   `경기도 5년 102.3억 AI 축산행정 플랫폼 제안서` → provincial-government-expansion + eco-bit-platform + ceo-strategy

## 2. 17개 에이전트 빠른 지도
| 사업 | 에이전트 | 한 줄 |
|---|---|---|
| 전략 | `ceo-strategy` | 전략·투자·우선순위 (애매하면 1차) |
| 플랫폼 | `eco-bit-platform` | Eco-BIT 셸·대시보드·정부·인프라 |
| 센서 AI | `cowtalk-ai` | 번식·질병·분만 예측, 알림 |
| 센서 현장 | `smaxtec-sensor-operations` | smaXtec 공급·설치·AS·구독 |
| 국내 확장 | `provincial-government-expansion` | 도지사 제안·道 마스터플랜·예산 |
| 해외 확장 | `cowtalk-global-expansion` | 해외 진출·Dubai·국가진입·IR |
| 수정란 과학 | `genetics-biotech` | 유전능력·공혈우·이식 프로토콜 |
| 실험실 | `genetics-lab-operations` | OPU/IVF/동결·QC·재고·연구원 |
| 수정란 수출 | `global-embryo-export-operations` | 홀스타인 성감별 수출·검역·Dubai |
| 정부 R&D | `government-rnd-secretary` | 산자부 3년·보고·정산·성과 |
| 환경 기술 | `d2o-environment-carbon` | 깔짚·퇴비·악취·탄소·특허 |
| 피트모스 영업 | `d2o-peatmoss-commercial` | 판매·대리점·농가 제안서·ROI |
| A2 제품 | `songyoungshin-product-development` | 제품개발·원가/마진·공정 |
| A2 브랜드 | `songyoungshin-brand-marketing` | 스토리·콘텐츠·SNS |
| A2 영업 | `songyoungshin-sales-distribution` | 온라인·정기구독·B2B |
| A2 쇼핑몰 | `songyoungshin-ecommerce` | shop.a2jerseymilk.com IA·전환·CRM |
| A2 일반 | `a2-haymilk-brand` | 레거시 브랜드·카페·관광 |

## 3. 우선순위 (Tier)
- **Tier 1:** ①CowTalk+Eco-BIT ②경기도 5년/102.3억 AI 축산행정 플랫폼 ③CowTalk 해외 확장
- **Tier 2:** ④홀스타인 수정란 수출 ⑤Dubai 허브 ⑥실험실 운영
- **Tier 3:** ⑦송영신 쇼핑몰 ⑧피트모스 (단기 현금흐름 → Tier 1 자금)

## 4. 자주 쓰는 시작 명령
- `내 사업 전체 우선순위화하고 이번 분기 30/90일 액션플랜` → ceo-strategy
- `경기도 5년 102.3억 AI 축산행정 플랫폼 개념서 v1` → provincial-government-expansion
- `우즈벡 CowTalk 50두 파일럿을 제1호 국제 실증 레퍼런스로 문서화` → cowtalk-global-expansion
- `shop.a2jerseymilk.com 오픈 전 체크리스트` → songyoungshin-ecommerce
- `피트모스 낙농가 제안서 + ROI` → d2o-peatmoss-commercial
- `산자부 이번 달 진도보고서 + 성과지표` → government-rnd-secretary

## 5. 주간 운영 루틴 (권장)
- **월**: `ceo-strategy`로 주간 우선순위 → 각 에이전트 분배
- **화~목**: 도메인 실무 (CowTalk / 확장 / 수정란 / 송영신 / 피트모스)
- **금**: 산출물 정리·문서화(Notion/Drive·Gamma 덱), 다음 주 점검

## 6. 항상 지켜지는 규칙 (기밀)
- Dr. Ha Liquid 원천 비공개(기능으로만) · 메탄저감 전략 비공개 · **한우 유전자원 수출 금지**(홀스타인 성감별 젖소 수정란만 수출).

## 7. 이 저장소가 하는 것 / 아닌 것
- ✅ 전략·제안서·기획·SOP·체크리스트·리포트 등 **실행 문서** 생성
- ✅ **웹 앱 「하실장 비서실」** — 폰·PC 브라우저에서 한국어로 지시 → 자동 배정 →
  답변 + 문서 다운로드. 실행·배포법은 **`WEBAPP.md`** 참고. (1단계: 문서 비서 / 2단계: 운영 대시보드)
- ❌ 아직 실제 쇼핑몰/플랫폼 **구현 코드**는 없음 (필요 시 별도 진행)

## 8. 더 깊은 참조
`CLAUDE.md`(라우팅·우선순위), `README.md`(에이전트↔workflows/templates 매핑), `context/`(창업자·사업별 컨텍스트).
