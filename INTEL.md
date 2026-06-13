# Daily Top 3 Intelligence Report — 운영 가이드

> 하현제 회장님(D2O / Genetics / 고려동물병원)의 관심사·사업 방향에 맞춰
> **매일 한국시간 07:00**에 정책·국내·국외·전략기회를 자동 검색·분석하여
> **Top 3 인텔리전스 리포트(총 12항목 + Best 3 Actions)**를 생성합니다.

## ⚙️ 서버리스 적응 (중요)
원 스펙의 `node-cron` + 로컬 `/data` 폴더는 **상시 서버·디스크가 없는 Netlify 서버리스**에서
동작하지 않습니다. 동일 목적을 다음으로 구현했습니다(기능·형식·점수·URGENT·저장은 스펙대로):
- 스케줄: **Netlify Scheduled Function** (`netlify/functions/daily-intel.mjs`, cron `0 22 * * *` = 07:00 KST)
- 저장: **Netlify Blobs** (운영) / `.intel-data/` (로컬 개발 폴백)
- 검색: **Tavily API** (`TAVILY_API_KEY`), RSS/타사 검색은 확장 포인트
- 점수·선정·요약: **Claude API** — 후보를 6개 기준으로 평가, 카테고리별 Top 3 선정, 형식 리포트 생성

---

## 1. 파일 구조
```
lib/intel/
  keywords.ts     관심 키워드 · 카테고리별 검색 쿼리 · 우선 소스 도메인 · URGENT 조건
  search.ts       Tavily 검색(카테고리별, 최근 3일, 정규화: 제목/URL/날짜/요약/출처)
  store.ts        영구저장(Netlify Blobs + 로컬 폴백): reports/raw/seen/feedback
  report.ts       파이프라인: 검색→중복제거→Claude 점수·리포트→저장
app/api/intel/
  generate/route.ts   POST: 오늘 리포트 생성(수동 버튼 / 예약함수)
  reports/route.ts    GET: 리포트 목록 / ?date= 본문
  feedback/route.ts   POST: 중요/관심없음/추적계속 저장
app/intel/page.tsx     Daily Intelligence 대시보드 화면
netlify/functions/daily-intel.mjs   매일 07:00(KST) 예약 실행 → generate 호출
```

## 2. 설치
```bash
npm install
```

## 3. .env.example (필수 키)
```
ANTHROPIC_API_KEY=        # 분석·요약 (필수)
TAVILY_API_KEY=           # 웹 검색 (필수; 없으면 안내 리포트만 생성)
CRON_SECRET=              # 예약함수가 생성 API 호출 시 쓰는 임의 토큰
APP_PASSWORD=             # 접속/수동생성 보호
REPORT_TIMEZONE=Asia/Seoul
DAILY_REPORT_HOUR=7
```
> Netlify 배포 시 **Site configuration → Environment variables** 에 위 값을 넣고 재배포하세요.

## 4. 실행 명령어
```bash
npm run dev      # 로컬 개발 (http://localhost:3000/intel)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 실행
```

## 5. 수동 리포트 생성
- 화면: `/intel` 접속 → **「📊 오늘 리포트 생성」** 클릭.
- API: `POST /api/intel/generate` (헤더 `x-app-password: <APP_PASSWORD>`).

## 6. 자동 스케줄 실행
- `netlify/functions/daily-intel.mjs` 가 **매일 22:00 UTC(=07:00 KST)** 실행되어
  `/api/intel/generate` 를 `x-cron-secret`로 호출 → 리포트 생성·저장.
- Netlify가 `export const config = { schedule: "0 22 * * *" }` 를 자동 인식합니다.
- 시각 변경: 해당 파일의 cron 식을 수정(UTC 기준).

## 7. 샘플 리포트
`context/intel-sample-report.md` 참조 (형식 예시; 실제 데이터는 검색 결과로 채워집니다).

## 8. 향후 확장 포인트
- **검색 소스 확대**: RSS 직접 수집(축산신문·농민신문·FeedNavigator 등), Brave/SerpAPI/Google CSE 추가.
- **항목별 피드백 UI**: 리포트 항목마다 중요/관심없음/추적계속 버튼(현재는 토픽 단위 저장).
- **추적 항목 후속 보고 고도화**: 추적 키워드의 시계열 변화 추이.
- **이메일/카톡 발송**: 생성된 리포트를 매일 아침 회장님께 푸시.
- **점수 가중치 튜닝**: 카테고리·시기별 가중치 조정 UI.
- **다국어**: 영문 리포트 동시 생성(해외 파트너·투자자용).

## 9. 보안
- 리포트에 **Dr. Ha Liquid 지질학적 원천 / 내부 배합비 / 모넨신 기반 탄소감축 세부 /
  D2O 내부 특허전략 / 비공개 파트너 정보**는 절대 포함하지 않습니다(시스템 프롬프트로 강제).
- `CRON_SECRET`·`APP_PASSWORD`로 무단 트리거/접근을 차단합니다.
