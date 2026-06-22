import fitz
OUT="/home/user/Dr-Ha--agent/deliverables/embryo-export-international-regulatory-basis.pdf"
doc=fitz.open(); page=doc.new_page(width=595,height=842)
GREEN=(0.11,0.31,0.19); DARK=(0.13,0.13,0.13); GRAY=(0.38,0.38,0.38); LINE=(0.72,0.80,0.74)
KF="korea-s"; M=46; W=595-2*M; y=44

def blk(text,size,color,gap,lead=1.32,x=M,w=W,align=0):
    global y
    r=fitz.Rect(x,y,x+w,824)
    left=page.insert_textbox(r,text,fontname=KF,fontsize=size,color=color,align=align,lineheight=lead)
    used=(r.height-left) if left>=0 else r.height
    y=r.y0+used+gap
def rule(g=3):
    global y
    y+=g; page.draw_line(fitz.Point(M,y),fitz.Point(M+W,y),color=LINE,width=0.8); y+=g+3

# Header band
page.draw_rect(fitz.Rect(0,0,595,7),color=None,fill=GREEN)
blk("소(가축) 수정란 수출 — 국제규정 근거자료", 16, GREEN, 1)
blk("Regulatory Basis for International Trade in Bovine Embryos  ·  Reference Sheet", 9.5, GRAY, 6)
rule()
blk("본 자료는 한국산 소 수정란(홀스타인 젖소 등)의 해외 수출 시 수입국 정부(농업부·검역당국) 심사에 인용·제출할 수 있는 "
    "국제 동물위생 규정 근거를 정리한 것이다. 특정 국가에 한정되지 않고 모든 수입국에 공통 적용된다.", 9.3, DARK, 2)
blk("This sheet sets out the international animal-health basis applicable to exports of Korean bovine embryos "
    "(e.g., Holstein dairy) to any importing country, for reference and submission to the importing authority.", 8.6, GRAY, 7)

blk("A.  상위 국제협정 (법적 근거) / Governing international agreement", 11, GREEN, 3)
blk("• WTO 「위생 및 식물위생 조치의 적용에 관한 협정(SPS 협정)」 제3조 및 부속서 A 제3항(a) — "
    "동물위생 분야 국제표준 설정기관으로 WOAH(구 OIE)를 공식 지정.", 9.3, DARK, 1)
blk("• WTO SPS Agreement, Article 3 & Annex A (para 3): designates WOAH (formerly OIE) as the reference "
    "standard-setting body for animal-health measures affecting trade in animals and animal products.", 8.6, GRAY, 7)

blk("B.  적용 기술기준 / Applicable standard — WOAH 「육상동물위생규약」(Terrestrial Animal Health Code)", 11, GREEN, 3)
blk("• 제4.8장  체내(생체)수정란 채취·가공 / Collection and processing of in vivo derived embryos from livestock and equids", 9.0, DARK, 1)
blk("• 제4.9장  체외생산수정란(IVF) 채취·가공 / Collection and processing of in vitro produced embryos from livestock", 9.0, DARK, 1)
blk("• 제4.10장 수정란 미세조작(성감별 관련) / Micromanipulation of in vivo derived and in vitro produced embryos", 9.0, DARK, 1)
blk("• 질병별 장의 '소 수정란 수입 권고(Recommendations for importation of bovine embryos)' 조문 병행 적용 — "
    "예: 구제역 8.8장, 럼피스킨병 11.9장, 소해면상뇌증(BSE) 11.4장 등.", 9.0, DARK, 1)
blk("• IETS(국제수정란기술학회) Manual: 체내수정란(소) = Category 1(위험 무시 가능) → 수정란 이식은 질병전파 위험이 매우 낮은 방법.", 9.0, DARK, 7)

blk("C.  유의사항 / Notes", 11, GREEN, 3)
blk("• WOAH는 구 OIE(국제수역사무국). 구 규약의 'Appendix(부속서)'는 현행 'Chapter(장)'에 대응(예: 구 Appendix 3.3.4 → 현 제4.8장).", 9.0, DARK, 1)
blk("• CITES(멸종위기종 국제거래협약)의 Appendix는 야생·멸종위기종용 — 가축인 홀스타인 젖소 수정란에는 적용되지 않음.", 9.0, DARK, 1)
blk("• 실제 통관 근거는 위 규약 자체가 아니라, 수출국 검역당국(한국 APQA) ↔ 수입국이 합의한 양자 「수출검역증명서"
    "(Veterinary Health Certificate)」이며, 위 WOAH 조문은 그 기술적 토대이다.", 9.0, DARK, 1)
blk("• 장 번호는 규약 '판(edition)'에 따라 변동될 수 있으므로, 인용 전 woah.org 현행판 + 영문 제목 병기로 최종 확인 권장.", 9.0, DARK, 7)

rule()
blk("결론 / Bottom line:  수정란을 WOAH 규약(제4.8/4.9/4.10장)대로 채취·가공하고, 수입국이 요구하는 질병별 수입조건을 충족하여 "
    "양자 수출검역증명서를 발급받으면 국제 교역에 문제가 없다. (규약 준수 = 교역의 기술적 전제, 최종 조건은 수입국 검역요건)", 9.3, GREEN, 6)

blk("발행/Issuer: Genetics Co., Ltd. (Republic of Korea)  ·  작성지원: D2O Agent System  ·  작성일 2026-06-22\n"
    "출처/Sources: WOAH Terrestrial Animal Health Code (current ed.); WTO SPS Agreement (Art.3, Annex A).  "
    "본 자료는 참고용이며 인용 시 최신판 원문 확인 요망.", 7.6, GRAY, 0)

page.draw_rect(fitz.Rect(0,835,595,842),color=None,fill=GREEN)
doc.save(OUT); print("saved", OUT, "| content bottom y=", round(y,1))
# render preview
pix=doc[0].get_pixmap(matrix=fitz.Matrix(2,2)); pix.save("/tmp/pdf_preview.png"); print("preview ok")
