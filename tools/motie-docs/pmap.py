import subprocess,sys,json
f=sys.argv[1]
n=int([l for l in subprocess.run(['pdfinfo',f],capture_output=True,text=True).stdout.splitlines() if l.startswith('Pages')][0].split()[-1])
keys={"s1": "1. 연구노트 작성·관리 기준", "s2": "2. 과제 개요 및 디투오 역할", "s3": "3. 실증지 우사 개요", "s4": "4. 표준 작업 절차", "s5": "5. 제1부 기술 기초 조사", "b1": "[조사 1]", "b2": "[조사 2]", "b3": "[조사 3]", "b4": "[조사 4]", "b5": "[조사 5]", "b6": "[조사 6]", "b7": "[조사 7]", "s6": "6. 제2부 실증 활동 기록", "r1": "[기록 1]", "r2": "[기록 2]", "r3": "[기록 3]", "r4": "[기록 4]", "r5": "[기록 5]", "r6": "[기록 6]", "r7": "[기록 7]", "s7": "7. 제3부 수기 기록지", "fa": "기록지 A. 일일"}
res={}
for p in range(2,n+1):
  t=subprocess.run(['pdftotext','-f',str(p),'-l',str(p),f,'-'],capture_output=True,text=True).stdout
  lines=[l.replace(' ','') for l in t.splitlines()]
  for k,v in keys.items():
    v2=v.replace(' ','')
    if k not in res and any(l.startswith(v2) and '....' not in l for l in lines): res[k]=str(p)
print(json.dumps(res,ensure_ascii=False))
