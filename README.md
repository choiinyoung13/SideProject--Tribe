# 🪴 식물 거래 플랫폼 프로젝트 - 트리비

 식물 판매 및 구매가능과 원하는 식물에 대한 정보을 유저들끼리 공유할 수 있는 커뮤니티 기능을 제공하는 플랫폼

## 🧩기획 배경

- 최근 많은 사람들이 정신적인 안정과 힐링을 찾으려는 경향이 증가하고 있으며, 이러한 추세는 다양한 시장에서 나타나고 있습니다.
- 그중에서도 특히 코로나 이후 한국의 식물 거래 시장이 지속적으로 성장하고 있다는 점을 주목 했습니다.
- 그러나 식물을 구매하고, 관리하며, 교환할 수 있는 효율적인 플랫폼은 여전히 부족한 상황이기에 무신사처럼 쉽게 판매 및 구매가 가능하며 커뮤니티 기능까지 제공하는 식물 거래 플랫폼을 기획하게 되었습니다.

## 🎈해결 컨셉
- 사용자들이 식물을 쉽게 구매하고 판매할 수 있는 직관적인 플랫폼을 제공합니다.
- 사용자 간의 소통과 정보 공유를 활성화하고, 식물 관리 팁이나 경험을 공유할 수 있는 커뮤니티 공간을 제공합니다.
- 식물의 종류별 관리 방법을 제공하는 가이드와 알림 기능을 통해 사용자들이 더 쉽게 식물을 관리할 수 있도록 지원합니다.

## 🗝기대 효과
- 커뮤니티 기능을 통해 식물 애호가들이 서로 정보를 공유하고 교류할 수 있어 식물 관리에 대한 노하우가 축적되고 확산됩니다. 이를 통해 사용자들은 더 많은 지식을 얻고, 다양한 식물에 도전하거나 문제를 해결하는 데 도움을 받을 수 있습니다.
- 식물 관리 가이드와 알림 기능으로 사용자들의 식물 관리 부담을 줄여주어, 식물 구매 후의 만족도와 유지율을 높일 수 있습니다.


## 🛠기술 스펙

- **회원가입 / 로그인**
    - **회원가입**: 아이디, 이메일과 비밀번호를 사용하여 계정을 생성하며, 이메일 인증을 통해 계정 활성화
    - **로그인**: 아이디, 비밀번호로 로그인 가능하며, 카카오, 네이버, 구글을 통한 소셜 로그인이 가능.
    - **아이디/비밀번호 찾기**: 이메일을 통해 아이디를 찾을 수 있으며 비밀번호의 경우 회원가입 시 작성한 이메일로 임시 비밀번호 발송 로그인 이후 비밀번호 수정.
    - **회원 정보 관리**: 사용자 정보 조회 및 수정 가능. 회원 탈퇴 기능 제공.
- **채팅**
    - **판매자와 소통**: 구매자는 판매자에게 상품에 대한 질문이나 보충 설명이 필요한 경우 채팅을 통해 소통.
    - **경매 종료 후 채팅방**: 경매 종료 후(낙찰시) 구매자와 판매자 간 상품 수령 방법 논의를 위한 채팅방이 자동 생성.
- **경매**
    - **경매 참여**: 모든 회원은 경매를 생성하고 참여할 수 있음.
    - **경매 관리**: 상세페이지에서 실시간 경매 기록을 확인 가능하며, 진행중인 경매는 수정 및 삭제가 불가.
    - **즉시 구매 기능**: 모든 경매는 즉시 구매가를 초과한 입찰이 불가능하며, 즉시 구매 시 경매가 종료.
    - **낙찰 및 알림**: 경매 종료 시 최고 입찰가의 구매자에게 낙찰되며, 판매자와 낙찰자에게 종료 알림이 발송.
        - 구매자의 구매 확정 시 거래 종료
        - 구매 확정은 일주일동안 유효하며 그 이후는 물건을 수령했다고 판단하여 자동 구매 확정 진행
    - **판매자 경매 등록**: 판매자는 상품 등록 시 상품 이름, 사진, 설명, 시작가, 즉시 구매가, 경매 기간, 수령 방법(만남 가능 여부와 지역 기재, 택배 가능 여부 및 착불/선불 선택)을 설정.
    - **입찰**: 구매자는 현재 입찰가보다 높은 금액으로 입찰할 수 있으며, 최소 입찰가 단위는 1,000원.
        
        - 입찰 시 포인트를 사용하며, 보유 포인트 이상의 금액으로 입찰할 수 없음.
        - 입찰 시 다른 경매에서 최고 입찰자로 존재하는 경우 현재 보유 포인트에서 최고 입찰가 금액만큼 제외하고 사용 가능
        
    - **포인트 관리**: 경매 종료 시 입찰자의 포인트가 소모되며, 구매자가 구매 확정 시 판매자에게 포인트가 지급.
- **Q&A 게시판**
    - **사용자 문의 및 답변**: 사용자들이 경매나 거래 관련 질문을 할 수 있는 공간을 제공하며, 게시물 작성 및 답글 기능을 통해 원활한 소통을 지원.
- **결제 / 포인트**
    - **포인트 충전 및 사용**: 입찰 전 포인트를 충전하여 사용하며, 포인트 100원당 현금 100원으로 충전.
    - 카카오페이 API를 사용하여 결제 시스템을 구현.


## 아키텍처

![image](https://github.com/user-attachments/assets/dbf4aa63-2a41-47e7-958a-785cfb67d585)

## 사용 기술

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)<br>
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)<br>
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
<img src="https://img.shields.io/badge/typescript-239DAD?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/recoli-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
<img src="https://img.shields.io/badge/tanskquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)



## ERD

![중고 물품 경매 서비스 ERD.png](https://github.com/user-attachments/assets/cb11f9dd-bdf7-4668-86aa-ad0358329e24)
