# 하실장을 "어디서나 + 클로드 전 기능"으로 — Claude Project 설치 가이드

> 목표: 웹·iOS·안드로이드·데스크톱 어디서나, **클로드의 모든 스킬·확장(웹검색·Gmail·캘린더·
> 드라이브·Notion·Canva·Gamma·파일분석·아티팩트)** 과 함께 "하실장"으로 쓰기.

## 준비물
- **Claude 유료 플랜(Pro 또는 Max)** — 프로젝트·커넥터(확장) 기능 사용. (무료는 기능 제한)
- 이 저장소의 파일들: `hasiljang-claude-project.md`, `context/*.md`, `agents/*.md`

## A. 프로젝트 만들기 (5분)
1. **claude.ai** 로그인 → 왼쪽 **Projects(프로젝트)** → **New project(새 프로젝트)**.
2. 이름: `하실장 비서실`.
3. **Instructions(지침)** 칸에 → `hasiljang-claude-project.md` **전체를 복사해 붙여넣기**.
4. **Project knowledge(프로젝트 지식)** 에 **단 2개 파일만** 업로드(드래그):
   - `project-knowledge/hasiljang-knowledge-context.md` (회장님 프로필·기밀규칙·사업별 컨텍스트 11개 묶음)
   - `project-knowledge/hasiljang-knowledge-agents.md` (17개 에이전트 상세 묶음)
   → 이 두 파일에 회장님의 전 사업 디테일이 다 들어 있어, 하실장이 "기억"한 상태로 답합니다.
   > (원본 개별 파일로 올리고 싶으면 `context/`·`agents/` 의 `.md` 들을 그대로 올려도 됩니다.)
5. 저장. 이제 그 프로젝트 안에서 대화하면 = **하실장**.

## B. 확장(커넥터/스킬) 켜기 — "클로드 전 기능 결합"
claude.ai 또는 **Claude 데스크톱 앱**에서 **Settings → Connectors(커넥터)** 에서 필요한 것을 연결:
- **Web search** 켜기 → 최신 정책·공모·경쟁사 자동 검색
- **Google Calendar / Gmail / Google Drive** → 일정 잡기, 메일 초안/발송, 문서 읽기
- **Notion / Canva / Gamma** 등 → 문서·디자인·발표덱 생성
- 파일 업로드(검역서류·계약서·PDF)는 기본 제공
> 커넥터 목록·가용성은 플랜·지역에 따라 다를 수 있습니다. 보이는 것부터 연결하세요.

## C. 어디서나 쓰기
- **모바일**: App Store / Google Play에서 **Claude** 앱 설치 → 같은 계정 로그인 → 프로젝트 `하실장 비서실` 선택.
- **데스크톱**: Claude 데스크톱 앱(Mac/Win) → 커넥터가 가장 강력하게 동작.
- **웹**: claude.ai.
→ 어느 기기에서 열어도 같은 하실장, 같은 기억, 클로드 전 기능.

## D. 역할 분담 (중요)
- **일상 하실장 = Claude Project (A)** — 어디서나 + 전 기능. 회장님의 메인.
- **무인 자동화 = 웹앱(Netlify)** — 매일 07:00 인텔 리포트처럼 *사람 없이 도는* 작업 전용으로 유지.
  (claude.ai 프로젝트는 "매일 자동 실행" 같은 백그라운드 작업은 못 하므로, 그건 웹앱이 담당.)

## E. 갱신
하실장의 두뇌를 바꾸려면 이 저장소의 `agents/`·`context/`·`hasiljang-claude-project.md` 를
수정한 뒤, 프로젝트 지식 파일을 다시 업로드/교체하면 됩니다. (단일 소스 = 이 저장소)

## 한 줄 요약
**새 하실장을 만드는 게 아니라, 클로드 안에 하실장의 뇌를 심는다.**
A(프로젝트)로 어디서나 전 기능을 쓰고, B(웹앱)로 매일 자동 리포트를 받는다.
