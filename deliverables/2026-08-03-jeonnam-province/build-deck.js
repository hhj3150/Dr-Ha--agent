const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "농업회사법인 ㈜D2O 하현제";
pres.title = "전남 축산 AX 플랫폼 구축사업 정책제안";

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
  s.addText("전라남도 축산업 인공지능 대전환을 위한", { x: 0.75, y: 1.24, w: 9.2, h: 0.35, fontSize: 13, bold: true, color: MOSS, fontFace: FONT, margin: 0, charSpacing: 1.2 });
  s.addText("「전남 축산 AX 플랫폼\n구축사업」 정책제안", { x: 0.75, y: 1.80, w: 9.5, h: 1.85, fontSize: 38, bold: true, color: W, fontFace: HEAD, margin: 0, lineSpacing: 50 });
  s.addText("국가 농업 AX 플랫폼과 연계한 카우톡 기반\n전남형 축산 인공지능 전환 선도모델 구축", { x: 0.75, y: 3.86, w: 9.4, h: 0.80, fontSize: 14.5, color: FAWNL, fontFace: FONT, margin: 0, lineSpacing: 24 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.75, y: 5.00, w: 6.30, h: 1.25, fill: { color: INK2 }, line: { type: "none" }, rectRadius: 0.10 });
  s.addText([
    { text: "농업회사법인 ㈜D2O  대표 하현제", options: { bold: true, fontSize: 16, color: W, breakLine: true } },
    { text: "수의사 · 국내 최초 반추위 센서 도입(2013) · 산자부 축산로봇 과제 연구책임자", options: { fontSize: 10.5, color: MOSSL } }
  ], { x: 1.05, y: 5.15, w: 5.8, h: 0.95, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 20 });
  s.addText("2026. 8. 3.(월)  |  전라남도", { x: 7.35, y: 5.50, w: 3.4, h: 0.30, fontSize: 12, color: MUTED, fontFace: FONT, margin: 0 });
  s.addNotes("정책제안서 발표. 실무자가 기안·검토에 바로 쓸 수 있는 형태로 전달한다. 첫 장부터 '국가 플랫폼 선정 이후'라는 시점 인식을 공유한다.");
}

/* ===== 2. 한 장 요약 ===== */
{
  const s = S(true);
  kick(s, "제안 요약", MOSS);
  T(s, "한 장 요약", { color: W });
  const k = [
    { n: "기회", l: "전남이 국가 농업 AX 플랫폼 사업지역으로 최종 선정됐습니다.\n2026~2030년 총사업비 2,546억원, 연내 SPC 설립 예정.", c: GREEN },
    { n: "위험", l: "그 사업의 골자는 기상·토양·생육 데이터와 파종·방제·수확입니다.\n축산이 명시되어 있지 않습니다 — 전남의 핵심 산업이 빠질 수 있습니다.", c: FAWN },
    { n: "목표", l: "국가 플랫폼 위에 「전남 축산 AX 플랫폼」을 축산 전문영역으로 탑재합니다.\n특정 기업의 제품이 아니라, 전남도가 표준을 정하는 개방형 공공 플랫폼입니다.", c: INK2 },
    { n: "착수", l: "다만 처음부터 전부 만들 수는 없습니다. 지금 가동 중인 카우톡 AI를 1단계 착수 수단으로 삼고,\n2단계부터 다른 센서·장비 사업자를 개방형 API로 순차 편입합니다.", c: "8A5A22" }
  ];
  k.forEach((c, i) => {
    const y = 1.45 + i * 1.30;
    card(s, { x: 0.62, y: y, w: 12.10, h: 1.16, fill: c.c });
    s.addText(c.n, { x: 0.90, y: y, w: 1.30, h: 1.16, fontSize: 17, bold: true, color: i === 2 ? FAWNL : W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.l, { x: 2.35, y: y, w: 10.05, h: 1.16, fontSize: 12.5, color: W, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 20 });
  });
  card(s, { x: 0.62, y: 6.72, w: 12.10, h: 0.001, fill: INK });
  s.addNotes("이 장과 마지막 요청 슬라이드만 봐도 전체가 파악되게 설계. 기회-위험-제안-요청의 4단 구조.");
}

/* ===== 3. 목차 ===== */
{
  const s = S();
  kick(s, "CONTENTS");
  T(s, "말씀드릴 순서");
  const items = [
    ["Ⅰ", "지금이 골든타임", "국가 농업 AX 플랫폼 선정 이후, 축산의 자리를 확보해야 합니다"],
    ["Ⅱ", "전남 축산의 현실", "구조적 문제, 수익 구조, 번식 기반, '장비의 섬'"],
    ["Ⅲ", "글로벌 좌표", "정밀축산 시장·국가 플랫폼 선례·한국의 위치"],
    ["Ⅳ", "무엇을 만들 것인가", "CowTalk Jeonnam — 4계층 구조와 이용자별 서비스"],
    ["Ⅴ", "냉정한 자기평가", "글로벌 대비 강점과 약점, 과제"],
    ["Ⅵ", "추진모델", "4단계 — 타당성조사 · 축우 실증 · 다축종 확산 · 국가/해외"],
    ["Ⅶ", "추진체계 · 성과지표", "추진위원회, 역할분담, 4군 KPI"],
    ["Ⅷ", "타당성과 우려", "5축 타당성, 예상 우려 5개와 대응"],
    ["Ⅸ", "요청사항", "즉시 추진 7과제와 의사결정 요청"]
  ];
  items.forEach((it, i) => {
    const y = 1.38 + i * 0.60;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.52, fill: i === 8 ? MOSSL : TINT2 });
    badge(s, 0.80, y + 0.05, it[0], { fill: i === 8 ? FAWN : GREEN, fs: 11, d: 0.42 });
    s.addText(it[1], { x: 1.40, y: y, w: 3.7, h: 0.52, fontSize: 13.5, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(it[2], { x: 5.15, y: y, w: 7.35, h: 0.52, fontSize: 11.5, color: MUTED, fontFace: FONT, margin: 0, valign: "middle" });
  });
  foot(s, "25분 발표 시 Ⅲ·Ⅴ는 요약하고 Ⅰ·Ⅳ·Ⅵ·Ⅸ에 시간을 배분");
  s.addNotes("Ⅰ(골든타임)과 Ⅸ(요청)가 이 발표의 양 끝. Ⅲ·Ⅴ는 질의응답용으로 남겨도 된다.");
}

/* ===== SECTION Ⅰ ===== */
sectionSlide("Ⅰ", "지금이 골든타임", "THE WINDOW IS OPEN — AND IT IS NARROW", "6분. 이 파트가 발표의 승부처. 시점 인식을 공유시킨다.");

{
  const s = S();
  kick(s, "Ⅰ 지금이 골든타임");
  T(s, "전남이 국가 농업 AX 플랫폼을 가져왔습니다");
  const st = [
    { n: "2,546억원", l: "총사업비\n2026 ~ 2030년", sz: 25 },
    { n: "2026. 7. 27", l: "민간참여자 최종 선정\n실시협약 체결", sz: 22 },
    { n: "무안군", l: "해제면 일원\n플랫폼 구축 부지", sz: 28 },
    { n: "연내", l: "특수목적법인(SPC)\n설립 예정", sz: 28 }
  ];
  st.forEach((c, i) => {
    statCard(s, { x: 0.62 + i * 3.10, y: 1.45, w: 2.88, h: 1.85, num: c.n, label: c.l, numColor: GREEND, numSize: c.sz, fill: TINT });
  });
  card(s, { x: 0.62, y: 3.52, w: 12.10, h: 1.55, fill: MOSSL });
  plain(s, "선정된 컨소시엄", { x: 0.95, y: 3.70, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: GREEND });
  plain(s, "전남광주통합특별시 · 무안군 · 대동 · 대동애그테크 · LG CNS · 아트팜 영농조합법인 · 대영GS 등 7개 기업·지방정부\n정부 지원 최대 1,400억원 규모, 민간 지분 51% 이상 구조로 추진됩니다.", { x: 0.95, y: 4.10, w: 11.4, h: 0.80, fontSize: 12.5, color: BODY, ls: 20 });
  card(s, { x: 0.62, y: 5.25, w: 12.10, h: 1.25, fill: INK });
  s.addText("이것은 전남 농업 정책 역사상 가장 큰 규모의 데이터·AI 인프라 사업입니다\n— 그리고 다음 장이 오늘 말씀드리려는 문제입니다", { x: 0.90, y: 5.25, w: 11.5, h: 1.25, fontSize: 15, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle", lineSpacing: 24 });
  foot(s, "출처: 농림축산식품부 보도자료(2026. 7. 27) · 국가 농업AX플랫폼 SPC 설립 공모지침서(2026. 2) · 관련 언론 보도");
  s.addNotes("먼저 축하와 인정으로 시작한다. 실무자들이 직접 만들어낸 성과다. 그 위에서 다음 장의 문제 제기가 비판이 아니라 보완 제안으로 들리게 한다.");
}

{
  const s = S(true);
  kick(s, "Ⅰ 지금이 골든타임", MOSS);
  T(s, "그런데 이 사업의 골자에 축산이 없습니다", { color: W });
  card(s, { x: 0.62, y: 1.45, w: 12.10, h: 1.45, fill: INK2 });
  plain(s, "발표된 사업 내용", { x: 0.95, y: 1.62, w: 11.4, h: 0.32, fontSize: 13, bold: true, color: MOSSL });
  plain(s, "\"농업 현장에서 생산되는 기상·토양·생육 데이터를 AI가 분석해 최적의 재배 방법을 제시하고,\n농기계와 로봇으로 파종·방제·수확 등을 지원하는 플랫폼을 구축\"", { x: 0.95, y: 2.00, w: 11.4, h: 0.75, fontSize: 14, italic: true, color: W, ls: 22 });
  const gap = [
    { t: "기상 · 토양 · 생육", d: "재배 환경 데이터", ok: true },
    { t: "파종 · 방제 · 수확", d: "농작업 자동화", ok: true },
    { t: "가축 생체 · 번식 · 방역", d: "명시되어 있지 않습니다", ok: false }
  ];
  gap.forEach((c, i) => {
    const x = 0.62 + i * 4.10;
    card(s, { x: x, y: 3.15, w: 3.88, h: 1.40, fill: c.ok ? GREEN : FAWN });
    s.addText(c.t, { x: x + 0.20, y: 3.32, w: 3.48, h: 0.44, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: x + 0.20, y: 3.82, w: 3.48, h: 0.55, fontSize: 12.5, color: W, fontFace: FONT, margin: 0 });
  });
  card(s, { x: 0.62, y: 4.78, w: 12.10, h: 1.55, fill: INK2 });
  plain(s, "이것은 누구의 잘못도 아닙니다 — 순서의 문제입니다", { x: 0.95, y: 4.96, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: FAWNL });
  plain(s, "국가 농업 AX 플랫폼은 재배업 기반으로 설계가 시작됐습니다. 지금 SPC를 설립하고 세부 사업계획을 조율하는 단계입니다.\n이 단계에서 축산 전문영역을 넣지 않으면, 이후에는 사업 구조를 바꾸기 어렵습니다.\n전남은 축산업 생산액이 큰 지역입니다. 우리 지역의 핵심 산업이 우리가 유치한 플랫폼에서 빠지는 결과가 됩니다.", { x: 0.95, y: 5.36, w: 11.4, h: 0.90, fontSize: 12.5, color: W, ls: 19 });
  card(s, { x: 0.62, y: 6.48, w: 12.10, h: 0.42, fill: FAWN });
  s.addText("SPC 사업계획이 확정되기 전이 유일한 반영 시점입니다", { x: 0.90, y: 6.48, w: 11.5, h: 0.42, fontSize: 13.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("비판이 아니라 '순서의 문제'로 규정하는 것이 중요하다. 담당 실무자를 방어적으로 만들면 안 된다. 시한이 있다는 점을 분명히 하되 압박이 아니라 사실 고지로.");
}

{
  const s = S();
  kick(s, "Ⅰ 지금이 골든타임");
  T(s, "축산은 재배업과 근본적으로 다릅니다");
  plain(s, "농작물은 계절 단위로 관리하지만, 가축은 살아 있는 개체를 24시간 관리합니다. 데이터의 성격 자체가 다릅니다.", { x: 0.62, y: 1.26, w: 12.1, h: 0.36, fontSize: 13, color: MUTED });
  const f = [
    "개체별 생체정보가 24시간 지속 발생",
    "질병과 감염병의 전파 가능성",
    "번식 · 임신 · 분만 관리 필요",
    "동물복지와 수의학적 판단 필요",
    "축사 환경과 가축 상태의 상호작용",
    "분뇨 · 악취 · 온실가스 발생",
    "농장 간 가축 이동과 국가방역 연계",
    "축산물 안전성과 생산이력 관리"
  ];
  f.forEach((t, i) => {
    const x = 0.62 + (i % 2) * 6.28;
    const y = 1.78 + Math.floor(i / 2) * 0.86;
    card(s, { x: x, y: y, w: 5.98, h: 0.72, fill: i % 2 === 0 ? TINT : TINT2 });
    badge(s, x + 0.22, y + 0.13, String(i + 1), { fill: i < 4 ? GREEN : FAWN, d: 0.46, fs: 12 });
    s.addText(t, { x: x + 0.84, y: y, w: 5.0, h: 0.72, fontSize: 13, color: BODY, fontFace: FONT, margin: 0, valign: "middle" });
  });
  card(s, { x: 0.62, y: 5.42, w: 12.10, h: 1.45, fill: INK });
  plain(s, "그래서 필요한 것", { x: 0.95, y: 5.60, w: 11.4, h: 0.34, fontSize: 14, bold: true, color: FAWNL });
  plain(s, "농업 공통 플랫폼과 연결되면서도, 축산의 생체·수의·방역 특성을 전문적으로 처리하는\n축산 특화 AX 실행 플랫폼 — 이것이 오늘 제안의 핵심입니다.", { x: 0.95, y: 6.00, w: 11.4, h: 0.72, fontSize: 14, bold: true, color: W, ls: 22 });
  s.addNotes("8가지를 다 읽지 말고 2~3개만 짚는다. 특히 '방역'과 '수의학적 판단'은 재배업 플랫폼이 다룰 수 없는 영역임을 강조.");
}

{
  const s = S();
  kick(s, "Ⅰ 지금이 골든타임");
  T(s, "축산을 넣으면 전남이 얻는 지위");
  const p = [
    { t: "대한민국 축산 AX 표준모델 선도지역", d: "낙농·재배 표준은 다른 지역이 만들고 있습니다.\n축산 AX 표준은 아직 비어 있습니다.", c: FAWN },
    { t: "국가 축산 데이터 실증지역", d: "전남의 다양한 축종과 농가 기반은\n국가 축산 AI 학습데이터 구축에 최적입니다.", c: GREEN },
    { t: "축산 AI 알고리즘 검증지역", d: "국립축산과학원 축산자원개발부 이전과\n지역대학·연구소를 검증체계로 결합할 수 있습니다.", c: MOSS },
    { t: "저탄소 · 동물복지 · 방역 통합모델", d: "개체 데이터가 있어야 저탄소 인증도,\n동물복지 인증도, 방역 조기경보도 가능합니다.", c: GREEN },
    { t: "K-축산 AX 해외수출 거점", d: "국가 레퍼런스를 가진 지역이\n수출 모델의 원본이 됩니다.", c: FAWN },
    { t: "AI 산업과 축산업을 잇는 대표 융합사업", d: "AI 연구·컴퓨팅 역량과 전남의 현장 데이터를\n실질적으로 결합하는 지역상생 모델입니다.", c: MOSS }
  ];
  p.forEach((c, i) => {
    const x = 0.62 + (i % 3) * 4.10;
    const y = 1.45 + Math.floor(i / 3) * 2.35;
    card(s, { x: x, y: y, w: 3.88, h: 2.15, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 3.88, h: 0.86, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.t, { x: x + 0.20, y: y, w: 3.48, h: 0.86, fontSize: 12.5, bold: true, color: i === 2 || i === 5 ? BODY : W, fontFace: HEAD, margin: 0, valign: "middle", lineSpacing: 16 });
    s.addText(c.d, { x: x + 0.24, y: y + 1.00, w: 3.40, h: 1.05, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 17 });
  });
  card(s, { x: 0.62, y: 6.25, w: 12.10, h: 0.62, fill: INK });
  s.addText("국가 플랫폼 선정은 끝이 아니라 시작입니다 — 그 안에 무엇이 들어가느냐가 실질적 효과를 결정합니다", { x: 0.90, y: 6.25, w: 11.5, h: 0.62, fontSize: 14, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("실무자에게 '우리가 얻는 것'을 구체적으로 보여준다. 특히 1번(축산 표준은 비어 있다)이 선점 논리의 핵심.");
}

{
  const s = S(true);
  kick(s, "Ⅰ 지금이 골든타임", MOSS);
  T(s, "정책 레일은 이미 깔려 있습니다", { color: W });
  plain(s, "새로운 명분을 만들 필요가 없습니다. 이미 발표된 국가·도 정책과 그대로 연결됩니다.", { x: 0.62, y: 1.26, w: 12.1, h: 0.36, fontSize: 13, color: MOSSL });
  const rows = [
    ["정책 · 사업", "시점", "연계 지점"],
    ["농업·농촌 인공지능 대전환 전략", "2026. 3", "생산성 혁신 · AX 생태계 기반 조성에 축산 포함"],
    ["국가 농업 AX 플랫폼 (2,546억)", "2026. 7 협약", "축산 전문영역을 SPC 사업계획에 반영"],
    ["농업·농촌 AX 데이터 전략", "2026. 6", "축산 데이터 표준화·품질관리·AI 학습데이터 구축"],
    ["범정부 AX-Sprint", "2026", "축산 AI 응용서비스의 실증·조기 상용화 연계"],
    ["AI 축산 융복합밸리 조성", "전남도 추진", "밸리의 데이터·AI 운영체계로 직접 연결"],
    ["국립축산과학원 축산자원개발부 이전", "전남도 지원", "알고리즘 검증·수의축산학적 타당성 검증 파트너"],
    ["스마트축산 ICT · 저탄소 · 동물복지 · 방역", "계속사업", "기존 사업의 데이터를 한 체계로 통합"]
  ];
  const tr = rows.map((r, ri) => r.map((cc, ci) => ({
    text: cc,
    options: {
      bold: ri === 0 || ci === 0,
      color: ri === 0 ? W : (ci === 2 ? MOSSL : W),
      fill: { color: ri === 0 ? GREEND : INK2 },
      fontSize: 11.5, align: "left", valign: "middle", fontFace: FONT
    }
  })));
  s.addTable(tr, { x: 0.62, y: 1.78, w: 12.10, colW: [4.30, 2.00, 5.80], rowH: 0.50, border: { type: "solid", color: "2E4A38", pt: 1 } });
  card(s, { x: 0.62, y: 5.95, w: 12.10, h: 0.72, fill: FAWN });
  s.addText("이 사업은 새 정책을 만드는 것이 아니라, 분산 추진 중인 사업들을 하나의 데이터·AI 체계로 묶는 것입니다", { x: 0.90, y: 5.95, w: 11.5, h: 0.72, fontSize: 14.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  foot(s, "출처: 농림축산식품부 정책 발표자료 · 전라남도 도정 자료");
  s.addNotes("실무자가 기안문에 그대로 옮길 수 있는 근거 목록. '새 사업을 만드는 부담'이 아니라 '있는 것을 묶는 일'이라는 인식을 준다.");
}

sectionSlide("Ⅱ", "전남 축산의 현실", "STRUCTURAL PROBLEMS ON THE GROUND", "5분. 왜 지금 축산에 개입해야 하는지 현장 근거.");
{
  const s = S();
  kick(s, "Ⅱ 전남 축산의 현실");
  T(s, "전남 축산이 안고 있는 구조적 문제");
  const p = [
    "축산농가 고령화와 후계인력 부족", "사료비 · 인건비 · 에너지비 상승",
    "농가 간 생산성 격차 확대", "가축질병과 방역비용 증가",
    "폭염 · 한파 등 기후재난 증가", "가축분뇨 · 악취 · 탄소배출 문제",
    "수의사와 전문인력 부족", "축산 데이터의 기관 · 기업별 분산",
    "외산 센서와 플랫폼에 대한 데이터 의존", "시설 · 장비 중심 스마트축산 사업의 한계"
  ];
  p.forEach((t, i) => {
    const x = 0.62 + (i % 2) * 6.28;
    const y = 1.42 + Math.floor(i / 2) * 0.72;
    card(s, { x: x, y: y, w: 5.98, h: 0.60, fill: i % 2 === 0 ? TINT : TINT2 });
    badge(s, x + 0.20, y + 0.08, String(i + 1), { fill: i < 6 ? GREEN : FAWN, d: 0.44, fs: 11 });
    s.addText(t, { x: x + 0.80, y: y, w: 5.05, h: 0.60, fontSize: 12.5, color: BODY, fontFace: FONT, margin: 0, valign: "middle" });
  });
  card(s, { x: 0.62, y: 5.20, w: 12.10, h: 1.65, fill: INK });
  plain(s, "이 열 가지의 공통점", { x: 0.95, y: 5.38, w: 11.4, h: 0.34, fontSize: 14, bold: true, color: FAWNL });
  plain(s, "개별 농가의 노력이나 단일 센서·장비 보급만으로는 해결되지 않습니다.\n가축 생체정보 · 사양관리 · 번식 · 질병 · 환경 · 분뇨 · 방역 · 생산 · 유통 데이터를 통합하고,\nAI가 이를 분석해 농가 · 수의사 · 지자체 · 정부의 행동으로 연결하는 체계가 있어야 풀립니다.", { x: 0.95, y: 5.78, w: 11.4, h: 0.95, fontSize: 12.5, color: W, ls: 20 });
  s.addNotes("10개를 다 읽지 않는다. 8·9·10번(데이터 분산·외산 의존·장비 중심 한계)만 짚으면 이 발표의 문제의식이 전달된다.");
}
{
  const s = S();
  kick(s, "Ⅱ 전남 축산의 현실");
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
  kick(s, "Ⅱ 전남 축산의 현실", MOSS);
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
  kick(s, "Ⅱ 전남 축산의 현실");
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
  kick(s, "Ⅱ 전남 축산의 현실");
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

{
  const s = S();
  kick(s, "Ⅱ 전남 축산의 현실");
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

{
  const s = S();
  kick(s, "Ⅱ 전남 축산의 현실");
  T(s, "지금의 스마트축산은 '장비의 섬'으로 분절되어 있습니다");
  plain(s, "그동안 자동급이기·환기장치·착유로봇·발정탐지기·위내센서·악취측정기·CCTV 등이 보급됐습니다. 그러나 —", { x: 0.62, y: 1.26, w: 12.1, h: 0.36, fontSize: 13, color: MUTED });
  const p = [
    "장비마다 별도 프로그램과 데이터 형식을 사용해 농가는 여러 앱을 동시에 확인해야 합니다",
    "알람은 많은데 무엇을 먼저 해야 하는지 알려주지 않습니다",
    "센서 이상과 실제 질병을 구분하기 어렵습니다",
    "수의사에게 데이터가 자동으로 전달되지 않습니다",
    "지자체는 농장별 위험을 실시간으로 파악할 수 없습니다",
    "정책사업의 실제 효과를 객관적으로 측정하기 어렵습니다",
    "장비업체를 바꾸면 과거 데이터를 활용하기 어렵습니다"
  ];
  p.forEach((t, i) => {
    const y = 1.75 + i * 0.62;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.52, fill: i % 2 === 0 ? TINT : TINT2 });
    badge(s, 0.82, y + 0.04, String(i + 1), { fill: GREEN, d: 0.44, fs: 11 });
    s.addText(t, { x: 1.42, y: y, w: 11.1, h: 0.52, fontSize: 12.5, color: BODY, fontFace: FONT, margin: 0, valign: "middle" });
  });
  card(s, { x: 0.62, y: 6.15, w: 12.10, h: 0.75, fill: FAWN });
  s.addText("축산 AX의 핵심은 장비를 더 설치하는 것이 아니라, 이미 있는 장비와 데이터를 하나의 의사결정 체계로 연결하는 것입니다", { x: 0.90, y: 6.15, w: 11.5, h: 0.75, fontSize: 14, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("실무자들이 가장 공감하는 장. 예산을 써서 장비를 보급했는데 성과 측정이 안 되는 문제를 정확히 짚는다.");
}

sectionSlide("Ⅲ", "글로벌 좌표", "GLOBAL LANDSCAPE — WHERE KOREA STANDS", "3분. 25분 발표에서는 2장만 보여주고 넘어간다.");
{
  const s = S();
  kick(s, "Ⅲ 글로벌 좌표");
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
  kick(s, "Ⅲ 글로벌 좌표", MOSS);
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

{
  const s = S();
  kick(s, "Ⅲ 글로벌 좌표");
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
  kick(s, "Ⅲ 글로벌 좌표");
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
  kick(s, "Ⅲ 글로벌 좌표", MOSS);
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


sectionSlide("Ⅳ", "무엇을 만들 것인가", "THE PLATFORM IS THE GOAL — COWTALK IS THE STARTING POINT", "7분. 목표(플랫폼)와 착수 수단(카우톡)을 분명히 나눈다. 이 구분이 흐려지면 특혜 시비가 붙는다.");
{
  const s = S();
  kick(s, "Ⅳ 무엇을 만들 것인가");
  T(s, "제안의 구조 — 목표는 플랫폼, 시작은 카우톡");
  plain(s, "이 두 가지를 섞으면 제안이 왜곡됩니다. 분명히 나누어 말씀드리겠습니다.", { x: 0.62, y: 1.26, w: 12.1, h: 0.36, fontSize: 13, color: MUTED });
  const L = [
    { n: "목표", t: "전남 축산 AX 플랫폼", d: "특정 기업의 제품이 아닙니다.\n전남도가 기능·성과·데이터 표준을 정하는\n개방형 공공 플랫폼입니다.\n\n국가 농업 AX 플랫폼의 축산 전문영역으로\n탑재되는 것이 최종 목표입니다.", c: GREEN },
    { n: "착수", t: "카우톡 AI로 시작", d: "처음부터 전부 만들 수는 없습니다.\n지금 실제로 가동 중인 축산 AI가\n국내에 사실상 이것 하나입니다.\n\n199농가 · 10,886두에서 이미 돌아가는 것을\n1단계 착수 수단으로 씁니다.", c: FAWN },
    { n: "확장", t: "개방형으로 순차 편입", d: "2단계부터 다른 센서·장비·SW 사업자를\n표준 API로 순차 편입합니다.\n\n카우톡으로 시작하되\n카우톡으로 끝나지 않는 것이\n이 제안의 전제입니다.", c: MOSS }
  ];
  L.forEach((c, i) => {
    const x = 0.62 + i * 4.10;
    card(s, { x: x, y: 1.78, w: 3.88, h: 3.60, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.78, w: 3.88, h: 0.94, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.n, { x: x + 0.22, y: 1.86, w: 3.44, h: 0.28, fontSize: 10.5, color: i === 2 ? BODY : W, fontFace: FONT, margin: 0, charSpacing: 1.5 });
    s.addText(c.t, { x: x + 0.22, y: 2.14, w: 3.44, h: 0.44, fontSize: 15.5, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0 });
    s.addText(c.d, { x: x + 0.24, y: 2.86, w: 3.40, h: 2.40, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 17 });
    if (i < 2) arrow(s, x + 3.94, 3.45);
  });
  card(s, { x: 0.62, y: 5.60, w: 12.10, h: 1.28, fill: INK });
  plain(s, "오늘 요청드리는 것은 '카우톡을 도입해달라'가 아닙니다", { x: 0.95, y: 5.78, w: 11.4, h: 0.34, fontSize: 14.5, bold: true, color: FAWNL });
  plain(s, "'축산 AX 플랫폼을 전남도의 정책 과제로 세워달라'는 것입니다.\n그 플랫폼을 어떻게 시작할지는 타당성 조사에서 정하면 되고, 저희는 지금 시작 가능한 수단을 갖고 있을 뿐입니다.", { x: 0.95, y: 6.16, w: 11.4, h: 0.66, fontSize: 12.5, color: W, ls: 19 });
  s.addNotes("이 장이 제안 전체의 성격을 규정한다. 여기서 '플랫폼(목표)'과 '카우톡(수단)'을 나누지 않으면 뒤의 모든 설명이 제품 홍보로 들린다. 천천히, 분명하게 말한다.");
}

{
  const s = S(true);
  kick(s, "Ⅳ 무엇을 만들 것인가", MOSS);
  T(s, "그렇다면 왜 카우톡으로 시작합니까", { color: W });
  card(s, { x: 0.62, y: 1.45, w: 5.95, h: 3.35, fill: INK2 });
  plain(s, "시작 수단이 갖춰야 할 조건", { x: 0.95, y: 1.62, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: MOSSL });
  body(s, [
    "지금 당장 가동 가능할 것 — 개발부터 시작하면 3년이 사라집니다",
    "축산 전용일 것 — 재배업 플랫폼을 개조해서는 생체·방역을 다룰 수 없습니다",
    "국내 축산 데이터로 학습되었을 것 — 해외 모델은 한우 사양·기후에 맞지 않습니다",
    "수의 임상이 결합되어 있을 것 — 승인 없는 AI 판단은 현장에서 쓸 수 없습니다",
    "개방형일 것 — 특정 장비에 종속되면 확장 자체가 막힙니다"
  ], { x: 0.95, y: 2.06, w: 5.35, h: 2.55, fontSize: 12, color: W });
  card(s, { x: 6.77, y: 1.45, w: 5.95, h: 3.35, fill: FAWN });
  plain(s, "현재 이 조건을 충족하는 것", { x: 7.10, y: 1.62, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: W });
  body(s, [
    "199농가 · 10,886두 · 73만 건 판단으로 24/7 가동 중",
    "한우 번식·비육 전용 엔진 — 글로벌 사업자는 대부분 낙농 중심",
    "2013년부터 13년간 국내 현장 데이터 축적",
    "수의사 승인 게이트(HITL)가 설계에 내장",
    "표준 API 기반 — 기존 설치 장비도 연동 가능"
  ], { x: 7.10, y: 2.06, w: 5.35, h: 2.55, fontSize: 12, color: W });
  card(s, { x: 0.62, y: 5.05, w: 12.10, h: 1.80, fill: INK2 });
  plain(s, "그리고 카우톡으로 끝나면 안 되는 이유 — 저희가 먼저 말씀드립니다", { x: 0.95, y: 5.23, w: 11.4, h: 0.34, fontSize: 14, bold: true, color: FAWNL });
  body(s, [
    "단일 사업자에 종속된 플랫폼은 공공 인프라가 될 수 없습니다 — 협상력도 지속성도 도가 잃습니다",
    "축종이 늘어나면(돼지·가금) 저희가 갖지 못한 기술이 필요합니다 — 음향·영상 분석은 다른 전문성입니다",
    "그래서 1단계 실증과 동시에 데이터 표준·API 규격을 공개해, 2단계부터 다른 사업자가 붙을 수 있게 해야 합니다"
  ], { x: 0.95, y: 5.65, w: 11.4, h: 1.10, fontSize: 12, color: W });
  s.addNotes("자사에 불리한 말을 먼저 하는 장. 특혜 시비를 구조로 차단하는 가장 효과적인 방법이다. 실무자는 이 발언을 상급자 보고 시 그대로 인용할 수 있다.");
}

{
  const s = S();
  kick(s, "Ⅳ 무엇을 만들 것인가");
  T(s, "국가 농업 AX 플랫폼과 경쟁하지 않습니다");
  plain(s, "중복 플랫폼을 새로 만들자는 제안이 아닙니다. 역할을 이렇게 나눕니다.", { x: 0.62, y: 1.26, w: 12.1, h: 0.36, fontSize: 13, color: MUTED });
  card(s, { x: 0.62, y: 1.75, w: 5.95, h: 3.55, fill: TINT2, line: "E0E6DB" });
  s.addShape(pres.ShapeType.roundRect, { x: 0.62, y: 1.75, w: 5.95, h: 0.72, fill: { color: GREEN }, line: { type: "none" }, rectRadius: 0.10 });
  s.addText("국가 농업 AX 플랫폼", { x: 0.90, y: 1.75, w: 5.4, h: 0.72, fontSize: 15.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  body(s, [
    "농업 전반의 공통 데이터 인프라",
    "농업 AI 서비스 유통체계",
    "농업인 인증과 서비스 접근",
    "공통 클라우드 · 보안 · 데이터 거버넌스",
    "농기계 · 시설원예 · 유통 등 범농업 서비스",
    "국가 AI 생태계와 해외진출 기반"
  ], { x: 0.95, y: 2.62, w: 5.35, h: 2.55, fontSize: 12 });
  card(s, { x: 6.77, y: 1.75, w: 5.95, h: 3.55, fill: TINT2, line: "E0E6DB" });
  s.addShape(pres.ShapeType.roundRect, { x: 6.77, y: 1.75, w: 5.95, h: 0.72, fill: { color: FAWN }, line: { type: "none" }, rectRadius: 0.10 });
  s.addText("전남 축산 AX 플랫폼 (CowTalk Jeonnam)", { x: 7.05, y: 1.75, w: 5.4, h: 0.72, fontSize: 14.5, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  body(s, [
    "축산 생체 · 수의 · 방역 전문 데이터 처리",
    "축종별 AI 알고리즘",
    "농가 작업과 수의진료 지원",
    "축산재난 · 분뇨 · 탄소 · 동물복지 관리",
    "시군 단위 축산 관제",
    "국가 플랫폼에 축산 데이터를 공급하는 실행계층"
  ], { x: 7.10, y: 2.62, w: 5.35, h: 2.55, fontSize: 12 });
  card(s, { x: 0.62, y: 5.55, w: 12.10, h: 1.30, fill: INK });
  plain(s, "한 문장으로", { x: 0.95, y: 5.72, w: 11.4, h: 0.32, fontSize: 13, bold: true, color: FAWNL });
  plain(s, "카우톡은 국가 플랫폼 위에 탑재되는 축산 전문 버티컬 AX 플랫폼입니다.\n중복이 아니라, 국가 플랫폼의 축산 기능을 완성하는 구조입니다.", { x: 0.95, y: 6.08, w: 11.4, h: 0.70, fontSize: 14, bold: true, color: W, ls: 22 });
  s.addNotes("가장 먼저 나올 우려가 '중복 아니냐'다. 여기서 미리 답한다. 왼쪽은 공통 인프라, 오른쪽은 전문 실행계층 — 층이 다르다는 점을 반복.");
}

{
  const s = S(true);
  kick(s, "Ⅳ 무엇을 만들 것인가", MOSS);
  T(s, "축산 AX 플랫폼이 갖춰야 할 4계층", { color: W });
  const L = [
    { n: "①", t: "데이터 연결계층", d: "위내센서 · 귀표/목걸이 센서 · 카메라 · 음향센서 · 착유로봇 · 자동급이기 · 축사 온습도 ·\n사료급여 · 유량/유성분 · 번식/수정/임신 기록 · 수의진료/투약 · 유전체 · 축산물이력제 ·\n기상/재난/방역 공공데이터 · 분뇨/악취/에너지", c: GREEN },
    { n: "②", t: "축산 데이터 플랫폼", d: "개체 ID 통합 · 데이터 표준화 · 실시간 수집 · 품질관리 · 농가별 접근권한 관리 ·\n익명화와 공공활용 · AI 학습데이터 구축 · 외부 장비 API 연계", c: FAWN },
    { n: "③", t: "축산 AI 분석계층", d: "질병 조기위험 · 발정/수정 적기 · 임신 가능성 · 분만시점과 난산위험 · 열 스트레스 ·\n사료효율 · 생산량/품질 예측 · 폐사/도태 위험 · 경영위험 · 분뇨/탄소배출 · 지역 질병·재난 위험", c: GREEN },
    { n: "④", t: "행동과 실행계층", d: "농가 오늘의 작업목록 · 수의사 진료 우선순위 · 지자체 축산 상황판 · 도 정책 대시보드 ·\n자동환기/급이/착유장비 연계 · 재난/질병 현장지원 대상 선정 · 정책사업 성과분석", c: FAWN }
  ];
  L.forEach((c, i) => {
    const y = 1.42 + i * 1.32;
    card(s, { x: 0.62, y: y, w: 12.10, h: 1.18, fill: INK2 });
    s.addShape(pres.ShapeType.roundRect, { x: 0.62, y: y, w: 2.85, h: 1.18, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.n + "  " + c.t, { x: 0.86, y: y, w: 2.45, h: 1.18, fontSize: 14, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle", lineSpacing: 18 });
    s.addText(c.d, { x: 3.62, y: y, w: 8.90, h: 1.18, fontSize: 10.5, color: W, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 15 });
  });
  card(s, { x: 0.62, y: 6.72, w: 12.10, h: 0.001, fill: INK });
  s.addNotes("카우톡의 기능 소개가 아니라 '축산 AX 플랫폼이라면 갖춰야 할 요건'이다. 이 요건표가 향후 사업자 선정 기준이 된다고 말한다. 핵심은 4번 행동·실행계층 — 대부분의 플랫폼이 3번에서 끝난다.");
}

{
  const s = S();
  kick(s, "Ⅳ 무엇을 만들 것인가");
  T(s, "농가에게는 그래프가 아니라 '할 일'을 드립니다");
  card(s, { x: 0.62, y: 1.45, w: 12.10, h: 3.05, fill: TINT2, line: "D8E0D2" });
  plain(s, "오늘의 작업목록 — 실제 알림 예시", { x: 0.95, y: 1.62, w: 11.4, h: 0.34, fontSize: 14, bold: true, color: FAWN });
  const ex = [
    "127번 소 — 체온 상승과 반추 감소가 동시에 나타남. 오전 중 임상검진 필요",
    "84번 소 — 발정 가능성 높음. 금일 오후 수정 권고",
    "35번 소 — 12시간 이내 분만 가능성. 분만사 이동 필요",
    "2번 우군 — 열 스트레스 위험 상승. 환기·급수 상태 점검",
    "최근 7일 사료효율 하락 — TMR 수분과 조사료 품질 점검 필요"
  ];
  ex.forEach((t, i) => {
    const y = 2.08 + i * 0.46;
    s.addShape(pres.ShapeType.roundRect, { x: 0.95, y: y, w: 11.45, h: 0.38, fill: { color: i < 3 ? W : TINT }, line: { type: "none" }, rectRadius: 0.06 });
    s.addText("•  " + t, { x: 1.15, y: y, w: 11.1, h: 0.38, fontSize: 12, color: BODY, fontFace: FONT, margin: 0, valign: "middle" });
  });
  card(s, { x: 0.62, y: 4.72, w: 5.95, h: 1.35, fill: MOSSL });
  plain(s, "설계 원칙", { x: 0.95, y: 4.88, w: 5.3, h: 0.30, fontSize: 13.5, bold: true, color: GREEND });
  plain(s, "무엇을, 언제, 어떤 순서로 해야 하는지를 제시합니다.\n이상을 알리는 것에서 끝나지 않습니다.", { x: 0.95, y: 5.22, w: 5.35, h: 0.70, fontSize: 12, color: BODY, ls: 18 });
  card(s, { x: 6.77, y: 4.72, w: 5.95, h: 1.35, fill: TINT });
  plain(s, "고령 농가 대응", { x: 7.10, y: 4.88, w: 5.3, h: 0.30, fontSize: 13.5, bold: true, color: GREEND });
  plain(s, "앱 사용을 전제하지 않습니다. 문자·음성 안내,\n대화형 AI, 수의사 연결까지 함께 설계합니다.", { x: 7.10, y: 5.22, w: 5.35, h: 0.70, fontSize: 12, color: BODY, ls: 18 });
  card(s, { x: 0.62, y: 6.28, w: 12.10, h: 0.60, fill: INK });
  s.addText("기술이 아니라 농가의 실제 업무 흐름을 중심으로 설계합니다", { x: 0.90, y: 6.28, w: 11.5, h: 0.60, fontSize: 14, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("이 장이 실무자에게 가장 구체적으로 다가온다. 알림 문구를 하나씩 읽어주면 '이런 것이구나'가 바로 전달된다.");
}

{
  const s = S();
  kick(s, "Ⅳ 무엇을 만들 것인가");
  T(s, "이용자별 서비스 — 같은 데이터, 다른 화면");
  const u = [
    { t: "수의사", c: GREEN, l: ["이상개체 우선 선별", "방문 전 농장·개체 데이터 확인", "원격 모니터링", "치료 전후 생체변화 분석", "항생제 사용·치료결과 관리", "농장별 질병 패턴 비교", "예방수의 컨설팅"] },
    { t: "시 · 군", c: FAWN, l: ["시군별 가축질병 이상징후", "폭염·한파 취약농가 지도", "농가별 생존·경영 위험", "악취·분뇨 위험지역", "축종별 생산량 변화", "스마트축산 사업 성과", "축산 민원 대응자료"] },
    { t: "전남도 · 정부", c: MOSS, l: ["축산물 생산량·공급 전망", "지역 질병위험 조기경보", "방역자원 배치 우선순위", "저탄소 축산 MRV", "정책사업 효과분석", "보조금·지원사업 정밀화", "국가 축산 AI 모델 개발"] }
  ];
  u.forEach((c, i) => {
    const x = 0.62 + i * 4.10;
    card(s, { x: x, y: 1.45, w: 3.88, h: 3.65, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.45, w: 3.88, h: 0.70, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.t, { x: x + 0.20, y: 1.45, w: 3.48, h: 0.70, fontSize: 15.5, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0, valign: "middle" });
    body(s, c.l, { x: x + 0.24, y: 2.28, w: 3.40, h: 2.70, fontSize: 11.5 });
  });
  card(s, { x: 0.62, y: 5.32, w: 12.10, h: 1.55, fill: MOSSL });
  plain(s, "데이터 권한 설계 — 이것이 신뢰의 전제입니다", { x: 0.95, y: 5.50, w: 11.4, h: 0.34, fontSize: 14, bold: true, color: GREEND });
  plain(s, "행정기관이 개별 농가의 원시데이터를 직접 열람하는 방식이 아닙니다.\n데이터 소유권은 원칙적으로 농가에 두고, 행정에는 농가 동의 아래 위험등급과 정책지표만 익명화하여 제공합니다.\nAI는 진단·처방을 대체하지 않습니다 — 최종 진단과 처방은 수의사가 수행하고, AI는 판단근거·정확도·한계를 함께 표시합니다.", { x: 0.95, y: 5.90, w: 11.4, h: 0.90, fontSize: 12, color: BODY, ls: 19 });
  s.addNotes("농가 반발과 수의계 반발을 동시에 막는 장. '감시 시스템'으로 인식되면 사업 자체가 무너진다는 점을 실무자와 공유한다.");
}
/* 11. 6 엔진 */
{
  const s = S();
  kick(s, "Ⅳ 무엇을 만들 것인가");
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

/* 13. 실적 */
{
  const s = S(true);
  kick(s, "Ⅳ 무엇을 만들 것인가", MOSS);
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


sectionSlide("Ⅴ", "냉정한 자기평가", "HONEST SELF-ASSESSMENT", "3분. 25분 발표에서는 1장만 보여주고 넘어간다.");

{
  const s = S();
  kick(s, "Ⅴ 냉정한 자기평가");
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
  kick(s, "Ⅴ 냉정한 자기평가");
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
  kick(s, "Ⅴ 냉정한 자기평가", MOSS);
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


sectionSlide("Ⅵ", "추진모델", "FOUR-STAGE IMPLEMENTATION MODEL", "6분. 실무자가 기안에 옮길 수 있는 형태로 전달한다.");
{
  const s = S();
  kick(s, "Ⅵ 추진모델");
  T(s, "4단계 추진모델");
  const p = [
    { n: "1단계", t: "정책설계 · 타당성 조사", d: "6개월 · 3~5억원 규모(안)\n기본계획 수립, 국가 플랫폼 연계구조 설계,\n데이터 소유권 기준 수립, 실증농가 선정", c: FAWN },
    { n: "2단계", t: "축우 중심 실증 · 멀티벤더 개방", d: "2년 · 3~5개 시군 · 30~50농가 · 2,000~5,000두\n카우톡으로 착수하되 표준 API를 공개해\n다른 센서·장비 사업자가 붙을 수 있게 합니다", c: GREEN },
    { n: "3단계", t: "다축종 · 시군 확산", d: "한우 · 젖소 · 돼지 · 산란계 · 육계 · 오리 · 염소\n영상 행동분석, 음향 호흡기 분석, 가금 환경분석\n지역 질병 조기경보 · 저탄소 인증 연계", c: MOSS },
    { n: "4단계", t: "국가 · 해외 확산", d: "국가 농업 AX 플랫폼의 축산 표준모델로 확산\n타 시도 SaaS 공급 · 중앙아/동남아 실증\nK-축산 AX 운영센터 구축", c: "8A5A22" }
  ];
  p.forEach((c, i) => {
    const x = 0.62 + (i % 2) * 6.28;
    const y = 1.45 + Math.floor(i / 2) * 2.42;
    card(s, { x: x, y: y, w: 5.98, h: 2.20, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: 5.98, h: 0.80, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.n, { x: x + 0.24, y: y + 0.08, w: 5.5, h: 0.26, fontSize: 10.5, color: i === 2 ? BODY : W, fontFace: FONT, margin: 0, charSpacing: 1.2 });
    s.addText(c.t, { x: x + 0.24, y: y + 0.34, w: 5.5, h: 0.40, fontSize: 16, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0 });
    s.addText(c.d, { x: x + 0.28, y: y + 0.94, w: 5.42, h: 1.15, fontSize: 12, color: BODY, fontFace: FONT, margin: 0, lineSpacing: 18 });
  });
  card(s, { x: 0.62, y: 6.32, w: 12.10, h: 0.60, fill: INK });
  s.addText("오늘 결정이 필요한 것은 1단계뿐입니다 — 타당성 조사가 나머지 3단계의 판단 근거를 만듭니다", { x: 0.90, y: 6.32, w: 11.5, h: 0.60, fontSize: 14, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("전체를 결정하라는 요구로 들리면 안 된다. 1단계(타당성조사 3~5억)만 결정하면 된다는 점을 반복.");
}

{
  const s = S();
  kick(s, "Ⅵ 추진모델");
  T(s, "1단계 — 기본계획 및 타당성 조사 (6개월)");
  const a = [
    "전남 축산 AX 기본계획 수립", "축종별 · 시군별 현황조사",
    "기존 장비와 데이터 보유현황 조사", "국가 농업 AX 플랫폼 연계구조 설계",
    "데이터 소유권과 활용기준 수립", "데이터 표준 · 개방 API 규격 확정",
    "실증농가와 참여기관 선정", "경제성 · 정책성 · 기술성 분석",
    "단계별 예산과 재원조달계획 수립"
  ];
  a.forEach((t, i) => {
    const x = 0.62 + (i % 3) * 4.10;
    const y = 1.45 + Math.floor(i / 3) * 0.76;
    card(s, { x: x, y: y, w: 3.88, h: 0.64, fill: i % 2 === 0 ? TINT : TINT2 });
    badge(s, x + 0.18, y + 0.10, String(i + 1), { fill: GREEN, d: 0.44, fs: 11 });
    s.addText(t, { x: x + 0.76, y: y, w: 3.02, h: 0.64, fontSize: 11.5, color: BODY, fontFace: FONT, margin: 0, valign: "middle" });
  });
  card(s, { x: 0.62, y: 3.85, w: 5.95, h: 1.55, fill: MOSSL });
  plain(s, "제안 예산", { x: 0.95, y: 4.02, w: 5.3, h: 0.32, fontSize: 14, bold: true, color: GREEND });
  plain(s, "정책기획 · 타당성 조사비 3억 ~ 5억원 규모(안)\n\n구체적 금액은 과업범위와 국가 플랫폼 SPC의\n역할분담에 따라 확정합니다.", { x: 0.95, y: 4.38, w: 5.35, h: 0.90, fontSize: 12, color: BODY, ls: 18 });
  card(s, { x: 6.77, y: 3.85, w: 5.95, h: 1.55, fill: TINT2, line: "E0E6DB" });
  plain(s, "왜 타당성 조사가 먼저인가", { x: 7.10, y: 4.02, w: 5.3, h: 0.32, fontSize: 14, bold: true, color: FAWN });
  plain(s, "SPC 사업계획 조율이 진행 중입니다.\n축산 전문영역의 범위·예산·역할분담을 근거 있게\n제시하려면 조사 결과가 필요합니다.\n지금 착수해야 반영 시점에 맞출 수 있습니다.", { x: 7.10, y: 4.38, w: 5.35, h: 0.95, fontSize: 12, color: BODY, ls: 18 });
  card(s, { x: 0.62, y: 5.62, w: 12.10, h: 1.25, fill: INK });
  plain(s, "참고 — 인접 사례의 규모", { x: 0.95, y: 5.78, w: 11.4, h: 0.30, fontSize: 13, bold: true, color: FAWNL });
  plain(s, "경기도는 AI 축산행정 플랫폼을 5개년 총 102.3억원 규모로 추진 중이며, 예산의 약 47%를 시범운영·확산에 배정했습니다.\n전남 축산 AX 플랫폼의 본사업 규모는 타당성 조사에서 축종 구성과 실증 규모에 따라 산정합니다.", { x: 0.95, y: 6.14, w: 11.4, h: 0.66, fontSize: 12, color: W, ls: 18 });
  s.addNotes("3~5억은 실무자가 부담 없이 검토할 수 있는 규모다. 본사업 금액을 지금 제시하지 않는 것이 오히려 신뢰를 준다.");
}

{
  const s = S(true);
  kick(s, "Ⅵ 추진모델", MOSS);
  T(s, "2단계 — 축우 중심 실증 (2년)", { color: W });
  const st = [
    { n: "3~5개", l: "참여 시 · 군" },
    { n: "30~50", l: "참여 농가" },
    { n: "2,000~5,000두", l: "실증 대상 두수", sz: 20 },
    { n: "2년", l: "실증 기간" }
  ];
  st.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 1.45, w: 2.88, h: 1.55, fill: INK2 });
    s.addText(c.n, { x: x, y: 1.62, w: 2.88, h: 0.70, align: "center", valign: "middle", fontSize: c.sz || 28, bold: true, color: FAWNL, fontFace: HEAD, margin: 0 });
    s.addText(c.l, { x: x + 0.16, y: 2.36, w: 2.56, h: 0.42, align: "center", fontSize: 12, color: W, fontFace: FONT, margin: 0 });
  });
  card(s, { x: 0.62, y: 3.22, w: 5.95, h: 1.85, fill: INK2 });
  plain(s, "핵심 실증과제", { x: 0.95, y: 3.38, w: 5.3, h: 0.32, fontSize: 14, bold: true, color: FAWNL });
  plain(s, "질병 조기탐지 · 발정/임신/분만 예측 · 열 스트레스 대응\n사료효율과 생산성 분석 · 수의사 원격지원\n농가 작업관리 · 지자체 관제 · 정책성과 측정", { x: 0.95, y: 3.74, w: 5.35, h: 1.20, fontSize: 12, color: W, ls: 19 });
  card(s, { x: 6.77, y: 3.22, w: 5.95, h: 1.85, fill: FAWN });
  plain(s, "성과검증 — 실증 전 1년과 비교합니다", { x: 7.10, y: 3.38, w: 5.3, h: 0.32, fontSize: 14, bold: true, color: W });
  plain(s, "질병 발견시점 · 치료비 · 폐사율/도태율\n번식간격/공태일수 · 수정횟수 · 분만사고\n사료비 · 산유량/증체량 · 노동시간\n항생제 사용량 · 농가소득", { x: 7.10, y: 3.74, w: 5.35, h: 1.25, fontSize: 12, color: W, ls: 19 });
  card(s, { x: 0.62, y: 5.30, w: 12.10, h: 1.55, fill: INK2 });
  plain(s, "이 설계의 핵심", { x: 0.95, y: 5.48, w: 11.4, h: 0.32, fontSize: 14, bold: true, color: FAWNL });
  plain(s, "실증 전 1년치 기초선 데이터를 먼저 확보합니다. 기초선이 없으면 어떤 효과도 증명할 수 없습니다.\n그리고 참여 농가와 비참여 농가를 함께 측정합니다 — 이것이 2단계 이후 예산의 근거가 됩니다.\n효과가 확인되지 않으면 다음 단계로 넘어가지 않는 것이 정상적인 설계입니다.", { x: 0.95, y: 5.86, w: 11.4, h: 0.90, fontSize: 12.5, color: W, ls: 19 });
  s.addNotes("기초선 확보가 착수 시점을 앞당겨야 하는 이유. 그리고 '효과 없으면 중단'이라는 출구를 명시해 승인 부담을 낮춘다.");
}

sectionSlide("Ⅶ", "추진체계 · 성과지표", "GOVERNANCE & KPI", "4분.");

{
  const s = S();
  kick(s, "Ⅶ 추진체계 · 성과지표");
  T(s, "추진체계 — 새 조직을 만들지 않습니다");
  card(s, { x: 0.62, y: 1.42, w: 5.95, h: 2.45, fill: TINT });
  plain(s, "전남도 축산 AX 추진위원회", { x: 0.95, y: 1.58, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: GREEND });
  plain(s, "위원장 — 행정부지사 또는 경제부지사\n\n축산정책과 · 동물방역과 · 농업정책과 ·\n스마트정보담당관 · 환경/에너지 부서 ·\n투자유치·기업육성 부서 ·\n전남농업기술원 · 전남축산연구소", { x: 0.95, y: 1.98, w: 5.35, h: 1.75, fontSize: 11.5, color: BODY, ls: 17 });
  card(s, { x: 6.77, y: 1.42, w: 5.95, h: 2.45, fill: TINT2, line: "E0E6DB" });
  plain(s, "실무추진단", { x: 7.10, y: 1.58, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: FAWN });
  plain(s, "전남도 · 시군 · 국가 농업 AX 플랫폼 SPC ·\n카우톡 운영기관 · 축협과 생산자단체 ·\n수의사회 · 대학/연구기관 ·\n센서·로봇·사료기업 · AI·클라우드·보안기업", { x: 7.10, y: 1.98, w: 5.35, h: 1.75, fontSize: 11.5, color: BODY, ls: 17 });
  const r = [
    { t: "전남도", d: "정책 총괄 · 실증지역 선정 · 행정/예산 지원 · 중앙정부 협의 · 데이터 거버넌스 · 시군 확산", c: FAWN },
    { t: "국가 AX 플랫폼 SPC", d: "공통 인프라 연계 · 클라우드/AI 서비스 유통 · 국가 데이터정책 연계 · 민간투자와 사업화", c: GREEN },
    { t: "카우톡", d: "축산 데이터 통합 · 축산 AI 모델 개발 · 농가/수의사/행정 서비스 · 실증운영 · 효과분석 · API 제공", c: GREEN },
    { t: "대학 · 연구기관", d: "알고리즘 검증 · 수의축산학적 타당성 검증 · 데이터 표준화 · 윤리/보안/통계 검증", c: MOSS },
    { t: "농가 · 축협", d: "현장 실증 · 데이터 제공과 검증 · 서비스 사용성 평가 · 확산모델 개발", c: MOSS }
  ];
  r.forEach((c, i) => {
    const y = 4.05 + i * 0.58;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.50, fill: i % 2 === 0 ? TINT2 : W, line: "E8EDE4" });
    s.addShape(pres.ShapeType.roundRect, { x: 0.62, y: y, w: 2.65, h: 0.50, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.08 });
    s.addText(c.t, { x: 0.82, y: y, w: 2.30, h: 0.50, fontSize: 11.5, bold: true, color: i >= 3 ? BODY : W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: 3.45, y: y, w: 9.1, h: 0.50, fontSize: 11, color: BODY, fontFace: FONT, margin: 0, valign: "middle" });
  });
  s.addNotes("수의사회를 승인 주체로, 대학·연구기관을 검증 주체로 명시하는 것이 중요하다. 특정 기업 특혜 우려를 구조로 차단한다.");
}

{
  const s = S();
  kick(s, "Ⅶ 추진체계 · 성과지표");
  T(s, "성과지표 — 네 개 군으로 측정합니다");
  const g = [
    { t: "농가 성과", c: GREEN, l: ["질병 조기발견 시간", "폐사율 감소 · 치료비 절감", "항생제 사용량 감소", "공태일수 단축 · 수정횟수 감소", "분만사고 감소", "사료효율 · 두당 생산성", "노동시간 감소 · 농가소득"] },
    { t: "행정 성과", c: FAWN, l: ["재난 취약농가 사전발굴률", "질병 이상징후 대응시간", "현장점검 효율", "정책사업 중복 감소", "보조사업 성과측정률", "데이터 기반 정책사업 비율", "축산민원 대응시간"] },
    { t: "환경 성과", c: MOSS, l: ["축산물 단위당 온실가스 감축", "분뇨처리 이력관리율", "악취 민원 감소", "사료효율 개선 자원절감", "폐사·생산손실 감소", "저탄소 인증농가 증가"] },
    { t: "산업 성과", c: "8A5A22", l: ["축산 AI 기업 수", "신규 고용 · 청년 창업", "전남 축산 데이터셋 구축", "AI 모델과 특허", "국내외 플랫폼 공급", "해외 실증과 수출액"] }
  ];
  g.forEach((c, i) => {
    const x = 0.62 + i * 3.10;
    card(s, { x: x, y: 1.45, w: 2.88, h: 3.75, fill: TINT2, shadow: true });
    s.addShape(pres.ShapeType.roundRect, { x: x, y: 1.45, w: 2.88, h: 0.66, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.t, { x: x + 0.18, y: 1.45, w: 2.52, h: 0.66, fontSize: 14, bold: true, color: i === 2 ? BODY : W, fontFace: HEAD, margin: 0, valign: "middle" });
    body(s, c.l, { x: x + 0.22, y: 2.24, w: 2.46, h: 2.85, fontSize: 11, gap: 6 });
  });
  card(s, { x: 0.62, y: 5.42, w: 12.10, h: 1.45, fill: INK });
  plain(s, "측정 원칙", { x: 0.95, y: 5.58, w: 11.4, h: 0.32, fontSize: 13.5, bold: true, color: FAWNL });
  plain(s, "① 사업 시작 전 기초선을 먼저 확보합니다  ② 참여 농가와 비참여 농가를 함께 측정합니다\n③ 결과는 실패 항목까지 포함해 공개합니다  ④ 최종 산출물은 보고서가 아니라 다음 사업의 설계 근거입니다", { x: 0.95, y: 5.96, w: 11.4, h: 0.72, fontSize: 12, color: W, ls: 18 });
  s.addNotes("행정 성과 열이 실무자에게 가장 중요하다 — '정책사업 성과측정률'은 매년 겪는 고충이다.");
}

sectionSlide("Ⅷ", "타당성과 우려", "FEASIBILITY & CONCERNS", "5분. 반대 논거를 먼저 꺼낸다.");
{
  const s = S();
  kick(s, "Ⅷ 타당성과 우려");
  T(s, "다섯 관점에서 검토했습니다");
  const ax = [
    { t: "정책적 타당성", v: "높음", d: "국가 농업·농촌 AX 전략, 국가 농업 AX 플랫폼, AX 데이터 전략, AX-Sprint,\n스마트축산·저탄소·동물복지, 전남 AI 축산 융복합밸리, 축산자원개발부 이전과 모두 연계됩니다.", c: GREEN },
    { t: "산업적 타당성", v: "높음", d: "전남의 다양한 축종과 농가 기반, 높은 데이터 수요,\n센서·로봇·수의·사료·보험 산업의 확장 가능성, 타 시도·해외 확산 가능성.", c: GREEN },
    { t: "기술적 타당성", v: "높음", d: "이미 상용화된 생체센서와 기존 축산 ICT 장비 API 연계 가능.\n클라우드·AI 기술 활용 가능. 단계별 실증으로 위험을 관리합니다.", c: GREEN },
    { t: "경제적 타당성", v: "조건부", d: "플랫폼 매출만으로 평가할 수 없습니다. 질병·폐사 감소, 번식효율, 사료비·노동시간 절감,\n재난피해·방역비용 감소, 정책집행 효율, 탄소비용 감소, 고용·수출을 종합해야 합니다.", c: FAWN },
    { t: "공공적 타당성", v: "높음", d: "국가 식량안보, 가축질병 예방, 축산 데이터 주권, 농가 고령화 대응,\n농촌 삶의 질, 환경과 주민수용성, 소비자 신뢰.", c: GREEN }
  ];
  ax.forEach((c, i) => {
    const y = 1.42 + i * 1.06;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.94, fill: i % 2 === 0 ? TINT : TINT2 });
    s.addShape(pres.ShapeType.roundRect, { x: 0.62, y: y, w: 2.30, h: 0.94, fill: { color: c.c }, line: { type: "none" }, rectRadius: 0.10 });
    s.addText(c.t, { x: 0.80, y: y, w: 1.95, h: 0.94, fontSize: 13, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.v, { x: 3.05, y: y, w: 1.20, h: 0.94, align: "center", fontSize: 13, bold: true, color: c.c === FAWN ? FAWN : GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.d, { x: 4.40, y: y, w: 8.10, h: 0.94, fontSize: 11, color: BODY, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 15 });
  });
  card(s, { x: 0.62, y: 6.75, w: 12.10, h: 0.001, fill: W });
  foot(s, "※ 경제적 타당성을 '조건부'로 표기한 것은 의도적입니다 — 축산 데이터로 검증되지 않은 것을 검증되었다고 말하지 않습니다. 그 검증이 실증사업의 목적입니다.");
  s.addNotes("다섯 축 중 하나를 일부러 '조건부'로 뒀다. 전부 '높음'인 제안서는 신뢰를 잃는다.");
}
{
  const s = S();
  kick(s, "Ⅷ 타당성과 우려");
  T(s, "경제성 — 무엇을 얼마나 회수해야 하는가");
  plain(s, "경제성은 플랫폼 매출이 아니라 회피되는 손실의 총합으로 평가해야 합니다.\n실증사업에서 다음 항목을 두당 금액으로 환산해 확정합니다.", { x: 0.62, y: 1.24, w: 12.1, h: 0.70, fontSize: 13, color: MUTED, ls: 19 });
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
  kick(s, "Ⅷ 타당성과 우려", MOSS);
  T(s, "예상되는 우려와 대응", { color: W });
  const q = [
    { q: "기존 국가 농업 AX 플랫폼과 중복 아닌가", a: "국가 플랫폼은 범농업 공통 기반이고, 카우톡은 축산 생체·수의·방역 데이터를 처리하는 전문 실행 플랫폼입니다. 중복이 아니라 국가 플랫폼의 축산 기능을 완성하는 구조입니다." },
    { q: "특정 기업에 대한 특혜가 될 수 있지 않은가", a: "제안의 목표는 플랫폼이고 카우톡은 1단계 착수 수단입니다. 전남도가 기능·성과·데이터 표준을 정하고, 1단계에서 그 표준과 개방 API 규격을 공개해 2단계부터 다른 사업자가 참여하도록 의무화합니다. 특정 제품 구매사업으로 추진하지 않습니다." },
    { q: "농가 데이터가 행정기관에 과도하게 노출되지 않는가", a: "데이터 소유권은 원칙적으로 농가에 있습니다. 행정에는 농가 동의 아래 정책지표와 익명화된 위험정보만 제공합니다. 원시데이터·상업활용·연구활용·공공활용 권한을 구분합니다." },
    { q: "AI의 오진이나 오경보 책임은 누가 지는가", a: "AI는 진단·처방이 아니라 위험 선별과 의사결정 지원을 담당합니다. 최종 진단과 처방은 수의사가 수행하며, AI 판단근거와 정확도, 한계를 화면에 표시합니다." },
    { q: "농가가 실제로 사용할 것인가", a: "복잡한 대시보드가 아니라 오늘의 작업목록, 음성 안내, 대화형 AI, 모바일 알림, 위험도와 조치방법, 수의사 연결, 농가별 경제효과 표시로 설계합니다." }
  ];
  q.forEach((c, i) => {
    const y = 1.42 + i * 1.06;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.94, fill: INK2 });
    s.addText("“" + c.q + "”", { x: 0.92, y: y, w: 4.30, h: 0.94, fontSize: 11.5, bold: true, color: FAWNL, fontFace: HEAD, margin: 0, valign: "middle", lineSpacing: 16 });
    s.addText(c.a, { x: 5.45, y: y, w: 7.05, h: 0.94, fontSize: 10.5, color: W, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 15 });
  });
  card(s, { x: 0.62, y: 6.75, w: 12.10, h: 0.001, fill: INK });
  s.addNotes("실무자가 상급자 보고 시 받을 질문들이다. 미리 답을 손에 쥐여주는 것이 목적.");
}
{
  const s = S();
  kick(s, "Ⅷ 타당성과 우려");
  T(s, "하지 않았을 때의 비용");
  const p = [
    { t: "번식 기반은 계속 줄어듭니다", d: "가임암소 감소는 3~4년 뒤 송아지 공급 부족으로 나타납니다.\n그 시점에는 전남 비육농가가 도내에서 입식할 송아지를 구하지 못합니다.", c: FAWN },
    { t: "데이터 공백은 소급되지 않습니다", d: "올해 놓친 개체 데이터는 내년에 만들 수 없습니다.\n비교의 기준선이 없으면 어떤 정책 효과도 증명할 수 없습니다.", c: GREEN },
    { t: "축산 AX 표준을 다른 지역이 가져갑니다", d: "낙농 표준은 이미 경기도가 만들고 있습니다.\n축산 AX 표준을 먼저 만든 지역이 이후 국가 사업의 기준이 됩니다.", c: MOSS },
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
  s.addText("타당성 조사 비용은 3~5억원이지만, 하지 않는 비용은 금액으로 청구되지 않을 뿐 더 큽니다", { x: 0.90, y: 6.15, w: 11.5, h: 0.80, fontSize: 15, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("정책결정에서 가장 설득력 있는 논거는 '안 했을 때의 비용'이다. 특히 2번(데이터는 소급 불가)이 시급성의 논리적 근거.");
}


sectionSlide("Ⅸ", "요청사항", "THE ASK", "5분. 여기서 끝낸다.");
{
  const s = S();
  kick(s, "Ⅸ 요청사항");
  T(s, "전남도가 즉시 추진해야 할 7과제");
  const p = [
    "전남 국가 농업 AX 플랫폼 사업계획에 '축산 AX 전문영역'을 공식 반영",
    "축산정책과 · 농업정책과 · SPC 준비조직 · 카우톡이 참여하는 실무협의회 구성",
    "「전남 축산 AX 플랫폼 기본계획 및 타당성 조사」 용역 추진",
    "한우 · 젖소 중심의 1차 실증농가와 시군 선정",
    "전남형 축산 데이터 표준과 농가 데이터 권리원칙 수립",
    "국립축산과학원 축산자원개발부 · 전남축산연구소 · 지역대학 공동 검증체계 구축",
    "농식품부 AX-Sprint · 스마트축산 · 저탄소 · 동물복지 · 가축방역 · 지역혁신 사업 연계 국비사업 확장"
  ];
  p.forEach((t, i) => {
    const y = 1.45 + i * 0.68;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.58, fill: i < 3 ? MOSSL : (i % 2 === 0 ? TINT : TINT2) });
    badge(s, 0.84, y + 0.06, "제" + (i + 1), { fill: i < 3 ? FAWN : GREEN, d: 0.46, fs: 10 });
    s.addText(t, { x: 1.48, y: y, w: 11.0, h: 0.58, fontSize: 12.5, bold: i < 3, color: i < 3 ? GREEND : BODY, fontFace: i < 3 ? HEAD : FONT, margin: 0, valign: "middle" });
  });
  card(s, { x: 0.62, y: 6.28, w: 12.10, h: 0.60, fill: INK });
  s.addText("이 중 제1~3과제만 결정되면 나머지는 순차로 진행됩니다 — 오늘 필요한 것은 그 세 가지입니다", { x: 0.90, y: 6.28, w: 11.5, h: 0.60, fontSize: 14, bold: true, color: MOSSL, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("7개를 다 요구하지 않는다. 앞 3개(강조 표시)만 오늘의 요청이라고 명확히 한다.");
}

{
  const s = S(true);
  kick(s, "Ⅸ 요청사항", MOSS);
  T(s, "도지사 보고용 핵심 메시지 다섯 문장", { color: W });
  const m = [
    "전남은 이미 국가 농업 AX 플랫폼의 최종 사업지역으로 선정됐다. 이제 중요한 것은 그 안에서 전남의 핵심 산업인 축산업이 실질적인 중심사업으로 자리 잡도록 하는 것이다.",
    "축산은 일반 농업과 달리 생체·질병·방역·번식·환경 데이터를 동시에 다뤄야 하므로 축산 전문 AX 플랫폼이 반드시 필요하다.",
    "카우톡은 특정 센서 판매사업이 아니라 다양한 축산 데이터를 연결하고 농가·수의사·지자체·정부의 의사결정을 지원하는 축산 전문 AI 운영체계다.",
    "이 사업은 농가 생산성 향상뿐 아니라 가축질병·폭염·탄소·분뇨·악취·농촌 고령화·데이터 주권 문제를 함께 해결하는 도정 종합사업이다.",
    "전남이 지금 축산 AX 모델을 선점하면 대한민국의 표준이 될 수 있고, 다른 지역과 해외에 수출하는 K-축산 플랫폼으로 성장시킬 수 있다."
  ];
  m.forEach((t, i) => {
    const y = 1.45 + i * 1.06;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.94, fill: INK2 });
    badge(s, 0.90, y + 0.24, String(i + 1), { fill: i === 0 ? FAWN : GREEN, d: 0.46, fs: 13 });
    s.addText(t, { x: 1.58, y: y, w: 10.85, h: 0.94, fontSize: 12, color: W, fontFace: FONT, margin: 0, valign: "middle", lineSpacing: 17 });
  });
  card(s, { x: 0.62, y: 6.75, w: 12.10, h: 0.001, fill: INK });
  s.addNotes("실무자가 도지사·부지사께 보고할 때 그대로 쓸 수 있는 문장이다. 이 장은 인쇄해서 드리는 것이 좋다.");
}

{
  const s = S();
  kick(s, "Ⅸ 요청사항");
  T(s, "의사결정 요청사항과 1차 회의 합의사항");
  card(s, { x: 0.62, y: 1.42, w: 5.95, h: 4.45, fill: TINT });
  plain(s, "별첨 1 — 의사결정 요청", { x: 0.95, y: 1.60, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: GREEND });
  body(s, [
    "전남 축산 AX 플랫폼을 도 전략사업으로 검토",
    "국가 농업 AX 플랫폼 SPC 사업계획에 축산 전문영역 반영",
    "전남도 관련 부서 합동 실무협의체 구성",
    "기본계획 및 타당성 조사 추진",
    "1차 실증 시군 · 농가 선정",
    "농식품부 국비사업 연계 협의",
    "카우톡 기술 · 현장 검증 착수"
  ], { x: 0.95, y: 2.06, w: 5.35, h: 3.55, fontSize: 12 });
  card(s, { x: 6.77, y: 1.42, w: 5.95, h: 4.45, fill: TINT2, line: "E0E6DB" });
  plain(s, "별첨 2 — 1차 회의에서 합의할 사항", { x: 7.10, y: 1.60, w: 5.3, h: 0.34, fontSize: 14.5, bold: true, color: FAWN });
  body(s, [
    "국가 농업 AX 플랫폼에서 축산의 현재 비중",
    "축산 분야 사업예산과 담당조직",
    "SPC와 전남도의 역할분담",
    "카우톡 실증 참여방식",
    "대상 축종과 실증지역",
    "데이터 소유권과 연계방식",
    "국립축산과학원 및 지역대학 참여",
    "기본계획 용역의 발주 주체",
    "2027년 본예산 또는 추경 반영 가능성",
    "농림축산식품부 협의 일정"
  ], { x: 7.10, y: 2.06, w: 5.35, h: 3.55, fontSize: 11.5, gap: 5 });
  card(s, { x: 0.62, y: 6.12, w: 12.10, h: 0.78, fill: FAWN });
  s.addText("오늘 결정하실 것은 사업 추진이 아니라, 검토를 시작해도 좋다는 판단입니다", { x: 0.90, y: 6.12, w: 11.5, h: 0.78, fontSize: 15, bold: true, color: W, fontFace: HEAD, margin: 0, valign: "middle" });
  s.addNotes("오른쪽 목록이 다음 회의의 안건표가 된다. 이 장을 그대로 회의 자료로 쓸 수 있게 만들었다.");
}

{
  const s = S(true);
  s.addShape(pres.ShapeType.ellipse, { x: 10.10, y: -1.90, w: 5.60, h: 5.60, fill: { color: INK2 }, line: { type: "none" } });
  s.addShape(pres.ShapeType.ellipse, { x: 11.60, y: 4.90, w: 2.80, h: 2.80, fill: { color: GREEND }, line: { type: "none" } });
  s.addText("최종 제안", { x: 0.75, y: 1.30, w: 9.0, h: 0.40, fontSize: 13, bold: true, color: FAWN, fontFace: FONT, margin: 0, charSpacing: 1.5 });
  s.addText("국가 플랫폼 선정이라는 기회를\n축산업의 구조적 전환으로\n연결해야 합니다", { x: 0.75, y: 1.85, w: 9.3, h: 2.20, fontSize: 28, bold: true, color: W, fontFace: HEAD, margin: 0, lineSpacing: 44 });
  s.addText("농가에는 AI 농장장, 수의사에게는 임상 의사결정 지원체계, 시군에는 축산 관제센터,\n전남도에는 정책 AIP, 국가에는 축산 데이터 인프라, 해외시장에는 K-축산 운영체제.", { x: 0.75, y: 4.28, w: 9.3, h: 0.90, fontSize: 13, color: MOSSL, fontFace: FONT, margin: 0, lineSpacing: 23 });
  card(s, { x: 0.75, y: 5.45, w: 6.20, h: 1.20, fill: FAWN });
  s.addText("감사합니다.  질의응답", { x: 0.75, y: 5.45, w: 6.20, h: 1.20, align: "center", valign: "middle", fontSize: 22, bold: true, color: W, fontFace: HEAD, margin: 0 });
  s.addText("농업회사법인 ㈜D2O  대표 하현제\nhhj3150@hanmail.net", { x: 7.35, y: 5.55, w: 4.5, h: 1.00, fontSize: 12.5, color: W, fontFace: FONT, margin: 0, lineSpacing: 21 });
  s.addNotes("마지막 문장은 천천히. 요청은 이미 앞에서 했으므로 여기서는 비전으로 닫는다.");
}

{
  const s = S();
  kick(s, "APPENDIX");
  T(s, "예상 질의 대비 — 백업");
  const q = [
    { q: "국가 플랫폼과 중복 아닙니까?", a: "국가 플랫폼은 범농업 공통 기반, 카우톡은 축산 전문 실행계층입니다. 층이 다릅니다." },
    { q: "왜 지금입니까?", a: "SPC 사업계획 조율 중입니다. 확정 후에는 구조 변경이 어렵습니다." },
    { q: "특정 업체 특혜 아닙니까?", a: "도가 기능·성과·데이터 표준을 정하고 개방형 API·멀티벤더를 의무화합니다." },
    { q: "농가 데이터 노출 우려는?", a: "소유권은 농가. 행정에는 동의 아래 익명화된 위험등급·정책지표만 제공합니다." },
    { q: "AI 오진 책임은?", a: "AI는 위험 선별만. 최종 진단·처방은 수의사가 수행하며 판단근거·한계를 표시합니다." },
    { q: "고령 농가가 쓸 수 있습니까?", a: "앱 전제 아님. 문자·음성·대화형 AI와 수의사 대행 서비스로 설계합니다." },
    { q: "예산은 얼마입니까?", a: "1단계 타당성 조사 3~5억원(안). 본사업 규모는 조사 결과로 산정합니다." },
    { q: "효과가 없으면?", a: "기초선과 비교군을 두고 측정합니다. 확인되지 않으면 다음 단계로 넘어가지 않습니다." }
  ];
  q.forEach((c, i) => {
    const y = 1.42 + i * 0.68;
    card(s, { x: 0.62, y: y, w: 12.10, h: 0.58, fill: i % 2 === 0 ? TINT : TINT2 });
    s.addText("Q", { x: 0.85, y: y, w: 0.34, h: 0.58, align: "center", valign: "middle", fontSize: 12.5, bold: true, color: FAWN, fontFace: HEAD, margin: 0 });
    s.addText(c.q, { x: 1.26, y: y, w: 3.95, h: 0.58, fontSize: 11.5, bold: true, color: GREEND, fontFace: HEAD, margin: 0, valign: "middle" });
    s.addText(c.a, { x: 5.35, y: y, w: 7.15, h: 0.58, fontSize: 11, color: BODY, fontFace: FONT, margin: 0, valign: "middle" });
  });
  foot(s, "※ 발표용이 아닌 준비용 백업 슬라이드입니다.");
  s.addNotes("발표 시 스킵. 질의응답에서 필요 시 열람.");
}

pres.writeFile({ fileName: "전남축산AX플랫폼_정책제안.pptx" }).then(f => console.log("saved:", f));
