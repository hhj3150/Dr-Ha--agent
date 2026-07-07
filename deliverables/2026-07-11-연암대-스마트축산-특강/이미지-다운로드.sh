#!/usr/bin/env bash
# 연암대 특강 슬라이드용 사진 15장 다운로드 스크립트
# 사용법: 인터넷이 되는 컴퓨터(회장님 노트북 등)에서 이 폴더로 이동 후 실행
#   bash 이미지-다운로드.sh
# 완료되면 images/ 폴더에 사진이 저장되고, 슬라이드.html이 오프라인에서도 동작합니다.
set -e
cd "$(dirname "$0")"
mkdir -p images
BASE="https://d8j0ntlcm91z4.cloudfront.net/user_3ElYiAWu98e8A0tSSuzytjpuMFT"

dl () { echo "  → $2"; curl -fsSL "$BASE/$1" -o "images/$2"; }

echo "사진 다운로드 시작..."
dl "hf_20260707_051603_9ef4497b-957e-4fd5-830d-9b4cf9275eaf.png" "img01-title.png"
dl "hf_20260707_051638_c07c4402-8fcb-49df-bde4-1d74a649b554.png" "img02-cow-eye.png"
dl "hf_20260707_051640_e1690655-9b28-4722-823b-6ac3a42fb886.png" "img03-farmer-elderly.png"
dl "hf_20260707_051713_4b9e4fd2-ce0f-4dd9-b82e-2de10c8def13.png" "img15-night-illness.png"
dl "hf_20260707_051644_78d24ba7-331d-434f-900f-c48ba65df77f.png" "img05-sensor.png"
dl "hf_20260707_051649_6f40eabf-2ed8-4bca-bf34-57c32acec96a.png" "img06-barn.png"
dl "hf_20260707_051653_4ef00c69-7357-4b71-a5b0-75694f4481eb.png" "img07-smartphone.png"
dl "hf_20260707_051654_dff831d8-7e16-4631-94b3-6d51ffcbcb96.png" "img08-control-room.png"
dl "hf_20260707_051654_dff831d8-7e16-4631-94b3-6d51ffcbcb96.png" "img09-control-wall.png"
dl "hf_20260707_051657_c1e52741-ce5e-46b9-a136-7075c461b581.png" "img10-milk.png"
dl "hf_20260707_051702_680013f8-b5cc-4979-a723-5e57784f040f.png" "img11-soil.png"
dl "hf_20260707_051704_b1138eed-6405-4e35-9d1d-05803202f4da.png" "img12-uzbek.png"
dl "hf_20260707_051707_b271f625-2c2a-4c3e-b609-f26d8f8c6d97.png" "img13-lab.png"
dl "hf_20260707_051709_acebdb59-5c2f-45d8-b0dd-fd622e80d782.png" "img14-newgen.png"
dl "hf_20260707_051711_9fed08af-cb06-49cb-9662-84fe74634004.png" "img16-closing.png"
echo "완료! images/ 폴더를 확인하세요. 이제 슬라이드.html을 여시면 됩니다."
