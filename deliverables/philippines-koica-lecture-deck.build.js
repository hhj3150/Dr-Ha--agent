// Philippines PCC–KOICA NDHIP lecture deck — Dr. Hyunje Ha
const pptxgen = require('pptxgenjs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const Fa = require('react-icons/fa');
const Fa6 = require('react-icons/fa6');
const path = require('path');

const OUT = process.argv[2] || path.join(__dirname, 'philippines-koica-lecture-deck.pptx');

// Palette — forest / moss / cream, gold accent
const C = {
  forest: '2C5F2D', moss: '97BC62', tint: 'EEF4E6', tint2: 'F6F9F2', white: 'FFFFFF',
  ink: '1F2A1F', muted: '5B6B5B', gold: 'D9A441', rust: 'B85042', sky: '4F81A4', line: 'D5DECB',
};
const HFONT = 'Cambria', BFONT = 'Calibri';
const W = 13.333, H = 7.5, M = 0.6;

async function iconData(Comp, color, px = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: '#' + color, size: px }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return 'image/png;base64,' + buf.toString('base64');
}
const ICONS = {};
async function I(name, color) {
  const key = name + color;
  if (!ICONS[key]) {
    const Comp = Fa6[name] || Fa[name] || Fa.FaCircle;
    ICONS[key] = await iconData(Comp, color);
  }
  return ICONS[key];
}

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Dr. Hyunje Ha, DVM';
pres.title = 'Smart Dairy Herd Management — PCC–KOICA NDHIP Training';
let slideNo = 0;

function footer(s, dark = false) {
  slideNo++;
  s.addText('PCC–KOICA NDHIP Local Training Series  ·  Dr. Hyunje Ha, DVM', {
    x: M, y: H - 0.45, w: 8, h: 0.3, fontFace: BFONT, fontSize: 9, color: dark ? C.moss : C.muted, isTextBox: true, margin: 0,
  });
  s.addText(String(slideNo), { x: W - M - 1, y: H - 0.45, w: 1, h: 0.3, fontFace: BFONT, fontSize: 9, color: dark ? C.moss : C.muted, align: 'right', isTextBox: true, margin: 0 });
}
function header(s, title, kicker) {
  if (kicker) s.addText(kicker.toUpperCase(), { x: M, y: 0.32, w: 10, h: 0.3, fontFace: BFONT, fontSize: 11, bold: true, color: C.moss, charSpacing: 2, isTextBox: true, margin: 0 });
  s.addText(title, { x: M, y: 0.58, w: W - 2 * M, h: 0.8, fontFace: HFONT, fontSize: 26, bold: true, color: C.forest, isTextBox: true, margin: 0, valign: 'top' });
}
async function circleIcon(s, name, x, y, d, bg, fg) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { color: bg } });
  const data = await I(name, fg);
  const k = d * 0.52;
  s.addImage({ data, x: x + (d - k) / 2, y: y + (d - k) / 2, w: k, h: k });
}
function card(s, x, y, w, h, fill = C.tint) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.12 });
}
function bullets(s, items, x, y, w, h, opt = {}) {
  const arr = items.map((t, i) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: i < items.length - 1, paraSpaceAfter: opt.gap ?? 6 } }));
  s.addText(arr, { x, y, w, h, fontFace: BFONT, fontSize: opt.size ?? 14, color: opt.color ?? C.ink, valign: 'top', isTextBox: true, margin: 0 });
}
function note(s, en, kr) { s.addNotes((kr ? '[KR] ' + kr + '\n\n' : '') + en); }
function tbl(s, rows, x, y, w, colW, opt = {}) {
  const data = rows.map((r, ri) => r.map((c) => ({
    text: String(c), options: ri === 0
      ? { bold: true, color: C.white, fill: { color: C.forest }, fontSize: opt.hsize ?? 12, fontFace: BFONT, valign: 'middle' }
      : { color: C.ink, fill: { color: ri % 2 ? C.white : C.tint2 }, fontSize: opt.size ?? 12, fontFace: BFONT, valign: 'middle' },
  })));
  s.addTable(data, { x, y, w, colW, border: { type: 'solid', pt: 0.5, color: C.line }, rowH: opt.rowH ?? 0.36, margin: 0.06, autoPage: false });
}

// ---------- Section slide (dark) ----------
async function section(num, title, sub, iconName) {
  const s = pres.addSlide();
  s.background = { color: C.forest };
  await circleIcon(s, iconName, M, 2.3, 1.3, C.moss, C.forest);
  s.addText('MODULE ' + num, { x: M, y: 3.85, w: 6, h: 0.35, fontFace: BFONT, fontSize: 13, bold: true, color: C.moss, charSpacing: 3, isTextBox: true, margin: 0 });
  s.addText(title, { x: M, y: 4.2, w: 11, h: 1.0, fontFace: HFONT, fontSize: 40, bold: true, color: C.white, isTextBox: true, margin: 0 });
  s.addText(sub, { x: M, y: 5.25, w: 11, h: 0.8, fontFace: BFONT, fontSize: 16, color: C.tint, isTextBox: true, margin: 0 });
  footer(s, true);
  return s;
}

(async () => {
  // ===== 1. Title =====
  {
    const s = pres.addSlide();
    s.background = { color: C.forest };
    s.addShape(pres.shapes.OVAL, { x: 9.3, y: -1.2, w: 5.5, h: 5.5, fill: { color: '386F39' }, line: { color: '386F39' } });
    s.addShape(pres.shapes.OVAL, { x: 10.6, y: 0.1, w: 3.2, h: 3.2, fill: { color: C.moss }, line: { color: C.moss } });
    s.addImage({ data: await I('FaCow', C.forest), x: 11.35, y: 0.85, w: 1.7, h: 1.7 });
    s.addText('PCC – KOICA  ·  NATIONAL DAIRY HERD IMPROVEMENT PROJECT  ·  LOCAL TRAINING SERIES', { x: M, y: 1.0, w: 9, h: 0.4, fontFace: BFONT, fontSize: 12, bold: true, color: C.moss, charSpacing: 2, isTextBox: true, margin: 0 });
    s.addText('Smart Dairy Herd Management', { x: M, y: 1.6, w: 9.2, h: 1.2, fontFace: HFONT, fontSize: 48, bold: true, color: C.white, isTextBox: true, margin: 0 });
    s.addText('Reproduction, Health & Sensor-Based Monitoring\nKorea’s dairy experience applied to Philippine dairy cattle and buffalo', { x: M, y: 2.85, w: 9.2, h: 1.2, fontFace: BFONT, fontSize: 20, color: C.tint, isTextBox: true, margin: 0 });
    s.addText([
      { text: 'Dr. Hyunje Ha, DVM', options: { bold: true, fontSize: 18, color: C.white, breakLine: true } },
      { text: 'CEO, Genetics Co., Ltd. · D2O Co., Ltd. · Korea Animal Hospital', options: { fontSize: 14, color: C.tint, breakLine: true } },
      { text: 'Adjunct Professor, College of Veterinary Medicine, Konkuk University', options: { fontSize: 14, color: C.tint, breakLine: true } },
      { text: 'Science City of Muñoz, Nueva Ecija · 2026', options: { fontSize: 14, color: C.moss } },
    ], { x: M, y: 4.9, w: 9, h: 1.6, fontFace: BFONT, isTextBox: true, margin: 0, valign: 'top' });
    footer(s, true);
    note(s, 'Welcome. Today we connect three things every dairy technician handles daily — reproduction, health, and records — and show how sensor data makes each one faster and more accurate. Everything I show comes from farms I manage in Korea; the Philippine numbers are your own to build through the NDHIP pilot.', '인사 및 강의 목적: 번식·건강·기록을 센서 데이터로 연결하는 것이 오늘의 주제. 한국 현장 경험 기반.');
  }

  // ===== 2. Lecturer & farm =====
  {
    const s = pres.addSlide();
    header(s, 'Your lecturer and the farm behind this lecture', 'Introduction');
    card(s, M, 1.6, 5.9, 5.2, C.tint);
    s.addText('Dr. Hyunje Ha, DVM', { x: M + 0.3, y: 1.8, w: 5.3, h: 0.45, fontFace: HFONT, fontSize: 20, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, [
      '30+ years large-animal clinical veterinarian',
      '18+ years embryo transfer / IVF — ~3,000 transfers per year (Genetics Co.)',
      'Dairy farmer: Song Young Shin Farm, Anseong (founded 2011) — A2 Jersey hay milk',
      'First in Korea to run smaXtec rumen sensors on a commercial dairy',
      'Livestock-environment technology (D2O bedding, compost, odor & carbon)',
      'Lecturer, KOICA dairy-farmer training programs; Konkuk University adjunct professor',
    ], M + 0.3, 2.35, 5.3, 4.3, { size: 13 });
    const st = [['120', 'head (65 milking + 55 heifers)'], ['2', 'robotic milking units'], ['90', 'rumen bolus sensors in use'], ['3,000 m²', 'humus bedded-pack barn'], ['1st', 'animal-welfare certified dairy in Korea'], ['1st', 'low-carbon certified dairy in Korea']];
    s.addText('Song Young Shin Farm — a working test bed', { x: 6.9, y: 1.6, w: 5.9, h: 0.45, fontFace: HFONT, fontSize: 18, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    st.forEach(([n, l], i) => {
      const cx = 6.9 + (i % 2) * 3.0, cy = 2.2 + Math.floor(i / 2) * 1.5;
      card(s, cx, cy, 2.8, 1.3, C.white);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: 2.8, h: 1.3, fill: { color: C.white, transparency: 100 }, line: { color: C.line, width: 0.75 }, rectRadius: 0.12 });
      s.addText(n, { x: cx + 0.2, y: cy + 0.12, w: 2.4, h: 0.6, fontFace: HFONT, fontSize: 28, bold: true, color: C.forest, isTextBox: true, margin: 0 });
      s.addText(l, { x: cx + 0.2, y: cy + 0.72, w: 2.4, h: 0.5, fontFace: BFONT, fontSize: 11, color: C.muted, isTextBox: true, margin: 0 });
    });
    footer(s);
    note(s, 'I am a veterinarian first, a farmer second, and a company CEO third. Every technique in this lecture I have used with my own hands on my own cows. Song Young Shin Farm is a 120-head Jersey/Holstein farm one hour south of Seoul. It runs robots, sensors and a compost-bedded barn, and was the first farm in Korea certified for both animal welfare and low-carbon production.', '강사 소개 + 송영신목장 = 현장 검증 테스트베드.');
  }

  // ===== 3. Agenda =====
  {
    const s = pres.addSlide();
    header(s, 'Today’s programme', 'Agenda');
    const mods = [
      ['FaFlag', '0', 'Korea’s dairy journey', 'From a 1969 demonstration farm to 10,000 kg cows — what actually moved the needle', '30 min'],
      ['FaDna', '1', 'Reproduction management', 'Estrus, AI timing, pregnancy diagnosis, calving, colostrum, genetics tools, KPIs', '90 min'],
      ['FaHeartbeat', '2', 'Health, mastitis & biosecurity', 'Transition cows, mastitis detection & treatment, heat stress, records and drug use', '90 min'],
      ['FaMicrochip', '3', 'Digital herd monitoring', 'Rumen bolus sensors: how they work, alerts, cases, NDHIS/iHealth integration, pilot design', '90 min'],
      ['FaHandsHelping', '★', 'Practicum stations', 'Heat detection & AI timing · ultrasound PD · CMT & milking routine · bolus demo & app', '120 min'],
    ];
    for (let i = 0; i < mods.length; i++) {
      const [ic, n, t, d, tm] = mods[i], y = 1.6 + i * 1.02;
      card(s, M, y, W - 2 * M, 0.88, i === 4 ? C.tint : C.tint2);
      await circleIcon(s, ic, M + 0.15, y + 0.12, 0.64, C.forest, C.white);
      s.addText('Module ' + n + '  ·  ' + t, { x: M + 1.0, y: y + 0.1, w: 8.5, h: 0.36, fontFace: BFONT, fontSize: 16, bold: true, color: C.forest, isTextBox: true, margin: 0 });
      s.addText(d, { x: M + 1.0, y: y + 0.46, w: 9.3, h: 0.36, fontFace: BFONT, fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
      s.addText(tm, { x: W - M - 1.5, y: y + 0.25, w: 1.3, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: C.gold, align: 'right', isTextBox: true, margin: 0 });
    }
    footer(s);
    note(s, 'Four lecture modules in the morning and early afternoon, then hands-on stations. Modules 1 and 2 follow the KOICA dairy-farmer curriculum I teach in Korea; Module 3 is the digital layer that connects everything to the National Dairy Herd Improvement System.', '오전 강의 4모듈 + 오후 실습. 모듈1·2는 기존 KOICA 커리큘럼, 모듈3이 NDHIS 연결 디지털 파트.');
  }

  // ===== Module 0 =====
  await section('0', 'Korea’s dairy journey', 'Fifty years from a demonstration farm to one of the world’s highest-yielding national herds — and why the same playbook fits the Philippines.', 'FaFlag');

  // 5. Timeline
  {
    const s = pres.addSlide();
    header(s, 'It started with one demonstration farm', 'Module 0 · Korea’s dairy journey');
    const ev = [
      ['1964', 'Korea–West Germany summit: “feed every poor child milk”'],
      ['1969', 'Korean-German Demonstration Dairy Farm opens in Anseong — training + technology transfer hub'],
      ['1970s–80s', 'Cooperatives, milk collection, imported Holstein genetics, AI network'],
      ['1990s', 'Dairy Herd Improvement (DHI) testing, milk-quality grading, veterinary services'],
      ['2010s', 'Robotic milking, sexed semen, embryo transfer, genomic selection'],
      ['2020s', 'Rumen sensors, AI platforms, provincial-scale digital herd management'],
    ];
    s.addShape(pres.shapes.LINE, { x: M + 0.45, y: 1.85, w: 0, h: 4.75, line: { color: C.moss, width: 3 } });
    for (let i = 0; i < ev.length; i++) {
      const y = 1.65 + i * 0.82;
      s.addShape(pres.shapes.OVAL, { x: M + 0.27, y: y + 0.12, w: 0.36, h: 0.36, fill: { color: C.forest }, line: { color: C.white, width: 2 } });
      s.addText(ev[i][0], { x: M + 0.95, y, w: 1.6, h: 0.6, fontFace: HFONT, fontSize: 18, bold: true, color: C.forest, valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(ev[i][1], { x: M + 2.6, y, w: 6.3, h: 0.6, fontFace: BFONT, fontSize: 14, color: C.ink, valign: 'middle', isTextBox: true, margin: 0 });
    }
    card(s, 9.6, 1.7, 3.15, 4.6, C.tint);
    s.addImage({ data: await I('FaQuoteLeft', C.moss), x: 9.85, y: 1.95, w: 0.45, h: 0.45 });
    s.addText('The Philippines today is where Korea was in 1969: a small herd, imported know-how, and a government that decided dairy matters. The difference now is that data tools exist from day one.', { x: 9.85, y: 2.5, w: 2.7, h: 3.6, fontFace: HFONT, fontSize: 14, italic: true, color: C.forest, isTextBox: true, margin: 0, valign: 'top' });
    footer(s);
    note(s, 'The Anseong demonstration farm — where my own farm now buys its forage — was Korea’s PCC of its day: a place where farmers learned, technicians trained, and imported genetics were adapted. Its model was: train people first, bring technology second, build records third. NDHIP is doing exactly that.', '1969 한독목장 = 한국판 PCC. 사람→기술→기록 순서. NDHIP도 동일 경로.');
  }

  // 6. Chart yield
  {
    const s = pres.addSlide();
    header(s, 'What five decades of management built', 'Module 0 · Korea’s dairy journey');
    s.addChart(pres.charts.BAR, [{ name: 'Milk yield per cow (kg/yr, approx.)', labels: ['1970', '1980', '1990', '2000', '2010', '2023'], values: [3000, 4300, 5500, 7800, 9600, 10500] }], {
      x: M, y: 1.5, w: 7.6, h: 5.2, barDir: 'col', chartColors: [C.forest], showTitle: true, title: 'Korea — average milk yield per cow (kg / year, approximate)', titleFontSize: 13, titleColor: C.ink, titleFontFace: BFONT,
      showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 11, dataLabelColor: C.ink, dataLabelFormatCode: '#,##0',
      catAxisLabelColor: C.muted, valAxisLabelColor: C.muted, valGridLine: { color: 'E5EBDD', size: 0.5 }, catGridLine: { style: 'none' }, showLegend: false, valAxisMaxVal: 12000, catAxisLabelFontFace: BFONT, valAxisLabelFontFace: BFONT,
    });
    card(s, 8.6, 1.5, 4.15, 5.2, C.tint);
    s.addText('Philippine starting point', { x: 8.85, y: 1.7, w: 3.7, h: 0.4, fontFace: HFONT, fontSize: 17, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, [
      'Local milk supplies only a small share of national demand (roughly 1–2%) — huge room to grow',
      'Smallholder dairy buffalo: about 4–8 L/day; improved management and genetics push this up',
      'Dairy cattle herds in Luzon and Mindanao reach 15–20 L/day with good feeding',
      'Korea started at ~3,000 kg/cow — yield tripled through genetics, feeding, health and records',
    ], 8.85, 2.2, 3.7, 3.4, { size: 12.5 });
    s.addText('Korean figures approximate, from national dairy statistics; Philippine figures indicative — confirm with PCC/PSA data.', { x: 8.85, y: 5.85, w: 3.7, h: 0.7, fontFace: BFONT, fontSize: 9.5, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    footer(s);
    note(s, 'Yield per cow in Korea more than tripled. Genetics alone did not do this: the big jumps came when reproduction management, mastitis control and DHI record-keeping were adopted farm by farm. Ask the audience where their farms sit today and what their yield target is for 2027.', '한국 두당 산유량 3배 증가 — 유전 + 번식·건강·기록관리의 결과. 청중 농장 현황 질문.');
  }

  // 7. Four drivers
  {
    const s = pres.addSlide();
    header(s, 'Four things that actually moved the needle', 'Module 0 · Korea’s dairy journey');
    const dr = [
      ['FaDna', 'Genetics', 'AI with proven sires, then sexed semen, embryo transfer and genomic selection. Gains compound every generation.'],
      ['FaClipboardList', 'Records & herd improvement', 'Individual-animal IDs, DHI milk testing, reproduction and health events written down and analysed — the ancestor of NDHIS.'],
      ['FaHeartbeat', 'Reproduction & health', 'A calf a year, mastitis under control, transition cows protected. Technicians and vets working from the same records.'],
      ['FaMicrochip', 'Data & sensors', 'Rumen bolus sensors, robots and AI turn observation into 24/7 measurement. The last mile, but built on the first three.'],
    ];
    for (let i = 0; i < 4; i++) {
      const x = M + i * 3.08;
      card(s, x, 1.6, 2.9, 4.1, C.tint2);
      await circleIcon(s, dr[i][0], x + 0.25, 1.85, 0.8, C.forest, C.white);
      s.addText(dr[i][1], { x: x + 0.25, y: 2.8, w: 2.4, h: 0.7, fontFace: HFONT, fontSize: 16, bold: true, color: C.forest, isTextBox: true, margin: 0 });
      s.addText(dr[i][2], { x: x + 0.25, y: 3.5, w: 2.4, h: 2.1, fontFace: BFONT, fontSize: 12.5, color: C.ink, isTextBox: true, margin: 0, valign: 'top' });
    }
    card(s, M, 5.95, W - 2 * M, 0.8, C.forest);
    s.addText('Same playbook for NDHIP: identify every animal → record every event → manage reproduction and health from the records → add sensors to see what eyes cannot.', { x: M + 0.3, y: 6.0, w: W - 2 * M - 0.6, h: 0.7, fontFace: BFONT, fontSize: 14, bold: true, color: C.white, valign: 'middle', isTextBox: true, margin: 0 });
    footer(s);
    note(s, 'Order matters. Sensors on a herd without IDs and records produce noise. NDHIS gives you the IDs and records; this training gives you the reproduction and health decisions; the bolus pilot gives you the sensors. Keep that sequence in mind for the whole day.', '순서가 중요: 개체식별→기록→번식·건강 관리→센서.');
  }

  // ===== Module 1 =====
  await section('1', 'Reproduction management', 'Heat detection, AI timing, pregnancy diagnosis, calving, colostrum, genetic tools and the KPIs that tell you whether it is working.', 'FaDna');

  // 9. Why reproduction = money
  {
    const s = pres.addSlide();
    header(s, 'Reproduction is the engine of the dairy business', 'Module 1 · Reproduction');
    const stats = [['1 calf', 'per cow per year is the goal — every lactation starts with a calving'], ['12–13 mo', 'target calving interval for dairy cattle (buffalo: aim ≤ 15–16 months)'], ['≤ 120 d', 'target days open (calving to conception) in cattle'], ['Every day', 'open beyond target costs feed, lost milk and a later calf']];
    stats.forEach(([n, l], i) => {
      const x = M + i * 3.08;
      card(s, x, 1.6, 2.9, 2.0, C.tint);
      s.addText(n, { x: x + 0.25, y: 1.7, w: 2.5, h: 0.8, fontFace: HFONT, fontSize: 30, bold: true, color: C.forest, isTextBox: true, margin: 0 });
      s.addText(l, { x: x + 0.25, y: 2.5, w: 2.5, h: 1.0, fontFace: BFONT, fontSize: 12, color: C.ink, isTextBox: true, margin: 0 });
    });
    s.addText('The reproduction chain — and where it usually breaks', { x: M, y: 3.9, w: 10, h: 0.4, fontFace: HFONT, fontSize: 17, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    const chain = ['Cow cycles after calving', 'Heat is detected', 'AI at the right time', 'Conception & pregnancy confirmed', 'Healthy calving', 'Calf survives'];
    const breaks = ['Uterine infection, negative energy balance', 'Silent / night heats — the #1 loss', 'Too early / too late, poor semen handling', 'Open cows found too late', 'Dystocia, milk fever', 'No colostrum, scours'];
    for (let i = 0; i < 6; i++) {
      const x = M + i * 2.04;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.45, w: 1.9, h: 0.95, fill: { color: C.forest }, line: { color: C.forest }, rectRadius: 0.1 });
      s.addText(chain[i], { x: x + 0.08, y: 4.45, w: 1.74, h: 0.95, fontFace: BFONT, fontSize: 11.5, bold: true, color: C.white, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
      s.addImage({ data: await I('FaExclamationTriangle', C.rust), x: x + 0.05, y: 5.55, w: 0.3, h: 0.3 });
      s.addText(breaks[i], { x: x + 0.4, y: 5.5, w: 1.5, h: 1.0, fontFace: BFONT, fontSize: 10.5, color: C.ink, isTextBox: true, margin: 0, valign: 'top' });
    }
    footer(s);
    note(s, 'Ask: how many of your farms know their calving interval? Most losses are silent — the cow that was in heat at 2 a.m. and nobody saw. Everything in this module attacks one link of this chain; Module 3 shows how sensors attack the weakest link, heat detection.', '번식 = 경영의 엔진. 사슬에서 가장 약한 고리 = 발정 발견.');
  }

  // 10. Physiology
  {
    const s = pres.addSlide();
    header(s, 'The estrous cycle — the clock you are working with', 'Module 1 · Reproduction');
    // circle diagram
    const cx = 4.2, cy = 4.2, r = 1.65;
    s.addShape(pres.shapes.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: C.tint }, line: { color: C.moss, width: 6 } });
    s.addText('21 days\n(cattle 18–24 · buffalo 21–24)', { x: cx - 1.4, y: cy - 0.5, w: 2.8, h: 1.0, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
    const ph = [['Day 0', 'Estrus (heat)\n12–18 h cattle · shorter, often at night in buffalo', cx - 1.0, cy - r - 0.95], ['Day 1', 'Ovulation ≈ 24–30 h after heat begins', cx + r + 0.1, cy - 0.45, 1.4], ['Day 5–16', 'Corpus luteum · progesterone high · no heat', cx - 1.0, cy + r + 0.1], ['Day 17–20', 'CL regresses · follicle grows · estrogen rises', M, cy - 0.45, 1.85]];
    ph.forEach(([d, t, x, y, ww]) => {
      s.addText([{ text: d + '  ', options: { bold: true, color: C.forest } }, { text: t, options: { color: C.ink } }], { x, y, w: ww || 2.5, h: 0.85, fontFace: BFONT, fontSize: 11.5, isTextBox: true, margin: 0, valign: 'middle' });
    });
    card(s, 7.55, 1.6, 5.2, 5.15, C.tint2);
    s.addText('Practical rules that follow from the clock', { x: 7.8, y: 1.75, w: 4.8, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, [
      'First heat after calving: cattle 2–4 weeks, but wait until ≥ 45–60 days (voluntary waiting period) before breeding',
      'A cow not seen in heat by 60 days post-calving needs a check: ovaries, uterus, body condition',
      'Buffalo: seasonal tendency (more cycling in cooler months), weaker outward signs — plan for aids, not eyes alone',
      'Heat signs last hours, not days — observation 3× daily (early morning, evening, night) or continuous sensing',
      'If you know the heat date, you know the next heat date (+21 d) and the pregnancy-check date',
    ], 7.8, 2.3, 4.75, 4.3, { size: 12.5 });
    footer(s);
    note(s, 'Keep the physiology short: one 21-day clock, heat at day 0, ovulation about a day later, then two weeks of progesterone. Every management rule — waiting period, observation times, pregnancy-check date — is derived from this clock. For buffalo emphasise weaker, nocturnal, seasonal heat.', '발정주기 21일 시계. 관리 규칙 전부 여기서 도출. 물소는 미약·야간·계절성.');
  }

  // 11. Heat detection
  {
    const s = pres.addSlide();
    header(s, 'Heat detection — the number one leak in the bucket', 'Module 1 · Reproduction');
    tbl(s, [
      ['Sign', 'Reliability', 'Notes'],
      ['Standing to be mounted', 'Primary (definitive)', 'Cattle: lasts 8–18 h · Buffalo: brief, often at night'],
      ['Mounting other animals, restlessness, bellowing', 'Secondary', 'Occurs before and during standing heat'],
      ['Clear stringy vulvar mucus, swollen vulva', 'Secondary', 'Buffalo: mucus is often the most visible sign'],
      ['Drop in milk yield and feed intake, rise in activity', 'Secondary', 'Exactly what sensors measure automatically'],
      ['Chin resting, sniffing, rubbed tailhead', 'Supportive', 'Use tail paint / chalk to read overnight mounting'],
    ], M, 1.6, 7.6, [2.9, 1.7, 3.0], { size: 11.5, hsize: 12, rowH: 0.5 });
    card(s, 8.6, 1.6, 4.15, 5.15, C.tint);
    s.addText('Detection aids — from cheap to continuous', { x: 8.85, y: 1.75, w: 3.7, h: 0.6, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    const aids = [['FaPaintBrush', 'Tail paint / chalk — reads mounting you did not see'], ['FaEye', '3 × 30 min observation, incl. night — free, but labour-bound'], ['FaWalking', 'Pedometers / collars — activity only, loss risk'], ['FaMicrochip', 'Rumen bolus — activity + temperature + rumination, inside the animal'], ['FaSyringe', 'Synchronisation (Ovsynch, PGF) — timed AI when detection is weak']];
    for (let i = 0; i < aids.length; i++) {
      const y = 2.45 + i * 0.85;
      await circleIcon(s, aids[i][0], 8.85, y, 0.5, C.forest, C.white);
      s.addText(aids[i][1], { x: 9.5, y: y - 0.05, w: 3.1, h: 0.62, fontFace: BFONT, fontSize: 11.5, color: C.ink, valign: 'middle', isTextBox: true, margin: 0 });
    }
    s.addText('Target: heat detection rate above 60% of eligible animals per 21 days. Below 40%, no AI programme can succeed.', { x: M, y: 4.9, w: 7.6, h: 0.8, fontFace: BFONT, fontSize: 13, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    s.addText('Silent heat: a normal ovulation with no visible signs. Reported in a large share of buffalo and of high-yielding cows — which is why Korea moved to sensors.', { x: M, y: 5.7, w: 7.6, h: 1.0, fontFace: BFONT, fontSize: 12, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    footer(s);
    note(s, 'Standing heat is the only definitive sign; everything else is a hint. In buffalo the standing phase is short and often at night, so mucus and tail paint become your main tools — until the bolus does it for you. Introduce synchronisation as the fallback when detection is structurally weak.', '승가허용이 유일한 확정 징후. 물소는 야간·짧음 → 보조도구/센서 필요.');
  }

  // 12. AI timing
  {
    const s = pres.addSlide();
    header(s, 'AI timing and semen handling', 'Module 1 · Reproduction');
    // timeline bar
    const x0 = M, y0 = 2.2, w0 = 7.6;
    s.addShape(pres.shapes.RECTANGLE, { x: x0, y: y0, w: w0, h: 0.5, fill: { color: C.tint }, line: { color: C.tint } });
    s.addShape(pres.shapes.RECTANGLE, { x: x0 + w0 * 0.33, y: y0, w: w0 * 0.34, h: 0.5, fill: { color: C.moss }, line: { color: C.moss } });
    const marks = [[0, 'Heat begins\n(first standing)'], [0.33, '+ 8 h'], [0.67, '+ 16 h'], [0.9, '+ 24–30 h\nOvulation']];
    marks.forEach(([p, t]) => {
      s.addShape(pres.shapes.LINE, { x: x0 + w0 * p, y: y0 - 0.15, w: 0, h: 0.8, line: { color: C.forest, width: 2 } });
      s.addText(t, { x: x0 + w0 * p - 0.8, y: y0 + 0.75, w: 1.6, h: 0.7, fontFace: BFONT, fontSize: 11, color: C.ink, align: 'center', isTextBox: true, margin: 0 });
    });
    s.addText('Best AI window: 8–16 h after heat onset', { x: x0 + w0 * 0.33, y: y0 - 0.55, w: w0 * 0.34, h: 0.4, fontFace: BFONT, fontSize: 12, bold: true, color: C.forest, align: 'center', isTextBox: true, margin: 0 });
    card(s, M, 3.5, 3.7, 3.2, C.tint2);
    s.addText('AM / PM rule', { x: M + 0.25, y: 3.65, w: 3.2, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Seen in heat in the morning → inseminate that evening', 'Seen in the evening → inseminate next morning', 'Once-a-day AI: inseminate all animals seen in heat that day (works well in practice)', 'Sensor heat alert: it gives the onset time and an “optimal insemination window”'], M + 0.25, 4.1, 3.2, 2.5, { size: 11.5 });
    card(s, 4.5, 3.5, 3.7, 3.2, C.tint2);
    s.addText('Semen handling', { x: 4.75, y: 3.65, w: 3.2, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Keep straws below the frost line; lift canister ≤ 10 s', 'Thaw at 35–37 °C for 30–45 s, dry the straw', 'Protect from cold shock and sunlight; use within 15 min', 'Deposit in the uterine body, gentle, clean sheath and gun', 'Sexed semen: thaw exactly as instructed, inseminate closer to ovulation'], 4.75, 4.1, 3.2, 2.5, { size: 11.5 });
    card(s, 8.6, 1.6, 4.15, 5.1, C.tint);
    s.addText('Common reasons for AI failure', { x: 8.85, y: 1.75, w: 3.7, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Inseminating a cow that was not truly in heat (≈ 10–20% of AIs in weak-detection herds)', 'Timing too early (first sign) or too late (next day)', 'Semen damaged by poor thawing or repeated exposure', 'Uterine infection not cleared before breeding', 'Heat stress (THI > 72) — embryo loss in the first week', 'Poor body condition, negative energy balance'], 8.85, 2.25, 3.7, 4.3, { size: 12 });
    footer(s);
    note(s, 'Two messages: the window is 8–16 hours after onset, and semen is alive — treat it like a patient. Timed-AI programmes exist, but for smallholders the AM/PM rule plus a reliable heat signal is the most cost-effective route. Note that sensor alerts report the onset time, which is what makes the timing precise.', 'AI 적기 8–16h. 정액 취급 = 생명체. 센서는 발정 시작 시각을 알려줘 타이밍을 정확히.');
  }

  // 13. Pregnancy diagnosis
  {
    const s = pres.addSlide();
    header(s, 'Pregnancy diagnosis — find the open cow early', 'Module 1 · Reproduction');
    tbl(s, [
      ['Method', 'Earliest', 'Accuracy', 'Practical notes'],
      ['Non-return to heat', 'Day 18–24', 'Low (misses silent heats)', 'Free, but only a screen; sensors improve it'],
      ['Ultrasound (rectal)', 'Day 28–30', 'High; sees embryo & heartbeat', 'Also detects twins, uterine fluid, ovarian cysts — the technician’s best tool'],
      ['Rectal palpation', 'Day 35–45', 'High in trained hands', 'No equipment; buffalo rectum is narrower — gentle technique'],
      ['PAG blood / milk test', 'Day 28+', 'High', 'Lab or cow-side kit; good where ultrasound is scarce'],
      ['Milk progesterone', 'Day 21', 'High for “open”, weaker for “pregnant”', 'Best used to confirm an open animal quickly'],
    ], M, 1.6, W - 2 * M, [2.5, 1.5, 2.7, 5.43], { size: 11.5, rowH: 0.52 });
    const kp = [['FaCalendarCheck', 'Check at day 28–35 with ultrasound, re-check at day 60–90 to catch embryo loss'], ['FaRedo', 'Open animal → re-enrol immediately: observe / synchronise, do not wait for “natural” heat'], ['FaClipboardList', 'Enter every result in NDHIS — pregnancy rate is the KPI the whole system is built on']];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      card(s, x, 5.05, 3.95, 1.65, C.tint);
      await circleIcon(s, kp[i][0], x + 0.2, 5.3, 0.6, C.forest, C.white);
      s.addText(kp[i][1], { x: x + 0.95, y: 5.15, w: 2.85, h: 1.45, fontFace: BFONT, fontSize: 11.5, color: C.ink, valign: 'middle', isTextBox: true, margin: 0 });
    }
    footer(s);
    note(s, 'The value of pregnancy diagnosis is not the pregnant cow — it is the open cow found 30 days earlier. Ultrasound at day 28–30 should become a routine technician skill; we will practise it this afternoon. Buffalo: same principle, gentler palpation.', '임신진단의 가치 = 공태우를 30일 빨리 발견. 초음파 28–30일 루틴화.');
  }

  // 14. Calving
  {
    const s = pres.addSlide();
    header(s, 'Calving — prepare, watch, intervene at the right time', 'Module 1 · Reproduction');
    card(s, M, 1.6, 4.0, 5.1, C.tint2);
    s.addText('Signs calving is near', { x: M + 0.25, y: 1.75, w: 3.5, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Udder fills, teats waxy (days)', 'Pelvic ligaments relax, tailhead sinks (24–48 h)', 'Restlessness, isolation, reduced feed intake', 'Vulva swollen, mucus plug passes', 'Body temperature drops ≈ 0.3–0.5 °C in the last 24 h — what the bolus detects', 'Move to a clean, dry calving pen with water'], M + 0.25, 2.25, 3.5, 4.3, { size: 12 });
    card(s, 4.8, 1.6, 4.0, 5.1, C.tint2);
    s.addText('Stages of labour & time limits', { x: 5.05, y: 1.75, w: 3.5, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    const stg = [['Stage 1', '2–6 h (heifers up to 12 h)', 'Cervix dilates, restlessness. Do not disturb.'], ['Stage 2', 'Cow ≤ 2 h · heifer ≤ 3 h', 'Water bag → feet → calf. No progress for 30 min after water bag = examine.'], ['Stage 3', 'Placenta within 12 h', 'Retained > 24 h = retained placenta, watch for metritis.']];
    stg.forEach(([a, b, c], i) => {
      const y = 2.3 + i * 1.4;
      s.addText(a, { x: 5.05, y, w: 3.5, h: 0.3, fontFace: BFONT, fontSize: 13, bold: true, color: C.forest, isTextBox: true, margin: 0 });
      s.addText(b, { x: 5.05, y: y + 0.3, w: 3.5, h: 0.3, fontFace: BFONT, fontSize: 12, bold: true, color: C.gold, isTextBox: true, margin: 0 });
      s.addText(c, { x: 5.05, y: y + 0.6, w: 3.5, h: 0.75, fontFace: BFONT, fontSize: 11.5, color: C.ink, isTextBox: true, margin: 0 });
    });
    card(s, 9.6, 1.6, 3.15, 5.1, C.rust);
    s.addImage({ data: await I('FaUserMd', C.white), x: 9.85, y: 1.85, w: 0.55, h: 0.55 });
    s.addText('Call the vet when', { x: 9.85, y: 2.5, w: 2.7, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: C.white, isTextBox: true, margin: 0 });
    bullets(s, ['Only head or only one leg, or tail first', 'Calf too large, no progress after 20–30 min of traction', 'Uterine torsion (no water bag, twisted vagina)', 'Cow down before or after calving (milk fever)', 'Bleeding, prolapse, foul discharge'], 9.85, 3.0, 2.7, 3.5, { size: 12, color: C.white });
    footer(s);
    note(s, 'Most calf losses come from waiting too long, and most damage to cows from pulling too early or wrongly. Give the audience the clock: 30 minutes without progress after the water bag means examine; two hours of stage 2 means help. Buffalo tend to calve at night — again an argument for calving alerts.', '분만: 너무 늦은 개입이 송아지 손실, 너무 이른/잘못된 견인이 어미 손상. 시간 기준 제시.');
  }

  // 15. Colostrum & calf
  {
    const s = pres.addSlide();
    header(s, 'Colostrum and the first week decide next year’s herd', 'Module 1 · Reproduction');
    const q = [['Quality', 'IgG > 50 g/L — Brix refractometer ≥ 22%. Discard bloody or mastitic colostrum.'], ['Quantity', '10% of body weight in the first day: 3–4 L for a 35–40 kg calf, 2–3 L for a buffalo calf.'], ['Quickly', 'First feed within 2 h of birth, second by 6–8 h. Gut absorption falls sharply after 12 h.'], ['sQueaky clean', 'Clean udder, clean bottle or tube, refrigerate ≤ 24 h or freeze. Bacteria block IgG uptake.']];
    for (let i = 0; i < 4; i++) {
      const x = M + i * 3.08;
      card(s, x, 1.6, 2.9, 2.45, C.tint);
      s.addText(q[i][0][0], { x: x + 0.2, y: 1.65, w: 0.9, h: 0.9, fontFace: HFONT, fontSize: 44, bold: true, color: C.moss, isTextBox: true, margin: 0 });
      s.addText(q[i][0], { x: x + 1.05, y: 1.85, w: 1.8, h: 0.5, fontFace: HFONT, fontSize: 17, bold: true, color: C.forest, valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(q[i][1], { x: x + 0.2, y: 2.6, w: 2.5, h: 1.4, fontFace: BFONT, fontSize: 11.5, color: C.ink, isTextBox: true, margin: 0 });
    }
    const cc = [['FaTint', 'Navel', 'Dip in 7% iodine or chlorhexidine at birth and again at 12 h'], ['FaHome', 'Housing', 'Dry bedding, shade, ventilation without draughts; individual or small groups'], ['FaVial', 'Scours', 'Fluids first (oral electrolytes 2–4 L/day), keep feeding milk, isolate; antibiotics only for systemic signs'], ['FaChartLine', 'Targets', 'Pre-weaning mortality < 5%; double birth weight by weaning; record every treatment']];
    for (let i = 0; i < 4; i++) {
      const x = M + i * 3.08;
      await circleIcon(s, cc[i][0], x, 4.35, 0.6, C.forest, C.white);
      s.addText(cc[i][1], { x: x + 0.75, y: 4.35, w: 2.1, h: 0.6, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(cc[i][2], { x, y: 5.05, w: 2.9, h: 1.6, fontFace: BFONT, fontSize: 11.5, color: C.ink, isTextBox: true, margin: 0 });
    }
    footer(s);
    note(s, 'The 4 Qs of colostrum are the cheapest technology in dairy. A Brix refractometer costs almost nothing and turns “I think it was good colostrum” into a number. For buffalo calves, scale the volume down but keep the timing. Every calf treatment goes into iHealth.', '초유 4Q. Brix 굴절계로 수치화. 물소 송아지는 양 축소, 시간은 동일.');
  }

  // 16. Genetics tools
  {
    const s = pres.addSlide();
    header(s, 'Genetic tools: AI, sexed semen, embryos, genomics', 'Module 1 · Reproduction');
    const tools = [['FaSyringe', 'Artificial insemination', 'Proven sires, standardised handling. The foundation — 100% of Korean dairy replacements come from AI or ET.'], ['FaVenus', 'Sexed semen', '≈ 90% female calves. Use on heifers and best cows, inseminate slightly later; expect somewhat lower conception than conventional.'], ['FaFlask', 'Embryo transfer (IVF / OPU)', 'One elite donor → many calves. Genetics Co.: ~3,000 transfers/yr, ~60% conception in recipients with good management.'], ['FaDna', 'Genomic selection', 'DNA test of heifer calves predicts merit before first calving. Select replacements early, cull low-merit animals sooner.']];
    for (let i = 0; i < 4; i++) {
      const x = M + i * 3.08;
      card(s, x, 1.6, 2.9, 3.4, C.tint2);
      await circleIcon(s, tools[i][0], x + 0.25, 1.85, 0.7, C.forest, C.white);
      s.addText(tools[i][1], { x: x + 0.25, y: 2.7, w: 2.45, h: 0.55, fontFace: HFONT, fontSize: 14.5, bold: true, color: C.forest, isTextBox: true, margin: 0 });
      s.addText(tools[i][2], { x: x + 0.25, y: 3.25, w: 2.45, h: 1.7, fontFace: BFONT, fontSize: 11.5, color: C.ink, isTextBox: true, margin: 0 });
    }
    card(s, M, 5.25, W - 2 * M, 1.45, C.tint);
    s.addText('Relevance for the Philippines', { x: M + 0.3, y: 5.35, w: 4, h: 0.35, fontFace: HFONT, fontSize: 14, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Dairy cattle: imported sexed Holstein embryos in local recipient cows are a proven route to build a high-merit herd without importing live animals (Korea–Uzbekistan programme with RDA as reference).', 'Dairy buffalo: PCC’s own AI, ET and genomic programmes apply — sensors add the heat-detection precision these tools depend on.'], M + 0.3, 5.7, W - 2 * M - 0.6, 1.0, { size: 11.5, gap: 3 });
    footer(s);
    note(s, 'Genetics is a multiplier, not a substitute for management: sexed semen and embryos only pay when heat detection, AI timing and recipient health are in place. Korea has exported sexed Holstein embryos to Central Asia with the Rural Development Administration; the same package — embryos plus technician training plus digital follow-up — is possible for Philippine dairy cattle. Do not discuss Hanwoo genetics; it is not exportable.', '유전 도구 = 관리의 승수. 홀스타인 성감별 수정란 수출 패키지 언급 가능 (한우 제외).');
  }

  // 17. KPIs
  {
    const s = pres.addSlide();
    header(s, 'Reproduction KPIs — what NDHIS should show monthly', 'Module 1 · Reproduction');
    tbl(s, [
      ['KPI', 'Definition', 'Target (dairy cattle)', 'Buffalo (indicative)', 'Where it comes from'],
      ['Heat detection rate', 'Eligible animals bred ÷ eligible in 21 d', '> 60%', '> 50%', 'Heat & AI records (or sensor alerts)'],
      ['Conception rate', 'Pregnant ÷ inseminated', '> 40%', '> 45%', 'AI + pregnancy diagnosis records'],
      ['21-day pregnancy rate', 'Detection rate × conception rate', '> 20%', '> 18%', 'Calculated in NDHIS'],
      ['Calving-to-first-service', 'Days from calving to first AI', '< 75 d', '< 90 d', 'Calving + AI records'],
      ['Days open', 'Calving to conception', '< 120 d', '< 150 d', 'Calving + PD records'],
      ['Calving interval', 'Calving to next calving', '< 400 d', '< 480 d', 'Calving records'],
      ['Calf mortality (pre-weaning)', 'Deaths ÷ born alive', '< 5%', '< 5%', 'Calf & iHealth records'],
    ], M, 1.6, W - 2 * M, [2.4, 3.0, 1.9, 1.9, 2.93], { size: 11.5, rowH: 0.5 });
    s.addText('Targets are management goals for well-run herds, not averages. Set each farm’s baseline first, then improve one KPI at a time — usually heat detection rate first, because it moves everything else.', { x: M, y: 5.95, w: W - 2 * M, h: 0.75, fontFace: BFONT, fontSize: 12.5, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    footer(s);
    note(s, 'These seven numbers are the reproduction dashboard. NDHIS can compute all of them if the events are entered: heat, AI, PD, calving, calf death. Buffalo targets are indicative — establish them from PCC data in year one of the pilot. Repeat: fix heat detection rate first.', '번식 KPI 7개. NDHIS 입력만 되면 자동 계산. 발정발견율부터 개선.');
  }

  // ===== Module 2 =====
  await section('2', 'Health, mastitis & biosecurity', 'The transition period, metabolic disease, mastitis detection and treatment, heat stress in the tropics, biosecurity, records and responsible drug use.', 'FaHeartbeat');

  // 19. Transition
  {
    const s = pres.addSlide();
    header(s, 'The transition period — the fresh-cow danger zone', 'Module 2 · Health');
    // cascade
    const casc = [['Dry matter intake falls', 'late pregnancy, heat, crowding'], ['Negative energy balance', 'fat mobilised → ketones'], ['Ketosis · fatty liver', 'BHBA > 1.2 mmol/L'], ['Immune suppression', 'metritis, mastitis, RP'], ['Displaced abomasum', 'surgery, culling'], ['Lost milk & delayed breeding', 'the cost shows up months later']];
    for (let i = 0; i < 6; i++) {
      const x = M + i * 2.04;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.65, w: 1.9, h: 1.25, fill: { color: i < 2 ? C.moss : (i < 4 ? C.gold : C.rust) }, line: { color: C.white }, rectRadius: 0.1 });
      s.addText([{ text: casc[i][0], options: { bold: true, breakLine: true, fontSize: 12 } }, { text: casc[i][1], options: { fontSize: 10.5 } }], { x: x + 0.1, y: 1.65, w: 1.7, h: 1.25, fontFace: BFONT, color: C.white, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
      if (i < 5) s.addImage({ data: await I('FaChevronRight', C.muted), x: x + 1.88, y: 2.15, w: 0.22, h: 0.22 });
    }
    card(s, M, 3.2, 6.0, 3.5, C.tint2);
    s.addText('Milk fever (hypocalcaemia)', { x: M + 0.25, y: 3.35, w: 5.5, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Signs: cold ears, muscle tremor, S-shaped neck, down within 72 h of calving; subclinical cases are 5× more common', 'Treatment: IV calcium slowly (monitor heart), oral calcium bolus for standing cows', 'Prevention: low-calcium or anionic (DCAD) dry-cow ration, avoid over-fat dry cows (BCS 3.0–3.5), oral calcium at calving for older cows'], M + 0.25, 3.85, 5.5, 2.8, { size: 11.5 });
    card(s, 6.85, 3.2, 5.9, 3.5, C.tint2);
    s.addText('Ketosis', { x: 7.1, y: 3.35, w: 5.4, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Signs: reduced appetite (grain first), rapid weight loss, sweet breath, milk drop in week 1–4; often silent', 'Cow-side test: blood BHBA ≥ 1.2 mmol/L (subclinical), ≥ 3.0 (clinical); milk/urine ketone strips', 'Treatment: oral propylene glycol 300 mL/day for 3–5 days, IV glucose for clinical cases, treat the cause (feed access, other disease)', 'Prevention: maximise DMI in the last 3 weeks, fresh feed and water, low stocking density, monitor rumination'], 7.1, 3.85, 5.4, 2.8, { size: 11.5 });
    footer(s);
    note(s, 'Most fresh-cow disease has one root: the cow stopped eating. Show the cascade and then the two metabolic diseases every technician must recognise. Sensors matter here because rumination and temperature fall days before a person notices the cow is off feed.', '이행기 질병의 뿌리 = 채식 저하. 유열·케토시스 인지. 센서가 며칠 먼저 감지.');
  }

  // 20. Mastitis 1
  {
    const s = pres.addSlide();
    header(s, 'Mastitis — the most expensive disease on a dairy farm', 'Module 2 · Health');
    tbl(s, [
      ['', 'Contagious mastitis', 'Environmental mastitis'],
      ['Main pathogens', 'Staph. aureus, Strep. agalactiae, Mycoplasma', 'E. coli, Strep. uberis, Klebsiella, environmental staph'],
      ['Source', 'Infected udders → spread at milking (hands, liners, cloths)', 'Bedding, mud, manure, water; between milkings and in the dry period'],
      ['Typical picture', 'Chronic, subclinical, high SCC, low cure rate', 'Acute clinical cases, sometimes severe (E. coli), fresh cows'],
      ['Control focus', 'Milking hygiene, post-dip, segregation, cull chronic cows', 'Clean dry bedding, pre-dip, dry-cow therapy, teat sealants'],
    ], M, 1.6, 8.0, [1.8, 3.1, 3.1], { size: 11.5, rowH: 0.62 });
    card(s, 9.0, 1.6, 3.75, 5.1, C.tint);
    s.addText('Numbers to know', { x: 9.25, y: 1.75, w: 3.3, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    const nums = [['< 200,000', 'cells/mL — bulk tank target'], ['> 200,000', 'cells/mL in a cow = subclinical infection'], ['≈ 5–10%', 'of yield lost per doubling of SCC above 100k'], ['30–50%', 'of the cost is discarded milk + lost yield; treatment is the smaller part']];
    nums.forEach(([n, l], i) => {
      const y = 2.3 + i * 1.05;
      s.addText(n, { x: 9.25, y, w: 3.3, h: 0.45, fontFace: HFONT, fontSize: 22, bold: true, color: C.forest, isTextBox: true, margin: 0 });
      s.addText(l, { x: 9.25, y: y + 0.45, w: 3.3, h: 0.5, fontFace: BFONT, fontSize: 11, color: C.muted, isTextBox: true, margin: 0 });
    });
    s.addText('Buffalo milk: high fat and SCC baseline differ from cattle — use CMT trends within the animal rather than cattle cut-offs.', { x: M, y: 5.6, w: 8.0, h: 1.0, fontFace: BFONT, fontSize: 12, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    footer(s);
    note(s, 'Split mastitis into two enemies with two strategies. Contagious mastitis is a milking-parlour problem; environmental mastitis is a housing and dry-period problem. Ask the audience which one dominates in their farms — in tropical smallholder conditions it is usually environmental.', '유방염 = 전염성(착유위생) vs 환경성(깔짚·건유기). 열대 소규모 농가는 환경성 우세.');
  }

  // 21. Mastitis 2 — CMT & treatment
  {
    const s = pres.addSlide();
    header(s, 'Detect early, treat correctly, record everything', 'Module 2 · Health');
    s.addText('California Mastitis Test (CMT) — 4 steps', { x: M, y: 1.55, w: 6, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    const cmt = [['1', 'Strip 2–3 squirts, then 2 mL milk per cup'], ['2', 'Add equal volume of CMT reagent'], ['3', 'Swirl 10 s, hold horizontal'], ['4', 'Read: no gel = negative · slight gel = trace · thick gel = 2–3 (infected)']];
    for (let i = 0; i < 4; i++) {
      const y = 2.05 + i * 0.6;
      s.addShape(pres.shapes.OVAL, { x: M, y, w: 0.45, h: 0.45, fill: { color: C.moss }, line: { color: C.moss } });
      s.addText(cmt[i][0], { x: M, y, w: 0.45, h: 0.45, fontFace: HFONT, fontSize: 14, bold: true, color: C.white, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(cmt[i][1], { x: M + 0.6, y, w: 5.4, h: 0.45, fontFace: BFONT, fontSize: 12, color: C.ink, valign: 'middle', isTextBox: true, margin: 0 });
    }
    s.addText('Clinical grades', { x: M, y: 4.6, w: 6, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    tbl(s, [['Grade', 'Signs', 'Action'], ['1 Mild', 'Abnormal milk only', 'Strip out, monitor, culture if possible, NSAID; antibiotic only per protocol'], ['2 Moderate', 'Milk + swollen, hot quarter', 'Intramammary antibiotic per vet protocol + NSAID, frequent stripping'], ['3 Severe', 'Sick cow: fever, off feed, down', 'Vet now — systemic antibiotics, fluids (E. coli), anti-inflammatory']], M, 5.0, 6.4, [1.2, 2.0, 3.2], { size: 10.5, hsize: 11, rowH: 0.4 });
    card(s, 7.4, 1.55, 5.35, 5.15, C.tint);
    s.addText('Responsible antimicrobial use', { x: 7.65, y: 1.7, w: 4.9, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Diagnose before treating: CMT, then culture where a lab exists — many E. coli cases self-cure without antibiotics', 'Use the farm’s written treatment protocol signed by the veterinarian', 'Full course, correct dose by body weight, correct route; never “one tube and stop”', 'Respect milk and meat withdrawal periods — mark the cow, milk her last, record dates', 'Dry-cow therapy: selective, based on SCC/CMT history; teat sealant for the rest', 'Korea’s experience: early detection by rumination and temperature alerts reduced antibiotic use markedly (manufacturer reports up to 70%)'], 7.65, 2.25, 4.9, 4.4, { size: 11.5 });
    footer(s);
    note(s, 'CMT is the practicum this afternoon. The treatment table is deliberately conservative: mild cases often need no antibiotic, severe cases need the vet immediately. Emphasise withdrawal periods — milk residues will close a market faster than any disease. The antibiotic-reduction figure is a manufacturer report from smaXtec users; frame it as “reported”.', 'CMT 4단계. 치료는 등급별. 휴약기간 강조. 항생제 감소 수치는 제조사 보고로 표기.');
  }

  // 22. Milking routine
  {
    const s = pres.addSlide();
    header(s, 'A ten-step milking routine prevents mastitis', 'Module 2 · Health');
    const steps = [['FaHandsWash', 'Clean hands, gloves'], ['FaEye', 'Check udder, strip 2–3 squirts into a cup'], ['FaTint', 'Pre-dip 30 s'], ['FaHandPaper', 'Wipe dry — one towel per cow'], ['FaClock', 'Attach within 60–90 s of stimulation'], ['FaBalanceScale', 'Adjust cluster; no air leaks'], ['FaStopwatch', 'Detach when flow drops — avoid over-milking'], ['FaTint', 'Post-dip every teat, full coverage'], ['FaSort', 'Milking order: fresh & healthy → high-SCC → treated last'], ['FaSoap', 'Rinse, wash (hot + detergent), acid rinse, dry equipment']];
    for (let i = 0; i < 10; i++) {
      const col = i % 5, row = Math.floor(i / 5);
      const x = M + col * 2.45, y = 1.65 + row * 2.4;
      card(s, x, y, 2.3, 2.2, C.tint2);
      await circleIcon(s, steps[i][0], x + 0.2, y + 0.2, 0.7, C.forest, C.white);
      s.addText(String(i + 1), { x: x + 1.2, y: y + 0.2, w: 0.9, h: 0.7, fontFace: HFONT, fontSize: 26, bold: true, color: C.moss, align: 'right', isTextBox: true, margin: 0 });
      s.addText(steps[i][1], { x: x + 0.2, y: y + 1.0, w: 1.95, h: 1.1, fontFace: BFONT, fontSize: 12, color: C.ink, isTextBox: true, margin: 0 });
    }
    s.addText('Hand milking (smallholder buffalo): same principles — clean hands, dry teats, full milking, post-dip, milk sick animals last.', { x: M, y: 6.5, w: W - 2 * M, h: 0.35, fontFace: BFONT, fontSize: 11.5, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    footer(s);
    note(s, 'Walk through the routine as a demonstration, not a list. The two most skipped steps everywhere in the world are drying the teat and post-dipping. For hand-milked buffalo the routine is shorter but the logic is identical.', '착유 루틴 10단계. 가장 자주 생략되는 단계 = 건조·후침지.');
  }

  // 23. Heat stress
  {
    const s = pres.addSlide();
    header(s, 'Heat stress — the tropical dairy’s permanent challenge', 'Module 2 · Health');
    tbl(s, [['THI', 'Stress level', 'What happens to the animal'], ['< 68', 'Comfort', 'Normal intake, rumination and fertility'], ['68–71', 'Mild', 'Breathing > 60/min, seeks shade, intake begins to fall'], ['72–79', 'Moderate', 'Milk −10 to −25%, conception rate falls sharply, early embryo loss'], ['80–89', 'Severe', 'Panting, drooling, standing, rumination stops; risk to life above 90']], M, 1.6, 6.5, [1.0, 1.4, 4.1], { size: 11.5, rowH: 0.55 });
    s.addText('THI = temperature-humidity index. At 30 °C and 80% RH the THI is ≈ 84 — a normal afternoon in Nueva Ecija.', { x: M, y: 4.45, w: 6.5, h: 0.6, fontFace: BFONT, fontSize: 11.5, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    card(s, M, 5.05, 6.5, 1.65, C.tint);
    s.addText('What the bolus adds', { x: M + 0.25, y: 5.15, w: 6, h: 0.35, fontFace: HFONT, fontSize: 14, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Core body temperature per animal, not just barn THI — shows which animals are actually suffering', 'Water-intake events and rumination drop — the earliest signs; heat-stress alert per animal and per barn'], M + 0.25, 5.5, 6.0, 1.15, { size: 11.5, gap: 3 });
    card(s, 7.4, 1.6, 5.35, 5.1, C.tint2);
    s.addText('Mitigation — cheapest first', { x: 7.65, y: 1.75, w: 4.9, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    const mit = [['FaUmbrella', 'Shade: 3.5–4.5 m² per adult, roof height ≥ 4 m, open sides'], ['FaTint', 'Water: unlimited, cool, ≥ 10 cm trough per animal; buffalo wallow or sprinkler'], ['FaFan', 'Fans + soaking cycles at feed line and holding area when THI > 72'], ['FaMoon', 'Feed 60–70% of the ration in the evening/night; fresh feed, more forage quality, less heat of fermentation'], ['FaCalendarAlt', 'Breed in the cooler months where possible; use timed AI; expect lower conception in peak heat']];
    for (let i = 0; i < 5; i++) {
      const y = 2.3 + i * 0.85;
      await circleIcon(s, mit[i][0], 7.65, y, 0.5, C.forest, C.white);
      s.addText(mit[i][1], { x: 8.3, y: y - 0.08, w: 4.3, h: 0.7, fontFace: BFONT, fontSize: 11.5, color: C.ink, valign: 'middle', isTextBox: true, margin: 0 });
    }
    footer(s);
    note(s, 'In Korea heat stress is a summer problem; in the Philippines it is the baseline. Fertility is the first casualty, then milk. The practical hierarchy is shade → water → air movement → feeding time. The bolus shows heat stress animal by animal, so mitigation can be targeted and its effect measured.', '열스트레스 = 필리핀 상시 조건. 번식이 첫 희생. 그늘→물→송풍→급이시간.');
  }

  // 24. Biosecurity
  {
    const s = pres.addSlide();
    header(s, 'Biosecurity — keep it out, keep it in, keep records', 'Module 2 · Health');
    const bio = [['FaDoorClosed', 'Keep it out', ['Single controlled entry; visitors and vehicles disinfected', 'Quarantine new animals 30 days, test before mixing', 'Buy from known herds; check vaccination and test papers', 'Feed and bedding from clean sources; rodent and bird control']], ['FaShieldAlt', 'Keep it in (contain)', ['Isolate sick animals; treat and milk them last', 'Footbaths and separate tools for the sick pen', 'Safe carcass disposal; never sell sick animals into the market', 'Report notifiable diseases (FMD, HS, anthrax, brucellosis, TB) immediately']], ['FaSyringe', 'Programme', ['Vaccination per DA-BAI / PCC schedule: FMD, haemorrhagic septicaemia, others as advised', 'Strategic deworming and tick/fly control; monitor with faecal counts', 'Brucellosis and TB testing where the programme applies', 'Every vaccination, test and treatment entered in iHealth']]];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      card(s, x, 1.6, 3.95, 5.1, C.tint2);
      await circleIcon(s, bio[i][0], x + 0.25, 1.85, 0.7, C.forest, C.white);
      s.addText(bio[i][1], { x: x + 1.1, y: 1.85, w: 2.7, h: 0.7, fontFace: HFONT, fontSize: 16, bold: true, color: C.forest, valign: 'middle', isTextBox: true, margin: 0 });
      bullets(s, bio[i][2], x + 0.25, 2.75, 3.45, 3.9, { size: 11.5 });
    }
    footer(s);
    note(s, 'Three boxes: keep it out, keep it in, and the programme. The specific vaccination schedule belongs to DA-BAI and PCC — I show the structure, they own the content. The sensor link: a herd-wide temperature rise across many animals is often the first sign of an infectious outbreak, and it also shows the expected reaction after vaccination.', '방역 3축. 백신 프로그램은 DA-BAI/PCC 기준. 센서: 군 전체 체온 상승 = 전염병 조기 신호.');
  }

  // 25. Records & drugs
  {
    const s = pres.addSlide();
    header(s, 'Records and responsible drug use make data useful', 'Module 2 · Health');
    card(s, M, 1.6, 6.0, 5.1, C.tint);
    s.addText('Minimum record set per animal (NDHIS / iHealth)', { x: M + 0.25, y: 1.75, w: 5.5, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    tbl(s, [['Event', 'Fields'], ['Identification', 'ID / ear tag, breed, birth date, dam, sire'], ['Reproduction', 'Heat date, AI date + sire + technician, PD result + date, calving date + ease + calf ID'], ['Health', 'Diagnosis, treatment, product, dose, route, dates, withdrawal end date, outcome'], ['Production', 'Milk yield per test day, SCC/CMT, body condition, weight'], ['Movements', 'Purchase, sale, death with reason']], M + 0.25, 2.25, 5.5, [1.4, 4.1], { size: 10.5, hsize: 11, rowH: 0.42 });
    s.addText('A record you cannot find in one minute does not exist. Enter on the day, on the phone.', { x: M + 0.25, y: 5.9, w: 5.5, h: 0.7, fontFace: BFONT, fontSize: 12, italic: true, color: C.forest, isTextBox: true, margin: 0 });
    card(s, 6.85, 1.6, 5.9, 5.1, C.tint2);
    s.addText('Golden rules for veterinary drugs', { x: 7.1, y: 1.75, w: 5.4, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    const rules = ['Diagnosis first — a thermometer and CMT before a syringe', 'Only products registered for the species; prescription products only under the veterinarian', 'Dose by body weight (weigh tape), correct route (IM / SC / IV / IMM), full course', 'One sterile needle per animal; clean injection sites; separate IMM tubes', 'Withdrawal period: mark the animal, record start and end dates, keep milk out of the tank', 'Store cool, dark, dry; check expiry; never mix products in one syringe', 'Record every treatment the same day — this is also your legal protection'];
    for (let i = 0; i < rules.length; i++) {
      const y = 2.3 + i * 0.6;
      s.addImage({ data: await I('FaCheckCircle', C.moss), x: 7.1, y: y + 0.08, w: 0.32, h: 0.32 });
      s.addText(rules[i], { x: 7.55, y, w: 4.95, h: 0.5, fontFace: BFONT, fontSize: 11.5, color: C.ink, valign: 'middle', isTextBox: true, margin: 0 });
    }
    footer(s);
    note(s, 'This slide is the bridge to Module 3. Sensors generate alerts; records turn alerts into a herd history that can be analysed. The drug rules are the same in every country; the withdrawal rule is the one that protects the milk market.', '기록 최소세트 + 약품 사용 7원칙. 모듈3으로 넘어가는 다리.');
  }

  // ===== Module 3 =====
  await section('3', 'Digital herd monitoring', 'Rumen bolus sensors: what they measure, the alerts they generate, real cases, integration with NDHIS / iHealth / iFeed, and how to design the Philippine pilot.', 'FaMicrochip');

  // 27. From eyes to data
  {
    const s = pres.addSlide();
    header(s, 'From eyes to data — closing the observation gap', 'Module 3 · Digital monitoring');
    card(s, M, 1.6, 5.8, 5.1, C.tint);
    s.addText('What a technician cannot see', { x: M + 0.25, y: 1.75, w: 5.3, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Heat at 2 a.m. in a buffalo that shows almost nothing at 8 a.m.', 'A fever that starts 2–4 days before the cow looks sick', 'Rumination that stopped this morning — the cow still stands at the feed bunk', 'A calving that begins tonight in a pen nobody is watching', 'Which of 50 animals is actually suffering from the heat', 'A herd-wide temperature rise = infection or vaccine reaction'], M + 0.25, 2.3, 5.3, 4.3, { size: 13 });
    s.addText('What the animal tells us, continuously', { x: 6.9, y: 1.6, w: 5.8, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    const par = [['FaThermometerHalf', 'Core body temperature', 'fever, calving, heat stress, drinking events'], ['FaSync', 'Rumination (reticular contractions)', 'health, feed intake, acidosis, transition'], ['FaWalking', 'Activity', 'estrus, lameness, illness'], ['FaTint', 'Water intake events', 'first sign of many diseases'], ['FaVial', 'Rumen pH (optional sensor)', 'acidosis, ration changes']];
    for (let i = 0; i < 5; i++) {
      const y = 2.15 + i * 0.92;
      await circleIcon(s, par[i][0], 6.9, y, 0.62, C.forest, C.white);
      s.addText([{ text: par[i][1], options: { bold: true, color: C.forest, breakLine: true } }, { text: par[i][2], options: { color: C.muted, fontSize: 11 } }], { x: 7.7, y: y - 0.05, w: 5.0, h: 0.75, fontFace: BFONT, fontSize: 13, valign: 'middle', isTextBox: true, margin: 0 });
    }
    footer(s);
    note(s, 'The question is not “sensor or no sensor” but “which observations are we structurally missing?” For smallholder buffalo it is night heat and early illness. Five continuous parameters answer most of it. I run 90 of these sensors on my own cows; my night worker is now a phone alert.', '센서의 질문 = 구조적으로 놓치는 관찰이 무엇인가. 5개 연속 파라미터.');
  }

  // 28. Sensor comparison
  {
    const s = pres.addSlide();
    header(s, 'Sensor technologies — what each can and cannot measure', 'Module 3 · Digital monitoring');
    tbl(s, [
      ['', 'Neck collar', 'Leg pedometer', 'Ear tag', 'Rumen bolus'],
      ['Measures', 'Activity, rumination (by neck movement)', 'Activity, lying time', 'Activity, ear-surface temp', 'Core temperature, rumination (direct), activity, water intake, optional pH'],
      ['Temperature', 'No', 'No', 'Indirect (skin, weather-affected)', 'Direct, ± 0.05 °C'],
      ['Rumination', 'Indirect', 'No', 'Indirect', 'Direct — counts reticular contractions'],
      ['Loss / damage', 'Strap loss, needs re-fitting as animal grows', 'Loss in mud, wallow', 'Tears out, loss', 'Inside the animal; tamper-proof; no maintenance'],
      ['Battery / life', '2–5 yrs, recharge or replace', '2–5 yrs', '2–3 yrs', '≥ 4 years, no maintenance'],
      ['Buffalo suitability', 'Wallowing damages straps', 'Mud and water', 'Ear damage', 'Unaffected by wallowing — needs local validation of thresholds'],
    ], M, 1.6, W - 2 * M, [1.9, 2.4, 2.2, 2.4, 3.23], { size: 11, hsize: 12, rowH: 0.62 });
    s.addText('No single device is perfect: collars and tags are cheaper to buy; the bolus measures more, directly, for longer — and is the only option that survives a buffalo wallow.', { x: M, y: 6.15, w: W - 2 * M, h: 0.6, fontFace: BFONT, fontSize: 12, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    footer(s);
    note(s, 'Be fair to the alternatives. Collars and ear tags work and are cheaper; they measure activity well and infer rumination. The bolus is the only device that measures core temperature and rumination directly, and the only one indifferent to mud, water and wallowing — the practical argument for buffalo. Thresholds still need local calibration.', '센서 비교. 볼러스 = 체온·반추 직접 측정, 물소 진흙목욕에 영향 없음. 임계값은 현지 보정 필요.');
  }

  // 29. How a bolus works
  {
    const s = pres.addSlide();
    header(s, 'How a rumen bolus works', 'Module 3 · Digital monitoring');
    const flow = [['FaCapsules', '1 · Bolus', 'Given orally with an applicator; settles in the reticulum for life'], ['FaSatelliteDish', '2 · Base station', 'Receives radio data in the barn; optional climate (THI) sensor'], ['FaCloud', '3 · Cloud & AI', 'Self-learning models per animal; 7-day onboard buffer if offline'], ['FaMobileAlt', '4 · App / dashboard', 'Web, iOS, Android — alerts to farmer, technician, veterinarian']];
    for (let i = 0; i < 4; i++) {
      const x = M + i * 3.08;
      card(s, x, 1.6, 2.9, 2.5, C.tint2);
      await circleIcon(s, flow[i][0], x + 0.25, 1.8, 0.7, C.forest, C.white);
      s.addText(flow[i][1], { x: x + 1.1, y: 1.8, w: 1.75, h: 0.7, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(flow[i][2], { x: x + 0.25, y: 2.6, w: 2.45, h: 1.4, fontFace: BFONT, fontSize: 11.5, color: C.ink, isTextBox: true, margin: 0 });
      if (i < 3) s.addImage({ data: await I('FaChevronRight', C.moss), x: x + 2.88, y: 2.05, w: 0.24, h: 0.24 });
    }
    card(s, M, 4.35, 6.0, 2.35, C.tint);
    s.addText('How it reads rumination', { x: M + 0.25, y: 4.45, w: 5.5, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    s.addText('The bolus sits in the reticulum and counts its contractions. During rumination the reticulum contracts three times per cycle; while eating or resting, twice. So the sensor knows — directly, not by inference — how many minutes a day the animal ruminates, and alerts when it falls.', { x: M + 0.25, y: 4.9, w: 5.5, h: 1.7, fontFace: BFONT, fontSize: 12, color: C.ink, isTextBox: true, margin: 0 });
    card(s, 6.85, 4.35, 5.9, 2.35, C.tint);
    s.addText('Device facts (smaXtec bolus used in Korea)', { x: 7.1, y: 4.45, w: 5.4, h: 0.4, fit: 'shrink', fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Basic: 105 × 35 mm; temperature 0–50 °C, ± 0.05 °C; battery ≥ 4 years; bio-polymer housing', 'Premium: 135 × 35 mm, adds rumen pH (3–9) for ~150 days', 'No maintenance, no re-fitting, cannot be lost or swapped between animals', 'Requires adult animal (≥ ~300 kg) and a trained person with the applicator'], 7.1, 4.9, 5.4, 1.75, { size: 11, gap: 3 });
    footer(s);
    note(s, 'Four boxes: bolus, base station, cloud, phone. The physiological trick is the reticulum: three contractions during rumination, two otherwise — the bolus counts them. I will show the applicator and a bolus at the practicum station. Specifications are the manufacturer’s.', '볼러스 작동 4단계. 반추 = 제2위 수축 3회 vs 2회 카운트. 사양은 제조사 자료.');
  }

  // 30. Alerts
  {
    const s = pres.addSlide();
    header(s, 'The alerts a technician receives', 'Module 3 · Digital monitoring');
    const groups = [['FaDna', 'Reproduction', C.forest, ['Heat detected + optimal insemination window', 'Calving imminent (typically 10–20 h ahead)', 'Post-calving recovery watch (fever, rumination)']], ['FaHeartbeat', 'Health', C.rust, ['Temperature rise (fever) — up to ~4 days before clinical signs', 'Rumination drop · activity drop', 'Suspected ketosis · milk fever · mastitis', 'Reduced water intake · reduced feed intake']], ['FaSun', 'Feeding & environment', C.gold, ['Heat-stress alert per animal and per barn (THI)', 'Ration change effects on rumination (and pH with premium bolus)', 'Group-level trends for feeding management']]];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      card(s, x, 1.6, 3.95, 4.3, C.tint2);
      await circleIcon(s, groups[i][0], x + 0.25, 1.85, 0.7, groups[i][2], C.white);
      s.addText(groups[i][1], { x: x + 1.1, y: 1.85, w: 2.7, h: 0.7, fontFace: HFONT, fontSize: 17, bold: true, color: C.forest, valign: 'middle', isTextBox: true, margin: 0 });
      bullets(s, groups[i][3], x + 0.25, 2.75, 3.45, 3.1, { size: 12.5, gap: 8 });
    }
    card(s, M, 6.05, W - 2 * M, 0.7, C.tint);
    s.addText('Performance figures (heat detection > 90%, calving detection > 90%, illness alerts days before clinical signs, antibiotic reduction up to 70%) are manufacturer and user reports from cattle herds. They are targets to verify in the Philippine pilot, not guarantees.', { x: M + 0.25, y: 6.1, w: W - 2 * M - 0.5, h: 0.6, fontFace: BFONT, fontSize: 11, italic: true, color: C.muted, valign: 'middle', isTextBox: true, margin: 0 });
    footer(s);
    note(s, 'Three families of alerts. In practice a technician looks at a short daily list: animals to inseminate, animals to check, animals to move to the calving pen. The disclaimer at the bottom matters — these are reported figures from cattle; buffalo and Philippine conditions need their own numbers.', '알람 3군. 성능 수치는 제조사·사용자 보고, 필리핀 파일럿에서 검증 대상.');
  }

  // 31. Case 1 heat
  {
    const s = pres.addSlide();
    header(s, 'Case 1 · Heat alert — the activity curve tells you when', 'Module 3 · Digital monitoring');
    const labels = []; const act = []; const rum = [];
    for (let h = 0; h < 48; h += 2) { labels.push(h % 12 === 0 ? (h + 'h') : ''); const peak = h >= 20 && h <= 32 ? 55 * Math.exp(-Math.pow((h - 26) / 4, 2)) : 0; act.push(Math.round(40 + 8 * Math.sin(h / 3) + peak)); rum.push(Math.round(480 - (h >= 20 && h <= 32 ? 150 * Math.exp(-Math.pow((h - 26) / 4, 2)) : 0) + 10 * Math.cos(h / 4))); }
    s.addChart(pres.charts.LINE, [{ name: 'Activity index', labels, values: act }, { name: 'Rumination (min/day, right)', labels, values: rum }], {
      x: M, y: 1.5, w: 7.8, h: 4.2, chartColors: [C.forest, C.gold], lineSize: 2.5, lineDataSymbol: 'none', showTitle: true, title: 'Illustrative 48-hour trace of one cow: activity up, rumination down = heat', titleFontSize: 12, titleColor: C.ink, titleFontFace: BFONT,
      showLegend: true, legendPos: 'b', legendFontSize: 10, catAxisLabelColor: C.muted, valAxisLabelColor: C.muted, valGridLine: { color: 'E5EBDD', size: 0.5 }, catGridLine: { style: 'none' }, catAxisLabelFontFace: BFONT, valAxisLabelFontFace: BFONT,
    });
    s.addText('Illustrative curve, not measured data. Real alerts also use temperature and the animal’s own baseline.', { x: M, y: 5.75, w: 7.8, h: 0.4, fontFace: BFONT, fontSize: 10, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    card(s, 8.8, 1.5, 3.95, 5.2, C.tint);
    s.addText('What the technician does', { x: 9.05, y: 1.65, w: 3.5, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Alert at 20:00 with onset time; app shows the insemination window (next morning)', 'Confirm on farm: mucus, tail-paint, standing — or trust the sensor for silent heats', 'Inseminate inside the window; record AI + sire in NDHIS', 'Next expected heat and pregnancy-check date are generated automatically', 'Reported outcomes in cattle herds: fewer missed heats, days open reduced by up to ~25% (user reports)'], 9.05, 2.15, 3.5, 4.4, { size: 12 });
    footer(s);
    note(s, 'Read the curve: activity climbs, rumination falls, temperature (not shown) rises slightly. The alert gives the onset time — that is what fixes AI timing. For buffalo this is the single most valuable alert because it catches the night heat nobody sees.', '발정 알람 사례. 곡선 읽기: 활동↑ 반추↓. 시작 시각 → AI 타이밍. 물소에 가장 가치 큰 알람.');
  }

  // 32. Case 2 calving & fresh cow
  {
    const s = pres.addSlide();
    header(s, 'Case 2 · Calving alert and the fresh-cow watch', 'Module 3 · Digital monitoring');
    const labels2 = []; const temp = [];
    for (let h = -72; h <= 72; h += 6) { labels2.push(h % 24 === 0 ? (h + 'h') : ''); let t = 38.7 + 0.08 * Math.sin(h / 5); if (h >= -30 && h < 0) t -= 0.45 * (1 - Math.exp((h) / 10)); if (h > 0 && h < 24) t += 0.15; if (h >= 48) t += 0.6; temp.push(Number(t.toFixed(2))); }
    s.addChart(pres.charts.LINE, [{ name: 'Core temperature °C', labels: labels2, values: temp }], {
      x: M, y: 1.5, w: 7.8, h: 4.2, chartColors: [C.rust], lineSize: 2.5, lineDataSymbol: 'none', showTitle: true, title: 'Illustrative: temperature drop before calving (0 h), then a fever rising from +48 h (metritis)', titleFontSize: 12, titleColor: C.ink, titleFontFace: BFONT,
      showLegend: false, catAxisLabelColor: C.muted, valAxisLabelColor: C.muted, valAxisMinVal: 37.8, valAxisMaxVal: 39.8, valGridLine: { color: 'E5EBDD', size: 0.5 }, catGridLine: { style: 'none' }, catAxisLabelFontFace: BFONT, valAxisLabelFontFace: BFONT,
    });
    s.addText('Illustrative curve. A 2017 performance study at Georg-August-University Göttingen reported most calving alerts 10–20 h before calving (manufacturer citation).', { x: M, y: 5.75, w: 7.8, h: 0.6, fontFace: BFONT, fontSize: 10, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    card(s, 8.8, 1.5, 3.95, 5.2, C.tint);
    s.addText('Action list', { x: 9.05, y: 1.65, w: 3.5, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Calving alert → move to clean pen, prepare colostrum, plan the night check', 'No progress alerts? Still apply the 30 min / 2 h rules from Module 1', 'Days 1–14: temperature and rumination watch — metritis, ketosis and mastitis show here first', 'Fever alert on day 3 → examine, CMT, discharge check → treat per protocol', 'Enter calving ease, calf ID and every treatment in NDHIS / iHealth'], 9.05, 2.15, 3.5, 4.4, { size: 12 });
    footer(s);
    note(s, 'Two uses of one sensor: the temperature drop before calving gives the warning; the temperature rise after calving gives the fresh-cow watch. On my farm the fresh-cow list on the phone replaced the morning walk with a thermometer.', '분만 전 체온 하강 알람 + 분만 후 체온 상승 감시. 신선우 관리 대체.');
  }

  // 33. Case 3 mastitis milk
  {
    const s = pres.addSlide();
    header(s, 'Case 3 · Early mastitis detection saves the lactation', 'Module 3 · Digital monitoring');
    const wk = Array.from({ length: 20 }, (_, i) => 'wk ' + (i + 1));
    const healthy = wk.map((_, i) => Math.round(28 + 8 * Math.exp(-Math.pow((i - 6) / 6, 2)) - i * 0.25));
    const early = healthy.map((v, i) => (i >= 4 && i <= 7 ? v - 3 - (i === 5 ? 2 : 0) : v - 1));
    const late = healthy.map((v, i) => (i >= 4 ? v - 7 - (i < 9 ? 3 : 0) : v));
    s.addChart(pres.charts.LINE, [{ name: 'Healthy cow', labels: wk, values: healthy }, { name: 'Mastitis found early by sensor alert (wk 5)', labels: wk, values: early }, { name: 'Mastitis found late by milk changes (wk 6–7)', labels: wk, values: late }], {
      x: M, y: 1.5, w: 7.8, h: 4.2, chartColors: [C.forest, C.gold, C.rust], lineSize: 2.5, lineDataSymbol: 'none', showTitle: true, title: 'Illustrative milk yield (kg/day) after calving — the earlier the treatment, the smaller the loss', titleFontSize: 12, titleColor: C.ink, titleFontFace: BFONT,
      showLegend: true, legendPos: 'b', legendFontSize: 10, catAxisLabelColor: C.muted, valAxisLabelColor: C.muted, valGridLine: { color: 'E5EBDD', size: 0.5 }, catGridLine: { style: 'none' }, valAxisMinVal: 10, catAxisLabelFontFace: BFONT, valAxisLabelFontFace: BFONT,
    });
    s.addText('Illustrative curves based on the pattern reported by smaXtec users; actual losses vary with pathogen and treatment.', { x: M, y: 5.75, w: 7.8, h: 0.4, fontFace: BFONT, fontSize: 10, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    card(s, 8.8, 1.5, 3.95, 5.2, C.tint);
    s.addText('Why early matters', { x: 9.05, y: 1.65, w: 3.5, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Temperature and rumination change 1–4 days before milk looks abnormal (reported)', 'Early case: often mild → strip, NSAID, monitor; fewer antibiotics, shorter withdrawal', 'Late case: acute quarter, systemic signs, permanent tissue damage, lower peak', 'Each early case saves discarded milk, drugs and — most of all — the rest of the lactation', 'Combine: sensor alert → CMT → decision → record'], 9.05, 2.15, 3.5, 4.4, { size: 12 });
    footer(s);
    note(s, 'The sensor does not diagnose mastitis; it tells you which cow to CMT this morning. The economics live in the curve: the cow found late never regains her peak. This is also where antibiotic reduction comes from — early cases are treated differently.', '센서는 진단이 아니라 "오늘 CMT할 소"를 알려줌. 경제성은 곡선 안에.');
  }

  // 34. Case 4 herd level
  {
    const s = pres.addSlide();
    header(s, 'Case 4 · Herd-level signals across the whole farm', 'Module 3 · Digital monitoring');
    const hc = [['FaSyringe', 'Vaccination reaction', 'Many animals show a temperature rise 1–2 days after vaccination. Normal — but it tells you the vaccine was given and how the herd responded.'], ['FaVirus', 'Infectious outbreak', 'A temperature rise across many animals with no vaccination = investigate today. Early warning for FMD, HS and respiratory disease.'], ['FaSun', 'Heat stress day', 'Body temperature and water-intake alerts cluster in the afternoon; rumination falls at night. Measure whether fans and sprinklers actually work.'], ['FaWheatAwn', 'Feed change', 'A ration change shows in rumination within 24 h — and in rumen pH with the premium bolus. Catch acidosis before hooves and milk fat show it.']];
    for (let i = 0; i < 4; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = M + col * 6.15, y = 1.6 + row * 2.55;
      card(s, x, y, 5.95, 2.35, C.tint2);
      await circleIcon(s, hc[i][0], x + 0.25, y + 0.25, 0.7, C.forest, C.white);
      s.addText(hc[i][1], { x: x + 1.1, y: y + 0.25, w: 4.6, h: 0.7, fontFace: HFONT, fontSize: 16, bold: true, color: C.forest, valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(hc[i][2], { x: x + 0.25, y: y + 1.05, w: 5.45, h: 1.2, fontFace: BFONT, fontSize: 12, color: C.ink, isTextBox: true, margin: 0 });
    }
    footer(s);
    note(s, 'Individual alerts manage cows; herd-level patterns manage the farm and — for PCC — the region. A regional dashboard that sees a temperature cluster in one municipality is an early-warning system for animal health authorities. That is the government-scale value of the same sensor.', '개체 알람 = 소 관리, 군 패턴 = 농장·지역 관리. 지역 대시보드 = 방역 조기경보.');
  }

  // 35. Alert to action workflow
  {
    const s = pres.addSlide();
    header(s, 'From alert to action to record — the daily loop', 'Module 3 · Digital monitoring');
    const loop = [['FaMicrochip', 'Sense', 'bolus measures 24/7'], ['FaBell', 'Alert', 'cloud model flags deviation from the animal’s own baseline'], ['FaMobileAlt', 'Prioritise', 'technician’s morning list: breed / check / calving pen'], ['FaStethoscope', 'Verify', 'on-farm check: heat signs, temperature, CMT, exam'], ['FaTasks', 'Act', 'AI · treatment per protocol · vet call · move animal'], ['FaDatabase', 'Record', 'event into NDHIS / iHealth the same day'], ['FaChartLine', 'Learn', 'KPIs improve; models and protocols are tuned']];
    for (let i = 0; i < 7; i++) {
      const x = M + i * 1.76;
      await circleIcon(s, loop[i][0], x + 0.4, 1.7, 0.85, i === 5 ? C.gold : C.forest, C.white);
      s.addText(loop[i][1], { x, y: 2.65, w: 1.65, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, align: 'center', isTextBox: true, margin: 0 });
      s.addText(loop[i][2], { x, y: 3.05, w: 1.65, h: 1.0, fontFace: BFONT, fontSize: 10.5, color: C.muted, align: 'center', isTextBox: true, margin: 0 });
      if (i < 6) s.addImage({ data: await I('FaChevronRight', C.moss), x: x + 1.5, y: 2.0, w: 0.24, h: 0.24 });
    }
    card(s, M, 4.3, 6.0, 2.4, C.tint);
    s.addText('Who does what', { x: M + 0.25, y: 4.4, w: 5.5, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    tbl(s, [['Role', 'Daily responsibility'], ['Farmer', 'Sees own animals’ alerts; feeds, moves, calls technician'], ['Livestock technician', 'Morning list, AI, PD, CMT, first-line treatment, data entry'], ['Veterinarian', 'Protocols, severe cases, herd health review of alert trends'], ['PCC regional / national', 'Dashboards, KPIs, outbreak signals, programme decisions']], M + 0.25, 4.85, 5.5, [1.7, 3.8], { size: 10.5, hsize: 11, rowH: 0.34 });
    card(s, 6.85, 4.3, 5.9, 2.4, C.tint2);
    s.addText('Rules that keep the loop alive', { x: 7.1, y: 4.4, w: 5.4, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Every alert gets a response in the app — even “checked, nothing found”', 'Record on the day; unrecorded action = lost learning', 'Weekly 30-minute review: alerts vs outcomes, per farm', 'Adjust thresholds per animal group (buffalo vs cattle, heifers vs cows) with the veterinarian'], 7.1, 4.85, 5.4, 1.8, { size: 11.5, gap: 4 });
    footer(s);
    note(s, 'Technology fails when the loop breaks at “Record”. In Korea the farms that gained most were not the ones with the best sensors but the ones whose technician closed the loop every day. Define the roles clearly in the pilot.', '알람→행동→기록 루프. "기록"에서 끊기면 실패. 역할 정의.');
  }

  // 36. Integration architecture
  {
    const s = pres.addSlide();
    header(s, 'Fitting sensors into NDHIS, iHealth and iFeed', 'Module 3 · Digital monitoring');
    // layered diagram
    const layer = (y, h, label, fill, fg) => { s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y, w: 8.2, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.1 }); s.addText(label, { x: M + 0.2, y, w: 1.9, h, fontFace: HFONT, fontSize: 13, bold: true, color: fg, valign: 'middle', isTextBox: true, margin: 0 }); };
    layer(1.6, 0.9, 'Users', C.forest, C.white);
    ['Farmer app', 'Technician app', 'Veterinarian view', 'PCC regional / national dashboard'].forEach((t, i) => { s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 2.2 + i * 1.5, y: 1.72, w: 1.4, h: 0.66, fill: { color: C.white }, line: { color: C.white }, rectRadius: 0.08 }); s.addText(t, { x: M + 2.22 + i * 1.5, y: 1.72, w: 1.36, h: 0.66, fontFace: BFONT, fontSize: 9.5, color: C.forest, align: 'center', valign: 'middle', isTextBox: true, margin: 0 }); });
    layer(2.65, 0.9, 'Applications', C.moss, C.forest);
    ['NDHIS — herd improvement, reproduction & performance records', 'iHealth — health events, treatments, withdrawal', 'iFeed — rations & feeding frameworks'].forEach((t, i) => { s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 2.2 + i * 2.0, y: 2.77, w: 1.9, h: 0.66, fill: { color: C.white }, line: { color: C.white }, rectRadius: 0.08 }); s.addText(t, { x: M + 2.22 + i * 2.0, y: 2.77, w: 1.86, h: 0.66, fontFace: BFONT, fontSize: 9, color: C.forest, align: 'center', valign: 'middle', isTextBox: true, margin: 0 }); });
    layer(3.7, 0.9, 'Data platform', C.tint, C.forest);
    s.addText('Animal ID master  ·  event database  ·  sensor time-series  ·  KPI engine  ·  alert rules  ·  API for sensor cloud', { x: M + 2.2, y: 3.7, w: 5.9, h: 0.9, fontFace: BFONT, fontSize: 11, color: C.ink, valign: 'middle', isTextBox: true, margin: 0 });
    layer(4.75, 0.9, 'Data sources', C.tint2, C.forest);
    ['Rumen bolus cloud (API)', 'Manual records (phone)', 'Milk tests / lab', 'Weather / THI'].forEach((t, i) => { s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 2.2 + i * 1.5, y: 4.87, w: 1.4, h: 0.66, fill: { color: C.white }, line: { color: C.line, width: 0.75 }, rectRadius: 0.08 }); s.addText(t, { x: M + 2.22 + i * 1.5, y: 4.87, w: 1.36, h: 0.66, fontFace: BFONT, fontSize: 9.5, color: C.forest, align: 'center', valign: 'middle', isTextBox: true, margin: 0 }); });
    layer(5.8, 0.9, 'Animals', C.forest, C.white);
    s.addText('One ear-tag ID per animal — the key that joins every record and every sensor reading', { x: M + 2.2, y: 5.8, w: 5.9, h: 0.9, fontFace: BFONT, fontSize: 11.5, color: C.white, valign: 'middle', isTextBox: true, margin: 0 });
    card(s, 9.2, 1.6, 3.55, 5.1, C.tint);
    s.addText('Korea’s approach: “CowTalk AI”', { x: 9.45, y: 1.75, w: 3.1, h: 0.6, fontFace: HFONT, fontSize: 14, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Sensor data + public livestock data + AI models in one platform', 'Same data serves farmer, vet, inseminator and government — different views', 'Designed as a provincial livestock operating system: farm → province → national', 'Sensor cloud connected by API, so NDHIS stays the system of record'], 9.45, 2.4, 3.1, 4.2, { size: 11.5, gap: 5 });
    footer(s);
    note(s, 'Do not build a second herd system for the sensors. NDHIS remains the system of record; the sensor cloud feeds it through an API; iHealth receives the health events the alerts trigger. This is how Korea structures it — the platform we call CowTalk AI sits on top of the sensor data and public data, and the same data feeds farmer, vet and government views.', 'NDHIS = 기록 원본. 센서 클라우드는 API로 연결. CowTalk AI 구조 소개.');
  }

  // 37. Buffalo & pilot design
  {
    const s = pres.addSlide();
    header(s, 'Designing the Philippine pilot with 100 sensors', 'Module 3 · Digital monitoring');
    card(s, M, 1.6, 4.0, 5.1, C.tint2);
    s.addText('Buffalo-specific points', { x: M + 0.25, y: 1.75, w: 3.5, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    bullets(s, ['Reticulum anatomy and bolus retention are comparable to cattle — confirm with the first 10 animals (ultrasound / X-ray optional)', 'Baseline temperature, rumination minutes and activity differ from Holsteins → collect 4–6 weeks of baseline before trusting alerts', 'Wallowing lowers body temperature transiently — models must learn this pattern', 'Heat signs weak → the heat alert is the primary target outcome', 'Applicator technique and restraint: trained staff only'], M + 0.25, 2.25, 3.5, 4.4, { size: 11.5 });
    card(s, 4.8, 1.6, 7.95, 5.1, C.tint);
    s.addText('Pilot design (proposal for discussion)', { x: 5.05, y: 1.75, w: 7.4, h: 0.4, fontFace: HFONT, fontSize: 15, bold: true, color: C.forest, isTextBox: true, margin: 0 });
    tbl(s, [['Element', 'Proposal'], ['Animals', '100 sensors: e.g. 60 dairy buffalo + 40 dairy cattle across 4–6 cooperative or institutional farms; adult animals in production'], ['Comparison', 'Paired control animals on the same farms without sensors (or before/after per animal) — the Korean Gyeonggi pilot uses this RCT-style design'], ['Baseline', 'Months 1–2: fit sensors, collect baseline, train technicians; no alert-based actions yet'], ['Intervention', 'Months 3–12: alert-driven heat detection, fresh-animal monitoring, disease checks; all events in NDHIS / iHealth'], ['Primary KPIs', 'Heat detection rate · conception rate · days open · calving alerts confirmed · disease detection lead time · antibiotic treatments per 100 animal-months'], ['Secondary', 'Milk yield, calf mortality, technician time per animal, farmer satisfaction, data completeness in NDHIS'], ['Deliverable', 'Month 12 report: measured effects, buffalo thresholds, cost per animal-month, recommendation for scale-up']], 5.05, 2.25, 7.4, [1.5, 5.9], { size: 10.5, hsize: 11, rowH: 0.5 });
    footer(s);
    note(s, 'This is a proposal, not a plan — PCC owns the design. Two non-negotiables from Korean experience: a baseline period before acting on alerts, and a comparison group so that the results can be published and used for scale-up decisions. One hundred sensors is enough for a credible pilot if the KPIs are defined now.', '파일럿 설계 제안(PCC 결정). 핵심 2개: 기준선 기간 + 대조군.');
  }

  // 38. Economics
  {
    const s = pres.addSlide();
    header(s, 'Where the money comes from — value drivers for the pilot', 'Module 3 · Digital monitoring');
    tbl(s, [['Value driver', 'Mechanism', 'How to measure it', 'Direction reported in cattle herds'],
      ['Fewer days open', 'Heats caught, AI timed correctly', 'Days open before vs after; per-day cost of open animal (feed + lost milk)', 'Down (up to ~25% reported)'],
      ['Fewer clinical mastitis cases, milder cases', 'Early temperature / rumination alert → early CMT', 'Cases per 100 animal-months; discarded milk; drug cost', 'Down; antibiotic use down (up to ~70% reported)'],
      ['Fewer calving losses', 'Calving alert → supervised calving', 'Stillbirths, dystocia, retained placenta per 100 calvings', 'Down'],
      ['Earlier treatment of metabolic disease', 'Fresh-animal watch', 'Ketosis / milk fever cases, culls in first 60 days', 'Down'],
      ['Labour efficiency', 'Morning list replaces heat watching and thermometer rounds', 'Technician hours per animal per week', 'Down'],
      ['Milk yield', 'Sum of the above', 'kg per animal per lactation, adjusted for season', 'Up (varies)']], M, 1.6, W - 2 * M, [2.6, 3.0, 3.6, 2.93], { size: 10.5, hsize: 11, rowH: 0.52 });
    card(s, M, 5.45, W - 2 * M, 1.3, C.tint);
    s.addText('Simple pilot economics (fill with local numbers):  value per animal-month = Δ days open × cost/day  +  Δ mastitis cases × cost/case  +  Δ calf losses × calf value  +  labour saved × wage.  Compare with sensor cost per animal-month (device amortised over 4 years + platform fee). Korean dairies typically recover the cost from reproduction alone; buffalo economics must be measured, not assumed.', { x: M + 0.25, y: 5.5, w: W - 2 * M - 0.5, h: 1.2, fontFace: BFONT, fontSize: 11.5, color: C.ink, valign: 'middle', isTextBox: true, margin: 0 });
    footer(s);
    note(s, 'Give the technicians the formula, not my numbers. Their cost per day open, their mastitis cost, their wage rates. The direction column is what cattle herds report; the pilot must produce the Philippine magnitudes. Do not quote Korean prices or internal supply terms.', '가치 동인 표 + 공식. 현지 숫자로 채우도록. 한국 단가·내부 공급조건 언급 금지.');
  }

  // 39. Korea reference
  {
    const s = pres.addSlide();
    header(s, 'Reference cases: farm → province → international', 'Module 3 · Digital monitoring');
    const refs = [['FaHome', 'Song Young Shin Farm, Korea', '120 head · 90 bolus sensors · robots · compost-bedded barn. Night heat watching and fresh-cow thermometer rounds replaced by phone alerts; first animal-welfare and low-carbon certified dairy in Korea.'], ['FaLandmark', 'Gyeonggi Province AI livestock platform (planned)', 'Five-year provincial programme; dairy ICT pilot designed for 31 municipalities × 5 farms × 50 milking cows (7,750 cows) with randomised comparison; rumen sensors specified as the data source; expansion to beef and pig farms.'], ['FaGlobeAsia', 'Uzbekistan pilot (≈ 50 cows)', 'First international validation: sensor-based monitoring on a dairy herd with government stakeholders; paired with Korean Holstein sexed-embryo programme run with the Rural Development Administration (RDA). Figures being finalised.']];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      card(s, x, 1.6, 3.95, 4.2, C.tint2);
      await circleIcon(s, refs[i][0], x + 0.25, 1.85, 0.7, C.forest, C.white);
      s.addText(refs[i][1], { x: x + 1.1, y: 1.8, w: 2.7, h: 0.8, fontFace: HFONT, fontSize: 14, bold: true, color: C.forest, valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(refs[i][2], { x: x + 0.25, y: 2.8, w: 3.45, h: 2.9, fontFace: BFONT, fontSize: 11.5, color: C.ink, isTextBox: true, margin: 0 });
    }
    card(s, M, 6.0, W - 2 * M, 0.75, C.forest);
    s.addText('The lesson: the same sensor data serves the farmer, the veterinarian and the government — design the pilot so it can scale to the region and the nation.', { x: M + 0.3, y: 6.05, w: W - 2 * M - 0.6, h: 0.65, fontFace: BFONT, fontSize: 13.5, bold: true, color: C.white, valign: 'middle', isTextBox: true, margin: 0 });
    footer(s);
    note(s, 'Three scales. My farm proves it works; Gyeonggi Province shows how a government pilots it at scale with a proper study design; Uzbekistan shows it transfers across borders and pairs with genetics. The Philippine NDHIP pilot can be the fourth case — and PCC would own the data.', '3단계 레퍼런스: 농장 → 도(경기도) → 국제(우즈벡). 필리핀이 4번째 사례.');
  }

  // ===== Wrap-up section =====
  await section('★', 'Wrap-up and practicum', 'Ten things to take back to your farms, and this afternoon’s hands-on stations.', 'FaHandsHelping');

  // 41. Takeaways
  {
    const s = pres.addSlide();
    header(s, 'Ten things to take back to your farms', 'Wrap-up');
    const tk = ['Identify every animal and record every event — nothing else works without this', 'Heat detection rate is the first KPI to fix; silent and night heats are the main loss', 'AI 8–16 h after heat onset; treat semen like a patient', 'Ultrasound pregnancy check at day 28–30; re-enrol open animals the same day', 'Calving: 30 min / 2 h rules; colostrum 4 Qs within 2 hours', 'Transition cows: keep them eating — rumination is the early warning', 'Mastitis: CMT, treat by grade and protocol, respect withdrawal, post-dip every teat', 'Heat stress: shade, water, air, night feeding — measure it per animal', 'Sensors close the observation gap: alert → verify → act → record, every day', 'Pilot with a baseline and a comparison group so the results can drive national scale-up'];
    for (let i = 0; i < 10; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = M + col * 6.15, y = 1.6 + row * 1.0;
      s.addShape(pres.shapes.OVAL, { x, y: y + 0.12, w: 0.55, h: 0.55, fill: { color: i === 9 ? C.gold : C.forest }, line: { color: C.white } });
      s.addText(String(i + 1), { x, y: y + 0.12, w: 0.55, h: 0.55, fontFace: HFONT, fontSize: 15, bold: true, color: C.white, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(tk[i], { x: x + 0.75, y, w: 5.2, h: 0.8, fontFace: BFONT, fontSize: 12.5, color: C.ink, valign: 'middle', isTextBox: true, margin: 0 });
    }
    footer(s);
    note(s, 'Read the ten points slowly; ask each participant to choose the two they will implement on their next farm visit and write them down. That commitment is the real output of the day.', '10개 요점. 각자 2개 선택해 적도록.');
  }

  // 42. Practicum
  {
    const s = pres.addSlide();
    header(s, 'Practicum stations — this afternoon', 'Wrap-up');
    const stn = [['FaEye', 'Station 1 · Heat detection & AI timing', 'Tail paint, mucus and standing-heat scoring on live animals; semen thawing and gun loading; AM/PM decision cards', 'Heat detection aids, semen tank, thaw bath, AI kit'], ['FaSearch', 'Station 2 · Pregnancy diagnosis', 'Rectal ultrasound at day 28–60: finding the uterus, embryo, heartbeat; palpation basics on buffalo', 'Portable ultrasound, gloves, lubricant, restraint chute'], ['FaVial', 'Station 3 · Mastitis & milking routine', 'CMT on quarters, grading, treatment-decision cards; pre-dip / dry / post-dip demonstration', 'CMT paddle & reagent, dips, towels, sample tubes'], ['FaCapsules', 'Station 4 · Rumen bolus & app', 'Bolus and applicator handling, safe administration on an adult animal, base-station check, reading alerts and entering the response', 'Bolus, applicator, base station, phone/tablet with app'], ['FaDatabase', 'Station 5 · NDHIS / iHealth data entry', 'Enter the day’s heat, AI, PD, CMT and treatment events; view the KPI screen', 'Tablets, NDHIS training accounts'], ['FaThermometerHalf', 'Station 6 · Fresh-cow & calf check', 'Temperature, rumen fill, BCS, navel and scour assessment; colostrum Brix reading', 'Thermometer, Brix refractometer, BCS chart, colostrum']];
    for (let i = 0; i < 6; i++) {
      const col = i % 3, row = Math.floor(i / 3);
      const x = M + col * 4.1, y = 1.6 + row * 2.6;
      card(s, x, y, 3.95, 2.4, C.tint2);
      await circleIcon(s, stn[i][0], x + 0.2, y + 0.2, 0.6, C.forest, C.white);
      s.addText(stn[i][1], { x: x + 0.95, y: y + 0.15, w: 2.85, h: 0.7, fontFace: HFONT, fontSize: 12.5, bold: true, color: C.forest, valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(stn[i][2], { x: x + 0.2, y: y + 0.95, w: 3.55, h: 0.95, fontFace: BFONT, fontSize: 10.5, color: C.ink, isTextBox: true, margin: 0 });
      s.addText('Kit: ' + stn[i][3], { x: x + 0.2, y: y + 1.9, w: 3.55, h: 0.45, fontFace: BFONT, fontSize: 9.5, italic: true, color: C.muted, isTextBox: true, margin: 0 });
    }
    footer(s);
    note(s, 'Six stations, groups of five, 20 minutes each. Station 4 is the one participants have not seen before — make sure every technician handles the applicator and reads at least one alert on the app. Station 5 closes the loop: the events from the other stations are entered into NDHIS.', '실습 6개 스테이션, 5인 1조, 20분 로테이션. 스테이션4(볼러스)·5(NDHIS 입력) 필수.');
  }

  // 43. Thank you
  {
    const s = pres.addSlide();
    s.background = { color: C.forest };
    s.addShape(pres.shapes.OVAL, { x: 9.3, y: 3.3, w: 5.5, h: 5.5, fill: { color: '386F39' }, line: { color: '386F39' } });
    s.addImage({ data: await I('FaCow', C.moss), x: 10.6, y: 4.5, w: 1.6, h: 1.6 });
    s.addText('Maraming salamat po.', { x: M, y: 1.6, w: 9, h: 1.0, fontFace: HFONT, fontSize: 44, bold: true, color: C.white, isTextBox: true, margin: 0 });
    s.addText('Healthy soil → healthy grass → healthy cow → healthy milk → healthy people.\nThe data just helps us see it sooner.', { x: M, y: 2.7, w: 9, h: 1.2, fontFace: BFONT, fontSize: 18, color: C.tint, isTextBox: true, margin: 0 });
    s.addText([
      { text: 'Dr. Hyunje Ha, DVM', options: { bold: true, fontSize: 18, color: C.white, breakLine: true } },
      { text: 'Genetics Co., Ltd. · D2O Co., Ltd. · Song Young Shin Farm · Korea Animal Hospital', options: { fontSize: 13, color: C.tint, breakLine: true } },
      { text: 'Anseong, Gyeonggi-do, Republic of Korea  ·  Adjunct Professor, Konkuk University', options: { fontSize: 13, color: C.tint, breakLine: true } },
      { text: 'Questions, farm data and pilot design: through the PCC–KOICA NDHIP project office', options: { fontSize: 13, color: C.moss } },
    ], { x: M, y: 4.4, w: 9, h: 1.6, fontFace: BFONT, isTextBox: true, margin: 0, valign: 'top' });
    footer(s, true);
    note(s, 'Close with the farm philosophy: soil, grass, cow, milk, people. Invite questions; offer to review any farm’s reproduction records during the practicum. Contact goes through the project office.', '마무리: Soil to Soul 철학. 질문 유도. 연락은 사업단 경유.');
  }

  await pres.writeFile({ fileName: OUT });
  console.log('written', OUT, 'slides', slideNo);
})().catch((e) => { console.error(e); process.exit(1); });
