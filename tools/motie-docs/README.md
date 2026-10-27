# 산자부 과제 문서 생성 도구 (RS-2026-25508014, ㈜디투오)

| 스크립트 | 산출물 |
|---|---|
| `note.py` | **연구노트 최종본** `deliverables/2026_산자부_연구노트_D2O_현장점검제출본.docx` → `_최종본.docx/.pdf` |
| `master.py` | 마스터 연구노트 No.2 (내부 작업용) |
| `meeting.py` | 외부 전문가 자문회의 운영계획 |
| `dlib.py` | 공통 서식(맑은 고딕, 수동 목차, 표, 서명란) |
| `pmap.py` | PDF에서 제목별 쪽번호 추출(수동 목차 갱신용) |

재생성 절차 (수동 목차 2패스):
```bash
cd tools/motie-docs
python3 note.py "$(cat note_pages.json)"
cd ../../deliverables && soffice --headless --convert-to pdf 2026_산자부_연구노트_D2O_현장점검제출본.docx
cd ../tools/motie-docs && python3 pmap.py ../../deliverables/2026_산자부_연구노트_D2O_현장점검제출본.pdf > note_pages.json
# 쪽번호가 바뀌었으면 한 번 더 note.py → PDF 변환
cp 결과 → deliverables/2026_산자부_연구노트_D2O_최종본.{docx,pdf}, preview/motie-research-note-final.pdf
```
규칙: 작성자 메타데이터 = 농업회사법인 주식회사 디투오 / 하현제, 도구·AI 흔적 금지, Word 자동목차 금지(수동 목차).
