const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "농업회사법인 ㈜D2O 하현제";
pres.title = "전남 한우 AX — 국가 실증 거점 제안";

/* ---------------- palette ---------------- */
const INK = "13301F";      // deep green-black (dark slides)
const INK2 = "1C4028";
const GREEN = "2C5F2D";
const GREEND = "1E4420";
const MOSS = "97BC62";
const MOSSL = "C8DDA9";
const FAWN = "B87333";     // Jersey coat accent
const FAWNL = "E9C79A";
const W = "FFFFFF";
const TINT = "EEF4E9";
const TINT2 = "F3F6F1";
const BODY = "1F2A20";
const MUTED = "5E6B5F";
const HEAD = "Malgun Gothic";
const FONT = "Malgun Gothic";

/* ---------------- helpers ---------------- */
function S(dark) {
  const s = pres.addSlide();
  s.background = { color: dark ? INK : W };
  return s;
}
function T(s, text, opt) {
  opt = opt || {};
  s.addText(text, {
    x: opt.x != null ? opt.x : 0.62, y: opt.y != null ? opt.y : 0.40,
    w: opt.w != null ? opt.w : 12.1, h: opt.h != null ? opt.h : 0.80,
    fontSize: opt.fontSize || 30, bold: true, color: opt.color || GREEND,
    fontFace: HEAD, margin: 0, valign: "middle", align: opt.align || "left"
  });
}
function kick(s, text, color) {
  s.addText(text, {
    x: 0.62, y: 0.12, w: 12.1, h: 0.30, fontSize: 12, bold: true,
    color: color || FAWN, fontFace: FONT, margin: 0, charSpacing: 1.5
  });
}
function card(s, o) {
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fill: { color: o.fill || TINT },
    line: o.line ? { color: o.line, width: 1 } : { type: "none" },
    rectRadius: o.r != null ? o.r : 0.10,
    shadow: o.shadow ? { type: "outer", color: "9AA79B", blur: 6, offset: 1, angle: 90, opacity: 0.25 } : undefined
  });
}
function badge(s, x, y, txt, o) {
  o = o || {};
  const d = o.d || 0.46;
  s.addShape(pres.ShapeType.ellipse, { x: x, y: y, w: d, h: d, fill: { color: o.fill || GREEN }, line: { type: "none" } });
  s.addText(txt, { x: x, y: y, w: d, h: d, align: "center", valign: "middle", fontSize: o.fs || 15, bold: true, color: o.color || W, fontFace: HEAD, margin: 0 });
}
function body(s, items, o) {
  o = o || {};
  const arr = items.map((t, i) => ({
    text: t, options: { bullet: { code: "2022" }, breakLine: i !== items.length - 1 }
  }));
  s.addText(arr, {
    x: o.x, y: o.y, w: o.w, h: o.h, fontSize: o.fontSize || 14.5,
    color: o.color || BODY, fontFace: FONT, paraSpaceAfter: o.gap != null ? o.gap : 8,
    lineSpacing: o.ls || 20, valign: "top", margin: 0
  });
}
function plain(s, text, o) {
  s.addText(text, {
    x: o.x, y: o.y, w: o.w, h: o.h, fontSize: o.fontSize || 14, bold: !!o.bold,
    color: o.color || BODY, fontFace: o.face || FONT, margin: 0,
    valign: o.valign || "top", align: o.align || "left", italic: !!o.italic,
    lineSpacing: o.ls || undefined
  });
}
function foot(s, text) {
  s.addText(text, { x: 0.62, y: 6.92, w: 12.1, h: 0.30, fontSize: 10, color: MUTED, fontFace: FONT, margin: 0 });
}
function sectionSlide(num, ko, en, notes) {
  const s = S(true);
  s.addShape(pres.ShapeType.ellipse, { x: 0.62, y: 2.20, w: 1.30, h: 1.30, fill: { color: FAWN }, line: { type: "none" } });
  s.addText(num, { x: 0.62, y: 2.20, w: 1.30, h: 1.30, align: "center", valign: "middle", fontSize: 44, bold: true, color: W, fontFace: HEAD, margin: 0 });
  s.addText(ko, { x: 2.30, y: 2.30, w: 10.3, h: 0.85, fontSize: 36, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addText(en, { x: 2.30, y: 3.20, w: 10.3, h: 0.45, fontSize: 14, color: MOSS, fontFace: FONT, margin: 0, charSpacing: 1.2 });
  s.addNotes(notes || "");
  return s;
}
function statCard(s, o) {
  card(s, { x: o.x, y: o.y, w: o.w, h: o.h, fill: o.fill || TINT });
  s.addText(o.num, { x: o.x, y: o.y + 0.18, w: o.w, h: 0.72, align: "center", valign: "middle", fontSize: o.numSize || 34, bold: true, color: o.numColor || GREEND, fontFace: HEAD, margin: 0 });
  s.addText(o.label, { x: o.x + 0.10, y: o.y + 0.92, w: o.w - 0.20, h: o.h - 1.02, align: "center", valign: "top", fontSize: 11.5, color: MUTED, fontFace: FONT, margin: 0 });
}
function arrow(s, x, y) {
  s.addShape(pres.ShapeType.rightArrow, { x: x, y: y, w: 0.34, h: 0.26, fill: { color: MOSS }, line: { type: "none" } });
}

/* ===== 1. 표지 ===== */
{
  const s = S(true);
  s.addShape(pres.ShapeType.ellipse, { x: 9.30, y: -1.60, w: 6.20, h: 6.20, fill: { color: INK2 }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: 11.05, y: 4.55, w: 3.20, h: 3.20, fill: { color: GREEND }, line: { type: "none" } });
  s.addText("전라남도 한우 AX 국가 실증 거점 제안", { x: 0.75, y: 1.30, w: 9.2, h: 0.35, fontSize: 13, bold: true, color: MOSS, fontFace: FONT, margin: 0, charSpacing: 1.2 });
  s.addText("3년 뒤, 전남 비육농가가\n입식할 송아지가 부족해집니다", { x: 0.75, y: 1.88, w: 9.5, h: 1.90, fontSize: 38, bold: true, color: W, fontFace: HEAD, margin: 0, lineSpacing: 50 });
  s.addText("사라지는 번식농가의 눈과 손을 대신하는 산업 기반 시설 — CowTalk AX", { x: 0.75, y: 4.02, w: 9.4, h: 0.42, fontSize: 15, color: FAWNL, fontFace: FONT, margin: 0 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.75, y: 4.95, w: 6.30, h: 1.25, fill: { color: INK2 }, line: { type: "none" }, rectRadius: 0.10 });
  s.addText([
    { text: "농업회사법인 ㈜D2O  대표 하현제", options: { bold: true, fontSize: 16, color: W, breakLine: true } },
    { text: "수의사 · 국내 최초 반추위 센서 도입(2013) · 산자부 축산로봇 과제 연구책임자", options: { fontSize: 11, color: MOSSL } }
  ], { x: 1.05, y: 5.10, w: 5.8, h: 0.95, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 20 });
  s.addText("2026. 8. 3.(월)  |  전라남도", { x: 7.35, y: 5.45, w: 3.4, h: 0.30, fontSize: 12, color: MUTED, fontFace: FONT, margin: 0 });
  s.addNotes("실무자 대상. 비전이 아니라 '무엇을 언제 얼마로 시작하는가'를 남긴다. 첫 문장은 위협이 아니라 시한 고지 — 3년이라는 숫자가 행동을 만든다.");
}

/* ===== 2. 한 장 요약 ===== */
{
  const s = S(true);
  kick(s, "ONE-PAGE SUMMARY", MOSS);
  T(s, "제안 요약", { color: W });
  const k = [
    { n: "문제", l: "전남 한우의 번식 기반이 무너지고 있습니다.\n원인은 가격이 아니라 24시간 관찰 노동입니다.", c: INK2 },
    { n: "해법", l: "관찰을 기계가 대신합니다.\n센서(DX)가 아니라 판단(AX) — AI가 조치를 정하고 수의사가 승인합니다.", c: GREEN },
    { n: "근거", l: "구상이 아닙니다. 199농가 · 10,886두 · 73만 건의 AI 판단이\n이미 24시간 가동 중입니다.", c: FAWN },
    { n: "요청", l: "전남을 한우 AX 국가 실증 거점으로.\n고흥 ICT 단지 위에 판단 계층을 얹는 것부터 시작합니다.", c: "8A5A22" }
  ];
  k.forEach((c, i) => {
    const y = 1.50 + i * 1.28;
    card(s, { x: 0.62, y: y, w: 12.10, h: 1.14, fill: c.c });
    s.addText(c.n, { x: 0.90, y: y, w: 1.35, h: 1.14, fontSize: 17, bold: true, color: i === 0 ? FAWNL : W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.l, { x: 2.40, y: y, w: 10.0, h: 1.14, fontSize: 13.5, color: W, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 21 });
  });
  card(s, { x: 0.62, y: 6.68, w: 12.10, h: 0.001, fill: INK });
  s.addNotes("이 장과 마지막 요청 슬라이드만 봐도 전체가 파악되게 설계. 시간이 부족하면 여기서 바로 Phase 로드맵으로 점프.");
}

/* ===== 3. 목차 ===== */
{
  const s = S();
  kick(s, "CONTENTS");
  T(s, "말씀드릴 순서");
  const items = [
    ["01", "축산업의 위치", "인류 식량체계에서 축산 — 필수 산업, 최대 환경 부담"],
    ["02", "글로벌 AX 현황", "정밀축산 시장·주요 기업·국가 단위 플랫폼 사례"],
    ["03", "대한민국 축산의 현실", "24조 산업, 그러나 두당 순손실 — 번식 기반 붕괴"],
    ["04", "한우는 데이터가 없다", "낙농과의 결정적 차이, DX가 실패한 이유"],
    ["05", "CowTalk의 위치", "구조 · 실적 · 글로벌 대비 강점과 한계"],
    ["06", "왜 전남인가", "출하 2위 산지 · 고흥 ICT 단지 · 정책 정합성"],
    ["07", "사업 타당성", "5축 검증 · 경제성 · 반대 논거 · 미시행 비용"],
    ["08", "어떻게 시작하나", "로드맵 · 시범사업 설계(안) · 예산 구조(안)"],
    ["09", "요청사항", "선결 과제와 실무자께서 하실 수 있는 일"]
  ];
  items.forEach((it, i) => {
    const y = 1.38 + i * 0.60;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.52, fill: i === 8 ? MOSSL : TINT2 });
    badge(s, 0.80, y + 0.05, it[0], { fill: i === 8 ? FAWN : GREEN, fs: 11, d: 0.42 });
    s.addText(it[1], { x: 1.40, y: y, w: 3.7, h: 0.52, fontSize: 13.5, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(it[2], { x: 5.15, y: y, w: 7.35, h: 0.52, fontSize: 11.5, color: MUTED, fontFace: FONT, margin: 0, valign: "middle" });
  });
  foot(s, "25분 발표 시 01·02는 요약, 07~09에 시간의 절반을 배분");
  s.addNotes("01·02는 배경이므로 빠르게. 03~05로 문제와 해법을 잇고, 07(타당성)과 08~09(실행·요청)에 시간을 쓴다.");
}

/* ===== SECTION 01 ===== */
/* ===== SECTION 01 [NEW] ===== */
sectionSlide("01", "축산업의 위치", "LIVESTOCK IN THE HUMAN FOOD SYSTEM", "3분. 배경. 25분 발표에서는 압축해 말한다.");

{
  const s = S();
  kick(s, "01 축산업의 위치");
  T(s, "축산은 농업의 절반이고, 인류 단백질의 중심입니다");
  const st = [
    { n: "40%", l: "세계 농업 GDP 중\n축산이 차지하는 비중" },
    { n: "+16.6%", l: "향후 10년 축산물 생산 증가 전망\n육류 · 유제품 · 계란" },
    { n: "+7%", l: "같은 기간 사육두수 증가 전망\n소 · 양 · 돼지 · 가금" }
  ];
  st.forEach((c, i) => {
    statCard(s, { x: 0.62 + i * 4.10, y: 1.45, w: 3.88, h: 1.95, num: c.n, label: c.l, numColor: GREEND, numSize: 32, fill: TINT });
  });
  card(s, { x: 0.62, y: 3.62, w: 12.10, h: 1.55, fill: INK });
  plain(s, "이 두 숫자의 간격이 오늘 제안의 출발점입니다", { x: 0.95, y: 3.80, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: FAWNL });
  plain(s, "두수는 7% 느는데 생산은 16.6% 늘어납니다. 차이 9.6%p는 '더 많이 기르는 것'이 아니라\n'같은 소에서 더 많이 얻는 것' — 즉 생산성 향상으로 채워야 하는 몫입니다.", { x: 0.95, y: 4.22, w: 11.4, h: 0.80, fontSize: 13.5, color: W, ls: 21 });
  card(s, { x: 0.62, y: 5.32, w: 12.10, h: 1.10, fill: MOSSL });
  s.addText("세계 축산의 성장분 대부분이 '생산성'에서 나옵니다 — 그 생산성을 만드는 도구가 데이터와 AI입니다", { x: 0.90, y: 5.32, w: 11.5, h: 1.10, fontSize: 14.5, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
  foot(s, "출처: FAO · OECD-FAO Agricultural Outlook 2025–2034 (2025. 7)");
  s.addNotes("배경 슬라이드. 길게 말하지 않는다. 핵심은 '세계도 두수가 아니라 생산성으로 간다'는 한 문장.");
}

{
  const s = S(true);
  kick(s, "01 축산업의 위치", MOSS);
  T(s, "그러나 축산은 동시에 최대 환경 부담원입니다", { color: W });
  const st = [
    { n: "14.5%", l: "세계 온실가스 배출 중\n축산 부문 비중" },
    { n: "32%", l: "인위적 메탄 배출 중\n축산 유래 비중" },
    { n: "62%", l: "축산 배출 중 소(육우·낙농)\n연 3.8 GtCO2e" },
    { n: "39%", l: "축산 배출 중\n장내발효(반추) 비중" }
  ];
  st.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 1.45, w: 2.88, h: 1.85, fill: INK2 });
    s.addText(c.n, { x: x, y: 1.68, w: 2.88, h: 0.75, align: "center", valign: "middle", fontSize: 30, bold: true, color: FAWNL, fontFace: HEAD, margin: 0 });
    s.addText(c.l, { x: x + 0.16, y: 2.48, w: 2.56, h: 0.75, align: "center", fontSize: 11.5, color: W, fontFace: FONT, margin: 0, lineSpacing: 16 });
  });
  card(s, { x: 0.62, y: 3.52, w: 5.95, h: 2.40, fill: INK2 });
  plain(s, "그래서 나오는 두 가지 주장", { x: 0.95, y: 3.70, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: MOSSL });
  body(s, [
    "① 축산을 줄여야 한다 — 네덜란드는 국가가 재정을 투입해 감축 중",
    "② 축산을 더 정밀하게 해야 한다 — 두당 배출을 낮추는 길",
    "①만으로는 늘어나는 세계 단백질 수요를 감당할 수 없습니다"
  ], { x: 0.95, y: 4.14, w: 5.35, h: 1.65, fontSize: 12, color: W });
  card(s, { x: 6.77, y: 3.52, w: 5.95, h: 2.40, fill: FAWN });
  plain(s, "두당 배출을 낮추는 실행 경로", { x: 7.10, y: 3.70, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: W });
  body(s, [
    "사육기간 단축 — 같은 고기를 더 짧게 길러 배출을 줄입니다",
    "번식 효율 개선 — 공태 단축이 곧 사육일수 단축입니다",
    "질병 손실 감소 — 폐사·도태는 배출만 남기고 생산은 없습니다",
    "이 셋은 모두 개체 단위 데이터 없이는 실행되지 않습니다"
  ], { x: 7.10, y: 4.14, w: 5.35, h: 1.65, fontSize: 12, color: W });
  card(s, { x: 0.62, y: 6.10, w: 12.10, h: 0.80, fill: INK2 });
  s.addText("축산을 없앨 수 없다면 남는 답은 '정밀하게 하는 것' 하나뿐입니다 — 이것이 AX의 명분입니다", { x: 0.90, y: 6.10, w: 11.5, h: 0.80, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  foot(s, "출처: FAO 축산 배출 통계 · FAO 장내메탄 저감 프로그램 자료");
  s.addNotes("환경 논리를 회피하지 않고 정면으로 다룬다. 정책결정권자에게 '왜 축산에 예산을 쓰는가'의 답을 준다 — 배출 감축의 실행 수단이라는 답.");
}

/* ===== SECTION 02 [NEW] ===== */
sectionSlide("02", "글로벌 AX 현황", "GLOBAL LANDSCAPE — PRECISION LIVESTOCK & NATIONAL PLATFORMS", "4분. 한국이 어디쯤 서 있는지 냉정하게 보여준다.");

{
  const s = S();
  kick(s, "02 글로벌 AX 현황");
  T(s, "정밀축산은 이미 산업이 되었습니다");
  const st = [
    { n: "79.4억$", l: "2025년 세계 정밀축산 시장 규모", sz: 27 },
    { n: "121.3억$", l: "2030년 전망", sz: 27 },
    { n: "8.8%", l: "연평균 성장률 (2025~2030)", sz: 30 },
    { n: "아시아·태평양", l: "가장 빠르게 성장하는 권역", sz: 17 }
  ];
  st.forEach((c, i) => {
    statCard(s, { x: 0.62 + i * 3.10, y: 1.45, w: 2.88, h: 1.75, num: c.n, label: c.l, numColor: FAWN, numSize: c.sz, fill: TINT });
  });
  card(s, { x: 0.62, y: 3.38, w: 5.95, h: 2.45, fill: TINT2, line: "E0E6DB" });
  plain(s, "주요 글로벌 사업자", { x: 0.95, y: 3.56, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: GREEND });
  plain(s, "· Allflex Livestock Intelligence (MSD Animal Health)\n· Nedap · DeLaval · GEA · Lely · CowManager\n· Afimilk (이스라엘) · Connecterra (네덜란드)\n· smaXtec (오스트리아) · Halter (뉴질랜드)", { x: 0.95, y: 3.98, w: 5.35, h: 1.65, fontSize: 11.5, color: BODY, ls: 19 });
  card(s, { x: 6.77, y: 3.38, w: 5.95, h: 2.45, fill: MOSSL });
  plain(s, "자본시장이 이미 검증했습니다", { x: 7.10, y: 3.56, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: GREEND });
  body(s, [
    "Halter(뉴질랜드) — 2025년 1억 달러 투자 유치, 기업가치 10억 달러 진입",
    "Nofence(노르웨이) — 3,500만 달러 유치, 미국·유럽 확장",
    "차세대 웨어러블 — 배터리 5년·다중지표 측정으로 세대 교체 진행 중"
  ], { x: 7.10, y: 3.98, w: 5.35, h: 1.70, fontSize: 11.5 });
  card(s, { x: 0.62, y: 5.98, w: 12.10, h: 0.85, fill: INK });
  s.addText("이 분야는 '될까 안 될까'를 논하는 단계를 지났습니다 — 누가 먼저 국가 단위로 묶느냐의 단계입니다", { x: 0.90, y: 5.98, w: 11.5, h: 0.85, fontSize: 14.5, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  foot(s, "출처: MarketsandMarkets, Precision Livestock Farming Market (2025) · 업계 투자 공시");
  s.addNotes("기술 위험이 낮다는 것을 자본시장 근거로 보여준다. '검증 안 된 기술에 예산을 쓰는가'라는 우려에 대한 답.");
}

{
  const s = S();
  kick(s, "02 글로벌 AX 현황");
  T(s, "앞선 나라들은 이미 '국가 단위 데이터'로 갔습니다");
  const c = [
    { t: "아일랜드 — ICBF", y: "1998 ~", d: "국가 단위 소 육종 데이터베이스(비영리).\n농가 10만 곳 이상, 약 700만 두 데이터.\n세계 최대 육우 유전체 DB, 낙농은 세계 2위.\n\n원칙: 한 번만 입력하고 모두가 쓴다\n(single point of entry, no duplication).", cc: GREEN },
    { t: "뉴질랜드 — NAIT", y: "2012 ~", d: "국가 가축 개체식별·추적을 법으로 의무화.\n전자 태그 부착과 국가 DB 등록이\n사육자의 법적 의무.\n\n방역과 이력 추적의 국가 기반이 되었고\n적색육 수출 신뢰도의 근거가 됩니다.", cc: FAWN },
    { t: "EU — 국가등록부 · IACS", y: "진행 중", d: "가축 개체식별을 규정으로 의무화하고\n국가 가축등록부를 통합관리체계(IACS)에\n연결.\n\nCAP 보조금 체계와 정밀축산 인센티브를\n연동하는 방향으로 진행 중입니다.", cc: MOSS }
  ];
  c.forEach((x0, i) => {
    const x = 0.62 + i * 4.10;
    card(s, { x: x, y: 1.45, w: 3.88, h: 3.75, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.45, w: 3.88, h: 0.86, fill: { color: x0.cc }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(x0.y, { x: x + 0.22, y: 1.53, w: 3.44, h: 0.26, fontSize: 10.5, color: i === 2 ? BODY : MOSSL, fontFace: FONT, margin: 0 });
    s.addText(x0.t, { x: x + 0.22, y: 1.80, w: 3.44, h: 0.42, fontSize: 14.5, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0 });
    s.addText(x0.d, { x: x + 0.24, y: 2.46, w: 3.40, h: 2.55, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 17 });
  });
  card(s, { x: 0.62, y: 5.38, w: 12.10, h: 1.45, fill: MOSSL });
  plain(s, "공통점 — 셋 다 '장비 보급'이 아니라 '국가 데이터 인프라'로 접근했습니다", { x: 0.95, y: 5.56, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: GREEND });
  plain(s, "장비는 농가가 쓰고, 데이터는 국가가 모읍니다. 그 데이터가 육종·방역·보조금·수출 증명의 공통 기반이 됩니다.\n한국은 장비 보급 예산은 있지만, 그 데이터를 행정이 모으는 구조가 아직 없습니다.", { x: 0.95, y: 5.96, w: 11.4, h: 0.72, fontSize: 12.5, color: BODY, ls: 19 });
  foot(s, "출처: ICBF 공개 자료 · 뉴질랜드 NAIT Act(2012) · EU 가축 식별 규정 및 IACS 관련 자료");
  s.addNotes("명분의 핵심 장. '우리만 하는 실험'이 아니라 '앞선 나라들이 이미 간 길'이라는 안전감을 준다.");
}

{
  const s = S(true);
  kick(s, "02 글로벌 AX 현황", MOSS);
  T(s, "냉정하게 — 한국은 지금 어디에 있습니까", { color: W });
  const rows = [
    ["단계", "내용", "한국의 현재"],
    ["1 개체식별", "이력제·전자태그로 개체를 특정", "완료 — 소 이력제 전국 시행"],
    ["2 장비 보급 (DX)", "센서·환경제어 장비를 농가에 지원", "진행 중 — 보급 속도가 느립니다"],
    ["3 데이터 통합", "장비·공공·행정 데이터를 한 곳으로", "미비 — 장비사별 사일로 상태"],
    ["4 판단 (AX)", "AI가 조치를 제시하고 전문가가 승인", "부재 — 광역·국가 단위 사례 없음"],
    ["5 정책 연동", "육종·방역·보조금·탄소 산정에 활용", "부재"]
  ];
  const tr = rows.map((r, ri) => r.map((cc, ci) => ({
    text: cc,
    options: {
      bold: ri === 0 || ci === 0,
      color: ri === 0 ? W : (ci === 2 ? (ri <= 2 ? MOSSL : FAWNL) : W),
      fill: { color: ri === 0 ? GREEND : INK2 },
      fontSize: 12, align: "left", valign: "middle", fontFace: FONT
    }
  })));
  s.addTable(tr, { x: 0.62, y: 1.50, w: 12.10, colW: [2.90, 4.90, 4.30], rowH: 0.56, border: { type: "solid", color: "2E4A38", pt: 1 } });
  card(s, { x: 0.62, y: 5.00, w: 12.10, h: 1.85, fill: INK2 });
  plain(s, "참고 — 2026년 축산 ICT 패키지 보급 규모", { x: 0.95, y: 5.18, w: 11.4, h: 0.34, fontSize: 14, bold: true, color: FAWNL });
  plain(s, "정부 주도형 21개 모델 + 지역 맞춤형 2개 모델, 총 81개 농가 보급(전년 대비 +5.2%).\n전국 한우 농가 규모를 생각하면 이 속도로는 산업 전체의 데이터가 모이기까지 수십 년이 걸립니다.\n장비 보급 속도를 올리는 것보다, 이미 보급된 장비의 데이터를 묶는 편이 훨씬 빠르고 저렴합니다.", { x: 0.95, y: 5.58, w: 11.4, h: 1.10, fontSize: 12.5, color: W, ls: 20 });
  foot(s, "출처: 축산신문(2026) 축산분야 ICT 융복합확산사업 보급 현황 · 농식품부 제1차 스마트농업 육성 기본계획(2025~2029)");
  s.addNotes("가장 냉정한 장. 뒤처졌다는 사실을 인정하되, 그래서 '보급'이 아니라 '통합'으로 가야 한다는 전략 전환으로 연결한다.");
}

sectionSlide("03", "대한민국 축산의 현실", "KOREA — SCALE WITHOUT MARGIN", "6분. 규모는 커졌으나 수익은 사라진 구조, 그리고 번식기반 붕괴.");

{
  const s = S();
  kick(s, "03 대한민국 축산");
  T(s, "한국 축산은 커졌습니다 — 농업의 40.9%입니다");
  const st = [
    { n: "24.2조원", l: "축산업 생산액 (2023)\n농업 생산액의 40.9%", sz: 27 },
    { n: "약 3배", l: "2000년 8.1조원 대비\n23년간 성장", sz: 30 },
    { n: "363만두", l: "한우 사육두수 (2026. 4)\n전년 대비 −3.2%", sz: 27 },
    { n: "약 50%", l: "전체 한우 농장 중\n번식농장 비중", sz: 27 }
  ];
  st.forEach((c, i) => {
    statCard(s, { x: 0.62 + i * 3.10, y: 1.45, w: 2.88, h: 1.85, num: c.n, label: c.l, numColor: GREEND, numSize: c.sz, fill: TINT });
  });
  card(s, { x: 0.62, y: 3.55, w: 12.10, h: 1.45, fill: MOSSL });
  plain(s, "숫자만 보면 성공한 산업입니다", { x: 0.95, y: 3.72, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: GREEND });
  plain(s, "23년 만에 생산액이 3배가 되었고, 이제 농업 생산액의 40%를 넘습니다.\n식량안보·지역경제·고용에서 축산이 차지하는 비중은 계속 커져 왔습니다.", { x: 0.95, y: 4.12, w: 11.4, h: 0.72, fontSize: 13, color: BODY, ls: 20 });
  card(s, { x: 0.62, y: 5.20, w: 12.10, h: 1.20, fill: INK });
  s.addText("그런데 다음 장의 숫자를 보시면, 이 성장이 무엇을 남겼는지 다시 생각하게 됩니다", { x: 0.90, y: 5.20, w: 11.5, h: 1.20, fontSize: 15, bold: true, color: FAWNL, fontFace: HEAD, margin: 0, valign: "middle" });
  foot(s, "출처: 통계청 농림어업조사 · 농식품부 · 축산물이력제 데이터(2026. 4) · 한국농촌경제연구원 관련 보도");
  s.addNotes("먼저 산업의 규모와 중요성을 인정한다. 그래야 다음 장의 반전이 작동한다.");
}

{
  const s = S(true);
  kick(s, "03 대한민국 축산", MOSS);
  T(s, "그런데 한우는 지금 기르면 기를수록 손해입니다", { color: W });
  const st = [
    { n: "−86.1만원", l: "한우 번식우\n마리당 순손실" },
    { n: "−99.9만원", l: "한우 비육우\n마리당 순손실" }
  ];
  st.forEach((c, i) => {
    const x = 0.62 + i * 6.28;
    card(s, { x: x, y: 1.50, w: 5.98, h: 1.95, fill: i === 0 ? FAWN : INK2 });
    s.addText(c.n, { x: x, y: 1.72, w: 5.98, h: 0.85, align: "center", valign: "middle", fontSize: 40, bold: true, color: i === 0 ? W : FAWNL, fontFace: HEAD, margin: 0 });
    s.addText(c.l, { x: x + 0.24, y: 2.62, w: 5.50, h: 0.70, align: "center", fontSize: 13, color: W, fontFace: FONT, margin: 0, lineSpacing: 19 });
  });
  card(s, { x: 0.62, y: 3.68, w: 12.10, h: 1.75, fill: INK2 });
  plain(s, "이 숫자가 뜻하는 것", { x: 0.95, y: 3.86, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: FAWNL });
  body(s, [
    "생산액이 늘어도 농가에 남는 돈은 없습니다 — 사료비·인건비·금융비용이 증가분을 흡수했습니다",
    "손실 구조에서는 재투자가 일어나지 않습니다. 시설도 후계도 멈춥니다",
    "번식우 손실이 더 오래 누적되면 가임암소가 먼저 사라집니다 — 지금 벌어지고 있는 일입니다"
  ], { x: 0.95, y: 4.28, w: 11.4, h: 1.05, fontSize: 12.5, color: W });
  card(s, { x: 0.62, y: 5.62, w: 12.10, h: 1.28, fill: FAWN });
  s.addText("보조금으로 손실을 메우는 방식은 지속되지 않습니다 — 두당 원가와 손실 요인을 줄이는 것 외에 길이 없습니다", { x: 0.90, y: 5.62, w: 11.5, h: 1.28, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  foot(s, "출처: 통계청 2025년 축산물생산비조사 (순손실 = 총수입 − 생산비, 자가노동비 등 포함 기준)");
  s.addNotes("정책결정권자에게 가장 강력한 숫자. '왜 예산을 쓰는가'가 아니라 '지금 쓰는 예산이 왜 효과가 없는가'의 답이 된다. 보조금 vs 원가절감의 프레임 전환.");
}

/* 5. 번식 기반 붕괴 */
{
  const s = S();
  kick(s, "03 대한민국 축산");
  T(s, "무너지는 것은 사육두수가 아니라 번식 기반입니다");
  const st = [
    { n: "−3,689", l: "한우 사육 농장\n1년 새 감소 (−4.8%)" },
    { n: "−10만", l: "가임암소\n2년 새 감소" },
    { n: "−6.7%", l: "1세 미만 한·육우\n전년 대비" },
    { n: "42.4두", l: "농장당 사육두수\n(2000년 5.5두)" }
  ];
  st.forEach((c, i) => {
    statCard(s, { x: 0.62 + i * 3.10, y: 1.45, w: 2.88, h: 1.85, num: c.n, label: c.l, numColor: i === 3 ? GREEND : FAWN, numSize: 30, fill: TINT });
  });
  card(s, { x: 0.62, y: 3.55, w: 12.10, h: 1.55, fill: INK });
  plain(s, "이 숫자들이 다른 이유", { x: 0.95, y: 3.72, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: FAWNL });
  plain(s, "사육두수 감소는 수급 조절로 회복됩니다. 그러나 가임암소와 번식농가의 소멸은 회복되지 않습니다.\n송아지 가격 강세는 호황 신호가 아니라 생산기반 붕괴의 경고입니다.", { x: 0.95, y: 4.12, w: 11.4, h: 0.80, fontSize: 14, bold: true, color: W, ls: 23 });
  card(s, { x: 0.62, y: 5.30, w: 12.10, h: 1.10, fill: MOSSL });
  s.addText("전남은 전국 한우 출하의 15.4%를 담당하는 2위 산지입니다 — 번식 기반이 무너지면 전남 비육농가가 먼저 타격을 받습니다", { x: 0.90, y: 5.30, w: 11.5, h: 1.10, fontSize: 14.5, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
  foot(s, "출처: 국가데이터처 가축동향(2026. 6. 1 기준) · 축산신문(2026. 5) 번식기반 약화 분석");
  s.addNotes("'가격이 좋은데 왜 위기냐'는 반문이 반드시 나온다. 송아지 가격 강세 = 공급 부족 = 붕괴 신호라는 논리를 먼저 못 박는다.");
}

/* 6. 왜 그만두는가 */
{
  const s = S();
  kick(s, "03 대한민국 축산");
  T(s, "번식농가가 그만두는 이유는 돈이 아니라 노동입니다");
  card(s, { x: 0.62, y: 1.45, w: 5.95, h: 3.55, fill: TINT2, line: "E0E6DB" });
  plain(s, "고령 번식농가가 감당하지 못하는 것", { x: 0.95, y: 1.64, w: 5.3, h: 0.36, fontSize: 15, bold: true, color: MUTED });
  body(s, [
    "발정 관찰 — 한우는 발현이 미약하고 야간 발정이 다수입니다",
    "분만 감시 — 밤샘 대기, 난산 대응 시점 판단",
    "질병 조기 발견 — 증상이 보이는 시점엔 이미 늦습니다",
    "수익 변동성까지 겹치면 폐업으로 직결됩니다"
  ], { x: 0.95, y: 2.10, w: 5.35, h: 2.70, fontSize: 13 });
  card(s, { x: 6.77, y: 1.45, w: 5.95, h: 3.55, fill: FAWN });
  plain(s, "그 결과 발생하는 손실", { x: 7.10, y: 1.64, w: 5.3, h: 0.36, fontSize: 15, bold: true, color: W });
  body(s, [
    "발정 1회 미발견 = 공태 21일 연장",
    "분만간격 지연 → 평생 산차 감소",
    "수정 횟수 증가 → 정액·수정료 누적",
    "번식장애 조기 발견 실패 → 도태 지연"
  ], { x: 7.10, y: 2.10, w: 5.35, h: 2.70, fontSize: 13, color: W });
  card(s, { x: 0.62, y: 5.25, w: 12.10, h: 1.55, fill: INK });
  plain(s, "네 가지 모두 '24시간 관찰'의 문제입니다", { x: 0.95, y: 5.42, w: 11.4, h: 0.36, fontSize: 15, bold: true, color: FAWNL });
  plain(s, "사람이 더 노력해서 풀 수 없고, 보조금으로도 풀리지 않습니다.\n관찰 자체를 기계가 대신해야 풀립니다.", { x: 0.95, y: 5.84, w: 11.4, h: 0.75, fontSize: 14.5, bold: true, color: W, ls: 24 });
  s.addNotes("이 장이 정책 설계의 방향을 바꾼다 — 소득 보전이 아니라 노동 대체가 답이라는 논리. 실무자에게 '왜 기존 지원이 효과가 없었는가'의 답이 된다.");
}

/* ===== SECTION 02 ===== */
sectionSlide("04", "한우는 데이터가 없다", "HANWOO IS DATA-BLIND — AND WHY DX UNDERDELIVERED", "4분. 왜 지금까지 안 됐는지. 실무자의 '스마트축산 해봤는데'라는 회의를 정면으로 다룬다.");

/* 8. 데이터 부재 */
{
  const s = S();
  kick(s, "04 한우는 데이터가 없다");
  T(s, "한우는 낙농과 달리 매일의 데이터가 없습니다");
  const rows = [
    ["구분", "낙농 (젖소)", "한우"],
    ["일일 접점", "착유 2회 — 유량·유성분·체세포 자동 기록", "없음. 사료 급이 외 접점 부재"],
    ["이상 감지", "유량 저하로 즉시 포착", "외관 증상 발현까지 미포착"],
    ["성과 확인", "매일", "도체 성적 — 30개월 뒤 단 1회"],
    ["의사결정 주기", "일 단위 교정 가능", "교정 기회 없이 결과만 확인"]
  ];
  const tr = rows.map((r, ri) => r.map((c, ci) => ({
    text: c,
    options: {
      bold: ri === 0 || ci === 0,
      color: ri === 0 ? W : (ci === 2 ? FAWN : BODY),
      fill: { color: ri === 0 ? GREEN : (ri % 2 === 0 ? TINT2 : W) },
      fontSize: 12.5, align: "left", valign: "middle", fontFace: FONT
    }
  })));
  s.addTable(tr, { x: 0.62, y: 1.50, w: 12.10, colW: [2.40, 4.85, 4.85], rowH: 0.62, border: { type: "solid", color: "DDE4D8", pt: 1 } });
  card(s, { x: 0.62, y: 4.90, w: 12.10, h: 1.60, fill: INK });
  plain(s, "한우 농가는 30개월을 계기판 없이 운행합니다", { x: 0.95, y: 5.10, w: 11.4, h: 0.40, fontSize: 17, bold: true, color: FAWNL });
  plain(s, "그래서 한우야말로 센서와 AI의 한계효용이 가장 큰 축종입니다.\n낙농에서 10을 얻는 기술이 한우에서는 30을 얻습니다 — 비교 대상이 '아무것도 없음'이기 때문입니다.", { x: 0.95, y: 5.56, w: 11.4, h: 0.78, fontSize: 13, color: W, ls: 20 });
  s.addNotes("낙농 중심으로 설계된 기존 스마트축산 정책이 한우에 잘 안 맞았던 이유이기도 하다. 한우가 더 뒤처진 것이 아니라 더 큰 기회라는 프레임.");
}

/* 9. DX vs AX */
{
  const s = S(true);
  kick(s, "04 한우는 데이터가 없다", MOSS);
  T(s, "센서는 이상을 알려줄 뿐, 조치를 정해주지 않습니다", { color: W });
  plain(s, "스마트축산이 기대만큼 성과를 내지 못한 이유입니다. 문제는 장비가 아니라 그 다음 단계가 비어 있었다는 것입니다.", { x: 0.62, y: 1.26, w: 12.1, h: 0.36, fontSize: 13, color: MOSSL });
  const rows = [
    ["", "DX — 지금까지의 스마트축산", "AX — 판단하는 AI"],
    ["결과물", "데이터와 알람", "의사결정과 실행 지시"],
    ["해석 책임", "고령 농가에게 남습니다", "시스템이 수행, 수의사가 승인"],
    ["데이터 범위", "장비별 사일로", "이력제·KPN·도체성적·방역 융합"],
    ["가치 발생", "설치 시점 1회", "축적에 따라 체증"],
    ["행정 활용", "보급률 통계", "실시간 산지 계기판"]
  ];
  const tr = rows.map((r, ri) => r.map((c, ci) => ({
    text: c,
    options: {
      bold: ri === 0 || ci === 0,
      color: ri === 0 ? W : (ci === 2 ? W : MOSSL),
      fill: { color: ri === 0 ? GREEND : (ci === 2 ? "2A4A33" : INK2) },
      fontSize: 12.5, align: "left", valign: "middle", fontFace: FONT
    }
  })));
  s.addTable(tr, { x: 0.62, y: 1.80, w: 12.10, colW: [2.20, 4.95, 4.95], rowH: 0.60, border: { type: "solid", color: "2E4A38", pt: 1 } });
  card(s, { x: 0.62, y: 5.55, w: 12.10, h: 1.30, fill: FAWN });
  plain(s, "전남은 이미 하드웨어에 투자했습니다", { x: 0.95, y: 5.72, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: W });
  plain(s, "고흥 스마트축산 ICT 시범단지(2023~2027)가 조성 중입니다. 새로 짓자는 제안이 아닙니다.\n이미 깔린 하드웨어 위에 '판단 계층(AX)'을 얹는 것 — 그것이 다음 단계입니다.", { x: 0.95, y: 6.10, w: 11.4, h: 0.68, fontSize: 12.5, color: W, ls: 19 });
  s.addNotes("실무자가 '또 장비 사달라는 얘기냐'고 생각하는 순간 끝난다. 신규 투자 최소화·기존 인프라 활용을 여기서 못 박는다.");
}

/* ===== SECTION 03 ===== */
sectionSlide("05", "CowTalk의 위치", "COWTALK — ARCHITECTURE, TRACTION, LIMITS", "5분. 기술 설명은 짧게. 강점과 한계를 함께 제시한다.");

/* 11. 6 엔진 */
{
  const s = S();
  kick(s, "05 CowTalk AX");
  T(s, "번식과 비육, 두 개의 엔진");
  const inp = [
    { t: "개체 데이터", d: "반추위 센서 · 활동량\n체온 · 사료 급이" },
    { t: "환경 데이터", d: "축사 환경 · 분뇨 · 기상" },
    { t: "공공 데이터", d: "소 이력제 · 혈통 · KPN\n도체성적 · 방역" }
  ];
  inp.forEach((c, i) => {
    const y = 1.50 + i * 1.20;
    card(s, { x: 0.62, y: y, w: 3.70, h: 1.05, fill: TINT });
    s.addText(c.t, { x: 0.86, y: y + 0.08, w: 3.25, h: 0.34, fontSize: 13.5, bold: true, color: GREEND, fontFace: HEAD, margin: 0 });
    s.addText(c.d, { x: 0.86, y: y + 0.44, w: 3.25, h: 0.54, fontSize: 11, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 15 });
  });
  card(s, { x: 4.68, y: 1.50, w: 3.30, h: 3.45, fill: INK });
  s.addText("CowTalk\nAI HUB", { x: 4.68, y: 2.20, w: 3.30, h: 1.10, align: "center", valign: "middle", fontSize: 24, bold: true, color: W, fontFace: HEAD, margin: 0, lineSpacing: 32 });
  s.addText("6 ENGINES", { x: 4.68, y: 3.30, w: 3.30, h: 0.36, align: "center", fontSize: 12, color: FAWNL, fontFace: FONT, margin: 0, charSpacing: 2 });
  s.addText("24 / 7 실시간 가동", { x: 4.68, y: 3.72, w: 3.30, h: 0.30, align: "center", fontSize: 11, color: MOSSL, fontFace: FONT, margin: 0 });
  arrow(s, 4.36, 2.95);
  arrow(s, 8.04, 2.95);
  const out = [
    { t: "번식 엔진", d: "발정 탐지 · 분만 예측 · 공태 단축", c: FAWN },
    { t: "비육 엔진", d: "증체 예측 · 출하 시점 · 도체 등급 예측", c: GREEN },
    { t: "방역 · 행정", d: "이상징후 조기경보 · 지역 모니터링", c: MOSS }
  ];
  out.forEach((c, i) => {
    const y = 1.50 + i * 1.20;
    card(s, { x: 8.42, y: y, w: 4.30, h: 1.05, fill: c.c });
    s.addText(c.t, { x: 8.66, y: y + 0.08, w: 3.85, h: 0.34, fontSize: 13.5, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0 });
    s.addText(c.d, { x: 8.66, y: y + 0.44, w: 3.85, h: 0.54, fontSize: 11, color: i === 2 ? BODY : W, fontFace: FONT, margin: 0, lineSpacing: 15 });
  });
  card(s, { x: 0.62, y: 5.20, w: 5.95, h: 1.55, fill: TINT2, line: "D8E0D2" });
  plain(s, "개방형 플랫폼 원칙", { x: 0.95, y: 5.38, w: 5.3, h: 0.34, fontSize: 14, bold: true, color: GREEND });
  plain(s, "특정 장비·사업자 종속을 배제하고\n표준 API로 연동합니다.\n기존에 설치된 장비도 그대로 붙습니다.", { x: 0.95, y: 5.76, w: 5.35, h: 0.85, fontSize: 12, color: BODY, ls: 18 });
  card(s, { x: 6.77, y: 5.20, w: 5.95, h: 1.55, fill: MOSSL });
  plain(s, "수의사 승인 게이트 (HITL)", { x: 7.10, y: 5.38, w: 5.3, h: 0.34, fontSize: 14, bold: true, color: GREEND });
  plain(s, "모든 AI 판단에 수의사 승인이 의무 적용됩니다.\nAI가 진단하지 않습니다 — AI는 볼 것을 골라주고,\n판단과 책임은 수의사에게 있습니다.", { x: 7.10, y: 5.76, w: 5.35, h: 0.85, fontSize: 12, color: BODY, ls: 18 });
  s.addNotes("실무자가 가장 걱정하는 두 가지 — 특정 업체 종속과 AI 오진 책임. 두 카드로 미리 답한다. 기술 설명은 여기서 끝내고 넘어간다.");
}

/* ===== SECTION 04 ===== */


/* 13. 실적 */
{
  const s = S(true);
  kick(s, "05 CowTalk AX", MOSS);
  T(s, "구상이 아닙니다. 이미 작동하고 있습니다.", { color: W });
  const st = [
    { n: "199", l: "연동 농가" },
    { n: "10,886", l: "관리 두수" },
    { n: "10,843", l: "가동 센서" },
    { n: "730,907", l: "누적 AI 판단 이벤트" }
  ];
  st.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 1.55, w: 2.88, h: 1.85, fill: i === 3 ? FAWN : INK2 });
    s.addText(c.n, { x: x, y: 1.80, w: 2.88, h: 0.82, align: "center", valign: "middle", fontSize: 32, bold: true, color: i === 3 ? W : FAWNL, fontFace: HEAD, margin: 0 });
    s.addText(c.l, { x: x + 0.16, y: 2.70, w: 2.56, h: 0.50, align: "center", fontSize: 12, color: W, fontFace: FONT, margin: 0 });
  });
  const h = [
    { y: "2013", t: "국내 최초 반추위 센서 도입", d: "13년간의 현장 데이터 축적" },
    { y: "2026. 05", t: "한–우즈베키스탄 양자 합의 · 정부 실증 시연", d: "해외 현장 작동 검증" },
    { y: "2026. 06", t: "한국소임상수의사회(KABP) 학술 발표", d: "국내 임상 학술 검증" }
  ];
  h.forEach((c, i) => {
    const y = 3.70 + i * 0.98;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.86, fill: INK2 });
    s.addText(c.y, { x: 0.90, y: y, w: 1.70, h: 0.86, fontSize: 14, bold: true, color: FAWNL, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.t, { x: 2.75, y: y, w: 6.10, h: 0.86, fontSize: 13.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: 9.05, y: y, w: 3.45, h: 0.86, fontSize: 12, color: MOSSL, fontFace: FONT, margin: 0, valign: "middle" });
  });
  foot(s, "2026년 6월 기준 운영 대시보드 실측치. 6개 AI 엔진 24/7 실시간 가동.");
  s.addNotes("73만 건이라는 숫자를 천천히 말한다. 파일럿이 아니라 운영 중인 시스템이라는 것이 이 제안의 가장 큰 차별점.");
}

/* ===== CowTalk 위치 · 과제 · 미래 [NEW] ===== */
{
  const s = S();
  kick(s, "05 CowTalk AX");
  T(s, "냉정하게 — 글로벌 경쟁자 대비 CowTalk의 위치");
  card(s, { x: 0.62, y: 1.45, w: 5.95, h: 3.05, fill: MOSSL });
  plain(s, "우리가 앞선 것", { x: 0.95, y: 1.62, w: 5.3, h: 0.34, fontSize: 15, bold: true, color: GREEND });
  body(s, [
    "한우 특화 — 글로벌 사업자는 대부분 낙농 중심입니다. 한우 번식·비육 데이터는 국내에서만 쌓입니다",
    "반추위(체내) 센서 — 목걸이·발목형과 달리 체내 지표를 직접 측정합니다",
    "13년 현장 데이터 — 국내 사양·기후·품종 조건에서 축적된 데이터",
    "수의 임상 결합 — 센서 회사가 아니라 수의사가 운영하는 구조"
  ], { x: 0.95, y: 2.06, w: 5.35, h: 2.30, fontSize: 11.5 });
  card(s, { x: 6.77, y: 1.45, w: 5.95, h: 3.05, fill: TINT2, line: "E0E6DB" });
  plain(s, "우리가 뒤진 것 — 인정해야 할 부분", { x: 7.10, y: 1.62, w: 5.3, h: 0.34, fontSize: 15, bold: true, color: FAWN });
  body(s, [
    "자본 규모 — Halter는 단일 라운드로 1억 달러를 조달했습니다. 우리는 그 규모가 아닙니다",
    "데이터 양 — ICBF는 700만 두, 우리는 1만 두 수준입니다",
    "글로벌 유통망 — Allflex·Nedap은 수십 개국 판매망을 가집니다",
    "표준·인증 — 국제 상호운용 표준 참여 실적이 아직 없습니다"
  ], { x: 7.10, y: 2.06, w: 5.35, h: 2.30, fontSize: 11.5 });
  card(s, { x: 0.62, y: 4.72, w: 12.10, h: 1.45, fill: INK });
  plain(s, "그래서 우리가 이길 수 있는 자리는 좁고 분명합니다", { x: 0.95, y: 4.90, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: FAWNL });
  plain(s, "글로벌 낙농 시장에서 Allflex와 정면으로 싸우는 것이 아닙니다.\n'한우'라는, 글로벌 사업자가 데이터를 가질 수 없는 영역에서 국가 단위 표준을 먼저 만드는 것입니다.", { x: 0.95, y: 5.30, w: 11.4, h: 0.72, fontSize: 13, color: W, ls: 20 });
  card(s, { x: 0.62, y: 6.32, w: 12.10, h: 0.58, fill: FAWN });
  s.addText("한우 데이터는 한국에서만 만들어집니다 — 이것이 우리에게 남은 유일하고 확실한 해자입니다", { x: 0.90, y: 6.32, w: 11.5, h: 0.58, fontSize: 14, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("자화자찬을 피한다. 약점을 먼저 말하는 것이 정책결정권자에게는 오히려 신뢰의 근거가 된다. 그리고 '좁고 확실한 승부처'를 제시한다.");
}

{
  const s = S();
  kick(s, "05 CowTalk AX");
  T(s, "CowTalk이 안고 있는 과제 — 숨기지 않겠습니다");
  const p = [
    { t: "데이터 규모의 한계", d: "1만 두 수준의 데이터로는 예측 정확도에 한계가 있습니다.\n특히 비육·도체 예측은 라벨 데이터가 절대적으로 부족합니다.", a: "국가 단위 실증으로 데이터 규모를 늘리는 것 외에 방법이 없습니다. 이것이 이 제안의 실질적 이유이기도 합니다." },
    { t: "수익 모델의 취약성", d: "구독 매출은 농가 부담에 의존합니다.\n손실 구조의 농가가 월 구독료를 계속 낼 수 있는가는 검증되지 않았습니다.", a: "지자체 사업으로 초기 도입 부담을 낮추고, 효과가 소득으로 확인된 뒤 농가 부담으로 전환하는 단계 설계가 필요합니다." },
    { t: "인력과 조직 규모", d: "글로벌 경쟁사 대비 개발·운영 인력이 적습니다.\n전남 전역 확산 시 현장 대응 인력 확보가 병목입니다.", a: "시군 단위 설치·AS 인력을 지역에서 육성하는 구조로 설계합니다. 지역 일자리 효과와도 연결됩니다." },
    { t: "국제 표준 대응", d: "해외 확장 시 데이터 상호운용·인증 요구를 충족해야 합니다.\n현재는 준비 단계입니다.", a: "국가 실증 레퍼런스가 있으면 표준 논의 참여 자격이 생깁니다. 수출은 그 다음 단계입니다." }
  ];
  p.forEach((c, i) => {
    const y = 1.42 + i * 1.32;
    card(s, { x: 0.62, y: y, w: 12.10, h: 1.18, fill: i % 2 === 0 ? TINT : TINT2 });
    badge(s, 0.90, y + 0.35, String(i + 1), { fill: i % 2 === 0 ? GREEN : FAWN, d: 0.48, fs: 14 });
    s.addText(c.t, { x: 1.56, y: y + 0.06, w: 4.20, h: 0.40, fontSize: 13.5, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: 1.56, y: y + 0.46, w: 4.35, h: 0.66, fontSize: 11, color: MUTED, fontFace: FONT, margin: 0, lineSpacing: 16 });
    s.addText(c.a, { x: 6.15, y: y, w: 6.30, h: 1.18, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 17 });
  });
  card(s, { x: 0.62, y: 6.80, w: 12.10, h: 0.001, fill: W });
  s.addNotes("과제를 먼저 드러내되 각각에 대응책을 붙인다. 특히 1번은 '그래서 이 사업이 필요하다'는 논리로 되돌아온다.");
}

{
  const s = S(true);
  kick(s, "05 CowTalk AX", MOSS);
  T(s, "CowTalk의 경로 — 지역에서 국가로, 국가에서 수출로", { color: W });
  const st = [
    { t: "지금", y: "2026", d: "199농가 · 1만 두\n민간 구독 서비스", c: INK2 },
    { t: "광역 실증", y: "2026~2028", d: "전남 한우 AX 실증\n한우 데이터 표준 확보", c: GREEN },
    { t: "국가 표준", y: "2029~", d: "한우 AX 국가 표준 모델\n타 시도 확산 · 정책 연동", c: FAWN },
    { t: "수출", y: "2030~", d: "중앙아·동남아 축산 디지털 전환\n국가 레퍼런스 기반 수출", c: "8A5A22" }
  ];
  st.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 1.60, w: 2.88, h: 2.35, fill: c.c });
    s.addText(c.y, { x: x + 0.18, y: 1.74, w: 2.52, h: 0.28, fontSize: 10.5, color: i === 0 ? MOSSL : W, fontFace: FONT, margin: 0 });
    s.addText(c.t, { x: x + 0.18, y: 2.04, w: 2.52, h: 0.42, fontSize: 16, bold: true, color: W, fontFace: HEAD, margin: 0 });
    s.addText(c.d, { x: x + 0.18, y: 2.62, w: 2.52, h: 1.15, fontSize: 11.5, color: W, fontFace: FONT, margin: 0, lineSpacing: 17 });
    if (i < 3) arrow(s, x + 2.94, 2.68);
  });
  card(s, { x: 0.62, y: 4.25, w: 12.10, h: 1.85, fill: INK2 });
  plain(s, "이 경로에서 전남의 위치", { x: 0.95, y: 4.43, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: FAWNL });
  body(s, [
    "2단계(광역 실증)가 없으면 3·4단계는 열리지 않습니다 — 국가 표준도 수출도 레퍼런스에서 시작합니다",
    "전남이 이 단계를 맡으면, 이후 만들어지는 한우 AX 표준의 원본 데이터가 전남에서 나옵니다",
    "수출 단계에서도 '전남 모델'이라는 이름이 남습니다 — 이미 우즈베키스탄 정부 시연 경험이 있습니다"
  ], { x: 0.95, y: 4.85, w: 11.4, h: 1.10, fontSize: 12.5, color: W });
  card(s, { x: 0.62, y: 6.28, w: 12.10, h: 0.62, fill: FAWN });
  s.addText("한 기업의 성장 계획이 아니라, 한우 산업이 데이터를 갖게 되는 경로입니다", { x: 0.90, y: 6.28, w: 11.5, h: 0.62, fontSize: 14, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("우리 회사 성장 이야기로 들리지 않게 주의. '전남이 얻는 것'을 중심에 두고 말한다.");
}

/* ===== SECTION 05 ===== */
sectionSlide("06", "왜 전남인가", "WHY JEONNAM FIRST", "4분. 전남이 선택되어야 하는 이유와 국가 정책 정합성.");

/* 15. 왜 전남 */
{
  const s = S();
  kick(s, "06 왜 전남인가");
  T(s, "전남은 실증에 가장 적합한 산지입니다");
  const st = [
    { n: "15.4%", l: "전국 한우 출하 비중\n경북 다음 2위" },
    { n: "16.1두", l: "농장당 평균 출하 두수\n(전국)" },
    { n: "2023–27", l: "고흥 스마트축산\nICT 시범단지 조성 중" }
  ];
  st.forEach((c, i) => {
    statCard(s, { x: 0.62 + i * 4.10, y: 1.45, w: 3.88, h: 1.80, num: c.n, label: c.l, numColor: FAWN, numSize: 30, fill: TINT });
  });
  card(s, { x: 0.62, y: 3.48, w: 5.95, h: 2.50, fill: MOSSL });
  plain(s, "전남의 강점", { x: 0.95, y: 3.64, w: 5.3, h: 0.34, fontSize: 15, bold: true, color: GREEND });
  body(s, [
    "출하 규모 2위 — 실증 표본의 통계적 대표성 확보",
    "조사료 생산 기반(간척지·논) — 사육기간 단축 실행 여건",
    "청정 이미지 — 저탄소 인증 브랜드화에 유리",
    "고흥 ICT 단지 — 하드웨어 인프라 선투자 완료"
  ], { x: 0.95, y: 4.06, w: 5.35, h: 1.80, fontSize: 12 });
  card(s, { x: 6.77, y: 3.48, w: 5.95, h: 2.50, fill: TINT2, line: "E0E6DB" });
  plain(s, "전남이 안고 있는 과제", { x: 7.10, y: 3.64, w: 5.3, h: 0.34, fontSize: 15, bold: true, color: FAWN });
  body(s, [
    "소규모·고령 번식농가 비중이 높아 이탈에 취약",
    "시군 단위 한우 브랜드 파편화 — 통합 품질 관리 부재",
    "브랜드 프리미엄이 데이터로 증명되지 않음"
  ], { x: 7.10, y: 4.06, w: 5.35, h: 1.80, fontSize: 12 });
  card(s, { x: 0.62, y: 6.15, w: 12.10, h: 0.78, fill: INK });
  s.addText("과제가 곧 실증 가치입니다 — 가장 취약한 지역에서 작동하면, 어디서든 작동합니다", { x: 0.90, y: 6.15, w: 11.5, h: 0.78, fontSize: 15, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("약점을 먼저 인정하고 그것을 선정 이유로 뒤집는 구조. 실무자는 '우리 지역이 여건이 나쁜데'라는 생각을 늘 하므로 이 반전이 잘 먹힌다.");
}

/* 16. 정책 정합성 */
{
  const s = S();
  kick(s, "06 왜 전남인가");
  T(s, "사육기간 단축은 국가 정책입니다 — 실행 수단이 없을 뿐입니다");
  const rows = [
    ["사육기간", "두당 온실가스 배출", "두당 사육비", "비고"],
    ["30개월 (현행)", "기준", "기준", "국내 관행"],
    ["26개월", "약 −10%", "약 −8.9%", "2030 로드맵 목표선"],
    ["24개월", "약 −32%", "약 −25%", "강원대 연구팀 분석"],
    ["18개월", "—", "—", "미국 · 호주 관행"]
  ];
  const tr = rows.map((r, ri) => r.map((c, ci) => ({
    text: c,
    options: {
      bold: ri === 0 || ci === 0,
      color: ri === 0 ? W : (ri === 3 && ci > 0 && ci < 3 ? FAWN : BODY),
      fill: { color: ri === 0 ? GREEN : (ri % 2 === 0 ? TINT2 : W) },
      fontSize: 12.5, align: ci === 0 || ci === 3 ? "left" : "center", valign: "middle", fontFace: FONT
    }
  })));
  s.addTable(tr, { x: 0.62, y: 1.50, w: 12.10, colW: [2.80, 3.10, 3.10, 3.10], rowH: 0.54, border: { type: "solid", color: "DDE4D8", pt: 1 } });
  card(s, { x: 0.62, y: 4.60, w: 12.10, h: 1.55, fill: INK });
  plain(s, "그런데 왜 현장은 30개월을 고수합니까", { x: 0.95, y: 4.78, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: FAWNL });
  plain(s, "감(感)으로는 사육기간을 줄일 수 없기 때문입니다. 조기 출하는 등급 하락 위험을 동반하고, 농가는 그 위험을 감당할 수 없습니다.\n개체별 증체·근내지방 예측 없이는 이 정책이 현장에서 실행되지 않습니다 — 정책은 있는데 도구가 없는 상태입니다.", { x: 0.95, y: 5.18, w: 11.4, h: 0.80, fontSize: 13, color: W, ls: 20 });
  card(s, { x: 0.62, y: 6.28, w: 12.10, h: 0.62, fill: FAWN });
  s.addText("저탄소 축산물 인증(축평원, 유효기간 3년) 확산도 개체 단위 사육 이력 데이터를 전제로 합니다", { x: 0.90, y: 6.28, w: 11.5, h: 0.62, fontSize: 13.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  foot(s, "※ 출처: 농림축산식품부 보도자료 · 축산부문 2030 온실가스 감축 로드맵. 지표 정의는 원자료 기준 — 발표 전 확인 권장.");
  s.addNotes("실무자에게 가장 실용적인 장. 상급기관 정책과 우리 제안이 일치한다는 것 = 기안 명분. '정책은 있는데 도구가 없다'가 핵심 문장.");
}

/* ===== SECTION 07 사업 타당성 [NEW] ===== */
sectionSlide("07", "사업 타당성", "FEASIBILITY — POLICY · TECHNOLOGY · ECONOMICS · RISK", "6분. 정책결정권자 관점의 검증. 반대 논거까지 정면으로 다룬다.");

{
  const s = S();
  kick(s, "07 사업 타당성");
  T(s, "다섯 축으로 검증했습니다");
  const ax = [
    { t: "정책 타당성", v: "높음", d: "축산 온실가스 감축 로드맵, 저탄소 축산물 인증, 데이터기반행정법,\n스마트농업 육성 기본계획과 모두 정합합니다. 새 명분을 만들 필요가 없습니다.", c: GREEN },
    { t: "기술 타당성", v: "높음", d: "세계 시장 121억 달러(2030) 규모로 성숙한 기술군이며,\n국내에서도 199농가·73만 건 판단으로 이미 가동 중입니다. 기술 위험은 낮습니다.", c: GREEN },
    { t: "경제 타당성", v: "조건부", d: "번식 손실 회피액이 투입을 상회할 것으로 추정되나\n한우 데이터로 검증된 바 없습니다. 그 검증이 이 사업의 목적입니다.", c: FAWN },
    { t: "사회 타당성", v: "높음", d: "고령 번식농가의 노동 부담 경감, 지역 설치·AS 일자리,\n방역 공공가치. 수혜자가 가장 취약한 계층입니다.", c: GREEN },
    { t: "시급성", v: "매우 높음", d: "가임암소는 한 번 사라지면 회복에 최소 3~4년이 걸립니다.\n기초선 데이터도 사업 착수 전에 확보해야 합니다.", c: "8A5A22" }
  ];
  ax.forEach((c, i) => {
    const y = 1.42 + i * 1.06;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.94, fill: i % 2 === 0 ? TINT : TINT2 });
    s.addShape(pres.ShapeType.roundRect, { x: 0.62, y: y, w: 2.30, h: 0.94, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.t, { x: 0.80, y: y, w: 1.95, h: 0.94, fontSize: 13.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.v, { x: 3.05, y: y, w: 1.25, h: 0.94, align: "center", fontSize: 13.5, bold: true, color: c.c === FAWN ? FAWN : GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: 4.45, y: y, w: 8.05, h: 0.94, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 16 });
  });
  card(s, { x: 0.62, y: 6.75, w: 12.10, h: 0.001, fill: W });
  foot(s, "※ 경제 타당성을 '조건부'로 표기한 것은 의도적입니다 — 한우 데이터로 검증되지 않은 것을 검증되었다고 말하지 않습니다.");
  s.addNotes("다섯 축 중 하나를 일부러 '조건부'로 뒀다. 전부 '높음'인 제안은 신뢰를 잃는다. 그리고 그 조건부 항목이 곧 이 사업의 목적이라는 논리로 되돌린다.");
}

{
  const s = S();
  kick(s, "07 사업 타당성");
  T(s, "경제성 — 무엇을 얼마나 회수해야 하는가");
  plain(s, "1년차 투입 16.3억원, 대상 3,300두 기준. 두당 연간 약 49만원이 투입됩니다.\n이 금액이 회수되려면 두당 연 49만원 이상의 손실을 줄이면 됩니다.", { x: 0.62, y: 1.24, w: 12.1, h: 0.70, fontSize: 13, color: MUTED, ls: 19 });
  const rows = [
    ["회수 항목", "산정 논리", "비고"],
    ["공태일수 단축", "발정 1회 미발견 = 공태 21일 연장.\n조기 발견으로 연간 공태일수를 줄입니다.", "번식농가 손실의 최대 항목"],
    ["폐사 · 도태 회피", "질병 조기 발견으로 회피되는 폐사 1두는\n송아지·비육우 가액 전체를 지킵니다.", "1두 회피로도 다수 두 투입분 상쇄"],
    ["수정 비용 절감", "수정 횟수 감소 — 정액·수정료·재발정 대기", "직접 비용 절감"],
    ["관찰 노동 절감", "야간 관찰·분만 대기 시간의 대체", "고령 농가에서 체감 효과 최대"],
    ["사육기간 단축", "개체별 출하 예측으로 26개월 이하 실행", "Phase 3에서 검증 — 1년차 제외"]
  ];
  const tr = rows.map((r, ri) => r.map((cc, ci) => ({
    text: cc,
    options: {
      bold: ri === 0 || ci === 0,
      color: ri === 0 ? W : BODY,
      fill: { color: ri === 0 ? GREEN : (ri % 2 === 0 ? TINT2 : W) },
      fontSize: 11.5, align: "left", valign: "middle", fontFace: FONT
    }
  })));
  s.addTable(tr, { x: 0.62, y: 2.05, w: 12.10, colW: [2.60, 6.20, 3.30], rowH: 0.66, border: { type: "solid", color: "DDE4D8", pt: 1 } });
  card(s, { x: 0.62, y: 5.65, w: 12.10, h: 1.25, fill: INK });
  plain(s, "정직하게 — 여기서 금액을 단정하지 않는 이유", { x: 0.95, y: 5.82, w: 11.4, h: 0.32, fontSize: 13.5, bold: true, color: FAWNL });
  plain(s, "낙농 데이터로 산출된 회수액을 한우에 그대로 옮기면 과대 추정이 됩니다. 한우는 산차 간격·출하 주기가 다릅니다.\n두당 회수액의 확정은 이 시범사업의 산출물이지, 전제가 아닙니다. 그것이 비교군 설계를 두는 이유입니다.", { x: 0.95, y: 6.18, w: 11.4, h: 0.62, fontSize: 12, color: W, ls: 18 });
  s.addNotes("여기서 부풀린 B/C를 제시하면 실무자가 바로 알아본다. 오히려 '확정하지 않는다'는 태도가 신뢰를 만든다. 회수 항목의 구조만 명확히 보여준다.");
}

{
  const s = S(true);
  kick(s, "07 사업 타당성", MOSS);
  T(s, "반대 논거 — 나올 수 있는 질문을 먼저 꺼냅니다", { color: W });
  const q = [
    { q: "\"스마트축산에 이미 예산을 썼는데 성과가 없었다\"", a: "맞습니다. 장비만 보급하고 판단 계층이 없었기 때문입니다. 이 제안은 신규 장비 보급이 아니라 기존 장비의 데이터를 묶는 사업입니다." },
    { q: "\"특정 업체를 밀어주는 것 아닌가\"", a: "개방형 표준 API로 설계하고, 데이터 소유권 약정을 시범단계에서 표준화합니다. 감리를 독립 편성하고 결과를 공개합니다." },
    { q: "\"고령 농가가 못 쓸 것이다\"", a: "가장 큰 위험입니다. 그래서 앱 사용을 전제하지 않고 문자·전화 알림과 수의사 대행 서비스로 설계합니다. 그래도 이탈률은 KPI로 관리해야 합니다." },
    { q: "\"효과가 안 나오면 어떻게 하나\"", a: "1년차 규모를 3,300두로 제한한 이유입니다. 비교군 대조로 효과가 확인되지 않으면 2년차를 중단하는 것이 정상 설계입니다." },
    { q: "\"도비 부담이 부담스럽다\"", a: "국비 매칭과 기존 스마트축산 사업 연계를 전제로 설계할 수 있습니다. 다년도 분할도 가능합니다." }
  ];
  q.forEach((c, i) => {
    const y = 1.42 + i * 1.06;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.94, fill: INK2 });
    s.addText(c.q, { x: 0.92, y: y, w: 4.55, h: 0.94, fontSize: 12, bold: true, color: FAWNL, fontFace: HEAD, margin: 0, valign: "middle", lineSpacing: 16 });
    s.addText(c.a, { x: 5.70, y: y, w: 6.80, h: 0.94, fontSize: 11.5, color: W, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 16 });
  });
  card(s, { x: 0.62, y: 6.75, w: 12.10, h: 0.001, fill: INK });
  s.addNotes("실무자가 상급자에게 보고할 때 받을 질문들이다. 미리 답을 손에 쥐여주는 것이 이 장의 목적. 4번(효과 없으면 중단)이 특히 중요 — 출구 전략이 있는 사업은 승인받기 쉽다.");
}

{
  const s = S();
  kick(s, "07 사업 타당성");
  T(s, "하지 않았을 때의 비용");
  const p = [
    { t: "번식 기반은 계속 줄어듭니다", d: "가임암소 감소는 3~4년 뒤 송아지 공급 부족으로 나타납니다.\n그 시점에는 전남 비육농가가 도내에서 입식할 송아지를 구하지 못합니다.", c: FAWN },
    { t: "데이터 공백은 소급되지 않습니다", d: "올해 놓친 개체 데이터는 내년에 만들 수 없습니다.\n비교의 기준선이 없으면 어떤 정책 효과도 증명할 수 없습니다.", c: GREEN },
    { t: "한우 표준을 다른 지역이 가져갑니다", d: "낙농 표준은 이미 경기도가 만들고 있습니다.\n한우 표준을 먼저 만든 지역이 이후 국가 사업의 기준이 됩니다.", c: MOSS },
    { t: "저탄소·수출 요건에 대응할 수 없습니다", d: "저탄소 인증도, 향후 수출 시 요구될 이력 증명도\n개체 단위 사육 데이터를 전제로 합니다. 없으면 자격 자체가 없습니다.", c: "8A5A22" }
  ];
  p.forEach((c, i) => {
    const x = 0.62 + (i % 2) * 6.28;
    const y = 1.45 + Math.floor(i / 2) * 2.30;
    card(s, { x: x, y: y, w: 5.98, h: 2.10, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 5.98, h: 0.72, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.t, { x: x + 0.22, y: y, w: 5.54, h: 0.72, fontSize: 14.5, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.26, y: y + 0.88, w: 5.46, h: 1.05, fontSize: 12, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 18 });
  });
  card(s, { x: 0.62, y: 6.15, w: 12.10, h: 0.80, fill: INK });
  s.addText("이 사업의 비용은 16.3억원이지만, 하지 않는 비용은 금액으로 청구되지 않을 뿐 더 큽니다", { x: 0.90, y: 6.15, w: 11.5, h: 0.80, fontSize: 15, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("정책결정에서 가장 설득력 있는 논거는 '안 했을 때의 비용'이다. 특히 2번(데이터는 소급 불가)이 시급성의 논리적 근거.");
}

/* ===== SECTION 06 ===== */
sectionSlide("08", "어떻게 시작하나", "ROADMAP · PILOT DESIGN · BUDGET", "8분. 실무자가 기안에 쓸 수 있는 형태로 전달한다.");

/* 18. 4단계 로드맵 */
{
  const s = S();
  kick(s, "08 어떻게 시작하나");
  T(s, "4단계 로드맵 — 가장 시급한 곳부터");
  const ph = [
    { n: "PHASE 1", t: "번식농가 우선 실증", d: "고령 번식농가 대상 발정·분만 AI 우선 적용.\n가장 시급하고 ROI가 즉시 확인되는 지점입니다.", c: FAWN },
    { n: "PHASE 2", t: "고흥 ICT 단지 연계", d: "기존 하드웨어 인프라 위에 판단 계층 탑재.\n신규 투자를 최소화합니다.", c: GREEN },
    { n: "PHASE 3", t: "단기비육 · 저탄소 인증", d: "개체별 출하 시점 예측으로\n26개월 이하 사육 모델을 위험 없이 실행합니다.", c: MOSS },
    { n: "PHASE 4", t: "전남 통합 브랜드", d: "데이터로 증명되는 저탄소·고품질 남도 한우.\n수출 패키지화까지 연결합니다.", c: "8A5A22" }
  ];
  ph.forEach((c, i) => {
    const x = 0.62 + (i % 2) * 6.28;
    const y = 1.45 + Math.floor(i / 2) * 2.42;
    card(s, { x: x, y: y, w: 5.98, h: 2.20, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 5.98, h: 0.86, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.n, { x: x + 0.24, y: y + 0.10, w: 5.5, h: 0.28, fontSize: 10.5, color: i === 2 ? BODY : W, fontFace: FONT, margin: 0, charSpacing: 1.5 });
    s.addText(c.t, { x: x + 0.24, y: y + 0.38, w: 5.5, h: 0.40, fontSize: 16, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0 });
    s.addText(c.d, { x: x + 0.28, y: y + 1.02, w: 5.42, h: 1.00, fontSize: 12.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 19 });
  });
  card(s, { x: 0.62, y: 6.35, w: 12.10, h: 0.62, fill: INK });
  s.addText("Phase 1을 성공시키면 나머지는 같은 데이터 위에서 순차로 열립니다 — 처음부터 전부 할 필요가 없습니다", { x: 0.90, y: 6.35, w: 11.5, h: 0.62, fontSize: 14, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("실무자는 '전부 하자'는 제안을 부담스러워한다. Phase 1만 결정하면 된다는 점을 반복해서 낮춰준다.");
}

/* 19. 시범사업 설계(안) */
{
  const s = S();
  kick(s, "08 어떻게 시작하나");
  T(s, "Phase 1 시범사업 설계 (안)");
  const st = [
    { n: "22개", l: "전 시·군 참여\n지역 편중 배제" },
    { n: "5농가", l: "시군당 번식농가\n총 110농가" },
    { n: "30두", l: "농가당 대상 두수\n총 3,300두" },
    { n: "12개월", l: "1년차 실증 기간\n이후 확산 판단" }
  ];
  st.forEach((c, i) => {
    statCard(s, { x: 0.62 + i * 3.10, y: 1.45, w: 2.88, h: 1.75, num: c.n, label: c.l, numColor: FAWN, numSize: 28, fill: TINT });
  });
  card(s, { x: 0.62, y: 3.35, w: 5.95, h: 2.05, fill: MOSSL });
  plain(s, "대상 농가 선정 기준 (안)", { x: 0.95, y: 3.52, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: GREEND });
  body(s, [
    "가임암소 보유 번식·일관 농가 우선",
    "경영주 60세 이상 — 노동 대체 효과가 가장 큰 구간",
    "통신 환경 사전 점검 통과 농가",
    "데이터 제공·공개에 동의한 농가"
  ], { x: 0.95, y: 3.94, w: 5.35, h: 1.40, fontSize: 12 });
  card(s, { x: 6.77, y: 3.35, w: 5.95, h: 2.05, fill: TINT2, line: "E0E6DB" });
  plain(s, "효과 검증 설계 — 비교군을 반드시 둡니다", { x: 7.10, y: 3.52, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: FAWN });
  plain(s, "선정 농가만 보면 '좋아졌다'는 말밖에 못 합니다.\n비선정 농가의 이력제·검정 데이터를 함께 확보해\n'무엇이 얼마나 좋아졌는가'를 숫자로 증명합니다.\n이것이 2년차 예산의 근거가 됩니다.", { x: 7.10, y: 3.94, w: 5.35, h: 1.30, fontSize: 12, color: BODY, ls: 18 });
  card(s, { x: 0.62, y: 5.58, w: 12.10, h: 1.32, fill: INK });
  plain(s, "3단계 진행", { x: 0.95, y: 5.74, w: 11.4, h: 0.32, fontSize: 13.5, bold: true, color: FAWNL });
  plain(s, "①  0~3개월  농가 선정 · 센서 설치 · 데이터 수신 검증 · 농가 및 수의사 교육\n②  4~9개월  6개 엔진 가동 · 경보 운영 · 수의사 승인 체계 정착 · 행정 대시보드 연동\n③ 10~12개월  효과 분석(비교군 대조) · 확산 설계 · 2년차 사업계획 수립", { x: 0.95, y: 6.10, w: 11.4, h: 0.72, fontSize: 12, color: W, ls: 18 });
  foot(s, "※ 규모·기준은 제안(안)이며 전라남도 여건에 따라 조정 가능합니다.");
  s.addNotes("숫자를 구체적으로 제시하되 '안'임을 명확히 한다. 실무자가 이 표를 그대로 기안 초안에 옮길 수 있게 하는 것이 목적.");
}

/* 20. 예산 구조(안) */
{
  const s = S();
  kick(s, "08 어떻게 시작하나");
  T(s, "1년차 예산 구조 (안)");
  const rows = [
    ["항목", "산정 근거", "금액(억원)"],
    ["센서 공급 · 설치", "110농가 × 목장당 500만원", "5.5"],
    ["데이터 · AI 구독", "3,300두 × 두당 월 12,000원 × 12개월", "4.8"],
    ["AI 엔진 연계 · 행정 대시보드", "6개 엔진 연동, 도·시군 대시보드 구축", "3.0"],
    ["실증 운영 · 교육 · 수의 승인 체계", "농가 교육, 수의사 HITL 운영, 현장 지원", "2.0"],
    ["성과 분석 · 감리", "비교군 대조 분석, 독립 감리", "1.0"],
    ["합계", "", "16.3"]
  ];
  const tr = rows.map((r, ri) => r.map((c, ci) => ({
    text: c,
    options: {
      bold: ri === 0 || ri === rows.length - 1 || ci === 0,
      color: ri === 0 ? W : BODY,
      fill: { color: ri === 0 ? GREEN : (ri === rows.length - 1 ? MOSSL : (ri % 2 === 0 ? TINT2 : W)) },
      fontSize: 12.5, align: ci === 2 ? "right" : "left", valign: "middle", fontFace: FONT
    }
  })));
  s.addTable(tr, { x: 0.62, y: 1.50, w: 12.10, colW: [4.30, 5.60, 2.20], rowH: 0.52, border: { type: "solid", color: "DDE4D8", pt: 1 } });
  card(s, { x: 0.62, y: 5.30, w: 5.95, h: 1.45, fill: TINT });
  plain(s, "센서 공급 조건 (공개 기준)", { x: 0.95, y: 5.46, w: 5.3, h: 0.32, fontSize: 13.5, bold: true, color: GREEND });
  plain(s, "· 목장당 설치비 500만원 (기반 설비 포함)\n· 두당 월 관리·구독료 12,000원\n· 센서 4년 유지 — 기간 내 고장 시 무상 교체", { x: 0.95, y: 5.82, w: 5.35, h: 0.85, fontSize: 11.5, color: BODY, ls: 17 });
  card(s, { x: 6.77, y: 5.30, w: 5.95, h: 1.45, fill: TINT2, line: "E0E6DB" });
  plain(s, "참고 — 경기도 사례", { x: 7.10, y: 5.46, w: 5.3, h: 0.32, fontSize: 13.5, bold: true, color: FAWN });
  plain(s, "경기도는 5개년 총 102.3억원 규모로 추진 중이며,\n예산의 약 47%를 시범운영·확산에 배정했습니다.\n전남도 단년도 부담을 나누는 다년도 설계가 가능합니다.", { x: 7.10, y: 5.82, w: 5.35, h: 0.85, fontSize: 11.5, color: BODY, ls: 17 });
  foot(s, "※ 금액은 제안(안)이며 확정 견적이 아닙니다. 국비 매칭·기존 스마트축산 ICT 사업 연계 시 도비 부담은 낮아질 수 있습니다.");
  s.addNotes("앞의 두 줄(5.5억·4.8억)은 공개 단가로 실제 계산된 값이라 검증 가능하다는 점을 말한다. 나머지는 안이라고 분명히 밝힌다. 국비 매칭 가능성을 언급해 도비 부담 우려를 낮춘다.");
}

/* 21. 추진 체계 */
{
  const s = S(true);
  kick(s, "08 어떻게 시작하나", MOSS);
  T(s, "추진 체계 — 누가 무엇을 맡는가", { color: W });
  const org = [
    { t: "전라남도", r: "총괄", d: "사업 총괄 · 예산 편성\n성과 관리 · 확산 결정", c: FAWN },
    { t: "시 · 군", r: "현장", d: "대상 농가 선정 · 추천\n현장 민원 대응", c: INK2 },
    { t: "농협 · 축협", r: "농가 접점", d: "농가 모집 · 설명회\n기존 사업과의 연계", c: INK2 },
    { t: "전남 수의사회 · 공수의", r: "승인 · 임상", d: "AI 판단 승인(HITL)\n임상 검증 · 처치 연계", c: GREEN },
    { t: "축평원 · 이력제", r: "공공데이터", d: "이력 · 혈통 · KPN\n도체성적 연계", c: INK2 },
    { t: "㈜D2O · CowTalk", r: "수행", d: "센서 공급·설치·운영\nAI 엔진 · 실증 · 교육", c: GREEN }
  ];
  org.forEach((c, i) => {
    const x = 0.62 + (i % 3) * 4.10;
    const y = 1.50 + Math.floor(i / 3) * 2.15;
    card(s, { x: x, y: y, w: 3.88, h: 1.95, fill: c.c });
    s.addText(c.r, { x: x + 0.22, y: y + 0.14, w: 3.44, h: 0.28, fontSize: 10.5, color: i === 0 ? W : MOSSL, fontFace: FONT, margin: 0, charSpacing: 1.2 });
    s.addText(c.t, { x: x + 0.22, y: y + 0.44, w: 3.44, h: 0.42, fontSize: 14.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.22, y: y + 0.96, w: 3.44, h: 0.85, fontSize: 11.5, color: W, fontFace: FONT, margin: 0, lineSpacing: 17 });
  });
  card(s, { x: 0.62, y: 5.95, w: 12.10, h: 0.95, fill: FAWN });
  s.addText("도가 새 조직을 만들 필요가 없습니다 — 기존 축산 행정 체계에 판단 계층만 붙이는 구조입니다", { x: 0.90, y: 5.95, w: 11.5, h: 0.95, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("수의사회를 승인 주체로 명시하는 것이 중요하다 — 지역 수의계의 반발을 막고 오히려 우군으로 만든다. 신규 조직 불필요를 강조해 행정 부담 우려를 없앤다.");
}

/* 22. KPI */
{
  const s = S();
  kick(s, "08 어떻게 시작하나");
  T(s, "무엇으로 성공을 판단할 것인가");
  const g = [
    { t: "번식 성과", c: GREEN, l: ["발정 발견율", "수태율 · 수정 횟수", "공태일수 · 분만간격", "분만사고 발생률"] },
    { t: "건강 · 방역", c: FAWN, l: ["질병 조기 발견 건수", "치료 소요 기간", "폐사 · 도태율", "이상징후 경보 정확도"] },
    { t: "행정 효율", c: MOSS, l: ["이상 인지 ~ 대응 소요시간", "농가 방문 우선순위 적중률", "데이터 수신율 · 완결성", "담당자 업무시간 변화"] },
    { t: "농가 · 지속성", c: "8A5A22", l: ["농가 관찰 노동시간 변화", "시스템 실사용률", "중도 이탈률", "만족도 · 재참여 의향"] }
  ];
  g.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 1.50, w: 2.88, h: 3.30, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.50, w: 2.88, h: 0.68, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.t, { x: x + 0.18, y: 1.50, w: 2.52, h: 0.68, fontSize: 14, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0, valign: "middle" });
    body(s, c.l, { x: x + 0.22, y: 2.32, w: 2.46, h: 2.35, fontSize: 11.5 });
  });
  card(s, { x: 0.62, y: 5.05, w: 12.10, h: 1.35, fill: MOSSL });
  plain(s, "측정 원칙", { x: 0.95, y: 5.22, w: 11.4, h: 0.32, fontSize: 14, bold: true, color: GREEND });
  plain(s, "① 시범 농가와 비선정 농가를 함께 측정합니다  ② 사업 시작 전 기초선(baseline)을 먼저 확보합니다\n③ 결과는 실패 항목까지 포함해 공개합니다  ④ 최종 산출물은 보고서가 아니라 다음 사업의 설계 근거입니다", { x: 0.95, y: 5.58, w: 11.4, h: 0.72, fontSize: 12, color: BODY, ls: 18 });
  card(s, { x: 0.62, y: 6.55, w: 12.10, h: 0.001, fill: W });
  s.addNotes("실무자가 매년 겪는 '성과 증명' 문제를 이 사업이 구조적으로 해결해준다는 점을 강조. 기초선 확보는 사업 시작 전에 해야 하므로 지금 결정이 필요하다는 논리로 연결.");
}

/* ===== SECTION 07 ===== */
sectionSlide("09", "요청사항", "PRECONDITIONS & THE ASK", "5분. 정직한 리스크 고지 후 요청. 여기서 끝낸다.");

/* 24. 선결 과제 */
{
  const s = S();
  kick(s, "09 요청사항");
  T(s, "정직하게 — 먼저 풀어야 할 네 가지");
  const p = [
    { t: "데이터 소유권 법제 미비", d: "농가 · 플랫폼사 · 도 사이의 데이터 귀속 기준이 없습니다.", a: "→ 시범사업 단계에서 3자 데이터 이용 약정을 표준안으로 만들어 둡니다. 이것 자체가 성과물입니다." },
    { t: "고령 농가 수용성", d: "UI를 아무리 쉽게 만들어도 고령 농가는 앱을 열지 않습니다.", a: "→ 화면이 아니라 대행 서비스 모델로 설계합니다. 문자·전화 알림과 수의사·지도사 방문이 인터페이스입니다." },
    { t: "도체 예측 정확도", d: "초기 라벨 데이터 확보가 최대 병목입니다. 도체 성적은 30개월 뒤에야 나옵니다.", a: "→ Phase 1은 번식(발정·분만)에 집중합니다. 비육 예측은 데이터가 쌓인 뒤 Phase 3에서 검증합니다." },
    { t: "'감시' 프레임 반발", d: "농가가 자신을 관리 대상으로 인식하는 순간 참여율이 무너집니다.", a: "→ 데이터 경로를 분리합니다. 개체 정보는 농가와 수의사에게, 행정에는 집계·익명 통계만 전달합니다." }
  ];
  p.forEach((c, i) => {
    const y = 1.42 + i * 1.32;
    card(s, { x: 0.62, y: y, w: 12.10, h: 1.18, fill: i % 2 === 0 ? TINT : TINT2 });
    badge(s, 0.90, y + 0.35, String(i + 1), { fill: i % 2 === 0 ? GREEN : FAWN, d: 0.48, fs: 14 });
    s.addText(c.t, { x: 1.58, y: y + 0.08, w: 4.10, h: 0.42, fontSize: 14, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: 1.58, y: y + 0.52, w: 4.30, h: 0.58, fontSize: 11.5, color: MUTED, fontFace: FONT, margin: 0, lineSpacing: 16 });
    s.addText(c.a, { x: 6.05, y: y, w: 6.40, h: 1.18, fontSize: 12, color: BODY, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 18 });
  });
  card(s, { x: 0.62, y: 6.80, w: 12.10, h: 0.001, fill: W });
  s.addNotes("리스크를 먼저 꺼내는 것이 신뢰를 만든다. 특히 4번(감시 프레임)은 실무자가 농가 민원으로 직접 겪을 문제라 대응책이 있다는 것만으로 안심시킨다.");
}

/* 25. The Ask */
{
  const s = S(true);
  kick(s, "09 요청사항", MOSS);
  T(s, "전라남도를 한우 AX 국가 실증 거점으로", { color: W });
  card(s, { x: 0.62, y: 1.48, w: 5.95, h: 3.85, fill: INK2 });
  plain(s, "저희가 제공하는 것", { x: 0.95, y: 1.66, w: 5.3, h: 0.38, fontSize: 16, bold: true, color: MOSSL });
  body(s, [
    "13년간 축적된 반추위 센서 데이터와 6개 AI 엔진",
    "199농가 · 10,886두에서 이미 검증된 운영 체계",
    "센서 공급 · 설치 · 운영 · AS 일괄 수행",
    "수의사 승인(HITL) 체계 설계와 교육",
    "국제 실증 경험 — 우즈베키스탄 정부 시연",
    "실패 사례를 포함한 결과 공개"
  ], { x: 0.95, y: 2.14, w: 5.35, h: 3.00, fontSize: 12.5, color: W });
  card(s, { x: 6.77, y: 1.48, w: 5.95, h: 3.85, fill: FAWN });
  plain(s, "전라남도께 요청드리는 것", { x: 7.10, y: 1.66, w: 5.3, h: 0.38, fontSize: 16, bold: true, color: W });
  body(s, [
    "Phase 1 시범사업의 검토 착수 결정",
    "고흥 ICT 시범단지와의 연계 검토",
    "시군 · 농협 · 수의사회 협의 창구 지정",
    "이력제 · 도체성적 등 공공데이터 연계 협조",
    "국비 매칭 및 기존 스마트축산 사업 연계 검토",
    "결과를 전남 이름으로 공개 · 확산"
  ], { x: 7.10, y: 2.14, w: 5.35, h: 3.00, fontSize: 12.5, color: W });
  card(s, { x: 0.62, y: 5.55, w: 12.10, h: 1.35, fill: INK2 });
  s.addText("한우 AX는 데이터 관리 시스템이 아니라,\n사라지는 번식농가의 눈과 손을 대신하는 산업 기반 시설입니다", { x: 0.95, y: 5.55, w: 11.4, h: 1.35, fontSize: 17, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle", lineSpacing: 27 });
  s.addNotes("주고받는 관계를 분명히 한다. 마지막 문장은 천천히. '관리 시스템'이 아니라 '기반 시설'이라는 규정이 예산 성격을 바꾼다.");
}

/* 26. 다음 30일 */
{
  const s = S();
  kick(s, "09 요청사항");
  T(s, "다음 30일 — 지금 하실 수 있는 일");
  const w = [
    { n: "1주", t: "내부 검토", d: "축산과 내 검토 · 고흥 ICT 단지 담당 부서와 사전 협의\n필요 시 저희가 실무 설명 자료를 추가 제공합니다" },
    { n: "2주", t: "현장 확인", d: "운영 중인 농가 현장과 대시보드를 직접 확인\n원하시는 시군에서 시연 가능합니다" },
    { n: "3주", t: "협의체 구성", d: "시군 · 농협 · 전남 수의사회 협의 창구 지정\n대상 농가 선정 기준 초안 합의" },
    { n: "4주", t: "사업계획 초안", d: "규모 · 예산 · 일정 확정안 작성\n국비 매칭 및 연계 가능 사업 확인" }
  ];
  w.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 1.55, w: 2.88, h: 3.30, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.55, w: 2.88, h: 0.86, fill: { color: i < 2 ? GREEN : FAWN }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.n, { x: x + 0.20, y: 1.63, w: 2.48, h: 0.28, fontSize: 10.5, color: W, fontFace: FONT, margin: 0 });
    s.addText(c.t, { x: x + 0.20, y: 1.92, w: 2.48, h: 0.40, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0 });
    s.addText(c.d, { x: x + 0.22, y: 2.58, w: 2.44, h: 2.10, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 18 });
    if (i < 3) arrow(s, x + 2.94, 3.08);
  });
  card(s, { x: 0.62, y: 5.10, w: 12.10, h: 1.30, fill: MOSSL });
  plain(s, "오늘 결정하실 것은 하나입니다", { x: 0.95, y: 5.28, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: GREEND });
  plain(s, "사업을 하겠다는 결정이 아니라, 검토를 시작해도 좋다는 판단입니다.\n나머지는 저희가 자료로 만들어 오겠습니다.", { x: 0.95, y: 5.66, w: 11.4, h: 0.66, fontSize: 13, color: BODY, ls: 20 });
  card(s, { x: 0.62, y: 6.55, w: 12.10, h: 0.001, fill: W });
  s.addNotes("실무자가 부담 없이 '예'라고 할 수 있는 최소 단위를 요청한다. 큰 결정을 요구하면 '검토하겠습니다'로 끝나고 아무 일도 안 일어난다.");
}

/* 27. 맺음 */
{
  const s = S(true);
  s.addShape(pres.ShapeType.ellipse, { x: 10.10, y: -1.90, w: 5.60, h: 5.60, fill: { color: INK2 }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: 11.60, y: 4.90, w: 2.80, h: 2.80, fill: { color: GREEND }, line: { type: "none" } });
  s.addText("맺으며", { x: 0.75, y: 1.35, w: 9.0, h: 0.40, fontSize: 13, bold: true, color: FAWN, fontFace: FONT, margin: 0, charSpacing: 1.5 });
  s.addText("가임암소는 한 번 사라지면\n돌아오지 않습니다.\n남은 시간은 3년입니다.", { x: 0.75, y: 1.95, w: 9.3, h: 2.10, fontSize: 30, bold: true, color: W, fontFace: HEAD, margin: 0, lineSpacing: 46 });
  s.addText("기술이 준비되지 않아서 못 한 것이 아닙니다. 이미 199농가에서 작동하고 있습니다.\n남은 것은 전남이 이것을 언제 시작하느냐입니다.", { x: 0.75, y: 4.30, w: 9.3, h: 0.90, fontSize: 14, color: MOSSL, fontFace: FONT, margin: 0, lineSpacing: 24 });
  card(s, { x: 0.75, y: 5.45, w: 6.20, h: 1.20, fill: FAWN });
  s.addText("감사합니다.  질의응답", { x: 0.75, y: 5.45, w: 6.20, h: 1.20, align: "center", valign: "middle", fontSize: 22, bold: true, color: W, fontFace: HEAD, margin: 0 });
  s.addText("농업회사법인 ㈜D2O  대표 하현제\nhhj3150@hanmail.net", { x: 7.35, y: 5.55, w: 4.5, h: 1.00, fontSize: 12.5, color: W, fontFace: FONT, margin: 0, lineSpacing: 21 });
  s.addNotes("마지막 문장은 천천히. 압박이 아니라 사실 고지의 톤으로.");
}

/* 28. 백업 */
{
  const s = S();
  kick(s, "APPENDIX");
  T(s, "예상 질의 대비 — 백업");
  const q = [
    { q: "기존 스마트축산 사업과 중복 아닙니까?", a: "하드웨어 보급 사업(DX)이고 저희는 그 위의 판단 계층(AX)입니다. 고흥 단지 장비를 그대로 활용합니다." },
    { q: "특정 업체 종속 우려는 없습니까?", a: "개방형 표준 API 구조로 타 장비도 연동됩니다. 데이터 소유권 약정을 시범단계에서 표준화합니다." },
    { q: "AI 오진 책임은 누가 집니까?", a: "AI는 진단하지 않습니다. 볼 대상을 골라주고 최종 판단·처치는 수의사가 승인합니다(HITL)." },
    { q: "고령 농가가 쓸 수 있습니까?", a: "앱 사용을 전제하지 않습니다. 문자·전화 알림과 수의사·지도사 대행 서비스가 인터페이스입니다." },
    { q: "도비 부담이 얼마나 됩니까?", a: "1년차 16.3억 규모(안). 국비 매칭·기존 사업 연계 시 도비 부담은 낮아집니다. 다년도 분할 설계 가능." },
    { q: "효과를 어떻게 증명합니까?", a: "선정·비선정 농가를 함께 측정합니다. 기초선을 사업 전에 확보해야 하므로 착수 시점이 중요합니다." },
    { q: "왜 낙농이 아니라 한우입니까?", a: "한우는 일일 데이터가 전무해 센서·AI의 한계효용이 가장 큽니다. 낙농 표준은 경기도가 만들고 있습니다." }
  ];
  q.forEach((c, i) => {
    const y = 1.42 + i * 0.78;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.68, fill: i % 2 === 0 ? TINT : TINT2 });
    s.addText("Q", { x: 0.85, y: y, w: 0.36, h: 0.68, align: "center", valign: "middle", fontSize: 13, bold: true, color: FAWN, fontFace: HEAD, margin: 0 });
    s.addText(c.q, { x: 1.28, y: y, w: 4.10, h: 0.68, fontSize: 11.5, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle", lineSpacing: 15 });
    s.addText(c.a, { x: 5.52, y: y, w: 6.95, h: 0.68, fontSize: 11, color: BODY, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 15 });
  });
  foot(s, "※ 발표용이 아닌 준비용 백업 슬라이드입니다.");
  s.addNotes("발표 시 스킵. 질의응답에서 필요 시 열람.");
}

pres.writeFile({ fileName: "전남한우AX_국가실증거점_제안.pptx" }).then(f => console.log("saved:", f));
