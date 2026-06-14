# 하실장 비서실 웹 앱 — 운영·배포 가이드 (회장님용)

> 지금까지 markdown으로만 있던 **17개 에이전트**를, 폰·PC 브라우저에서 그냥 켜서 쓰는
> **웹 앱**으로 만든 것입니다. 한국어로 지시 → 자동 배정 → 답변 + **문서 다운로드(.md)**.
> (1단계: 문서 생성 비서 / 2단계: 운영 대시보드 확장 — 구조를 열어 두었습니다.)

---

## 1. 한눈에 보는 구조

```
브라우저(채팅창)  →  /api/chat  →  ① 라우터가 17개 중 1개 에이전트 자동 선택
                                  ② 그 에이전트의 두뇌(agents/*.md + context/*.md + CLAUDE.md)를 시스템 프롬프트로 조립
                                  ③ Claude API 호출 → 답변을 실시간 스트리밍
```

- 에이전트 "두뇌"는 **이미 있는 저장소의 markdown 그대로** 씁니다. 에이전트 내용을 고치고 싶으면
  `agents/`, `context/`, `CLAUDE.md` 파일만 수정하면 앱에 바로 반영됩니다(코드 수정 불필요).
- 새 에이전트를 추가하려면 `lib/agents.ts` 의 `AGENTS` 배열에 한 줄만 추가하면 됩니다.

---

## 2. 내 컴퓨터에서 바로 켜보기 (로컬 실행)

사전 준비: **Node.js 18 이상** 설치.

```bash
# 1) 의존성 설치
npm install

# 2) 환경변수 파일 만들기
cp .env.example .env.local
#   .env.local 을 열어 ANTHROPIC_API_KEY 에 발급받은 키를 붙여넣기

# 3) 실행
npm run dev
#   브라우저에서 http://localhost:3000 접속
```

API 키는 https://console.anthropic.com → API Keys 에서 발급합니다.

---

## 3. 인터넷에 올려서 폰으로도 쓰기 (배포)

> `agents/`·`context/` markdown을 함수 번들에 포함시키는 설정(`next.config.mjs`의
> `outputFileTracingIncludes` + `netlify.toml`의 `included_files`)이 이미 들어 있어,
> Netlify/Vercel 어디에 올려도 답변이 정상 동작합니다.

### 3-A. Netlify로 배포 (회장님 추천 — GitHub+Netlify 보유)

1. 이 저장소를 GitHub에 push (이미 되어 있음).
2. https://app.netlify.com 로그인 → **Add new site → Import an existing project**.
3. **GitHub** 선택 → 이 저장소(`Dr-Ha--agent`) 선택.
4. 빌드 설정은 자동 감지됩니다(저장소의 `netlify.toml` 사용). 그대로 두면 됩니다.
   - Build command: `npm run build`
   - Next.js 플러그인(`@netlify/plugin-nextjs`)이 자동 적용됩니다.
5. **Site configuration → Environment variables** 에 입력:
   - `ANTHROPIC_API_KEY` = 발급받은 키 (필수)
   - `APP_PASSWORD` = 접속 비밀번호 (회장님 외 차단 — **강력 권장**)
   - `ANSWER_MODEL` / `ROUTER_MODEL` = (선택)
6. **Deploy** → 1~2분 뒤 `https://여러분사이트.netlify.app` 발급.
7. 폰 브라우저로 접속 → "홈 화면에 추가"하면 앱처럼 쓸 수 있습니다.

> 환경변수를 나중에 바꿨다면 **Deploys → Trigger deploy → Clear cache and deploy site**
> 로 재배포해야 반영됩니다.

### 3-B. Vercel로 배포 (대안)

1. https://vercel.com → **Add New → Project** → 이 저장소 선택.
2. **Environment Variables** 에 위 3-A의 5번과 동일하게 입력.
3. **Deploy** → `https://여러분주소.vercel.app` 발급.

---

## 4. 쓰는 법

- **자동 배정(기본):** 그냥 한국어로 지시 → 라우터가 알맞은 에이전트 선택.
  - 예) `피트모스 낙농가 제안서 + ROI 표 만들어줘`
- **에이전트 직접 지정:** 우측 상단 드롭다운에서 에이전트 선택 후 지시.
- **문서 받기:** 답변 아래 **「문서 다운로드 (.md)」** 버튼 → 제목 기준 파일명으로 저장.
  (`.md` 파일은 워드/노션/구글문서에 그대로 붙여넣기 가능)

---

## 5. 보안

- `APP_PASSWORD` 를 설정하면 접속 시 비밀번호를 요구합니다. **반드시 설정하세요.**
- API 키는 서버(`/api/chat`)에서만 사용되며 브라우저에 노출되지 않습니다.
- 기밀 규칙(Dr. Ha Liquid 원천·메탄저감 전략 비공개, 한우 유전자원 수출 금지)은
  시스템 프롬프트에 항상 주입되어 답변에 강제 적용됩니다.

---

## 6. 모델 바꾸기

`.env.local`(또는 Vercel 환경변수)에서:

- `ANSWER_MODEL` — 답변 품질 담당. 기본 `claude-opus-4-8`. 더 강한 모델로 바꿀 수 있습니다.
- `ROUTER_MODEL` — 자동 배정 담당. 빠르고 저렴한 모델 권장(기본 `claude-haiku-4-5-20251001`).

---

## 7. 로드맵

- **1단계 (지금):** 문서 생성 비서 — 채팅 → 자동 배정 → 실행 문서 다운로드. ✅
- **2단계 (확장):** 운영 대시보드 — 수정란 수출 현황, 센서 농가, 피트모스 매출, 산자부
  과제 진도 등 실데이터 연동 화면. (DB·데이터 소스 연동 후 `/dashboard` 추가 예정)
- **3단계 (선택):** 카카오톡 채널 연동, 대화 기록 저장, 멀티 사용자(팀) 권한.

---

## 8. 주요 파일

| 파일 | 역할 |
|---|---|
| `app/page.tsx` | 채팅 화면(UI), 스트리밍 수신, 문서 다운로드, 비밀번호 게이트 |
| `app/api/chat/route.ts` | 라우팅 + 시스템 프롬프트 조립 + Claude 스트리밍 |
| `app/api/agents/route.ts` | 드롭다운용 에이전트 목록 |
| `lib/agents.ts` | 17개 에이전트 등록부 + 시스템 프롬프트 조립기 |
| `lib/router.ts` | 자동 배정(라우터) + 키워드 폴백 |
| `lib/anthropic.ts` | Anthropic 클라이언트 + 모델 설정 |
