# Demonstration Site — Song Young Shin Farm Barn (실증지 우사 상세)

**Authoritative, persistent record.** Every agent producing output for the MOTIE project
RS-2026-25508014 (자율주행 깔개 관리 축산 로봇, 2026.4.1 ~ 2028.12.31) must read this
file and use these figures until project end. Founder instruction (2026-09-20):
"우리 우사의 상세도를 기억해주고 연구과제 종료 시까지 계속 활용."

Update this file (not ad-hoc documents) whenever the founder gives new site facts.
Items marked **확인 필요** are still to be confirmed from the site drawing.

## 1. Identity
| 항목 | 내용 |
|---|---|
| 실증지 | 송영신목장 (경기도 안성시) — ㈜D2O 운영 실증 축사 |
| 과제 내 역할 | 공동연구개발기관(수요사) ㈜D2O의 **1차 실증지** (1년차: 실사용 환경 정의·실증 준비 / 2~3년차: 시제품 현장 실증) |
| 로봇 애칭 | **갈전구리** = 자율주행 깔개 관리 축산 로봇 (1차 시제품: 30HP급 하이브리드 엔진 + 로터리 작업기, GMW 설계) |

## 2. Barn geometry
| 구분 | 규격 | 면적 |
|---|---|---|
| A동 우사 | 가로 20 m × 세로 50 m | 1,000 m² |
| 중앙 복도 (착유대기실 · 소 이동통로 · 트랙터/로봇 진입 통로) | 폭 5 m × 50 m | 250 m² |
| B동 우사 (복도 반대편, 동일 규격) | 가로 20 m × 세로 50 m | 1,000 m² |
| **전체** | **45 m × 50 m** | **2,250 m²** |

### Pillar grid (로봇 주행 장애물)
| 방향 | 간격 | 열 수 |
|---|---|---|
| 가로 (20 m 폭 방향) | **10 m** | 3열 (0 · 10 · 20 m) — 중간 열이 우사 내부(휴식 공간)를 관통 |
| 세로 (50 m 길이 방향) | **5 m** | 11열 (0 ~ 50 m) |
| 베이 단위 | 10 m × 5 m | 동당 20개, 합계 40개 — 로봇 경로 계획의 기본 단위 |

## 3. Space division & bedding basis (each barn, from corridor outward)
| 구역 | 폭 | 1개 동 | 2개 동 | 구분 |
|---|---|---|---|---|
| 사조 공간 (사료 섭취) | 약 3 m × 50 m | 150 m² | 300 m² | 베딩 제외 |
| 음수 공간 | 약 2 m × 50 m | 100 m² | 200 m² | 베딩 제외 |
| 복도 (착유대기실·이동통로) | 5 m × 50 m 공용 | — | 250 m² | 베딩 제외 |
| **휴식 공간 = 베딩 기준 면적** | **15 m × 50 m** | **750 m²** | **1,500 m²** | 소가 누워 쉬는 공간, 로봇 작업 대상 |

**Rule:** 베딩 기준 면적 = 전체 우사 면적 − (사조 + 음수 + 복도[착유대기실·이동통로]).
피트모스 투입량, 베딩 두께, 로봇 작업 면적은 모두 **휴식 공간** 기준으로 산정한다.

## 4. Bedding operating rules
| 항목 | 기준 |
|---|---|
| 재료 | 주재료 톱밥 + 부재료 피트모스 (D2O 베딩 시스템) |
| **피트모스 투입 기준** | **휴식 공간 50 m²당 1 ~ 2 m³ — 톱밥 투입량과 무관하게 면적 기준으로 적용** |
| 1회 투입량 (1,500 m²) | 피트모스 30 ~ 60 m³ (동당 15 ~ 30 m³, 약 2 ~ 4 cm 층) |
| 참고 배합비 | 톱밥 : 피트모스 ≈ 7 : 3 (부피, 참고치이며 산정 기준 아님) |
| 베딩 두께 | 약 60 cm 이상 유지 (60 cm 기준 총 체적 약 900 m³, 동당 450 m³) |

## 5. Daily work & monitoring (current practice)
- 장비: **56 HP 트랙터 + 로터리**, **매일 아침 1회** 베딩 교반 (A·B동 휴식 공간).
- 일일 체크 9항목: ① 작업 동선 ② 회전반경 ③ 베딩 두께 ④ 로터리 회전수(PTO rpm·주행속도)
  ⑤ 교반 깊이 ⑥ 수분함량 ⑦ 베딩 추가 여부(톱밥·피트모스 m³) ⑧ 냄새 ⑨ 사용기간.
- 데이터 용도: 로봇 요구사양(경로·회전반경·작업기 깊이/출력·보충 예측) 및 성과지표(악취) 기초자료.

## 6. Robot (갈전구리) layout assumptions — draft
- 작업 구역: 휴식 공간 15 m × 50 m × 2동, 기둥 열 사이 10 m × 5 m 베이 단위 왕복(boustrophedon) 경로, 작업 폭 약 3 m 가정.
- 동 간 이동: 중앙 복도 경유. 로봇 진입로·대기/충전 스테이션: 동측 끝단 제안 (**확인 필요**).
- 차체 약 2.2 × 1.4 m 가정 (GMW 설계 확정 후 수정). 56 HP 트랙터 대비 30 HP급 엔진의 교반 부하 검토 필요.

## 7. Open items (확인 필요)
1. 사조·음수 공간의 순서와 정확한 경계 위치 (현장 도면).
2. 중간 기둥 열(가로 10 m)의 정확한 위치와 휴식 공간 내 관통 여부.
3. 출입구 위치, 로봇 진입로·스테이션 위치.
4. 로봇 차체 치수 및 작업기 규격 (GMW·충남대).

## 8. Files
- 평면도: `deliverables/floorplan/songyoungshin-barn-floorplan.{svg,png,dxf}` (+ `-crop.png` 문서 삽입용)
- 도면 생성기 및 AI 프롬프트: `deliverables/floorplan/ai-floorplan-prompt.md`
- 중간보고서(전문): `deliverables/motie-rs-2026-25508014-interim-report-d2o-demo-site.md`
- 중간점검 제출자료(2p): `deliverables/motie-rs-2026-25508014-중간점검-제출자료-D2O.{pdf,docx}`

## Change log
- 2026-09-20: 최초 작성 (founder 구두 제원 기반). 피트모스 기준 1~2 m³/50 m², 휴식 공간 정의, 기둥 10 m × 5 m 반영.
