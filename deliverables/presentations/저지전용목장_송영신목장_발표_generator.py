# -*- coding: utf-8 -*-
import os, subprocess
OUT="/tmp/claude-0/-home-user-Dr-Ha--agent/23b7dad1-358f-5fed-9dca-77cdbe483a42/scratchpad/out"
CHROME="/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
os.makedirs(OUT,exist_ok=True)

FOOT="송영신목장 · 저지 전용목장 운영 사례 | 국립축산과학원 2026.08.26"
def slide(inner, cls=""):
    return f'<section class="slide {cls}">{inner}</section>'
def foot(n):
    return f'<div class="ft"><span>{FOOT}</span><span class="pg">{n}</span></div>'
def head(kick,title):
    return f'<div class="hd"><div class="kick">{kick}</div><h2>{title}</h2></div>'
def bullets(items):
    return '<ul class="bl">'+"".join(f'<li>{i}</li>' for i in items)+'</ul>'

SLIDES=[]

# 1 COVER
SLIDES.append(slide(f'''
 <div class="cov">
   <div class="covtag">JERSEY DAIRY · SOIL TO SOUL</div>
   <h1>저지(Jersey) 전용목장<br>운영 사례</h1>
   <div class="covsub">프리미엄·저탄소·순환낙농 6차산업 모델 — 송영신목장</div>
   <div class="covline"></div>
   <div class="covmeta">발표 : 하현제 &nbsp;|&nbsp; Genetics · 한국동물병원 · D2O · 송영신목장<br>
   국립축산과학원 발표 · 2026년 8월 26일</div>
 </div>''',"cover"))

# 2 목차
SLIDES.append(slide(head("Contents","발표 순서")+f'''
 <div class="toc">
   <div class="tc"><span class="tn">01</span><div><b>왜 지금 저지인가</b><br>낙농 환경 변화와 저지의 전략적 가치</div></div>
   <div class="tc"><span class="tn">02</span><div><b>송영신목장 개요</b><br>규모·인증·통합 운영 구조</div></div>
   <div class="tc"><span class="tn">03</span><div><b>저지 전용목장 전환 전략</b><br>차별화·부가가치 내재화</div></div>
   <div class="tc"><span class="tn">04</span><div><b>운영 시스템</b><br>유전·사양·환경·동물복지</div></div>
   <div class="tc"><span class="tn">05</span><div><b>원유 품질과 6차산업</b><br>가공·브랜드·유통</div></div>
   <div class="tc"><span class="tn">06</span><div><b>성과와 과제</b></div></div>
   <div class="tc"><span class="tn">07</span><div><b>정책 제언·확장 모델</b></div></div>
 </div>'''+foot(2)))

# 3 섹션
SLIDES.append(slide('<div class="sec"><div class="secn">01</div><h2>왜 지금 저지인가</h2><div class="secl"></div><p>낙농 환경 변화와 저지 품종의 전략적 가치</p></div>',"section"))

# 4 배경
SLIDES.append(slide(head("Why Jersey · 배경","홀스타인 편중 시장, 프리미엄으로의 전환")+bullets([
 "국내 낙농은 <b>홀스타인 단일 품종에 편중</b> → 원유 생산 포화·가격 압박·차별화 한계",
 "소비 트렌드는 <b>프리미엄·기능성·A2·건강·가치소비</b>로 이동",
 "저지(Jersey)는 <b>유고형분(유지방·유단백)이 높고 A2A2 비율이 높은</b> 대표적 고품질 유용종",
 "체구가 작아 <b>사료효율·단위 유량당 온실가스 저감 잠재력</b>(연구·실증 필요)",
 "→ <b>국산 프리미엄 낙농의 차별화 돌파구</b>로서 저지 전용목장 모델 주목",
])+foot(4)))

# 5 품종특성 표
SLIDES.append(slide(head("Breed Traits · 품종 특성","저지 원유 : 가공 적성이 높은 고형분 우유")+f'''
 <div class="two">
   <div>
     <table class="cmp"><tr><th>항목</th><th>홀스타인(일반)</th><th>저지(일반)</th></tr>
     <tr><td>유지방</td><td>3.6~3.8 %</td><td class="hi">4.6~5.3 %</td></tr>
     <tr><td>유단백</td><td>3.1~3.3 %</td><td class="hi">3.7~3.9 %</td></tr>
     <tr><td>무지유고형분</td><td>보통</td><td class="hi">높음</td></tr>
     <tr><td>칼슘 등 미네랄</td><td>보통</td><td class="hi">풍부</td></tr>
     <tr><td>A2(β-카제인) 비율</td><td>낮음~중</td><td class="hi">높음</td></tr>
     <tr><td>체구/사료요구량</td><td>큼</td><td class="hi">작음(효율↑)</td></tr>
     </table>
     <div class="note">※ 일반적 품종 특성 범위(문헌). 실제값은 사양·계절·비유단계에 따라 변동.</div>
   </div>
   <div class="callout">
     <div class="cot">가공 적성</div>
     고형분이 높아 <b>치즈·요거트·버터·카이막 수율</b>이 우수 →
     동일 원유로 <b>더 많은·더 진한 제품</b> 생산 = 부가가치↑
     <div class="cotb">A2 · 고칼슘 · 진한 풍미 → <b>프리미엄 소비자 소구</b></div>
   </div>
 </div>'''+foot(5)))

# 6 섹션2
SLIDES.append(slide('<div class="sec"><div class="secn">02</div><h2>송영신목장 개요</h2><div class="secl"></div><p>규모 · 인증 · 통합 운영 구조</p></div>',"section"))

# 7 목장 개요
SLIDES.append(slide(head("Farm Profile · 목장 개요","낙농 + 유가공 + 6차산업을 통합한 저지 전용목장")+f'''
 <div class="two">
   <div>{bullets([
    "위치 : 경기도 안성시 미양면 (농장소재지 역전길 14-42)",
    "구조 : <b>저지 낙농 → 자가 유가공(HACCP) → 브랜드·직판</b> 수직통합",
    "연계 : Genetics·한국동물병원의 <b>수정란·번식 18년 역량</b> 결합",
    "브랜드 : <b>A2 저지 헤이밀크</b> · 온라인몰 shop.a2jerseymilk.com",
   ])}</div>
   <div class="cards">
     <div class="cd"><div class="cdh">동물복지축산농장</div>제 동물복지-10-30-6-1호<br>젖소 · 유효 ~2029.04</div>
     <div class="cd"><div class="cdh">저탄소 축산물</div>제2024-2-068호<br>축산물품질평가원 · ~2027.10</div>
     <div class="cd"><div class="cdh">HACCP</div>제2026-3-0230호<br>식약처(한국식품안전관리인증원)</div>
     <div class="cd gold"><div class="cdh">국내 1호</div>젖소 <b>동물복지 + 저탄소</b> 동시 인증목장</div>
   </div>
 </div>'''+foot(7)))

# 8 섹션3
SLIDES.append(slide('<div class="sec"><div class="secn">03</div><h2>저지 전용목장 전환 전략</h2><div class="secl"></div><p>차별화 · 부가가치 내재화</p></div>',"section"))

# 9 전환전략
SLIDES.append(slide(head("Strategy · 전환 전략","범용 원유 판매에서 프리미엄 브랜드 낙농으로")+f'''
 <div class="flow3">
   <div class="fb"><div class="fbn">전환 전</div>홀스타인 원유<br>도매 납품<br><span class="fbs">가격 수용자</span></div>
   <div class="far">➜</div>
   <div class="fb hi"><div class="fbn">전환</div>저지 <b>전용목장</b><br>동물복지·저탄소<br><span class="fbs">품종·인증 차별화</span></div>
   <div class="far">➜</div>
   <div class="fb gold"><div class="fbn">전환 후</div>자가 가공·브랜드<br>A2 저지 헤이밀크<br><span class="fbs">가격 결정자</span></div>
 </div>
 {bullets([
   "핵심 : 원유를 팔지 않고 <b>제품·브랜드로 부가가치를 목장 안에 내재화</b>",
   "포지셔닝 : “<b>국내 1호 젖소 동물복지·저탄소 인증목장의 원유</b>”라는 신뢰 자산",
   "채널 : 자사몰 + 프리미엄 유통(백화점) 동시 전개",
 ])}'''+foot(9)))

# 10 섹션4
SLIDES.append(slide('<div class="sec"><div class="secn">04</div><h2>운영 시스템</h2><div class="secl"></div><p>Soil to Soul · 유전 · 사양 · 환경 · 동물복지</p></div>',"section"))

# 11 순환 Soil to Soul
SLIDES.append(slide(head("Soil to Soul · 순환 운영","건강한 흙에서 시작하는 순환낙농 체계")+f'''
 <div class="cyc">
   <div class="cn">건강한 흙</div><div class="ca">→</div>
   <div class="cn">건강한 풀</div><div class="ca">→</div>
   <div class="cn">행복한 소<br>(저지·동물복지)</div><div class="ca">→</div>
   <div class="cn gold">좋은 우유<br>(A2·고형분)</div><div class="ca">→</div>
   <div class="cn">퇴비<br>(Healing Compost)</div><div class="ca back">↺</div>
 </div>
 {bullets([
   "D2O 베딩(부식 깔짚, HBP) → <b>악취저감·동물복지·부숙 촉진</b>, 저탄소 인증과 연계",
   "우분+베딩 → <b>Healing Compost</b> → 초지·사료로 환원하는 자원순환",
   "환경관리는 기능·성능 중심으로 표준화(현장 실증 병행)",
 ])}'''+foot(11)))

# 12 유전/사양
SLIDES.append(slide(head("Genetics & Feeding · 유전·사양","순종 저지 유지·개량과 건초(Hay) 기반 사양")+f'''
 <div class="two">
   <div class="callout"><div class="cot">유전·번식</div>{bullets([
     "<b>A2A2 유전자 선발</b> 및 순종 저지 개량",
     "유전체·수정란 기술(Genetics 18년, 연 ~3,000건 이식)",
     "저지 유전기반 확대를 위한 번식 관리",
   ])}</div>
   <div class="callout gold"><div class="cot">사양·사료</div>{bullets([
     "<b>건초(Hay) 기반 급이</b> → ‘헤이밀크’ 브랜드의 근거",
     "저지 특성(고형분·소식성)에 맞춘 사양 설계",
     "반추 건강·유성분 안정 관리",
   ])}</div>
 </div>
 <div class="note">※ 이식 건수·수태율 등은 Genetics 전체 실적 기준. 목장별 성과는 사양·환경에 따라 변동.</div>'''+foot(12)))

# 13 원유품질
SLIDES.append(slide(head("Milk Quality · 원유 품질","저지 원유의 프리미엄 성분 (공인 분석 기준)")+f'''
 <div class="two">
   <table class="cmp"><tr><th>영양성분 (우유 100 mL당)</th><th>함량</th><th>1일기준치</th></tr>
   <tr><td>열량</td><td>69.3 kcal</td><td>—</td></tr>
   <tr><td>지방</td><td class="hi">4.5 g</td><td>8 %</td></tr>
   <tr><td>단백질</td><td class="hi">3.5 g</td><td>6 %</td></tr>
   <tr><td>칼슘</td><td class="hi">113 mg</td><td>16 %</td></tr>
   <tr><td>당류</td><td>3.3 g</td><td>3 %</td></tr>
   <tr><td>나트륨</td><td>33 mg</td><td>2 %</td></tr>
   </table>
   <div class="callout"><div class="cot">품질 포인트</div>{bullets([
     "<b>칼슘 1일기준치 16%</b> — 프리미엄 소구 강점",
     "<b>A2 저지 원유</b> · 진한 풍미·바디감",
     "요거트(생균) <b>유산균 1 mL당 7.2억 CFU</b> — 고생균 발효유",
   ])}<div class="cotb">동물복지·저탄소·HACCP 인증으로 품질 신뢰 확보</div></div>
 </div>
 <div class="note">※ 공인 분석성적서 기준(계절·비유단계에 따라 유성분 변동). 라벨 표기는 규정 반올림·허용오차 적용.</div>'''+foot(13)))

# 14 6차산업
SLIDES.append(slide(head("6th Industry · 6차산업","원유 → 프리미엄 가공·브랜드·유통으로 확장")+f'''
 <div class="prods">
   <div class="pr">A2 저지<br>헤이밀크</div>
   <div class="pr">플레인<br>요거트(생균)</div>
   <div class="pr">그릭요거트</div>
   <div class="pr">카이막</div>
   <div class="pr">밀크티</div>
 </div>
 {bullets([
   "온라인 자사몰 <b>shop.a2jerseymilk.com</b> + 정기구독 모델",
   "프리미엄 유통 <b>갤러리아백화점 입점</b> 추진(표시사항·품질 규정 정합화 완료 단계)",
   "표시·품질 관리 : 영양성분 규정서식·유산균수·무지유고형분·인증 표기 준수",
   "향후 : 낙농 카페 · 팜투어 · 체험 프로그램으로 6차산업 심화",
 ])}'''+foot(14)))

# 15 섹션5 성과·과제
SLIDES.append(slide('<div class="sec"><div class="secn">05</div><h2>성과와 과제</h2><div class="secl"></div><p>저지 전용목장 모델의 강점과 도전</p></div>',"section"))

# 16 강점/과제
SLIDES.append(slide(head("SWOT · 강점과 과제","")+f'''
 <div class="two">
   <div class="callout"><div class="cot">강점 (Strength)</div>{bullets([
     "고형분·A2·고칼슘 → <b>가공 수율·프리미엄</b> 동시 확보",
     "동물복지+저탄소+HACCP <b>3중 인증 신뢰</b>",
     "수직통합으로 <b>부가가치 내재화</b>",
     "순환농업으로 <b>환경·ESG 스토리</b>",
   ])}</div>
   <div class="callout gold"><div class="cot">과제 (Challenge)</div>{bullets([
     "국산 <b>저지 유전기반·두수 확보</b>",
     "<b>계절별 유성분 변동</b> 관리",
     "초기 <b>가공·브랜드 투자</b>와 판로",
     "표준 운영모델·인력 육성 필요",
   ])}</div>
 </div>
 <div class="note">※ 경영 성과 수치는 목장별 편차가 커 본 발표에서는 정성적 시사점 중심으로 제시(구체 수치는 추정·파일럿 기준).</div>'''+foot(16)))

# 17 섹션6 정책
SLIDES.append(slide('<div class="sec"><div class="secn">06</div><h2>정책 제언 · 확장 모델</h2><div class="secl"></div><p>저지 전용목장의 확산을 위한 제언</p></div>',"section"))

# 18 정책제언
SLIDES.append(slide(head("Policy · 정책 제언","저지 전용목장 육성을 위한 제언")+bullets([
 "① <b>국산 저지 유전자원·전용목장 육성 기반</b> 조성(유전체·수정란 지원, 시범목장)",
 "② <b>저탄소·동물복지 인증과 프리미엄 낙농</b>을 연계한 인센티브·판로 지원",
 "③ <b>6차산업(가공·브랜드·관광)</b>과 결합한 저지 낙농 표준 운영모델 보급",
 "④ <b>정밀축산(CowTalk·Eco-BIT) 데이터</b> 결합으로 유성분·번식·탄소 관리 고도화",
 "⑤ 축산과학원·지자체·현장 <b>공동 실증</b>으로 확산 근거 축적",
])+foot(18)))

# 19 확장모델
SLIDES.append(slide(head("Scale-up · 확장 모델","송영신목장 사례 → 표준화·디지털 결합 확산")+f'''
 <div class="flow3">
   <div class="fb hi"><div class="fbn">사례</div>송영신목장<br>저지 전용·6차</div>
   <div class="far">➜</div>
   <div class="fb"><div class="fbn">표준화</div>운영모델·SOP<br>인증·품질 체계</div>
   <div class="far">➜</div>
   <div class="fb gold"><div class="fbn">확산</div>지역 저지 목장<br>+ 정밀축산 데이터</div>
 </div>
 {bullets([
   "저지 전용목장 <b>표준 운영매뉴얼</b>(유전·사양·환경·가공·표시) 정립",
   "정밀축산 플랫폼과 결합해 <b>유성분·번식·탄소</b>를 데이터로 관리",
   "축산과학원과의 협력으로 <b>과학적 근거·현장 확산</b> 가속",
 ])}'''+foot(19)))

# 20 마무리
SLIDES.append(slide(f'''
 <div class="cov end">
   <div class="covtag">THANK YOU</div>
   <h1>감사합니다</h1>
   <div class="covsub">저지 전용목장 = 프리미엄 · 저탄소 · 순환 · 6차산업의 결합 모델</div>
   <div class="covline"></div>
   <div class="covmeta">송영신목장 · A2 저지 헤이밀크 &nbsp;|&nbsp; shop.a2jerseymilk.com<br>
   발표 : 하현제 &nbsp;|&nbsp; Q &amp; A</div>
 </div>''',"cover"))

CSS='''
@page{ size:13.333in 7.5in; margin:0; }
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:"Noto Sans CJK KR","NanumGothic",sans-serif;color:#17211c;}
.slide{width:13.333in;height:7.5in;position:relative;overflow:hidden;background:#f6f3ea;page-break-after:always;}
.slide:last-child{page-break-after:auto;}
/* header */
.hd{background:#06432f;color:#fff;padding:34px 56px 22px;}
.kick{font-size:15px;letter-spacing:.22em;color:#d8b877;font-weight:700;text-transform:uppercase;}
.hd h2{font-size:36px;margin-top:6px;font-weight:800;letter-spacing:-.01em;}
/* footer */
.ft{position:absolute;left:56px;right:56px;bottom:26px;display:flex;justify-content:space-between;
 font-size:13px;color:#728177;border-top:1.5px solid #d8cdb5;padding-top:10px;}
.pg{font-weight:800;color:#06432f;}
/* bullets */
.bl{list-style:none;margin:30px 56px;}
.bl li{position:relative;padding:11px 0 11px 34px;font-size:22px;line-height:1.45;border-bottom:1px solid #e6dfce;}
.bl li:before{content:"";position:absolute;left:4px;top:20px;width:12px;height:12px;background:#c79a4c;transform:rotate(45deg);}
.bl li b{color:#06432f;}
/* cover */
.cover{background:linear-gradient(135deg,#06432f 0%,#0b5a3f 60%,#0d3f2d 100%);color:#fff;}
.cov{padding:110px 90px;height:100%;display:flex;flex-direction:column;justify-content:center;}
.cov.end{align-items:flex-start;}
.covtag{font-size:16px;letter-spacing:.3em;color:#e2c07f;font-weight:700;}
.cov h1{font-size:74px;line-height:1.08;font-weight:900;margin:20px 0 14px;letter-spacing:-.02em;}
.covsub{font-size:24px;color:#e8eee9;font-weight:500;}
.covline{width:120px;height:6px;background:#c79a4c;margin:34px 0;}
.covmeta{font-size:18px;color:#cfe0d6;line-height:1.7;}
/* section divider */
.section{background:#06432f;color:#fff;}
.sec{padding:0 90px;height:100%;display:flex;flex-direction:column;justify-content:center;}
.secn{font-size:30px;color:#d8b877;font-weight:800;letter-spacing:.1em;}
.sec h2{font-size:60px;font-weight:900;margin:8px 0;letter-spacing:-.02em;}
.secl{width:110px;height:6px;background:#c79a4c;margin:18px 0 20px;}
.sec p{font-size:24px;color:#cfe0d6;}
/* toc */
.toc{margin:26px 56px;display:grid;grid-template-columns:1fr 1fr;gap:14px 40px;}
.tc{display:flex;gap:16px;align-items:flex-start;padding:12px 0;border-bottom:1px solid #e6dfce;font-size:19px;}
.tn{font-size:26px;font-weight:900;color:#c79a4c;min-width:44px;}
.tc b{color:#06432f;font-size:21px;}
/* two-col */
.two{display:grid;grid-template-columns:1fr 1fr;gap:34px;margin:26px 56px;align-items:start;}
.two .bl{margin:0;} .two .bl li{font-size:19px;padding:8px 0 8px 30px;}
.two .bl li:before{top:16px;width:10px;height:10px;}
/* tables */
table.cmp{width:100%;border-collapse:collapse;font-size:18px;}
table.cmp th{background:#06432f;color:#fff;padding:10px 12px;text-align:left;}
table.cmp td{padding:9px 12px;border-bottom:1px solid #e0d8c4;}
table.cmp td.hi{color:#0b5a3f;font-weight:800;background:#eef5ee;}
.note{margin:14px 56px 0;font-size:14px;color:#7a8a80;font-style:italic;}
.two+.note{margin-top:12px;}
/* callout */
.callout{background:#fff;border:2px solid #06432f;border-radius:14px;padding:22px 24px;font-size:19px;line-height:1.5;}
.callout.gold{border-color:#c79a4c;}
.cot{font-size:16px;font-weight:800;color:#c79a4c;letter-spacing:.05em;margin-bottom:10px;text-transform:uppercase;}
.callout.gold .cot{color:#06432f;}
.cotb{margin-top:12px;padding-top:12px;border-top:1px dashed #cbb98f;font-weight:700;color:#06432f;}
.callout .bl{margin:0;} .callout .bl li{border-bottom:none;padding:5px 0 5px 26px;font-size:18px;}
.callout .bl li:before{top:13px;width:9px;height:9px;}
/* cards */
.cards{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.cd{background:#fff;border-radius:12px;padding:16px 18px;font-size:16px;border-left:6px solid #06432f;}
.cd.gold{border-left-color:#c79a4c;background:#fbf5e8;}
.cdh{font-weight:800;color:#06432f;font-size:17px;margin-bottom:6px;}
/* flow */
.flow3{display:flex;align-items:center;justify-content:center;gap:16px;margin:34px 56px 18px;}
.fb{background:#fff;border:2px solid #06432f;border-radius:14px;padding:22px 20px;text-align:center;font-size:20px;flex:1;line-height:1.35;}
.fb.hi{background:#06432f;color:#fff;} .fb.gold{background:#c79a4c;color:#231a06;border-color:#c79a4c;}
.fbn{font-size:14px;font-weight:800;letter-spacing:.05em;margin-bottom:8px;opacity:.75;text-transform:uppercase;}
.fbs{display:block;margin-top:8px;font-size:14px;opacity:.8;}
.far{font-size:34px;color:#c79a4c;font-weight:900;}
/* cycle */
.cyc{display:flex;align-items:center;justify-content:center;gap:10px;margin:40px 40px 18px;flex-wrap:nowrap;}
.cn{background:#fff;border:2px solid #0b5a3f;border-radius:50%;width:120px;height:120px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:15px;font-weight:700;color:#06432f;line-height:1.25;padding:8px;}
.cn.gold{background:#c79a4c;color:#231a06;border-color:#c79a4c;}
.ca{font-size:26px;color:#c79a4c;font-weight:900;} .ca.back{color:#0b5a3f;}
/* products */
.prods{display:flex;gap:14px;margin:30px 56px 6px;}
.pr{flex:1;background:#06432f;color:#fff;border-radius:12px;padding:26px 12px;text-align:center;font-size:19px;font-weight:700;line-height:1.3;}
.pr:nth-child(2){background:#0b5a3f;} .pr:nth-child(4){background:#0b5a3f;}
'''
HTML='<!doctype html><html><head><meta charset="utf-8"><style>'+CSS+'</style></head><body>'+"".join(SLIDES)+'</body></html>'
hp=os.path.join(OUT,"저지전용목장_송영신목장_발표.html")
pp=os.path.join(OUT,"저지전용목장_송영신목장_발표.pdf")
open(hp,"w",encoding="utf-8").write(HTML)
subprocess.run([CHROME,"--headless","--no-sandbox","--disable-gpu","--no-pdf-header-footer",
 "--run-all-compositor-stages-before-draw","--virtual-time-budget=5000",f"--print-to-pdf={pp}",f"file://{hp}"],check=True,stderr=subprocess.DEVNULL)
print("PDF",os.path.getsize(pp),"slides",len(SLIDES))
