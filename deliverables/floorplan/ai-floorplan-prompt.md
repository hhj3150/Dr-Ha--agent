# 송영신목장 실증 우사 평면도 — AI 작도 프롬프트 모음

이 폴더의 `songyoungshin-barn-floorplan.svg / .png / .dxf`는 하실장이 치수 기반으로 직접 생성한
개념 평면도입니다(생성기: 세션 스크립트 v2, 1 m = 16 px, 2026-09-21 손도면 기준). 아래 프롬프트는 같은 도면을
다른 AI 도구(이미지 생성형 또는 CAD 보조형)로 다시 그리거나 렌더링할 때 사용합니다.

> 주의: 이미지 생성형 AI(Higgsfield, Midjourney, DALL·E, Firefly 등)는 치수·비례를
> 정확히 지키지 못하므로 **발표용 컨셉 렌더링**에만 쓰고, 제출용 도면은 SVG/DXF를 기준으로 합니다.

---

## A. 이미지 생성형 AI용 프롬프트 (한국어)

```
2D 건축 평면도(top-down, orthographic) 스타일의 축사(우사) 배치도를 그려줘. 흰 배경, 얇은 검은 선, 치수선 포함, 미니멀한 기술 도면 느낌.

구성 (2026-09-21 손도면 기준):
- 본동은 가로 50 m × 세로 45 m 직사각형, 그 왼쪽에 10 m × 45 m 퇴비장(수직형 교반기 원형 심볼, 연한 갈색)이 붙어 전체 60 m × 45 m.
- 본동은 위에서 아래로 3개 띠: [A동 20 m] – [중앙 복도 5 m, 회색, 라벨 "중앙 복도 5 m (착유대기실 · 소 이동통로)"] – [B동 20 m].
- A동(위): 위 외벽부터 [휴식 공간 17 m, 연한 녹색, 라벨 "휴식 공간(베딩 기준 면적) 17 m × 50 m − 트랙터 주차 = 800 m²"] – [사조 공간 3 m, 연한 노란색]. 좌상단 모서리에 트랙터 주차 5 m × 10 m(주황). 위 외벽에 급수조 3개(파란 막대).
- B동(아래): 복도부터 [사조 공간 3 m, 연한 노란색] – [휴식 공간 14 m × 37 m, 연한 녹색, 라벨 "518 m²"] – [하단 급수 통로 3 m × 37 m, 연한 파란색, 아래 외벽에 급수조 2개]. 우하단 모서리에 로봇착유기실 10 m × 10 m(연보라). 휴식 공간 오른쪽 3 m와 착유기실 위쪽은 "착유 대기·이동 통로"(회색).
- 기둥: 검은 정사각형 점. 길이 방향(50 m)으로 5 m 간격(11열), 폭 방향으로 10 m 간격(각 동 0·10·20 m 위치). 중간 기둥 열(10 m)이 휴식 공간 안을 가로지르도록 점선으로 표시.
- 로봇 "갈전구리"(자율주행 깔개 관리 로봇, 주황색 차체 + 보라색 로터리 작업기)를 A동 휴식 공간 안에 배치하고, 트랙터 주차 구역을 피해 기둥 열 사이를 왕복하는 파란 점선 주행 경로와 화살표를 그려줘. B동 휴식 공간(14 × 37 m)에도 같은 로봇을 반투명으로 배치하고 착유기실에는 들어가지 않게.
- 로봇 대기·충전 스테이션은 트랙터 주차 구역과 공유(빨간 점선 이동 경로: 서측 끝단 → 복도 → B동).
- 사조·급수 통로에서 서측 퇴비장으로 향하는 녹색 점선 화살표(스키드로더 분뇨 배출, 매일 1회).
- 치수선: 상단 10 m + 50 m(5 m 눈금), 좌측 17/3/5/3/14/3 m, 하단 37 m + 3 m + 10 m.
- 범례와 제목 "송영신목장 실증 우사 개념 평면도 — 자율주행 깔개 관리 로봇(갈전구리) 배치안", 부제 "산자부 RS-2026-25508014 · ㈜D2O · DRAFT".
```

## B. Image-generation prompt (English)

```
Clean 2D architectural floor plan, top-down orthographic, thin black linework on white, dimension lines, minimal technical-drawing style.
Main building 50 m long × 45 m wide, plus a 10 m × 45 m compost yard on the west (left) side (light tan, with a round vertical-composter symbol) — 60 × 45 m overall. Three horizontal bands from top: Barn A (20 m), central corridor (5 m, light gray, label "Corridor 5 m – milking holding / cattle passage"), Barn B (20 m).
Barn A (top), from the outer wall inward: resting/bedding zone 17 m (pale green, label "Resting zone = bedding area 17 × 50 m minus tractor bay = 800 m², sawdust + peat moss ≥ 60 cm"), then feed zone 3 m (pale yellow) next to the corridor. Tractor bay 5 × 10 m (orange) in the top-left corner; three water troughs (blue bars) on the top wall.
Barn B (bottom), from the corridor outward: feed zone 3 m (pale yellow), resting zone 14 × 37 m (pale green, "518 m²"), water lane 3 × 37 m (pale blue) with two troughs on the bottom wall. Robotic milking room 10 × 10 m (lavender) in the bottom-right corner; the 3 m strip east of the resting zone and the area above the milking room are "milking holding / passage" (gray).
Pillars as small black squares: every 5 m along the 50 m length (11 columns), every 10 m across the width (rows at 0, 10, 20 m of each barn); the middle row cuts through the resting zone, shown with a dashed line.
An autonomous bedding-management robot named "갈전구리" (orange body, purple rotary tiller) inside Barn A's resting zone, avoiding the tractor bay, with a blue dashed boustrophedon path between pillar rows; a translucent copy in Barn B's 14 × 37 m resting zone, never entering the milking room.
Robot docking/charging shares the tractor bay (red dashed route: west end → corridor → Barn B). Green dotted arrows from the feed and water lanes to the west compost yard (daily skid-loader manure removal).
Dimensions: 10 m + 50 m on top with 5 m ticks; 17 / 3 / 5 / 3 / 14 / 3 m on the left; 37 + 3 + 10 m along the bottom. Legend and title block: "Song Young Shin Farm demonstration barn – concept plan, autonomous bedding robot layout, MOTIE RS-2026-25508014, D2O, DRAFT". Korean labels.
```

## C. CAD 보조 AI / 코드 생성형 AI용 지시 (정확한 도면이 필요할 때)

```
ezdxf(Python) 또는 SVG로 다음 평면도를 생성하는 코드를 작성해줘. 단위 m, 원점 좌하단.
- 외곽: (-10,0)-(50,45); 서측 부속 (-10,0)-(0,45). 수평 구획선 y=20, y=25 (복도 5 m).
- A동(y 25~45): 사조 y 25~28, 휴식 y 28~45 (트랙터 주차 x 0~5, y 35~45 제외). B동(y 0~20): 사조 y 17~20, 휴식 y 3~17 & x 0~37, 급수 통로 y 0~3 & x 0~37, 로봇착유기실 x 40~50 & y 0~10, 착유 통로 x 37~50 & y 10~17 및 x 37~40 & y 0~10.
- 기둥: x = 0,5,…,50 / y = 0,10,20,25,35,45, 0.3 m 정사각형, 레이어 PILLAR (위치 확인 필요).
- 레이어: WALL, PILLAR, ZONE_REST, ZONE_FEED, ZONE_WATER, CORRIDOR, TRACTOR, MILKER, ANNEX(퇴비장), ROBOT, PATH, DIM, TEXT.
- 로봇 갈전구리: 2.2 × 1.4 m 사각형 + 1.4 × 2.0 m 로터리, A동 휴식 공간 (20, 40.5) 부근.
- 경로: A동 y = 43.5, 40.5, 37.5(x 6.5~48.5), 33.5, 30.5(x 1.5~48.5); B동 y = 15.5, 12.5, 8.5, 5.5 (x 1.5~35.5) 왕복 폴리라인, 레이어 PATH.
- 치수: 전체 길이·폭, 각 띠 폭, 기둥 간격.
```

---

## 하실장이 직접 도면을 그리는 데 필요한 연결 프로그램 (현재 상태)

| 용도 | 필요 도구 | 이 세션에서의 상태 |
|---|---|---|
| 치수 기반 도면 생성 (SVG/PNG) | Python + cairosvg (내장 처리) | **사용 가능** — 이미 생성 완료 |
| CAD 파일 생성 (DXF) | Python ezdxf | **사용 가능** — `.dxf` 생성 완료. AutoCAD, LibreCAD(무료), QCAD, DraftSight에서 열림 |
| 컨셉 렌더링(투시도·3D 느낌) | Higgsfield 등 이미지 생성 연결 | 연결되어 있으나 치수 정확도가 낮아 **발표용 보조 이미지**로만 권장 |
| 회장님 편집용 | 별도 설치 불필요. SVG는 PowerPoint/Illustrator/Inkscape(무료), DXF는 LibreCAD(무료)에서 편집 | — |

**권장:** 현장 실측 도면(기둥 정확한 위치, 착유 통로 경계, 퇴비장 반입구)이 확정되면 이 폴더의
생성 스크립트 값만 바꿔 SVG·PNG·DXF를 다시 뽑는 방식이 가장 정확하고 빠릅니다.
