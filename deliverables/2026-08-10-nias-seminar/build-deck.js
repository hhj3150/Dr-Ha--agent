const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "송영신목장 하현제";
pres.title = "저지종 유가공목장 운영 현장사례";

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

/* =========================================================
   1. TITLE
========================================================= */
{
  const s = S(true);
  s.addShape(pres.ShapeType.ellipse, { x: 9.30, y: -1.60, w: 6.20, h: 6.20, fill: { color: INK2 }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: 11.05, y: 4.55, w: 3.20, h: 3.20, fill: { color: GREEND }, line: { type: "none" } });
  s.addText("현장중심 기술보급 강화를 위한 외부전문가 초청 세미나", { x: 0.75, y: 1.35, w: 9.2, h: 0.35, fontSize: 13, bold: true, color: MOSS, fontFace: FONT, margin: 0, charSpacing: 1.2 });
  s.addText("저지종 유가공목장\n운영 현장사례", { x: 0.75, y: 1.95, w: 9.4, h: 1.95, fontSize: 46, bold: true, color: W, fontFace: HEAD, margin: 0, lineSpacing: 56 });
  s.addText("친환경 스마트 사양관리 · 유가공 · 현장에서 보는 낙농산업 방향", { x: 0.75, y: 4.10, w: 9.4, h: 0.42, fontSize: 16, color: FAWNL, fontFace: FONT, margin: 0 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.75, y: 5.05, w: 5.55, h: 1.20, fill: { color: INK2 }, line: { type: "none" }, rectRadius: 0.10 });
  s.addText([
    { text: "송영신목장 대표 하현제", options: { bold: true, fontSize: 17, color: W, breakLine: true } },
    { text: "수의사 · 현장명예지도관 | 2026. 8. 10.(월) 14:00~16:00", options: { fontSize: 12, color: MOSSL } }
  ], { x: 1.05, y: 5.20, w: 5.0, h: 0.90, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 22 });
  s.addText("국립축산과학원 소회의실(5층)", { x: 6.60, y: 5.52, w: 4.0, h: 0.30, fontSize: 12, color: MUTED, fontFace: FONT, margin: 0 });
  s.addNotes("인사. 오늘은 '잘 되는 목장 자랑'이 아니라, 기술보급 담당자 관점에서 '무엇을 시범사업으로 만들 수 있는가'를 남기는 것이 목적이라고 먼저 밝힌다. 마지막 20분은 질의응답.");
}

/* =========================================================
   2. 발표자 소개
========================================================= */
{
  const s = S();
  kick(s, "SPEAKER");
  T(s, "한 사람이 아니라, 네 개의 현장이 한 목장에서 만납니다");
  plain(s, "저는 수의사이자 목장주이며, 동시에 육종·환경·데이터 회사를 함께 운영합니다.\n오늘 사례는 이 네 축이 한 목장에서 동시에 돌아간 결과입니다.", { x: 0.62, y: 1.28, w: 11.6, h: 0.70, fontSize: 14, color: MUTED, ls: 20 });

  const orgs = [
    { t: "송영신목장", d: "저지·홀스타인 사육\nA2 저지 건초우유 생산\n자체 유가공·직판", c: FAWN },
    { t: "Genetics (주)", d: "수정란 생산·이식\n유전체 선발, A2A2 개량\n연 3,000회 이식 규모", c: GREEN },
    { t: "코리아동물병원", d: "수정란이식 전문 진료\n번식·수정란·송아지 관리\n수의사 4인 체제", c: GREEN },
    { t: "D2O (주)", d: "축사환경·악취 저감\n피트모스 베딩(HBP)\n퇴비·순환농업 기술", c: FAWN }
  ];
  orgs.forEach((o, i) => {
    const x = 0.62 + i * 3.02;
    card(s, { x: x, y: 2.20, w: 2.80, h: 2.30, fill: TINT, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 2.20, w: 2.80, h: 0.62, fill: { color: o.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(o.t, { x: x + 0.18, y: 2.20, w: 2.44, h: 0.62, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(o.d, { x: x + 0.22, y: 2.95, w: 2.36, h: 1.95, fontSize: 12.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 20, valign: "top" });
  });
  card(s, { x: 0.62, y: 5.00, w: 12.10, h: 1.10, fill: INK, r: 0.10 });
  s.addText("현장의 문제를 진료로 보고 → 유전으로 고치고 → 환경으로 받쳐주고 → 제품으로 값을 받는다", { x: 0.90, y: 5.00, w: 11.5, h: 1.10, fontSize: 17, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("자기소개는 길게 하지 않는다. 핵심은 '한 목장 안에서 유전-환경-데이터-가공이 모두 검증 가능하다'는 것. 기술보급 입장에서는 실증 사이트로서의 가치가 여기에 있다.");
}

/* =========================================================
   3. 목차
========================================================= */
{
  const s = S();
  kick(s, "CONTENTS");
  T(s, "오늘 말씀드릴 것");
  const items = [
    ["01", "목장 개요", "왜 이 사례가 기술보급에 의미가 있는가"],
    ["02", "왜 저지종인가", "품종 선택의 의사결정과 현장에서 겪은 어려움"],
    ["03", "친환경 사양관리", "피트모스 베딩(HBP) · 악취저감 · 순환농업"],
    ["04", "스마트 사양관리", "위내센서 · CowTalk AI · 데이터 기반 번식/질병 관리"],
    ["05", "유가공과 판매", "A2 저지 건초우유 제품화, 소규모 유가공 실무"],
    ["06", "낙농산업 방향과 시범사업 제안", "현장에서 본 방향 4가지 + 제안과제 5건"]
  ];
  items.forEach((it, i) => {
    const y = 1.42 + i * 0.88;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.76, fill: i === 5 ? MOSSL : TINT2 });
    badge(s, 0.86, y + 0.15, it[0], { fill: i === 5 ? FAWN : GREEN, fs: 13, d: 0.46 });
    s.addText(it[1], { x: 1.52, y: y, w: 3.5, h: 0.76, fontSize: 15.5, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(it[2], { x: 5.05, y: y, w: 7.4, h: 0.76, fontSize: 12.5, color: MUTED, fontFace: FONT, margin: 0, valign: "middle" });
  });
  foot(s, "발표 100분 · 질의응답 20분");
  s.addNotes("6개 파트. 앞의 5개는 사례, 마지막 6번이 오늘 세미나의 목적인 시범사업 발굴 부분. 시간이 모자라면 앞을 줄이고 6번은 반드시 다룬다.");
}

/* =========================================================
   4. 한 장 요약
========================================================= */
{
  const s = S(true);
  kick(s, "ONE-PAGE SUMMARY", MOSS);
  T(s, "송영신목장은 '순환'이 실제로 도는 것을 확인하는 현장입니다", { color: W });
  const ring = ["건강한 흙", "건강한 풀", "건강한 소", "좋은 우유", "퇴비 환원"];
  ring.forEach((r, i) => {
    const x = 0.62 + i * 2.52;
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.75, w: 2.20, h: 1.05, fill: { color: i === 4 ? FAWN : INK2 }, line: { color: MOSS, width: 1 }, rectRadius: 0.10 });
    s.addText(r, { x: x, y: 1.75, w: 2.20, h: 1.05, align: "center", valign: "middle", fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0 });
    if (i < 4) arrow(s, x + 2.32, 2.14);
  });
  s.addText("↺  퇴비는 다시 초지로 — 사료·베딩·분뇨가 목장 안에서 닫힙니다", { x: 0.62, y: 2.95, w: 12.1, h: 0.35, fontSize: 12.5, color: MOSSL, fontFace: FONT, margin: 0 });

  const k = [
    { n: "저지 + A2A2", l: "품종·유전형 선택으로\n원유의 값 자체를 바꿈" },
    { n: "HBP 베딩", l: "피트모스 기반 발효 깔짚\n악취·환경 부담 저감" },
    { n: "위내센서 AI", l: "발정·분만·질병을\n사람 대신 24시간 감시" },
    { n: "자체 유가공", l: "원유가 아니라\n브랜드로 판매" }
  ];
  k.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 3.70, w: 2.88, h: 2.05, fill: INK2 });
    s.addText(c.n, { x: x + 0.18, y: 3.90, w: 2.52, h: 0.55, fontSize: 17, bold: true, color: FAWNL, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.l, { x: x + 0.18, y: 4.50, w: 2.52, h: 1.10, fontSize: 12.5, color: W, fontFace: FONT, margin: 0, lineSpacing: 19 });
  });
  s.addText("이 네 가지는 각각 독립된 기술이 아니라, 서로를 필요로 하는 하나의 운영체계입니다.", { x: 0.62, y: 6.05, w: 12.1, h: 0.45, fontSize: 14, bold: true, color: MOSS, fontFace: HEAD, margin: 0 });
  s.addNotes("이 장이 발표 전체의 지도. 청중이 뒤에서 길을 잃으면 이 장으로 돌아온다. 네 기술이 따로 논 것이 아니라 하나로 묶였다는 점을 강조.");
}

/* =========================================================
   5. SECTION 1
========================================================= */
sectionSlide("01", "목장 개요", "SONG YOUNG SHIN FARM — OVERVIEW",
  "5분. 규모 자랑이 아니라 '실증 조건을 갖춘 사이트'라는 점을 설명한다.");

/* 6. 목장 개요 팩트 */
{
  const s = S();
  kick(s, "01 목장 개요");
  T(s, "목장 개요");
  const f = [
    { n: "[  ]두", l: "총 사육두수\n(저지 [  ]두 / 홀스타인 [  ]두)" },
    { n: "[  ]두", l: "착유두수\n두당 일 평균 유량 [  ] kg" },
    { n: "[  ]㎡", l: "축사 면적\n(HBP 운용 구간 [  ]㎡)" },
    { n: "[  ]", l: "유가공장 처리 용량\n(일 처리 [  ] L)" },
    { n: "6종", l: "제품 라인업\n우유·요거트·그릭·카이막\n아이스크림·밀크티" },
    { n: "D2C", l: "주 판매채널\nshop.a2jerseymilk.com\n+ 정기구독 + B2B" }
  ];
  f.forEach((c, i) => {
    const x = 0.62 + (i % 3) * 4.10;
    const y = 1.45 + Math.floor(i / 3) * 2.35;
    statCard(s, { x: x, y: y, w: 3.88, h: 2.10, num: c.n, label: c.l, numColor: i < 4 ? FAWN : GREEND, numSize: 32 });
  });
  foot(s, "※ [  ] 표시는 발표 직전 목장 실측치로 채워 넣을 항목입니다.");
  s.addNotes("실측치를 채워 발표. 특히 두당 유량과 유성분은 반드시 실제 검정 성적으로 말할 것. 청중이 연구·지도 인력이므로 근거 없는 수치는 바로 신뢰를 잃는다.");
}

/* 7. 왜 의미 */
{
  const s = S();
  kick(s, "01 목장 개요");
  T(s, "왜 이 목장이 '기술보급' 관점에서 쓸모가 있는가");
  const p = [
    { n: "1", t: "한 사이트에서 세 기술을 동시에 검증", d: "품종·유전(저지 A2A2), 축사환경(HBP 피트모스 베딩), 정밀낙농(위내센서 AI)이\n같은 소, 같은 축사, 같은 기간에 돌아갑니다. 기술 간 간섭·상승효과를 볼 수 있는 조건입니다." },
    { n: "2", t: "기술이 '소득'까지 연결된 것을 확인 가능", d: "대부분의 시범사업은 기술 효과에서 끝납니다. 여기는 유가공·직판이 붙어 있어\n기술 → 원유 품질 → 제품 → 매출까지 한 줄로 추적할 수 있습니다." },
    { n: "3", t: "수의사·육종가가 상주하는 현장", d: "번식·질병 데이터를 수의사가 직접 기록·판독합니다. 데이터 신뢰도가 확보되고,\n실패 사례도 원인까지 정리되어 남습니다." },
    { n: "4", t: "농가 교육·견학 수용이 가능한 구조", d: "이미 견학·체험 동선이 있어, 시범사업 성과를 다른 농가에 보여주는\n'전시포(展示圃)' 역할을 그대로 할 수 있습니다." }
  ];
  p.forEach((c, i) => {
    const y = 1.42 + i * 1.35;
    card(s, { x: 0.62, y: y, w: 12.10, h: 1.20, fill: i % 2 === 0 ? TINT : TINT2 });
    badge(s, 0.90, y + 0.36, c.n, { fill: FAWN, d: 0.50, fs: 15 });
    s.addText(c.t, { x: 1.60, y: y + 0.10, w: 10.8, h: 0.42, fontSize: 15, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: 1.60, y: y + 0.52, w: 10.8, h: 0.62, fontSize: 12.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 18 });
  });
  s.addNotes("이 장이 오늘 발표의 '영업 포인트'. 뒤의 시범사업 제안이 여기서 근거를 얻는다. 특히 3번(데이터 신뢰도)과 4번(전시포)은 지도직 청중에게 설득력이 크다.");
}

/* =========================================================
   SECTION 2 — 저지종
========================================================= */
sectionSlide("02", "왜 저지종인가", "WHY JERSEY — BREED DECISION",
  "15분. 품종 선택은 취향이 아니라 사업 구조의 선택이었다는 논리로 간다.");

/* 9. 의사결정 배경 */
{
  const s = S();
  kick(s, "02 왜 저지종인가");
  T(s, "'더 많이'로는 이길 수 없다면, '다르게'로 갑니다");
  card(s, { x: 0.62, y: 1.40, w: 5.90, h: 3.30, fill: TINT2 });
  plain(s, "규모의 경쟁", { x: 0.95, y: 1.62, w: 5.2, h: 0.42, fontSize: 18, bold: true, color: MUTED });
  body(s, [
    "쿼터 확보 경쟁 — 자본이 큰 쪽이 이깁니다",
    "두당 유량 극대화 → 사료비·수의비 동반 상승",
    "원유는 규격품, 우리 목장 이름이 남지 않습니다",
    "유대는 협상 대상이지 우리가 정하는 값이 아닙니다",
    "환경 규제가 강해질수록 두수는 부담이 됩니다"
  ], { x: 0.95, y: 2.15, w: 5.25, h: 2.45, fontSize: 13.5 });

  card(s, { x: 6.82, y: 1.40, w: 5.90, h: 3.30, fill: MOSSL });
  plain(s, "가치의 경쟁", { x: 7.15, y: 1.62, w: 5.2, h: 0.42, fontSize: 18, bold: true, color: GREEND });
  body(s, [
    "적은 두수로도 성립하는 단가 구조를 만듭니다",
    "유지방·유단백이 높은 원유 = 가공 적성이 좋음",
    "A2A2 유전형이라는 '설명 가능한 차별점'",
    "자체 가공·직판으로 값을 우리가 정합니다",
    "체구가 작아 분뇨량·사료요구량 부담이 낮습니다"
  ], { x: 7.15, y: 2.15, w: 5.25, h: 2.45, fontSize: 13.5, color: BODY });
  card(s, { x: 0.62, y: 5.15, w: 12.10, h: 0.95, fill: INK });
  s.addText("저지 선택은 '품종 취향'이 아니라, 유가공·직판을 전제로 한 사업구조의 선택이었습니다", { x: 0.90, y: 5.15, w: 11.5, h: 0.95, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("여기서 청중이 가장 궁금해하는 것은 '수익이 나느냐'. 저지는 원유 판매만으로는 불리할 수 있고, 가공을 붙였을 때 성립한다는 것을 솔직하게 말한다. 이 솔직함이 뒤의 신뢰를 만든다.");
}

/* 10. 비교표 */
{
  const s = S();
  kick(s, "02 왜 저지종인가");
  T(s, "저지 vs 홀스타인 — 무엇을 얻고 무엇을 내주는가");
  const rows = [
    ["구분", "저지 (Jersey)", "홀스타인 (Holstein)", "현장 해석"],
    ["성우 체중", "약 400~450 kg", "약 650~700 kg", "축사 면적·사료량 부담 낮음"],
    ["연간 산유량", "낮음", "높음", "총량 경쟁에서는 불리"],
    ["유지방", "높음 (4.6~5.0%)", "보통 (3.6~3.9%)", "버터·카이막·아이스크림에 유리"],
    ["유단백", "높음 (3.7~3.9%)", "보통 (3.1~3.3%)", "요거트·치즈 수율 유리"],
    ["체중당 사료효율", "우수", "보통", "적은 사료로 고형분 생산"],
    ["분뇨 배출량", "적음", "많음", "환경 규제 대응에 유리"],
    ["분만 난이도", "낮은 편", "보통~높음", "난산·산후질병 관리 부담 감소"],
    ["A2 대립유전자", "품종 내 빈도 높음", "개체별 편차 큼", "A2A2 집단 구성이 상대적으로 용이"]
  ];
  const tblRows = rows.map((r, ri) => r.map((c, ci) => ({
    text: c,
    options: {
      bold: ri === 0 || ci === 0,
      color: ri === 0 ? W : (ci === 3 ? FAWN : BODY),
      fill: { color: ri === 0 ? GREEN : (ri % 2 === 0 ? TINT2 : W) },
      fontSize: ri === 0 ? 12.5 : 12,
      align: ci === 0 ? "left" : (ci === 3 ? "left" : "center"),
      valign: "middle", fontFace: FONT
    }
  })));
  s.addTable(tblRows, { x: 0.62, y: 1.38, w: 12.10, colW: [2.30, 2.60, 2.60, 4.60], rowH: 0.48, border: { type: "solid", color: "DDE4D8", pt: 1 } });
  card(s, { x: 0.62, y: 5.90, w: 12.10, h: 0.80, fill: INK });
  s.addText("저지는 '적게 짜고 진하게 짜는 소'입니다 — 총량으로 경쟁하지 않는 목장에 맞는 품종입니다", { x: 0.90, y: 5.90, w: 11.5, h: 0.80, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  foot(s, "※ 체중·유성분·산유량은 일반 문헌 및 품종 특성 기준의 참고 범위이며, 목장 실측치가 아닙니다. 실제 성적은 사양·개체에 따라 달라집니다.");
  s.addNotes("연구직 청중이므로 출처 구분을 반드시 말한다. '문헌 참고값'과 '우리 목장 실측'을 섞지 않는다. 마지막 열(현장 해석)이 이 표의 핵심.");
}

/* 11. 유성분 차트 */
{
  const s = S();
  kick(s, "02 왜 저지종인가");
  T(s, "가공을 하면, 유량이 아니라 '고형분'이 돈이 됩니다");
  s.addChart(pres.ChartType.bar, [
    { name: "저지", labels: ["유지방(%)", "유단백(%)", "무지고형분(%)"], values: [4.8, 3.8, 9.6] },
    { name: "홀스타인", labels: ["유지방(%)", "유단백(%)", "무지고형분(%)"], values: [3.7, 3.2, 8.7] }
  ], {
    x: 0.62, y: 1.45, w: 7.30, h: 4.35,
    barDir: "col", showTitle: true, title: "주요 유성분 비교 (문헌 참고 범위의 대표값)",
    titleFontSize: 13, titleColor: GREEND, titleFontFace: HEAD,
    chartColors: [FAWN, MOSS], showValue: true, dataLabelPosition: "outEnd",
    dataLabelFontSize: 11, dataLabelColor: BODY, dataLabelFontFace: FONT, dataLabelFormatCode: "0.0",
    catAxisLabelColor: MUTED, valAxisLabelColor: MUTED,
    catAxisLabelFontSize: 11, valAxisLabelFontSize: 10,
    catAxisLabelFontFace: FONT, valAxisLabelFontFace: FONT,
    valGridLine: { color: "E6EBE3", size: 1 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: BODY,
    valAxisMaxVal: 12, barGapWidthPct: 60
  });
  card(s, { x: 8.20, y: 1.45, w: 4.52, h: 4.35, fill: TINT });
  plain(s, "고형분이 높으면", { x: 8.50, y: 1.68, w: 3.9, h: 0.40, fontSize: 16, bold: true, color: GREEND });
  body(s, [
    "요거트·그릭요거트 수율이 올라갑니다",
    "카이막·아이스크림의 질감이 살아납니다",
    "같은 원유량으로 더 많은 제품이 나옵니다",
    "'진하다'는 맛의 차이를 소비자가 바로 느낍니다"
  ], { x: 8.50, y: 2.20, w: 3.95, h: 2.20, fontSize: 13 });
  card(s, { x: 8.50, y: 4.55, w: 3.92, h: 1.05, fill: FAWN });
  s.addText("원유로 팔면 손해,\n가공하면 강점이 됩니다", { x: 8.50, y: 4.55, w: 3.92, h: 1.05, align: "center", valign: "middle", fontSize: 14, bold: true, color: W, fontFace: HEAD, margin: 0, lineSpacing: 20 });
  foot(s, "※ 문헌 참고 범위의 대표값을 도식화한 것이며 특정 개체·목장의 검정 성적이 아닙니다.");
  s.addNotes("차트는 '대표값'임을 반드시 언급. 이 장의 메시지는 하나 — 저지의 약점(유량)은 가공을 붙이는 순간 강점(고형분)으로 뒤집힌다.");
}

/* 12. A2A2 */
{
  const s = S();
  kick(s, "02 왜 저지종인가");
  T(s, "A2A2 — 눈에 보이지 않는 차별점을 '검사'로 증명합니다");
  plain(s, "우유 단백질 중 베타카제인의 유전형 차이입니다. A1/A2 대립유전자 조합에 따라 A1A1·A1A2·A2A2로 나뉘며,\nA2A2 개체의 원유에만 A2형 베타카제인이 들어갑니다.", { x: 0.62, y: 1.25, w: 12.1, h: 0.72, fontSize: 13.5, color: MUTED, ls: 20 });
  const steps = [
    { n: "1", t: "유전자 검사", d: "개체별 시료 채취\nA1/A2 유전형 판정" },
    { n: "2", t: "선발", d: "A2A2 암소 선발\nA1 보유 개체 도태·교배 제한" },
    { n: "3", t: "교배 설계", d: "A2A2 정액·수정란 활용\n세대별 A2 고정" },
    { n: "4", t: "집유 분리", d: "A2A2 개체 원유만\n별도 라인으로 분리 집유" },
    { n: "5", t: "제품 표시", d: "A2 원료 사용을\n제품에 명확히 표기" }
  ];
  steps.forEach((st, i) => {
    const x = 0.62 + i * 2.47;
    card(s, { x: x, y: 2.20, w: 2.24, h: 2.20, fill: TINT, shadow: true });
    badge(s, x + 0.88, 2.38, st.n, { fill: GREEN, d: 0.48, fs: 14 });
    s.addText(st.t, { x: x + 0.10, y: 2.95, w: 2.04, h: 0.40, align: "center", fontSize: 14, bold: true, color: GREEND, fontFace: HEAD, margin: 0 });
    s.addText(st.d, { x: x + 0.14, y: 3.40, w: 1.96, h: 0.90, align: "center", fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 17 });
    if (i < 4) arrow(s, x + 2.30, 3.18);
  });
  card(s, { x: 0.62, y: 4.72, w: 12.10, h: 1.45, fill: TINT2, line: "D8E0D2" });
  plain(s, "표현 원칙 — 과장하지 않는 것이 결국 브랜드를 지킵니다", { x: 0.95, y: 4.92, w: 11.4, h: 0.36, fontSize: 14, bold: true, color: FAWN });
  plain(s, "A2 우유의 소화 관련 효과는 아직 연구가 진행 중인 영역입니다. 저희는 질병 예방·치료 효과를 주장하지 않고,\n'A2A2 개체의 원유만 사용한다'는 검증 가능한 사실만 표시합니다. 검사 성적서로 언제든 확인 가능한 범위 안에서만 말합니다.", { x: 0.95, y: 5.32, w: 11.4, h: 0.70, fontSize: 12.5, color: BODY, ls: 19 });
  s.addNotes("연구기관 앞에서 A2를 건강기능성으로 과장하면 즉시 신뢰를 잃는다. '검증 가능한 사실만 표시한다'는 원칙을 먼저 밝히는 것이 오히려 설득력이 있다.");
}

/* 13. 어려움 */
{
  const s = S();
  kick(s, "02 왜 저지종인가");
  T(s, "솔직하게 — 저지 도입에서 실제로 막혔던 것들");
  const t = [
    { t: "국내 저지 개체 확보가 어렵다", d: "국내 저지 사육 기반이 얇아 우량 암소를 시장에서 사 모으는 방식으로는 한계가 있습니다.\n→ 수정란이식 기반 증식으로 방향을 바꿨습니다." },
    { t: "유대 체계가 유량 중심이다", d: "고형분이 높아도 그 값을 원유 판매에서 온전히 받기 어려운 구조입니다.\n→ 자체 가공·직판으로 값을 받는 경로를 직접 만들었습니다." },
    { t: "체구가 작아 기존 시설과 안 맞는다", d: "스톨·급이대·착유기 세팅이 홀스타인 기준이면 저지에게는 크고 헐겁습니다.\n→ 스톨 규격·목걸이·착유 유닛 조정이 필요했습니다." },
    { t: "송아지 관리가 더 예민하다", d: "초생아 체중이 작아 저체온·초유 관리 실패에 취약합니다.\n→ 분만 감지와 초유 프로토콜을 표준화해야 했습니다." }
  ];
  t.forEach((c, i) => {
    const x = 0.62 + (i % 2) * 6.28;
    const y = 1.40 + Math.floor(i / 2) * 2.30;
    card(s, { x: x, y: y, w: 5.98, h: 2.05, fill: TINT2, line: "E0E6DB" });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 5.98, h: 0.62, fill: { color: i % 2 === 0 ? GREEN : FAWN }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText("문제 " + (i + 1) + ".  " + c.t, { x: x + 0.22, y: y, w: 5.54, h: 0.62, fontSize: 14, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.26, y: y + 0.72, w: 5.46, h: 1.24, fontSize: 12.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 19 });
  });
  card(s, { x: 0.62, y: 6.15, w: 12.10, h: 0.75, fill: INK });
  s.addText("성공 사례만 보급하면 농가는 실패합니다 — 실패 지점을 같이 보급해야 기술이 정착합니다", { x: 0.90, y: 6.15, w: 11.5, h: 0.75, fontSize: 14, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("이 장이 지도직 청중에게 가장 유용한 장. 시범사업 설계 시 리스크 항목으로 그대로 쓸 수 있다고 말해준다.");
}

/* 14. 수정란 증식 */
{
  const s = S();
  kick(s, "02 왜 저지종인가");
  T(s, "해결책 — 사 모으는 대신, 수정란이식으로 증식했습니다");
  const st = [
    { n: "18년", l: "수정란이식 현장 경험" },
    { n: "3,000회", l: "연간 수정란이식 규모" },
    { n: "4,000개", l: "연간 수정란 공급 규모" },
    { n: "약 60%", l: "평균 수태율" }
  ];
  st.forEach((c, i) => {
    statCard(s, { x: 0.62 + i * 3.10, y: 1.42, w: 2.88, h: 1.75, num: c.n, label: c.l, numColor: FAWN, numSize: 30, fill: TINT });
  });
  card(s, { x: 0.62, y: 3.42, w: 12.10, h: 2.05, fill: TINT2 });
  plain(s, "수정란이식 기반 증식의 이점", { x: 0.95, y: 3.62, w: 11.4, h: 0.38, fontSize: 16, bold: true, color: GREEND });
  const L = [
    "우량 공란우 1두에서 다수의 후대를 확보 — 개체 구매보다 빠르고 값싼 증식",
    "수란우(홀스타인)를 활용해 기존 사육 자원을 그대로 씁니다",
    "A2A2·유성분 등 목표 형질을 처음부터 설계해 넣을 수 있습니다",
    "질병 유입 위험이 생체 도입보다 낮습니다"
  ];
  body(s, L, { x: 0.95, y: 4.08, w: 11.4, h: 1.30, fontSize: 13.5 });
  card(s, { x: 0.62, y: 5.72, w: 12.10, h: 1.15, fill: MOSSL });
  plain(s, "기술보급 시사점 — 특정 형질(A2A2·고유지방)을 목표로 한 '설계형 증식'은 개별 농가가 혼자 하기 어렵습니다.\n지역 단위 수정란 공급 + 이식 지원이 붙으면, 농가는 자본 없이도 축군의 방향을 바꿀 수 있습니다.", { x: 0.95, y: 5.72, w: 11.5, h: 1.15, fontSize: 13, bold: true, color: GREEND, valign: "middle", ls: 20 });
  s.addNotes("Genetics 실적 수치는 실제 값. 이 장은 뒤의 시범사업 제안 1번(저지·A2A2 실증)의 근거가 된다.");
}

/* =========================================================
   SECTION 3 — 친환경 사양관리
========================================================= */
sectionSlide("03", "친환경 스마트 사양관리 ①", "ENVIRONMENT — HUMUS BEDDED PACK",
  "20분. 오늘 청중이 가장 관심 있을 파트. 악취·분뇨는 모든 지자체의 민원 1순위.");

/* 16. 전체 그림 */
{
  const s = S();
  kick(s, "03 친환경 사양관리");
  T(s, "'친환경'을 세 가지 축으로 나눠서 관리합니다");
  const ax = [
    { t: "사양 (먹는 것)", c: MOSS, l: ["조사료 중심 급여 — Hay Milk의 근거", "자가 조사료·초지 연계", "정밀 급여로 사료 손실 최소화", "반추위 건강을 데이터로 확인"] },
    { t: "축사환경 (사는 곳)", c: GREEN, l: ["피트모스 기반 HBP 깔짚", "미생물 발효로 수분·악취 관리", "우상 청결 → 유방염·체세포 관리", "발굽·관절 부담이 낮은 바닥"] },
    { t: "분뇨 (나오는 것)", c: FAWN, l: ["깔짚이 그대로 퇴비 원료가 됨", "Healing Compost로 부숙·제품화", "초지·경종농가로 환원", "악취 민원과 처리비를 동시에 줄임"] }
  ];
  ax.forEach((a, i) => {
    const x = 0.62 + i * 4.10;
    card(s, { x: x, y: 1.45, w: 3.88, h: 3.25, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.45, w: 3.88, h: 0.68, fill: { color: a.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(a.t, { x: x + 0.20, y: 1.45, w: 3.48, h: 0.68, fontSize: 15.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    body(s, a.l, { x: x + 0.24, y: 2.32, w: 3.42, h: 2.25, fontSize: 12.5 });
  });
  card(s, { x: 0.62, y: 5.05, w: 12.10, h: 1.10, fill: INK });
  s.addText("세 축은 하나입니다 — 깔짚을 바꾸면 소가 편해지고, 소가 편해지면 유질이 오르고, 그 깔짚이 다시 퇴비가 됩니다", { x: 0.90, y: 5.05, w: 11.5, h: 1.10, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("친환경을 막연한 구호가 아니라 '먹는 것 / 사는 곳 / 나오는 것' 3축으로 분해해 보여준다. 지도 현장에서 농가에게 설명할 때 그대로 쓸 수 있는 프레임이라고 말해준다.");
}

/* 17. HBP 개념 */
{
  const s = S();
  kick(s, "03 친환경 사양관리");
  T(s, "HBP — 깔짚을 '바닥재'가 아니라 '살아있는 발효조'로 씁니다");
  plain(s, "Humus Bedded Pack : 피트모스와 톱밥 등 유기물 깔짚 위에서 소를 사육하면서, 깔짚층 안의 호기성 미생물이\n분뇨를 실시간으로 분해하도록 관리하는 방식입니다. 축사 바닥 자체가 1차 퇴비화 공간이 됩니다.", { x: 0.62, y: 1.25, w: 12.1, h: 0.75, fontSize: 13.5, color: MUTED, ls: 20 });

  const layers = [
    { t: "소 (Cow)", d: "휴식·반추 시간 증가", c: FAWNL, tc: BODY },
    { t: "깔짚 표층 — 건조·흡습층", d: "피트모스의 높은 보수력이 표면 수분을 잡아 우체 오염을 줄입니다", c: MOSSL, tc: BODY },
    { t: "발효층 — 호기성 미생물 활동", d: "교반으로 산소 공급 → 유기물 분해 → 발효열 발생 → 수분 증발", c: MOSS, tc: BODY },
    { t: "기층 — 배수·구조 유지", d: "과습 방지, 혐기 발효(악취 원인) 억제", c: GREEN, tc: W }
  ];
  layers.forEach((l, i) => {
    const y = 2.15 + i * 0.98;
    card(s, { x: 0.62, y: y, w: 7.40, h: 0.85, fill: l.c });
    s.addText(l.t, { x: 0.90, y: y, w: 3.0, h: 0.85, fontSize: 13.5, bold: true, color: l.tc, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(l.d, { x: 3.85, y: y, w: 4.0, h: 0.85, fontSize: 11.5, color: l.tc, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 16 });
  });
  card(s, { x: 8.32, y: 2.15, w: 4.40, h: 3.83, fill: TINT });
  plain(s, "왜 피트모스인가", { x: 8.62, y: 2.35, w: 3.8, h: 0.38, fontSize: 15.5, bold: true, color: GREEND });
  body(s, [
    "보수력이 커서 분뇨 수분을 빠르게 잡습니다",
    "입자 구조가 살아 있어 통기가 유지됩니다",
    "탄소원이 풍부해 발효 균형(C/N)에 유리합니다",
    "약산성 환경이 암모니아 휘산을 억제하는 방향으로 작용합니다",
    "사용 후 그대로 고품질 퇴비 원료가 됩니다"
  ], { x: 8.62, y: 2.85, w: 3.85, h: 3.00, fontSize: 12.5 });
  foot(s, "※ 위 작용은 기술 원리 설명이며, 정량 효과는 축사 조건별 실증이 필요합니다.");
  s.addNotes("HBP의 핵심은 '깔짚을 갈아주는 것'이 아니라 '발효를 관리하는 것'. 교반과 수분이 전부라고 강조. 실패하는 농가는 대부분 교반을 안 한다.");
}

/* 18. 운영 SOP */
{
  const s = S();
  kick(s, "03 친환경 사양관리");
  T(s, "HBP 운영 포인트 — 실패는 대부분 '관리'에서 납니다");
  const sop = [
    { n: "수분", t: "발효층 수분 관리", d: "너무 젖으면 혐기 발효로 악취가 나고, 너무 마르면 미생물이 멈춥니다.\n손으로 쥐었을 때 뭉치되 물이 배지 않는 상태를 기준으로 잡습니다." },
    { n: "교반", t: "정기 교반(로터리)", d: "산소를 넣어 호기 발효를 유지하는 가장 중요한 작업입니다.\n1일 1~2회를 기본으로 하되 계절·두수·수분 상태에 따라 조정합니다." },
    { n: "면적", t: "두당 소요 면적 확보", d: "면적이 좁으면 분뇨 부하가 발효 능력을 넘어섭니다.\n두당 면적은 HBP 성패를 가르는 첫 번째 설계 변수입니다." },
    { n: "보충", t: "깔짚 보충 주기", d: "발효로 유기물이 소모되므로 주기적 보충이 필요합니다.\n전면 교체가 아니라 '보충하며 계속 쓰는' 운영이 원칙입니다." },
    { n: "계절", t: "여름·장마 대응", d: "고온다습기에는 수분 증발이 느려집니다.\n환기량 증대와 교반 빈도 상향으로 대응합니다." },
    { n: "기록", t: "관리 기록의 표준화", d: "교반 시각·보충량·바닥 온도를 기록해야 원인 분석이 가능합니다.\n기록이 없으면 실패해도 왜 실패했는지 알 수 없습니다." }
  ];
  sop.forEach((c, i) => {
    const x = 0.62 + (i % 3) * 4.10;
    const y = 1.42 + Math.floor(i / 3) * 2.55;
    card(s, { x: x, y: y, w: 3.88, h: 2.35, fill: i < 3 ? TINT : TINT2, line: "E0E6DB" });
    badge(s, x + 0.24, y + 0.24, "", { fill: i < 3 ? GREEN : FAWN, d: 0.46 });
    s.addText(c.n, { x: x + 0.24, y: y + 0.24, w: 0.46, h: 0.46, align: "center", valign: "middle", fontSize: 11, bold: true, color: W, fontFace: HEAD, margin: 0 });
    s.addText(c.t, { x: x + 0.82, y: y + 0.22, w: 2.90, h: 0.50, fontSize: 14, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.26, y: y + 0.86, w: 3.38, h: 1.32, fontSize: 12, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 18 });
  });
  card(s, { x: 0.62, y: 6.55, w: 12.10, h: 0.60, fill: FAWN });
  s.addText("HBP는 '자재'가 아니라 '운영기술'입니다 — 보급할 때 반드시 관리 SOP와 함께 가야 합니다", { x: 0.90, y: 6.55, w: 11.5, h: 0.60, fontSize: 14, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("지도 담당자에게 가장 실무적인 장. 자재만 지원하고 관리를 안 알려주면 반드시 실패한다는 점을 강하게 말한다. 시범사업 설계 시 교육·기록 항목을 예산에 넣어야 한다.");
}

/* 19. 기대효과 */
{
  const s = S();
  kick(s, "03 친환경 사양관리");
  T(s, "기대효과 — 어디까지가 확인된 것이고, 어디부터가 검증 대상인가");
  card(s, { x: 0.62, y: 1.42, w: 5.95, h: 4.50, fill: TINT });
  plain(s, "현장에서 체감하고 있는 것", { x: 0.95, y: 1.62, w: 5.3, h: 0.40, fontSize: 16, bold: true, color: GREEND });
  body(s, [
    "축사 내 암모니아성 냄새의 체감 감소",
    "우상 표면이 건조하게 유지되어 우체 오염 감소",
    "소의 눕는 시간(휴식 시간) 증가 — 육안 관찰",
    "깔짚 교체 작업 빈도 감소로 노동 부담 완화",
    "배출 깔짚이 이미 부숙이 진행된 상태로 나옴"
  ], { x: 0.95, y: 2.15, w: 5.35, h: 3.55, fontSize: 13.5 });
  s.addText("→ 정량 데이터 확보가 다음 과제입니다", { x: 0.95, y: 5.40, w: 5.3, h: 0.35, fontSize: 12, italic: true, color: FAWN, fontFace: FONT, margin: 0 });

  card(s, { x: 6.77, y: 1.42, w: 5.95, h: 4.50, fill: TINT2, line: "D8E0D2" });
  plain(s, "실증으로 검증해야 할 것 (파일럿 목표)", { x: 7.10, y: 1.62, w: 5.3, h: 0.40, fontSize: 16, bold: true, color: FAWN });
  body(s, [
    "암모니아·황화수소 등 악취물질 농도 저감률 (정량 측정)",
    "체세포수·유방염 발생률 변화 (검정 데이터 대조)",
    "발굽질환·기립불능 발생 빈도 변화",
    "배출 퇴비의 부숙도·비료성분 등급",
    "깔짚·노동·분뇨처리 비용의 두당 경제성 분석",
    "온실가스 배출 관점의 영향 평가"
  ], { x: 7.10, y: 2.15, w: 5.35, h: 3.55, fontSize: 13.5 });
  card(s, { x: 0.62, y: 6.15, w: 12.10, h: 0.72, fill: INK });
  s.addText("저희가 원하는 것은 홍보가 아니라 공인된 측정입니다 — 이 오른쪽 칸이 시범사업 제안의 출발점입니다", { x: 0.90, y: 6.15, w: 11.5, h: 0.72, fontSize: 14.5, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("이 장에서 신뢰가 결정된다. 효과를 단정하지 않고 '체감'과 '검증 대상'을 나눠 말한다. 국립축산과학원의 측정 역량이 필요하다는 요청으로 자연스럽게 연결.");
}

/* 20. 순환농업 */
{
  const s = S();
  kick(s, "03 친환경 사양관리");
  T(s, "쓰고 버리는 것이 아니라, 흙으로 되돌립니다");
  const flow = [
    { t: "피트모스 깔짚", d: "축사 바닥에 투입" },
    { t: "축사 내 발효", d: "분뇨와 함께 1차 부숙" },
    { t: "Healing Compost", d: "후숙·품질관리 후 제품화" },
    { t: "초지·경종농가", d: "토양 유기물 보충" },
    { t: "조사료 생산", d: "다시 소의 사료로" }
  ];
  flow.forEach((f, i) => {
    const x = 0.62 + i * 2.47;
    card(s, { x: x, y: 1.70, w: 2.24, h: 1.55, fill: i === 2 ? FAWN : TINT, shadow: true });
    s.addText(f.t, { x: x + 0.12, y: 1.88, w: 2.00, h: 0.55, align: "center", fontSize: 13.5, bold: true, color: i === 2 ? W : GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(f.d, { x: x + 0.12, y: 2.45, w: 2.00, h: 0.65, align: "center", fontSize: 11.5, color: i === 2 ? W : BODY, fontFace: FONT, margin: 0, lineSpacing: 16 });
    if (i < 4) arrow(s, x + 2.30, 2.35);
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.62, y: 3.45, w: 12.10, h: 0.42, fill: { color: MOSSL }, line: { type: "none" }, rectRadius: 0.08 });
  s.addText("↺   순환 — 목장에서 나온 것이 목장으로 돌아옵니다", { x: 0.62, y: 3.45, w: 12.10, h: 0.42, align: "center", valign: "middle", fontSize: 13, bold: true, color: GREEND, fontFace: HEAD, margin: 0 });

  const val = [
    { n: "비용 → 자원", l: "분뇨 처리비 부담이\n퇴비 판매 자원으로 전환" },
    { n: "민원 → 신뢰", l: "악취 저감은 지역사회와\n공존하기 위한 최소 조건" },
    { n: "사료 → 자급", l: "초지 지력이 오르면\n조사료 자급률이 오릅니다" },
    { n: "탄소 → 지표", l: "유기물의 토양 환원은\n탄소 관리의 출발점" }
  ];
  val.forEach((v, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 4.15, w: 2.88, h: 1.90, fill: TINT2, line: "E0E6DB" });
    s.addText(v.n, { x: x + 0.16, y: 4.35, w: 2.56, h: 0.48, fontSize: 15, bold: true, color: FAWN, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(v.l, { x: x + 0.16, y: 4.88, w: 2.56, h: 1.00, fontSize: 12, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 18 });
  });
  card(s, { x: 0.62, y: 6.28, w: 12.10, h: 0.62, fill: INK });
  s.addText("낙농의 환경 문제는 '처리'로 풀리지 않습니다 — '순환'으로 설계해야 풀립니다", { x: 0.90, y: 6.28, w: 11.5, h: 0.62, fontSize: 14.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("퇴비 품질이 좋아야 순환이 완성된다. 부숙도 미달 퇴비는 경종농가가 안 받는다는 현실을 언급하면 공감을 얻는다.");
}

/* 21. Hay Milk */
{
  const s = S();
  kick(s, "03 친환경 사양관리");
  T(s, "사양관리가 곧 제품이 됩니다 — Hay Milk");
  card(s, { x: 0.62, y: 1.45, w: 6.05, h: 2.45, fill: TINT });
  plain(s, "Hay Milk 란", { x: 0.95, y: 1.65, w: 5.4, h: 0.38, fontSize: 16, bold: true, color: GREEND });
  plain(s, "발효사료(사일리지) 의존을 낮추고 건초·생초 등 조사료 중심으로 사양한 젖소의 우유를 말합니다.\n유럽에서는 전통 사양방식으로 별도 표시·인증 체계가 운영되고 있습니다.", { x: 0.95, y: 2.12, w: 5.45, h: 1.55, fontSize: 13, color: BODY, ls: 20 });

  card(s, { x: 6.87, y: 1.45, w: 5.85, h: 2.45, fill: MOSSL });
  plain(s, "왜 저희에게 맞는가", { x: 7.20, y: 1.65, w: 5.2, h: 0.38, fontSize: 16, bold: true, color: GREEND });
  body(s, [
    "저지 + 조사료 중심 = 진한 유성분과 잘 맞습니다",
    "'무엇을 먹였는가'가 소비자에게 설명됩니다",
    "초지·퇴비 순환과 이야기가 하나로 이어집니다"
  ], { x: 7.20, y: 2.10, w: 5.25, h: 1.60, fontSize: 12.5 });

  card(s, { x: 0.62, y: 4.10, w: 12.10, h: 1.75, fill: TINT2, line: "D8E0D2" });
  plain(s, "표시 원칙", { x: 0.95, y: 4.30, w: 11.4, h: 0.36, fontSize: 15, bold: true, color: FAWN });
  plain(s, "국내에는 Hay Milk에 대한 별도 법정 인증 기준이 정립되어 있지 않습니다. 따라서 저희는 인증을 주장하지 않고,\n'조사료 중심 사양'이라는 사양 방식 자체를 사실로 설명합니다. 급여 기록을 남겨 언제든 확인 가능하게 관리합니다.\n→ 오히려 이 지점이, 국가기관이 기준을 만들어 주면 산업 전체가 쓸 수 있는 영역이라고 생각합니다.", { x: 0.95, y: 4.72, w: 11.4, h: 1.00, fontSize: 12.5, color: BODY, ls: 19 });
  card(s, { x: 0.62, y: 6.10, w: 12.10, h: 0.78, fill: INK });
  s.addText("제안 예고 — '조사료 중심 사양 우유'의 표시 기준 마련은 국가 연구기관이 해주실 수 있는 일입니다", { x: 0.90, y: 6.10, w: 11.5, h: 0.78, fontSize: 14.5, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("여기서 첫 번째 정책 제안을 씨앗으로 뿌린다. 우리만 이득 보자는 게 아니라 산업 공통 기준이 필요하다는 톤으로.");
}

/* =========================================================
   SECTION 4 — 스마트
========================================================= */
sectionSlide("04", "친환경 스마트 사양관리 ②", "PRECISION DAIRY — RUMEN SENSOR & AI",
  "20분. 정밀낙농 파트. 기술 자랑보다 '사람이 못 보는 것을 본다'는 실무 효용 중심으로.");

/* 23. 왜 데이터 */
{
  const s = S();
  kick(s, "04 스마트 사양관리");
  T(s, "사람은 하루 두 번 봅니다. 소는 24시간 변합니다.");
  const gap = [
    { t: "야간 발정", d: "발정 징후의 상당 부분이 사람이 없는 시간대에 나타납니다.\n놓치면 21일을 그대로 잃습니다." },
    { t: "잠복 대사질병", d: "케토시스·산독증은 눈에 보일 때는 이미 진행된 뒤입니다.\n음수·활동량·체온 변화가 먼저 옵니다." },
    { t: "분만 시점", d: "분만 예정일과 실제 분만은 다릅니다.\n입회 여부가 송아지 생사를 가르는 경우가 있습니다." },
    { t: "개체 단위 관찰", d: "두수가 늘수록 '전체 평균'만 보이고\n한 마리의 이상은 묻힙니다." }
  ];
  gap.forEach((g, i) => {
    const y = 1.42 + i * 1.22;
    card(s, { x: 0.62, y: y, w: 12.10, h: 1.05, fill: i % 2 === 0 ? TINT : TINT2 });
    s.addShape(pres.ShapeType.roundRect, { x: 0.62, y: y, w: 3.10, h: 1.05, fill: { color: i % 2 === 0 ? GREEN : FAWN }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(g.t, { x: 0.85, y: y, w: 2.70, h: 1.05, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(g.d, { x: 4.00, y: y, w: 8.5, h: 1.05, fontSize: 13, color: BODY, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 19 });
  });
  card(s, { x: 0.62, y: 6.28, w: 12.10, h: 0.68, fill: INK });
  s.addText("센서는 사람을 대체하는 것이 아니라, 사람이 봐야 할 소를 골라주는 장치입니다", { x: 0.90, y: 6.28, w: 11.5, h: 0.68, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("현장 경험담을 하나 붙일 것 — 놓친 발정 한 번의 손실(21일 × 사료비 + 유량 손실)을 금액으로 환산해 말하면 설득력이 크다.");
}

/* 24. 볼러스 원리 */
{
  const s = S();
  kick(s, "04 스마트 사양관리");
  T(s, "위내센서(볼러스) — 소의 몸 안에서 직접 측정합니다");
  plain(s, "캡슐형 센서를 경구 투여하면 제2위(벌집위)에 자리 잡아 사육 기간 동안 지속적으로 생체 신호를 측정하고,\n무선으로 데이터를 전송합니다. 목걸이·발목 센서와 달리 체내 지표를 직접 잡는다는 점이 다릅니다.", { x: 0.62, y: 1.25, w: 12.1, h: 0.75, fontSize: 13.5, color: MUTED, ls: 20 });
  const m = [
    { t: "반추위 온도", d: "체온 변화 → 발열·염증\n분만 전 체온 하강 감지" },
    { t: "음수 행동", d: "음수 횟수·음수량 급감은\n질병의 조기 신호" },
    { t: "활동량", d: "활동량 급증 → 발정\n급감 → 통증·질병 의심" },
    { t: "반추위 pH", d: "산독증(SARA) 위험 판단\n사료 급여 설계 검증" }
  ];
  m.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 2.20, w: 2.88, h: 1.90, fill: TINT, shadow: true });
    s.addText(c.t, { x: x + 0.18, y: 2.40, w: 2.52, h: 0.45, fontSize: 15, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.18, y: 2.92, w: 2.52, h: 1.00, fontSize: 12, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 18 });
  });
  card(s, { x: 0.62, y: 4.35, w: 12.10, h: 1.75, fill: TINT2, line: "D8E0D2" });
  plain(s, "현장 도입 시 유의점", { x: 0.95, y: 4.55, w: 11.4, h: 0.36, fontSize: 15, bold: true, color: FAWN });
  plain(s, "· 센서는 '진단'이 아니라 '위험 신호'를 줍니다. 최종 판단은 수의사와 관리자의 몫입니다.\n· 알림이 너무 많으면 농가는 곧 무시하게 됩니다 — 알림 설계가 센서 성능만큼 중요합니다.\n· 통신 환경(축사 내 게이트웨이·전원)이 확보되지 않으면 데이터가 끊깁니다. 설치 전 사전 점검이 필요합니다.", { x: 0.95, y: 4.98, w: 11.4, h: 1.00, fontSize: 12.5, color: BODY, ls: 20 });
  card(s, { x: 0.62, y: 6.32, w: 12.10, h: 0.60, fill: INK });
  s.addText("측정은 기술이지만, 알림을 몇 개로 줄이느냐는 운영의 문제입니다", { x: 0.90, y: 6.32, w: 11.5, h: 0.60, fontSize: 14, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("센서를 팔러 온 것처럼 보이면 안 된다. 한계와 유의점을 먼저 말하는 것이 오히려 신뢰를 만든다. 알림 피로(alert fatigue)는 실제로 가장 큰 실패 원인.");
}

/* 25. CowTalk 흐름 */
{
  const s = S();
  kick(s, "04 스마트 사양관리");
  T(s, "CowTalk AI — 데이터가 '할 일'로 바뀌는 구간");
  const f = [
    { t: "① 수집", d: "위내센서\n온도·음수·활동량·pH", c: MOSS },
    { t: "② 해석", d: "개체별 기준선 대비\n이상 패턴 탐지", c: GREEN },
    { t: "③ 판단", d: "발정 / 분만 임박 /\n질병 위험도 산출", c: GREEND },
    { t: "④ 알림", d: "관리자·수의사에게\n우선순위로 전달", c: FAWN },
    { t: "⑤ 조치·기록", d: "수정·진료·처치 결과를\n다시 입력 → 정확도 개선", c: "8A5A22" }
  ];
  f.forEach((c, i) => {
    const x = 0.62 + i * 2.47;
    card(s, { x: x, y: 1.55, w: 2.24, h: 1.95, fill: c.c });
    s.addText(c.t, { x: x + 0.10, y: 1.72, w: 2.04, h: 0.48, align: "center", fontSize: 14.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.12, y: 2.25, w: 2.00, h: 1.10, align: "center", fontSize: 11.5, color: W, fontFace: FONT, margin: 0, lineSpacing: 17 });
    if (i < 4) arrow(s, x + 2.30, 2.40);
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.62, y: 3.68, w: 12.10, h: 0.42, fill: { color: MOSSL }, line: { type: "none" }, rectRadius: 0.08 });
  s.addText("↺   조치 결과가 다시 학습 데이터가 됩니다 — 쓸수록 그 목장에 맞아 갑니다", { x: 0.62, y: 3.68, w: 12.10, h: 0.42, align: "center", valign: "middle", fontSize: 13, bold: true, color: GREEND, fontFace: HEAD, margin: 0 });

  card(s, { x: 0.62, y: 4.38, w: 5.95, h: 2.25, fill: TINT });
  plain(s, "농가가 받는 화면", { x: 0.95, y: 4.58, w: 5.3, h: 0.36, fontSize: 15, bold: true, color: GREEND });
  body(s, ["오늘 봐야 할 소 목록 (우선순위)", "수정 적기 알림", "분만 임박 알림", "개체별 이력 카드"], { x: 0.95, y: 5.02, w: 5.35, h: 1.50, fontSize: 12.5 });
  card(s, { x: 6.77, y: 4.38, w: 5.95, h: 2.25, fill: TINT2, line: "E0E6DB" });
  plain(s, "수의사·지도사가 받는 화면", { x: 7.10, y: 4.58, w: 5.3, h: 0.36, fontSize: 15, bold: true, color: FAWN });
  body(s, ["담당 농가 전체의 이상 개체 현황", "번식 성적·공태일수 추이", "질병 발생 패턴", "방문 우선순위 자동 정렬"], { x: 7.10, y: 5.02, w: 5.35, h: 1.50, fontSize: 12.5 });
  foot(s, "※ 임상 결과는 확진이 아니라 위험도·확률로 제공됩니다.");
  s.addNotes("④→⑤의 되먹임이 핵심. 그리고 오른쪽 카드(수의사·지도사 화면)가 오늘 청중에게 직접 관련된 부분 — 지도 업무에 쓸 수 있다는 점을 강조.");
}

/* 26. 활용 시나리오 */
{
  const s = S();
  kick(s, "04 스마트 사양관리");
  T(s, "현장에서 실제로 쓰는 네 가지 장면");
  const sc = [
    { n: "01", t: "발정 탐지 — 특히 미약발정", d: "활동량 패턴 변화로 야간·미약 발정을 잡아냅니다.\n수정 적기 알림 → 공태일수 단축 → 산차 간격 개선으로 이어지는 것을 기대합니다." },
    { n: "02", t: "분만 임박 감지", d: "분만 전 체온 하강과 행동 변화를 신호로 활용합니다.\n입회 분만이 가능해지면 난산 대응과 초유 급여 타이밍이 좋아집니다. 저지 송아지에게 특히 중요합니다." },
    { n: "03", t: "질병 조기 신호", d: "음수 급감·체온 상승·활동량 저하의 조합을 위험 신호로 봅니다.\n증상이 보이기 전에 확인하러 가는 것 — 이것이 가장 큰 변화입니다." },
    { n: "04", t: "사료·급여 설계 검증", d: "반추위 지표로 사료 변경의 영향을 확인합니다.\n'바꿨더니 좋아진 것 같다'가 아니라 데이터로 확인하고 되돌릴 수 있습니다." }
  ];
  sc.forEach((c, i) => {
    const x = 0.62 + (i % 2) * 6.28;
    const y = 1.42 + Math.floor(i / 2) * 2.62;
    card(s, { x: x, y: y, w: 5.98, h: 2.42, fill: TINT2, line: "E0E6DB" });
    badge(s, x + 0.26, y + 0.26, c.n, { fill: i % 2 === 0 ? GREEN : FAWN, d: 0.50, fs: 13 });
    s.addText(c.t, { x: x + 0.88, y: y + 0.22, w: 4.90, h: 0.58, fontSize: 15, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.30, y: y + 0.92, w: 5.40, h: 1.34, fontSize: 12.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 19 });
  });
  foot(s, "※ 효과는 목장 여건에 따라 달라지며, 정량 성과는 실증을 통해 확인되어야 합니다.");
  s.addNotes("각 시나리오마다 실제 겪은 사례를 한 문장씩 붙인다. 특히 02(분만)는 저지 송아지 폐사 감소와 직결되므로 앞 파트와 연결해서 설명.");
}

/* 27. 비용구조 */
{
  const s = S();
  kick(s, "04 스마트 사양관리");
  T(s, "농가가 가장 먼저 묻는 것 — '얼마입니까'");
  const c1 = [
    { n: "500만원", l: "목장당 설치비\n(게이트웨이 등 기반 설비 포함)" },
    { n: "월 12,000원", l: "두당 월 관리·구독료" },
    { n: "4년", l: "센서 유지 기간\n기간 내 고장 시 무상 교체" }
  ];
  c1.forEach((c, i) => {
    statCard(s, { x: 0.62 + i * 4.10, y: 1.45, w: 3.88, h: 1.95, num: c.n, label: c.l, numColor: FAWN, numSize: 28, fill: TINT });
  });
  card(s, { x: 0.62, y: 3.65, w: 5.95, h: 2.55, fill: TINT2, line: "E0E6DB" });
  plain(s, "농가 판단 기준으로 바꾸면", { x: 0.95, y: 3.85, w: 5.3, h: 0.36, fontSize: 15, bold: true, color: GREEND });
  body(s, [
    "공태일수 단축 → 1일 단축당 손실 회피액으로 환산",
    "폐사·도태 1두 회피 시 회수되는 금액과 비교",
    "치료비 절감보다 '조기 발견으로 인한 회복 속도'가 큽니다",
    "노동시간 절감(관찰·발정 확인)도 비용입니다"
  ], { x: 0.95, y: 4.30, w: 5.35, h: 1.80, fontSize: 12.5 });
  card(s, { x: 6.77, y: 3.65, w: 5.95, h: 2.55, fill: MOSSL });
  plain(s, "보급 관점의 병목", { x: 7.10, y: 3.85, w: 5.3, h: 0.36, fontSize: 15, bold: true, color: GREEND });
  body(s, [
    "초기 설치비가 소규모 농가에는 진입장벽입니다",
    "효과가 6개월~1년 뒤에 나타나 체감이 늦습니다",
    "데이터를 읽어줄 사람(수의사·지도사)이 옆에 있어야 정착합니다",
    "→ 지원사업 + 판독 지원이 함께 가야 성공률이 올라갑니다"
  ], { x: 7.10, y: 4.30, w: 5.35, h: 1.80, fontSize: 12.5 });
  foot(s, "※ 국내 독점 공급 및 데이터 연동(API) 체계를 보유하고 있어, 지역 단위 일괄 도입·운영 지원이 가능합니다.");
  s.addNotes("가격은 공개 가능한 범위만 말한다. 원가·마진 구조는 절대 언급하지 않는다. 마지막 '지원사업+판독 지원' 문장이 시범사업 제안 3번으로 이어진다.");
}

/* 28. Eco-BIT 확장 */
{
  const s = S(true);
  kick(s, "04 스마트 사양관리", MOSS);
  T(s, "데이터가 목장 밖으로 나가면, 행정의 도구가 됩니다", { color: W });
  plain(s, "개별 농가의 센서 데이터는 목장 관리용입니다. 그러나 이것이 지역 단위로 모이면 성격이 달라집니다.", { x: 0.62, y: 1.28, w: 12.1, h: 0.38, fontSize: 13.5, color: MOSSL });
  const lv = [
    { t: "농가", d: "개체 관리\n번식·질병·분만 알림", c: INK2 },
    { t: "수의사 · 지도기관", d: "담당 농가 전체 현황\n방문 우선순위 판단", c: GREEN },
    { t: "시·군 / 도", d: "지역 사육·번식·질병 통계\n방역 의사결정 지원", c: FAWN },
    { t: "국가", d: "축산 데이터 표준화\n생산성·탄소 지표 산출", c: "8A5A22" }
  ];
  lv.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 1.78, w: 2.88, h: 1.85, fill: c.c });
    s.addText(c.t, { x: x + 0.16, y: 1.95, w: 2.56, h: 0.50, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.16, y: 2.48, w: 2.56, h: 1.05, fontSize: 12, color: W, fontFace: FONT, margin: 0, lineSpacing: 18 });
    if (i < 3) arrow(s, x + 2.94, 2.60);
  });
  card(s, { x: 0.62, y: 3.88, w: 12.10, h: 2.22, fill: INK2 });
  plain(s, "기술보급 관점에서 이 구조가 갖는 의미", { x: 0.95, y: 4.06, w: 11.4, h: 0.38, fontSize: 15.5, bold: true, color: FAWNL });
  body(s, [
    "지도사업의 성과를 '느낌'이 아니라 데이터로 보고할 수 있습니다 (사업 전/후 비교)",
    "시범사업 참여 농가의 변화를 실시간으로 추적할 수 있어, 중도 이탈·실패를 조기에 잡습니다",
    "축종·지역별 표준 성적을 축적하면, 다음 사업의 목표치를 근거 있게 설정할 수 있습니다",
    "방역·질병 조기감지와 연결되면 공공 가치가 개별 농가 이익을 넘어섭니다"
  ], { x: 0.95, y: 4.52, w: 11.4, h: 1.50, fontSize: 12.5, color: W });
  card(s, { x: 0.62, y: 6.25, w: 12.10, h: 0.65, fill: FAWN });
  s.addText("정밀낙농은 농가의 도구이면서, 동시에 축산행정의 인프라입니다", { x: 0.90, y: 6.25, w: 11.5, h: 0.65, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("이 장은 국립축산과학원 입장에서 가장 흥미로울 부분. '지도사업 성과를 데이터로 보고할 수 있다'는 점을 강조 — 담당자들의 실제 고충이다.");
}

/* =========================================================
   SECTION 5 — 유가공
========================================================= */
sectionSlide("05", "유가공과 판매", "PROCESSING & DIRECT SALES",
  "20분. 유가공 실무. 하려는 농가가 가장 궁금해하는 인허가·설비·판로를 구체적으로.");

/* 30. 왜 가공 */
{
  const s = S();
  kick(s, "05 유가공과 판매");
  T(s, "원유를 팔면 값이 정해져 있고, 제품을 팔면 값을 정합니다");
  card(s, { x: 0.62, y: 1.42, w: 5.95, h: 2.10, fill: TINT2 });
  plain(s, "원유 판매", { x: 0.95, y: 1.60, w: 5.3, h: 0.40, fontSize: 17, bold: true, color: MUTED });
  plain(s, "· 유대는 협상과 제도로 결정됩니다\n· 품질 차이가 값에 온전히 반영되기 어렵습니다\n· 우리 목장의 이름이 소비자에게 남지 않습니다", { x: 0.95, y: 2.05, w: 5.35, h: 1.30, fontSize: 12.5, color: BODY, ls: 20 });
  card(s, { x: 6.77, y: 1.42, w: 5.95, h: 2.10, fill: MOSSL });
  plain(s, "제품 판매", { x: 7.10, y: 1.60, w: 5.3, h: 0.40, fontSize: 17, bold: true, color: GREEND });
  plain(s, "· 가격 결정권을 우리가 가집니다\n· 유지방·유단백이 높을수록 유리합니다\n· 브랜드와 재구매 고객이 자산으로 남습니다", { x: 7.10, y: 2.05, w: 5.35, h: 1.30, fontSize: 12.5, color: BODY, ls: 20 });

  s.addChart(pres.ChartType.bar, [
    { name: "부가가치 (원유 판매 = 100 기준)", labels: ["원유 판매", "우유 제품", "요거트·그릭", "카이막·아이스크림"], values: [100, 180, 260, 340] }
  ], {
    x: 0.62, y: 3.72, w: 7.30, h: 2.60,
    barDir: "col", showTitle: true, title: "가공 단계별 부가가치 개념도 (원유 판매를 100으로 둔 상대 비교)",
    titleFontSize: 12, titleColor: GREEND, titleFontFace: HEAD,
    chartColors: [MOSS, GREEN, FAWN, "8A5A22"], varyColors: true,
    showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 11, dataLabelColor: BODY, dataLabelFontFace: FONT,
    catAxisLabelColor: MUTED, valAxisLabelColor: MUTED, catAxisLabelFontSize: 11, valAxisLabelFontSize: 10,
    catAxisLabelFontFace: FONT, valAxisLabelFontFace: FONT,
    valGridLine: { color: "E6EBE3", size: 1 }, catGridLine: { style: "none" },
    showLegend: false, valAxisMaxVal: 400, barGapWidthPct: 55
  });
  card(s, { x: 8.20, y: 3.72, w: 4.52, h: 2.60, fill: TINT });
  plain(s, "다만 정직하게 말씀드리면", { x: 8.50, y: 3.92, w: 3.9, h: 0.36, fontSize: 14.5, bold: true, color: FAWN });
  plain(s, "가공은 부가가치만 오는 것이 아니라\n설비 투자, 위생 관리, 인허가,\n유통기한 관리, 재고와 반품,\n그리고 무엇보다 '판매'라는\n완전히 다른 일이 함께 옵니다.\n\n목장 일과 가공 일은 다른 일입니다.", { x: 8.50, y: 4.35, w: 3.92, h: 1.85, fontSize: 12, color: BODY, ls: 19 });
  foot(s, "※ 부가가치 그래프는 실제 회계 수치가 아니라 가공 단계에 따른 상대적 구조를 설명하기 위한 개념도입니다.");
  s.addNotes("개념도임을 반드시 밝힌다. 오른쪽 '정직하게 말씀드리면' 박스가 이 장의 진짜 메시지 — 가공을 권하되 환상을 심지 않는다.");
}

/* 31. 제품 라인업 */
{
  const s = S();
  kick(s, "05 유가공과 판매");
  T(s, "제품 라인업 — 하나의 원유에서 여섯 갈래로");
  const pr = [
    { t: "A2 저지 건초우유", d: "라인업의 기준 제품\n저지 원유의 진한 풍미", c: FAWN },
    { t: "A2 건초우유", d: "대중 접점 제품\n일상 소비·정기구독", c: GREEN },
    { t: "요거트", d: "유단백이 높아\n조직감이 잘 잡힙니다", c: GREEN },
    { t: "그릭요거트", d: "고형분이 높아\n수율에서 유리합니다", c: MOSS },
    { t: "카이막", d: "유지방이 핵심인 제품\n저지 원유의 강점 영역", c: FAWN },
    { t: "아이스크림 · 밀크티", d: "카페·체험 연계\n계절 수요 대응", c: MOSS }
  ];
  pr.forEach((p, i) => {
    const x = 0.62 + (i % 3) * 4.10;
    const y = 1.45 + Math.floor(i / 3) * 2.30;
    card(s, { x: x, y: y, w: 3.88, h: 2.05, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 3.88, h: 0.62, fill: { color: p.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(p.t, { x: x + 0.20, y: y, w: 3.48, h: 0.62, fontSize: 14.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(p.d, { x: x + 0.24, y: y + 0.78, w: 3.40, h: 1.10, fontSize: 12.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 19 });
  });
  card(s, { x: 0.62, y: 6.15, w: 12.10, h: 0.72, fill: INK });
  s.addText("품목을 늘린 이유는 매출이 아니라 '원유를 남기지 않기 위해서'입니다 — 잉여 원유가 제품이 됩니다", { x: 0.90, y: 6.15, w: 11.5, h: 0.72, fontSize: 14.5, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("라인업 확장의 진짜 이유는 원유 수급 변동 흡수. 우유가 안 팔린 날 요거트로 돌린다. 이 운영 논리가 소규모 유가공의 핵심 노하우다.");
}

/* 32. 제품 스펙 */
{
  const s = S();
  kick(s, "05 유가공과 판매");
  T(s, "대표 제품 규격 — A2 저지 건초우유");
  const rows = [
    ["항목", "100 mL 당", "항목", "100 mL 당"],
    ["열량", "92.64 kcal", "트랜스지방", "0.16 g"],
    ["탄수화물", "5.07 g", "포화지방", "4.4 g"],
    ["당류", "4.75 g", "콜레스테롤", "21.7 mg"],
    ["지방", "6.0 g", "단백질", "4.59 g"],
    ["나트륨", "41.8 mg", "", ""]
  ];
  const tr = rows.map((r, ri) => r.map((c, ci) => ({
    text: c,
    options: {
      bold: ri === 0 || ci % 2 === 0,
      color: ri === 0 ? W : BODY,
      fill: { color: ri === 0 ? GREEN : (ri % 2 === 0 ? TINT2 : W) },
      fontSize: 12.5, align: ci % 2 === 0 ? "left" : "right", valign: "middle", fontFace: FONT
    }
  })));
  s.addTable(tr, { x: 0.62, y: 1.45, w: 7.30, colW: [1.95, 1.70, 1.95, 1.70], rowH: 0.46, border: { type: "solid", color: "DDE4D8", pt: 1 } });
  card(s, { x: 8.20, y: 1.45, w: 4.52, h: 3.20, fill: TINT });
  plain(s, "이 숫자가 말하는 것", { x: 8.50, y: 1.65, w: 3.9, h: 0.38, fontSize: 15, bold: true, color: GREEND });
  body(s, [
    "지방 6.0 g / 100 mL — 일반 시유 대비 높은 수준",
    "단백질 4.59 g — 가공 적성이 좋은 구간",
    "진한 맛은 마케팅 문구가 아니라 성분표에 나옵니다"
  ], { x: 8.50, y: 2.15, w: 3.92, h: 2.30, fontSize: 12.5 });
  card(s, { x: 0.62, y: 5.00, w: 12.10, h: 1.50, fill: TINT2, line: "D8E0D2" });
  plain(s, "표시·광고 원칙", { x: 0.95, y: 5.18, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: FAWN });
  plain(s, "성분은 시험성적서 값만 표기하고, 질병 예방·치료를 연상시키는 표현은 사용하지 않습니다.\nA2에 대해서는 '표시' 수준에서 사실만 말하며, 효능은 주장하지 않습니다. 소규모 유가공일수록 표시 위반 리스크 관리가 중요합니다.", { x: 0.95, y: 5.58, w: 11.4, h: 0.75, fontSize: 12.5, color: BODY, ls: 19 });
  foot(s, "※ 성분값은 제품 시험 결과 기준이며, 원유 성분 변동에 따라 로트별 차이가 있을 수 있습니다.");
  s.addNotes("실제 시험 성적 수치이므로 자신 있게 말한다. 다만 로트 변동은 인정. 표시·광고 원칙은 유가공을 시작하는 농가에게 가장 필요한 조언.");
}

/* 33. 공정 */
{
  const s = S();
  kick(s, "05 유가공과 판매");
  T(s, "제조 공정 — 소규모일수록 공정이 단순해야 안전합니다");
  const st = ["집유 · 원유검사", "판형 열교환기", "균질 (Homogenizer)", "살균 75℃ / 20초", "냉각", "충전 · 포장"];
  st.forEach((t, i) => {
    const x = 0.62 + i * 2.06;
    card(s, { x: x, y: 1.65, w: 1.86, h: 1.30, fill: i === 3 ? FAWN : TINT, shadow: true });
    s.addText(t, { x: x + 0.08, y: 1.65, w: 1.70, h: 1.30, align: "center", valign: "middle", fontSize: 12.5, bold: true, color: i === 3 ? W : GREEND, fontFace: HEAD, margin: 0, lineSpacing: 17 });
    if (i < 5) arrow(s, x + 1.90, 2.17);
  });
  const pts = [
    { t: "원유 관리", d: "집유 즉시 냉각·검사. 원유 품질이 나쁘면 공정으로 되돌릴 수 없습니다." },
    { t: "살균 조건", d: "75℃ / 20초 조건으로 운영합니다. 조건 기록은 매 배치 남깁니다." },
    { t: "세척(CIP)", d: "소규모 유가공에서 사고는 대부분 세척 불량에서 납니다. 세척이 곧 품질관리입니다." },
    { t: "유통기한", d: "냉장 체계가 소비자 손까지 이어지는지가 관건 — 배송 포장까지 공정으로 봅니다." },
    { t: "배치 기록", d: "로트별 원유·공정·검사 기록을 남겨야 문제 발생 시 범위를 좁힐 수 있습니다." },
    { t: "인력", d: "가공 전담 인력이 없으면 목장 일과 충돌합니다. 사람 문제가 설비 문제보다 큽니다." }
  ];
  pts.forEach((p, i) => {
    const x = 0.62 + (i % 3) * 4.10;
    const y = 3.30 + Math.floor(i / 3) * 1.72;
    card(s, { x: x, y: y, w: 3.88, h: 1.55, fill: TINT2, line: "E0E6DB" });
    s.addText(p.t, { x: x + 0.22, y: y + 0.16, w: 3.44, h: 0.38, fontSize: 13.5, bold: true, color: FAWN, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(p.d, { x: x + 0.22, y: y + 0.58, w: 3.44, h: 0.85, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 17 });
  });
  s.addNotes("살균 조건은 실제 운영값. CIP(세척) 이야기를 강조 — 소규모 유가공 사고의 대부분이 여기서 난다. 지도 현장에서 농가에게 꼭 전해달라고 부탁.");
}

/* 34. 인허가 체크리스트 */
{
  const s = S();
  kick(s, "05 유가공과 판매");
  T(s, "유가공을 시작하려는 농가에게 — 실무 순서");
  const steps = [
    { n: "1", t: "사업 타당성 먼저", d: "설비보다 판로가 먼저입니다.\n'월 몇 개를 어디에 팔 것인가'가 없으면 시작하지 않는 것이 낫습니다." },
    { n: "2", t: "시설 기준 확인", d: "축산물 가공업(유가공업) 시설 기준에 맞는 작업장·설비 배치를 사전에 확인합니다.\n건축·용도 문제로 되돌아가는 경우가 많습니다." },
    { n: "3", t: "인허가 · 영업 등록", d: "관할 기관과 사전 협의를 거쳐 진행합니다.\n담당자와 미리 도면을 놓고 상의하는 것이 가장 빠릅니다." },
    { n: "4", t: "품목 제조 신고 · 표시사항", d: "품목별 신고와 표시사항(성분·유통기한·보관방법) 준비.\n표시 오류는 나중에 전량 회수로 이어집니다." },
    { n: "5", t: "위생 · 검사 체계", d: "자가품질검사 주기와 기록, 종사자 위생교육·건강진단을 체계로 만듭니다." },
    { n: "6", t: "판로 · 물류 구축", d: "냉장 배송, 포장재, 반품 처리까지 준비되어야 실제 판매가 시작됩니다." }
  ];
  steps.forEach((c, i) => {
    const x = 0.62 + (i % 2) * 6.28;
    const y = 1.42 + Math.floor(i / 2) * 1.78;
    card(s, { x: x, y: y, w: 5.98, h: 1.62, fill: i % 2 === 0 ? TINT : TINT2 });
    badge(s, x + 0.26, y + 0.24, c.n, { fill: GREEN, d: 0.48, fs: 14 });
    s.addText(c.t, { x: x + 0.88, y: y + 0.20, w: 4.90, h: 0.52, fontSize: 14, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.30, y: y + 0.80, w: 5.40, h: 0.72, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 17 });
  });
  foot(s, "※ 인허가 요건은 관계 법령 개정 및 지자체 여건에 따라 달라질 수 있으므로, 반드시 관할 기관과 사전 협의가 필요합니다.");
  s.addNotes("법령 세부 요건은 단정하지 말고 '관할 기관 사전 협의'로 안내. 1번(판로 먼저)이 가장 중요한 조언 — 설비부터 지어 실패한 농가를 많이 봤다고 말한다.");
}

/* 35. 판매채널 */
{
  const s = S();
  kick(s, "05 유가공과 판매");
  T(s, "판매 — 만드는 것보다 파는 것이 어렵습니다");
  card(s, { x: 0.62, y: 1.45, w: 3.88, h: 2.65, fill: FAWN });
  plain(s, "① 자사몰 (D2C)", { x: 0.90, y: 1.68, w: 3.4, h: 0.40, fontSize: 15.5, bold: true, color: W });
  plain(s, "shop.a2jerseymilk.com\n\n· 가격 결정권 확보\n· 고객 데이터가 남습니다\n· 브랜드 이야기를 그대로 전달", { x: 0.90, y: 2.15, w: 3.42, h: 1.75, fontSize: 12.5, color: W, ls: 19 });
  card(s, { x: 4.73, y: 1.45, w: 3.88, h: 2.65, fill: GREEN });
  plain(s, "② 정기구독", { x: 5.01, y: 1.68, w: 3.4, h: 0.40, fontSize: 15.5, bold: true, color: W });
  plain(s, "· 생산 계획을 세울 수 있습니다\n· 신선식품은 재구매가 생명입니다\n· 잉여 원유 리스크를 줄여줍니다\n· 고객 이탈률 관리가 핵심 지표", { x: 5.01, y: 2.15, w: 3.42, h: 1.75, fontSize: 12.5, color: W, ls: 19 });
  card(s, { x: 8.84, y: 1.45, w: 3.88, h: 2.65, fill: MOSS });
  plain(s, "③ B2B · 오프라인", { x: 9.12, y: 1.68, w: 3.4, h: 0.40, fontSize: 15.5, bold: true, color: BODY });
  plain(s, "· 카페·베이커리 납품\n· 프리미엄 식품관·백화점\n· 물량은 크지만 단가 압박\n· 브랜드 노출 효과가 큽니다", { x: 9.12, y: 2.15, w: 3.42, h: 1.75, fontSize: 12.5, color: BODY, ls: 19 });

  card(s, { x: 0.62, y: 4.25, w: 12.10, h: 2.50, fill: TINT2, line: "E0E6DB" });
  plain(s, "소규모 유가공이 판매에서 실패하는 전형적인 이유", { x: 0.95, y: 4.42, w: 11.4, h: 0.38, fontSize: 15, bold: true, color: FAWN });
  body(s, [
    "제품은 좋은데 '왜 비싼지'를 설명하지 못합니다 — 값의 근거(사양·품종·공정)를 보여줘야 합니다",
    "첫 구매는 일어나는데 재구매가 없습니다 — 신선식품은 재구매율이 전부입니다",
    "판매 채널을 늘리기만 하고 관리하지 못합니다 — 채널 하나를 제대로 하는 것이 낫습니다",
    "생산량과 판매량이 어긋납니다 — 정기구독이 이 문제의 가장 현실적인 해법입니다"
  ], { x: 0.95, y: 4.88, w: 11.4, h: 1.75, fontSize: 12.5 });
  s.addNotes("실패 이유 4가지가 이 장의 핵심. 6차산업 지원사업이 시설에만 집중되고 판매 역량 지원이 없다는 점을 부드럽게 지적 — 시범사업 제안 4번의 근거.");
}

/* 36. 6차산업 */
{
  const s = S();
  kick(s, "05 유가공과 판매");
  T(s, "목장이 '가는 곳'이 되면, 우유는 기념품이 됩니다");
  const ex = [
    { n: "카페", d: "목장 우유로 만든 음료·디저트\n제품을 '맛보게' 하는 가장 빠른 방법", c: FAWN },
    { n: "체험", d: "송아지 우유주기, 유제품 만들기\n아이가 오면 부모가 단골이 됩니다", c: GREEN },
    { n: "견학 · 교육", d: "농가·학생·연구자 대상 현장 교육\n기술보급의 전시포 역할", c: MOSS },
    { n: "팜투어", d: "초지·축사·유가공을 잇는 동선\n'순환농업'을 눈으로 보여줍니다", c: "8A5A22" }
  ];
  ex.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 1.55, w: 2.88, h: 2.55, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.55, w: 2.88, h: 0.66, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.n, { x: x + 0.18, y: 1.55, w: 2.52, h: 0.66, fontSize: 16, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.22, y: 2.38, w: 2.44, h: 1.55, fontSize: 12.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 19 });
  });
  card(s, { x: 0.62, y: 4.35, w: 12.10, h: 1.90, fill: MOSSL });
  plain(s, "다만 이것도 정직하게 — 6차산업은 '또 하나의 사업'입니다", { x: 0.95, y: 4.55, w: 11.4, h: 0.38, fontSize: 15, bold: true, color: GREEND });
  plain(s, "카페와 체험은 접객업입니다. 목장 일과 성격이 완전히 다르고, 사람과 안전 관리가 추가로 필요합니다.\n시설 지원만 받고 운영 인력을 준비하지 못한 농가는 대부분 1~2년 안에 문을 닫습니다.\n→ 지원사업 설계 시 '시설비'보다 '운영 역량 지원'이 성패를 가릅니다.", { x: 0.95, y: 5.00, w: 11.4, h: 1.05, fontSize: 12.5, color: BODY, ls: 20 });
  s.addNotes("6차산업 실패 사례를 솔직히 말하는 것이 지도직 청중에게 가장 유용하다. 시설비 중심 지원의 한계를 지적 — 정책 제언으로 자연스럽게 연결.");
}

/* =========================================================
   SECTION 6 — 산업 방향 & 제안
========================================================= */
sectionSlide("06", "낙농산업 방향과 시범사업 제안", "OUTLOOK & PROPOSED PILOT PROJECTS",
  "20분. 오늘 세미나의 목적 지점. 반드시 시간을 남겨서 이 파트를 다 다룬다.");

/* 38. 3대 압력 */
{
  const s = S(true);
  kick(s, "06 산업 방향", MOSS);
  T(s, "현장에서 체감하는 세 가지 압력", { color: W });
  const p = [
    { t: "수요 · 제도", d: "· 우유 소비 구조 변화\n· 수입 유제품 확대\n· 원유 쿼터·유대 체계의 경직성\n· 폐업하는 농가가 늘고 있습니다", c: INK2 },
    { t: "비용 · 환경", d: "· 사료비 변동성 확대\n· 분뇨·악취 규제 강화\n· 탄소 대응 요구 본격화\n· 환경이 비용이 되는 구조", c: GREEN },
    { t: "사람", d: "· 경영주 고령화\n· 승계 단절\n· 숙련 인력 확보난\n· 노동 강도가 진입을 막습니다", c: FAWN }
  ];
  p.forEach((c, i) => {
    const x = 0.62 + i * 4.10;
    card(s, { x: x, y: 1.50, w: 3.88, h: 3.05, fill: c.c });
    s.addText(c.t, { x: x + 0.22, y: 1.72, w: 3.44, h: 0.50, fontSize: 18, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.22, y: 2.35, w: 3.44, h: 2.00, fontSize: 13, color: W, fontFace: FONT, margin: 0, lineSpacing: 21 });
  });
  card(s, { x: 0.62, y: 4.85, w: 12.10, h: 1.95, fill: INK2 });
  plain(s, "그런데 이 세 가지는 서로 연결되어 있습니다", { x: 0.95, y: 5.05, w: 11.4, h: 0.40, fontSize: 16, bold: true, color: FAWNL });
  plain(s, "두수를 늘려 수익을 맞추려 하면 → 환경 부담과 노동 강도가 커지고 → 사람이 더 버티지 못합니다.\n같은 방향으로 더 밀어붙이는 방식으로는 이 세 개를 동시에 풀 수 없습니다.\n저희가 저지 · 환경 · 데이터 · 가공으로 방향을 튼 이유가 여기에 있습니다.", { x: 0.95, y: 5.50, w: 11.4, h: 1.10, fontSize: 13.5, color: W, ls: 21 });
  s.addNotes("비관으로 끝내지 않는다. 세 압력이 연결되어 있으므로 '규모 확대'라는 단일 해법이 더는 통하지 않는다는 논리로 다음 장의 방향 제시로 넘어간다.");
}

/* 39. 방향 4가지 */
{
  const s = S();
  kick(s, "06 산업 방향");
  T(s, "현장에서 보는 낙농의 방향 — 네 가지 전환");
  const d = [
    { n: "01", a: "규모", b: "가치", d: "두수 경쟁 대신 품종·유전형·사양방식으로 원유의 성격 자체를 차별화합니다.\n작은 목장이 살아남는 유일한 길은 '다른 우유'를 만드는 것입니다." },
    { n: "02", a: "비용", b: "자산", d: "분뇨와 악취를 처리 대상이 아니라 퇴비·탄소 자원으로 전환합니다.\n환경 규제를 방어가 아니라 기회로 바꾸는 설계가 필요합니다." },
    { n: "03", a: "경험", b: "데이터", d: "숙련의 감(感)은 승계되지 않지만 데이터는 승계됩니다.\n고령화·인력난 시대에 정밀낙농은 선택이 아니라 대응책입니다." },
    { n: "04", a: "원유", b: "브랜드", d: "원유 납품만으로는 가격 결정권이 없습니다.\n가공·직판으로 소비자와 직접 연결되는 농가가 늘어야 합니다." }
  ];
  d.forEach((c, i) => {
    const y = 1.40 + i * 1.36;
    card(s, { x: 0.62, y: y, w: 12.10, h: 1.20, fill: i % 2 === 0 ? TINT : TINT2 });
    badge(s, 0.88, y + 0.36, c.n, { fill: i % 2 === 0 ? GREEN : FAWN, d: 0.50, fs: 13 });
    s.addText(c.a, { x: 1.55, y: y + 0.10, w: 1.35, h: 0.45, align: "center", fontSize: 15, bold: true, color: MUTED, fontFace: HEAD, margin: 0, valign: "middle" });
    arrow(s, 2.95, y + 0.22);
    s.addText(c.b, { x: 3.40, y: y + 0.10, w: 1.35, h: 0.45, align: "center", fontSize: 15, bold: true, color: i % 2 === 0 ? GREEND : FAWN, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: 1.55, y: y + 0.58, w: 10.85, h: 0.58, fontSize: 12.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 18 });
  });
  card(s, { x: 0.62, y: 6.85, w: 12.10, h: 0.001, fill: W });
  s.addNotes("네 전환이 각각 앞의 파트 02~05와 1:1로 대응한다는 점을 짚어준다. 발표 전체가 이 한 장으로 요약된다.");
}

/* 40. 제안 개요 */
{
  const s = S(true);
  kick(s, "06 시범사업 제안", MOSS);
  T(s, "제안 — 함께 해볼 수 있는 시범사업 5건", { color: W });
  plain(s, "오늘 말씀드린 내용 중, 국립축산과학원의 측정·검증 역량이 붙으면 산업 전체가 쓸 수 있게 되는 것들을 뽑았습니다.", { x: 0.62, y: 1.26, w: 12.1, h: 0.38, fontSize: 13.5, color: MOSSL });
  const pj = [
    { n: "A", t: "저지 · A2A2 축군 조성 실증", d: "수정란이식 기반 증식 모델", c: FAWN },
    { n: "B", t: "피트모스 HBP 악취저감 정량 실증", d: "악취물질·체세포·경제성 측정", c: GREEN },
    { n: "C", t: "정밀낙농 센서 현장 실증", d: "번식성적·질병 조기발견 효과 검증", c: MOSS },
    { n: "D", t: "소규모 유가공 표준모델 개발", d: "인허가~판로까지 농가 매뉴얼화", c: "8A5A22" },
    { n: "E", t: "축산 순환농업 퇴비 품질 실증", d: "HBP 배출물의 비료 품질·환원 효과", c: INK2 }
  ];
  pj.forEach((p, i) => {
    const x = 0.62 + i * 2.47;
    card(s, { x: x, y: 1.85, w: 2.24, h: 3.35, fill: p.c });
    s.addText(p.n, { x: x, y: 2.05, w: 2.24, h: 0.70, align: "center", fontSize: 34, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(p.t, { x: x + 0.14, y: 2.85, w: 1.96, h: 1.15, align: "center", fontSize: 13, bold: true, color: W, fontFace: HEAD, margin: 0, lineSpacing: 18, valign: "top" });
    s.addText(p.d, { x: x + 0.14, y: 4.05, w: 1.96, h: 1.00, align: "center", fontSize: 11, color: i === 2 ? BODY : MOSSL, fontFace: FONT, margin: 0, lineSpacing: 16 });
  });
  card(s, { x: 0.62, y: 5.50, w: 12.10, h: 1.35, fill: INK2 });
  plain(s, "공통 원칙", { x: 0.95, y: 5.65, w: 11.4, h: 0.34, fontSize: 14, bold: true, color: FAWNL });
  plain(s, "① 대조구를 두고 측정합니다 ② 측정은 공인 방법으로 합니다 ③ 결과는 실패도 포함해 공개합니다\n④ 마지막 산출물은 논문이 아니라 '농가가 따라 할 수 있는 매뉴얼'이어야 합니다", { x: 0.95, y: 6.02, w: 11.4, h: 0.70, fontSize: 12.5, color: W, ls: 19 });
  s.addNotes("여기서 톤을 바꾼다 — 부탁이 아니라 제안. 공통 원칙 ③(실패도 공개)과 ④(매뉴얼)가 진정성을 보여주는 부분.");
}

/* 41. 제안 상세 A-C */
{
  const s = S();
  kick(s, "06 시범사업 제안");
  T(s, "제안 과제 상세 (1/2)");
  const pj = [
    {
      n: "A", t: "저지 · A2A2 축군 조성 실증", c: FAWN,
      goal: "수정란이식으로 특정 형질(A2A2·고유지방) 축군을 조성하는 모델의 재현성 검증",
      does: "공란우 선발 · 수정란 공급 · 이식 시술 · 유전형 검사 · 후대 성적 추적",
      need: "유전형 검사 지원, 후대 유성분·산유 성적의 객관적 검정, 경제성 분석"
    },
    {
      n: "B", t: "피트모스 HBP 악취저감 정량 실증", c: GREEN,
      goal: "HBP 운영 구간과 대조 구간의 악취물질 농도 및 사육 성적 차이를 정량 측정",
      does: "HBP 구간 운영 · 관리 SOP 준수 · 교반/수분/보충 기록 제공",
      need: "암모니아·황화수소 등 악취물질 공인 측정, 체세포·유방염 데이터 대조 분석"
    },
    {
      n: "C", t: "정밀낙농 센서 현장 실증", c: MOSS,
      goal: "위내센서 도입 전후의 번식성적·질병 조기발견 효과를 수치로 확인",
      does: "센서 설치·운영, 알림 대응 기록, 수의사 판독 기록 제공",
      need: "도입 전후 공태일수·수태율·질병 발생률의 통계적 검증, 경제성 평가"
    }
  ];
  pj.forEach((p, i) => {
    const x = 0.62 + i * 4.10;
    card(s, { x: x, y: 1.40, w: 3.88, h: 5.25, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.40, w: 3.88, h: 0.85, fill: { color: p.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(p.n + ".  " + p.t, { x: x + 0.20, y: 1.40, w: 3.48, h: 0.85, fontSize: 13.5, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0, valign: "middle", lineSpacing: 17 });
    const blocks = [["목표", p.goal], ["목장이 제공", p.does], ["연구기관에 요청", p.need]];
    blocks.forEach((b, bi) => {
      const y = 2.42 + bi * 1.42;
      s.addText(b[0], { x: x + 0.22, y: y, w: 3.44, h: 0.30, fontSize: 11.5, bold: true, color: p.c === MOSS ? GREEND : p.c, fontFace: HEAD, margin: 0 });
      s.addText(b[1], { x: x + 0.22, y: y + 0.32, w: 3.44, h: 1.00, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 17 });
    });
  });
  s.addNotes("각 과제는 '목장이 낼 것 / 연구기관이 해주실 것'을 명확히 나눴다는 점을 강조. 일방적 요청이 아니라 역할 분담이라는 인상을 준다.");
}

/* 42. 제안 상세 D-E */
{
  const s = S();
  kick(s, "06 시범사업 제안");
  T(s, "제안 과제 상세 (2/2)");
  const pj = [
    {
      n: "D", t: "소규모 유가공 표준모델 개발", c: "8A5A22",
      goal: "‘목장형 유가공’을 시작하려는 농가가 그대로 따라 할 수 있는 표준 절차와 실패 사례집 제작",
      does: "인허가 경험, 설비 구성, 공정·위생 관리 기준, 판매 채널 운영 실무, 실패 사례 공개",
      need: "표준 매뉴얼화, 위생·표시 기준 정리, 규모별 경제성 모델, 교육 프로그램 설계"
    },
    {
      n: "E", t: "축산 순환농업 퇴비 품질 실증", c: INK2,
      goal: "HBP 배출 깔짚의 퇴비 품질과 토양·조사료 환원 효과를 검증하고 활용 기준을 마련",
      does: "배출 깔짚 시료 제공, 후숙 공정 운영, 초지 환원 시험포 운영",
      need: "부숙도·비료성분·유해성분 분석, 토양 개선 효과 평가, 활용 가이드라인 도출"
    }
  ];
  pj.forEach((p, i) => {
    const x = 0.62 + i * 6.28;
    card(s, { x: x, y: 1.40, w: 5.98, h: 3.60, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.40, w: 5.98, h: 0.72, fill: { color: p.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(p.n + ".  " + p.t, { x: x + 0.22, y: 1.40, w: 5.54, h: 0.72, fontSize: 14.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    const blocks = [["목표", p.goal], ["목장이 제공", p.does], ["연구기관에 요청", p.need]];
    blocks.forEach((b, bi) => {
      const y = 2.28 + bi * 0.88;
      s.addText(b[0], { x: x + 0.24, y: y, w: 1.55, h: 0.72, fontSize: 11.5, bold: true, color: p.c, fontFace: HEAD, margin: 0, valign: "top" });
      s.addText(b[1], { x: x + 1.85, y: y, w: 3.95, h: 0.80, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 17, valign: "top" });
    });
  });
  card(s, { x: 0.62, y: 5.25, w: 12.10, h: 1.60, fill: MOSSL });
  plain(s, "다섯 과제를 관통하는 한 가지 요청", { x: 0.95, y: 5.45, w: 11.4, h: 0.38, fontSize: 15, bold: true, color: GREEND });
  plain(s, "농가는 '해봤더니 좋더라'까지는 말할 수 있지만, '얼마나 좋아졌다'는 증명할 수 없습니다.\n그 측정과 검증을 국가 연구기관이 해주시면, 저희 목장의 경험은 한 농가의 사례가 아니라 산업의 자산이 됩니다.", { x: 0.95, y: 5.90, w: 11.4, h: 0.80, fontSize: 13, color: BODY, ls: 20 });
  s.addNotes("이 마지막 요청 문장이 발표 전체의 결론. 천천히, 힘주어 말한다.");
}

/* 43. 로드맵 */
{
  const s = S();
  kick(s, "06 시범사업 제안");
  T(s, "추진 로드맵 (안) — 3년");
  const yr = [
    { y: "1년차", t: "실증", c: MOSS, l: ["대조구 설계 및 기초 데이터 확보", "HBP·센서 구간 운영 개시", "측정 항목·방법 표준 확정", "저지 A2A2 축군 조성 착수"] },
    { y: "2년차", t: "확산", c: GREEN, l: ["인근 희망 농가로 실증 확대", "농가용 관리 SOP 초안 배포", "현장 교육·견학 프로그램 운영", "중간 성과 분석 및 보완"] },
    { y: "3년차", t: "표준화", c: FAWN, l: ["표준 매뉴얼·가이드라인 확정", "규모별 경제성 모델 공개", "실패 사례집 포함 결과 발표", "전국 보급 사업 설계 근거 제공"] }
  ];
  yr.forEach((c, i) => {
    const x = 0.62 + i * 4.10;
    card(s, { x: x, y: 1.50, w: 3.88, h: 3.85, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.50, w: 3.88, h: 0.95, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.y, { x: x + 0.22, y: 1.58, w: 3.44, h: 0.40, fontSize: 13, bold: true, color: i === 0 ? BODY : W, fontFace: FONT, margin: 0 });
    s.addText(c.t, { x: x + 0.22, y: 1.95, w: 3.44, h: 0.44, fontSize: 20, bold: true, color: i === 0 ? BODY : W, fontFace: HEAD, margin: 0 });
    body(s, c.l, { x: x + 0.26, y: 2.62, w: 3.38, h: 2.55, fontSize: 12.5 });
    if (i < 2) arrow(s, x + 3.94, 3.30);
  });
  card(s, { x: 0.62, y: 5.60, w: 12.10, h: 1.28, fill: INK });
  plain(s, "3년 뒤 남는 것", { x: 0.95, y: 5.75, w: 11.4, h: 0.34, fontSize: 14, bold: true, color: FAWNL });
  plain(s, "① 공인 측정으로 검증된 기술 효과 데이터  ② 농가가 따라 할 수 있는 표준 매뉴얼  ③ 규모별 경제성 모델\n④ 실패 사례까지 담긴 보급 자료  ⑤ 다음 국가 보급사업의 설계 근거", { x: 0.95, y: 6.12, w: 11.4, h: 0.68, fontSize: 12.5, color: W, ls: 19 });
  s.addNotes("로드맵은 '안'임을 명시. 협의로 바꿀 수 있다는 열린 자세를 보인다. 3년 뒤 남는 것 5가지가 기술보급 부서의 성과 지표와 맞물린다.");
}

/* 44. 협력 제안 */
{
  const s = S();
  kick(s, "06 시범사업 제안");
  T(s, "송영신목장을 '현장 실증 거점'으로 써주십시오");
  card(s, { x: 0.62, y: 1.45, w: 5.95, h: 4.30, fill: TINT });
  plain(s, "저희가 제공할 수 있는 것", { x: 0.95, y: 1.65, w: 5.3, h: 0.40, fontSize: 16.5, bold: true, color: GREEND });
  body(s, [
    "실증 구간과 대조 구간을 나눈 축사 공간",
    "저지·홀스타인 축군과 개체별 사육·번식 이력",
    "센서 기반 실시간 생체 데이터 (동의 범위 내)",
    "HBP 운영 기록 — 교반·수분·보충·바닥 상태",
    "유가공 공정·품질·판매 데이터",
    "수의사가 직접 기록한 진료·번식 데이터",
    "농가 견학·교육을 수용할 동선과 인력",
    "성공뿐 아니라 실패 사례의 공개"
  ], { x: 0.95, y: 2.20, w: 5.35, h: 3.35, fontSize: 13 });
  card(s, { x: 6.77, y: 1.45, w: 5.95, h: 4.30, fill: MOSSL });
  plain(s, "요청드리고 싶은 것", { x: 7.10, y: 1.65, w: 5.3, h: 0.40, fontSize: 16.5, bold: true, color: GREEND });
  body(s, [
    "공인된 측정과 분석 (악취·퇴비·유질·성적)",
    "실증 설계 자문 — 대조구·표본수·기간 설계",
    "시범사업 과제로의 편입 검토",
    "결과의 매뉴얼화 및 보급 채널 연계",
    "필요한 경우 관련 기준·표시 제도 검토",
    "타 기관·타 지역 실증과의 데이터 연계",
    "지도직 대상 현장 교육의 장으로 활용",
    "농가 대상 공개 성과 발표의 기회"
  ], { x: 7.10, y: 2.20, w: 5.35, h: 3.35, fontSize: 13 });
  card(s, { x: 0.62, y: 5.98, w: 12.10, h: 0.90, fill: FAWN });
  s.addText("저희는 데이터를 열고, 실패까지 공개하겠습니다 — 대신 그 결과가 저희 목장이 아니라 산업에 남게 해주십시오", { x: 0.90, y: 5.98, w: 11.5, h: 0.90, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("가장 중요한 장. 주고받는 관계를 명확히 제시. '데이터를 열겠다'는 약속이 이 제안의 무게를 만든다.");
}

/* 45. 마무리 */
{
  const s = S(true);
  s.addShape(pres.ShapeType.ellipse, { x: 10.10, y: -1.90, w: 5.60, h: 5.60, fill: { color: INK2 }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: 11.60, y: 4.90, w: 2.80, h: 2.80, fill: { color: GREEND }, line: { type: "none" } });
  s.addText("맺으며", { x: 0.75, y: 1.35, w: 9.0, h: 0.40, fontSize: 13, bold: true, color: FAWN, fontFace: FONT, margin: 0, charSpacing: 1.5 });
  s.addText("건강한 흙이 건강한 풀을 만들고,\n건강한 풀이 건강한 소를 만들고,\n건강한 소가 좋은 우유를 만듭니다.", { x: 0.75, y: 1.95, w: 9.3, h: 2.10, fontSize: 30, bold: true, color: W, fontFace: HEAD, margin: 0, lineSpacing: 46 });
  s.addText("저희 목장이 특별해서가 아니라, 이 순환이 실제로 도는지 확인할 수 있는 자리이기 때문에\n오늘 자료를 준비했습니다. 결과가 어떻게 나오든 열어두겠습니다.", { x: 0.75, y: 4.30, w: 9.3, h: 0.90, fontSize: 14, color: MOSSL, fontFace: FONT, margin: 0, lineSpacing: 24 });
  card(s, { x: 0.75, y: 5.45, w: 6.20, h: 1.20, fill: FAWN });
  s.addText("감사합니다.  질의응답", { x: 0.75, y: 5.45, w: 6.20, h: 1.20, align: "center", valign: "middle", fontSize: 22, bold: true, color: W, fontFace: HEAD, margin: 0 });
  s.addText("송영신목장 대표 하현제\n수의사 · 현장명예지도관", { x: 7.35, y: 5.55, w: 4.5, h: 1.00, fontSize: 13, color: W, fontFace: FONT, margin: 0, lineSpacing: 21 });
  s.addNotes("질의응답 20분. 예상 질문: ① 저지로 수익이 나는가 ② HBP 초기 비용과 회수기간 ③ 센서 투자 대비 효과 ④ 유가공 인허가에서 가장 막히는 지점 ⑤ 소규모 농가도 따라 할 수 있는가. 각각 숫자로 답할 준비를 해둘 것.");
}

/* =========================================================
   백업 슬라이드
========================================================= */
{
  const s = S();
  kick(s, "APPENDIX");
  T(s, "예상 질의 대비 — 백업 자료 목록");
  const q = [
    { q: "저지 사육으로 실제 수익이 납니까?", a: "두당 유량은 낮지만 고형분·가공 수율·제품 단가로 상쇄. 원유 판매만으로는 불리하다는 점을 솔직히 답변." },
    { q: "HBP 초기 투자와 회수 기간은?", a: "깔짚 자재비 + 교반 장비 + 축사 개조. 절감되는 깔짚 교체·분뇨처리 비용과 노동시간으로 비교 제시." },
    { q: "센서 투자 대비 효과가 있습니까?", a: "공태일수 단축 1일당 손실회피액, 폐사 1두 회피액 기준으로 환산해 설명." },
    { q: "유가공 인허가에서 가장 막히는 지점은?", a: "건축·용도 문제와 작업장 동선 설계. 도면 단계에서 관할 기관과 사전 협의가 최선." },
    { q: "소규모·고령 농가도 따라 할 수 있습니까?", a: "전부는 어렵습니다. HBP는 가능, 유가공은 인력이 있어야 가능. 단계별 진입 경로를 제시." },
    { q: "A2 우유의 건강 효과는 입증되었습니까?", a: "연구가 진행 중인 영역. 저희는 효능을 주장하지 않고 유전형 사실만 표시한다고 답변." }
  ];
  q.forEach((c, i) => {
    const y = 1.42 + i * 0.90;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.78, fill: i % 2 === 0 ? TINT : TINT2 });
    s.addText("Q", { x: 0.85, y: y, w: 0.40, h: 0.78, align: "center", valign: "middle", fontSize: 14, bold: true, color: FAWN, fontFace: HEAD, margin: 0 });
    s.addText(c.q, { x: 1.32, y: y, w: 4.25, h: 0.78, fontSize: 12.5, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle", lineSpacing: 16 });
    s.addText(c.a, { x: 5.70, y: y, w: 6.80, h: 0.78, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 16 });
  });
  foot(s, "※ 발표용이 아닌 준비용 백업 슬라이드입니다.");
  s.addNotes("발표 시에는 넘기고, 질의응답에서 필요 시 열람.");
}

pres.writeFile({ fileName: "/tmp/claude-0/-home-user-Dr-Ha--agent/a6759eb0-ef83-55cf-9929-a9f677f42846/scratchpad/deck/저지종_유가공목장_운영_현장사례.pptx" })
  .then(f => console.log("saved:", f));
