# 더 편한 링크 옮기기 - URL to WORD

## 🚀 Deploy 

[![Netlify Status](https://api.netlify.com/api/v1/badges/6fd24744-c87d-44cb-b835-6bd82ad5ef0e/deploy-status)](https://app.netlify.com/sites/url-to-word/deploys)
## ⚠문제
발표할 때 구글 PPT를 학교 컴퓨터에 옮기려면 내 구글 아이디로 검색해서 들어가야 되어서 시간이 많이 걸려 부끄러웠던 경험이 있다.   
보안상으로도 내 계정을 다른 컴퓨터에서 로그인하기 싫다. 공유 링크를 외우고 있으면 되는데 길어서 외우기 어렵다.

![image](https://user-images.githubusercontent.com/43921054/104095935-f6184300-52dc-11eb-9475-14ee27b3a0d8.png)

#### 공용컴퓨터에서 구글 슬라이드 발표할 때 링크를 열어야 하는데, 구글 로그인을 하기 귀찮고, 보안상 불안하다.
_____________
## 💭생각해보기
![image](https://user-images.githubusercontent.com/43921054/104095989-3bd50b80-52dd-11eb-986a-1817efb17899.png)

#### 이 문제를 해결하기 위해서 URL을 외우기 편한 형태로 바꾸면 어떨까? 복잡한 URL을 우리가 알만한 쉬운 단어로 바꿀 수는 없을까?
____________
## 📝사용법
![image](https://user-images.githubusercontent.com/43921054/104096090-bd2c9e00-52dd-11eb-9ba5-559750a85919.png)
#### 내 컴퓨터에서 구글에 URL to WORD 검색해서 홈페이지에 들어간다.

![image](https://user-images.githubusercontent.com/43921054/104096104-d0d80480-52dd-11eb-9037-543160594c28.png)
#### 내 컴퓨터에서 변환하고싶은 링크를 검색창에 입력 -> 안녕 12로 변환

![image](https://user-images.githubusercontent.com/43921054/104096128-fc5aef00-52dd-11eb-84e0-25cc3f206211.png)
#### 공용 컴퓨터에서 구글에 URL to WORD 검색해서 홈페이지에 들어간다.

![image](https://user-images.githubusercontent.com/43921054/104096141-0aa90b00-52de-11eb-88d4-9097c3d1e8c8.png)
#### 공용컴퓨터에서 안녕12를 홈페이지 검색 창에 입력 -> 긴 링크로 변환
__________
## 📰 웹사이트 기능
주요기능 : 복잡하고 긴 URL을 외울 수 있는 단어로 변형해준다.

원리: 웹사이트 URL을 외우기 쉬운 단어 +  두자리 번호로 변환한다.

변환 후에 단어+두자리번호를 입력하면, 저장해두었던 원래 URL을 얻을 수 있다.
 
#### 크게 두가지로 나뉜다
1. URL을 입력 -> 단어 + 두자리 숫자로 변환 ex)  www.naver.com -> 나무12   
2. 단어 + 두자리 숫자를 입력 -> 대응되는 URL로 변환 ex) 나무12 -> www.naver.com

## 👨🏻‍💻 추가 요구사항
- 저장한 링크는 (단어+두자리숫자) 24시간 보관 후 삭제 
- 링크 조회가 안될 경우에는 결과 없음이라 출력 (예외처리)
- 사이트 배포, 검색엔진 최적화
