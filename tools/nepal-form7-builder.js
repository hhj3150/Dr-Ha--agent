// 별지 제7호 「참여전문가 이력사항」 — 원본 hwpx 셀 구조를 그대로 재현
const fs = require('fs');
const AdmZip = null;
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, VerticalAlign, HeightRule,
} = require('docx');

const FONT = 'Malgun Gothic';

// 원본 21열 그리드(HWPUNIT)를 cellSz 제약식에서 역산한 값
const COLS_HWP = [1886,3074,545,1879,2810,2688,1362,4136,1587,426,427,
                  1613,1445,2194,132,1607,2877,3340,3362,5438,5133];
const COLS = COLS_HWP.map(w => Math.round(w / 5));   // HWPUNIT -> DXA
const TOTAL = COLS.reduce((a, b) => a + b, 0);

// 원본 표 구조: [rowAddr, colAddr, colSpan, rowSpan, 원본텍스트]
const STRUCT = JSON.parse(fs.readFileSync('struct.json', 'utf8'));

// 채워 넣을 내용: "행,열" -> 값 (여러 문단이면 배열)
const V = {
  '0,2': '(국문)   하 현 제',
  '1,2': '(영문)   HA HYUN JAE',
  '2,2': '(한문)   河 賢 齊',
  '1,10': '1973. 10. 25.',
  '3,2': '경기도 안성시 보개면 양협길 29-67 (고려동물병원)',
  '4,2': '경기도 안성시 공도읍 공도로 150 스위첸 116-1604',

  // 학력 (학교명 c5 / 학과 c12 / 논문명 c18)
  '6,5': '명신고등학교',
  '7,5': '건국대학교', '7,12': '수의과대학 수의학',

  // 직장경력 (회사명 c2 / 기간 c8 / 직위 c15 / 담당업무 c18)
  '11,2': '㈜대한사료공업', '11,8': '1999.10 ~ 2022.10', '11,15': '기술지원',
  '11,18': '축산 기술지원',
  '12,2': '고려동물병원', '12,8': '2005 ~ 현재', '12,15': '원장',
  '12,18': '소 번식관리, 수정란이식 진료, 수란우 선발·관리, 목장 컨설팅',
  '13,2': '㈜제네틱스', '13,8': '2009 ~ 현재', '13,15': '대표이사',
  '13,18': '체외수정란(IVP) 생산, 수정란이식, 유전체 개량',
  '14,2': '송영신목장', '14,8': '2011 ~ 현재', '14,15': '대표',
  '14,18': '저지(Jersey) 전용목장 운영, A2 유제품 개발',
  '15,2': '디투오㈜', '15,8': '2021 ~ 현재', '15,15': '대표',
  '15,18': '축산 환경개선, 악취저감·퇴비화, 탄소저감',

  // 자격증 (자격증명 c2 / 취득년월일 c8 / 발행기관 c18)
  '19,2': '수의사 면허 (제10193호)', '19,8': '1999. 02.', '19,18': '농림축산식품부',

  // 외국어 (구분 c1 / 읽기 c4 / 쓰기 c6 / 말하기 c8)
  '23,1': '영어', '23,4': 'B', '23,6': 'B', '23,8': 'B',

  // 유사사업 (사업명 c3 / 대상국 c11 / 분야 c14 / 기간 c17 / 발주자 c19 / 담당업무 c20)
  '27,3': 'K-농업기술 활용 해외진출모델 확산사업',
  '27,11': '네팔', '27,14': '낙농·축산번식',
  '27,17': '2023 ~ 2025 (2026년 계속 수행 중)',
  '27,19': '', '27,20': '낙농 번식·수정란이식 기술지원 및 현지 기술이전',

  // 해외근무경력 (업무명 c3 / 국명 c7 / 기간 c9 / 담당업무 c16)
  '36,3': 'K-농업기술 활용 해외진출모델 확산사업 현지 기술지원',
  '36,7': '네팔', '36,9': '2023 ~ 2025 (2026년 계속 수행 중)',
  '36,16': '낙농 번식관리 및 수정란이식 기술 현지 지도, 현지 인력 교육',
};

// 라벨 셀(가운데·굵게 정렬 대상) — 원본에 글자가 있던 칸
const LABEL = new Set();
for (const c of STRUCT) if (c[4].trim()) LABEL.add(`${c[0]},${c[1]}`);

const BD = { style: BorderStyle.SINGLE, size: 6, color: '000000' };
const BORDERS = { top: BD, bottom: BD, left: BD, right: BD };

function para(text, { center = false, bold = false, size = 16 } = {}) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size, bold })],
    alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
    spacing: { before: 20, after: 20, line: 240 },
  });
}

function buildCell(c) {
  const [r, col, cs, rs, orig] = c;
  const key = `${r},${col}`;
  const isLabel = LABEL.has(key);
  const width = COLS.slice(col, col + cs).reduce((a, b) => a + b, 0);

  let children;
  if (key === '44,3') {
    // 참고사항: 원본 안내문구를 그대로 유지
    children = orig.split('※').filter(s => s.trim())
      .map(s => para('※ ' + s.trim().replace(/\s+/g, ' '), { size: 14 }));
  } else if (key === '22,13') {
    // 외국어 등급 설명
    children = ['A : Native speaker와 같이 자유로운 구사 (통역자격 수준)',
                'B : 일상생활은 물론 전문적 내용에 대해서도 구사가능',
                'C : 일상생활에 지장 없음',
                'D : 사전이 있으면 의사소통가능'].map(s => para(s, { size: 14 }));
  } else if (V[key] !== undefined && V[key] !== '') {
    children = [para(V[key], { center: cs <= 3 && V[key].length <= 12 })];
  } else if (isLabel) {
    children = [para(orig.replace(/\s+/g, ' ').trim(), { center: true, bold: true })];
  } else {
    children = [para('')];
  }

  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    columnSpan: cs > 1 ? cs : undefined,
    rowSpan: rs > 1 ? rs : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 30, bottom: 30, left: 60, right: 60 },
    children,
  });
}

// 행 단위로 재조립
const byRow = new Map();
for (const c of STRUCT) {
  if (!byRow.has(c[0])) byRow.set(c[0], []);
  byRow.get(c[0]).push(c);
}
const rows = [...byRow.keys()].sort((a, b) => a - b).map(r => {
  const cells = byRow.get(r).sort((a, b) => a[1] - b[1]);
  const tall = (r === 22) ? 900 : 0;   // 외국어 설명 블록
  return new TableRow({
    children: cells.map(buildCell),
    height: tall ? { value: tall, rule: HeightRule.ATLEAST } : undefined,
    cantSplit: true,
  });
});

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 16 } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
      },
    },
    children: [
      new Paragraph({
        children: [new TextRun({ text: '【별지 제7호 서식】', font: FONT, size: 20 })],
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: '참여전문가 이력사항', font: FONT, size: 32, bold: true })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
      }),
      new Paragraph({
        children: [new TextRun({ text: '2026년  8월  1일 현재', font: FONT, size: 18 })],
        alignment: AlignmentType.RIGHT,
        spacing: { after: 120 },
      }),
      new Table({
        columnWidths: COLS,
        width: { size: TOTAL, type: WidthType.DXA },
        borders: { ...BORDERS, insideHorizontal: BD, insideVertical: BD },
        rows,
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync(process.argv[2], b);
  console.log('wrote', process.argv[2], b.length, 'bytes / 총폭', TOTAL, 'dxa');
});
