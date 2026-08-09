# 브랜드 소개서 PDF

- `송영신목장_A2저지헤이밀크_브랜드소개서_2026-08.pdf` — 갤러리아 제출용 (A4 5p)
- `brand-intro-source.html` — 조판 원본. 내용 수정 후 아래 명령으로 재생성

```bash
chromium --headless --no-pdf-header-footer \
  --print-to-pdf=out.pdf brand-intro-source.html
```

폰트: Noto Sans CJK KR (`apt-get install fonts-noto-cjk`)
브랜드 컬러: 3425C #00694E · 4254C #C8A063 (라벨 도안 기준)

내용은 `../03-상품-및-브랜드-소개서.md`와 동일합니다.
소개서 내용을 고칠 때는 **마크다운과 HTML을 함께** 수정하십시오.
