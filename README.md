# 🍳 에그 인 헬스(Egg In Health) 🏃‍♂️

삼성 청년 소프트웨어 아카데미 11기 공통 프로젝트

## 📚 목차

- [🗓️ 프로젝트 개요](#️-프로젝트-개요)
  - [진행 기간](#진행-기간)
  - [팀 구성](#팀-구성)
- [📢 서비스 소개](#-서비스-소개)
- [🥳 서비스 설계](#-서비스-설계)
  - [기술 스택](#기술-스택)
  - [ERD](#erd)
  - [Wireframe](#wireframe)
  - [Architecture](#architecture)
  - [Docs](#docs)
- [🤗 기능 소개](#-기능-소개)
- [😆 느낀점](#-느낀점)

## 🗓️ 프로젝트 개요

### 진행 기간

- 2024.07.08 ~ 2024.08.16 (6주)

### 팀 구성

[📎 Team Notion](https://ineedalotofmoney.notion.site/C203-6dbc0c5e594a40d78479b5f3715dcb52)
| 강동형 | 고충원 | 신재건 | 김정민 | 이지영 | 김민주 |
| :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :-------------------------------------------------------------: | :-------------------------------------------------------------: |
| ![강동형](https://avatars.githubusercontent.com/u/156388917?v=4) | ![고충원](https://avatars.githubusercontent.com/u/156388848?v=4) | ![신재건](https://avatars.githubusercontent.com/u/156388688?v=4) | ![김정민](https://avatars.githubusercontent.com/u/101504594?v=4) | ![이지영](https://avatars.githubusercontent.com/u/46306166?v=4) | ![김민주](https://avatars.githubusercontent.com/u/69795199?v=4) |
| PM, FE | FE | FE | BE, CI/CD | BE | BE, AI |

## 📢 서비스 소개

에그 인 헬스는 연결된 **헬스 트레이너와 회원에게 건강 및 일정의 맞춤형 관리를 지원하는 플랫폼**입니다.  
 회원들은 식단 관리와 운동 일정 관리를 효율적으로 할 수 있으며, 1대1 채팅과 WebRTC 기반 영상 통화를 통해 트레이너로부터 실시간 자세 코칭을 받을 수 있습니다. 또한, 계란 수집을 통한 동기부여 시스템으로 운동 목표 달성을 재미있고 성취감 있게 이어갈 수 있습니다.  
개인 SNS로 회원의 식단, 운동, 일정을 관리하던 기존 PT 서비스의 단점을 개선하여 트레이너들에게 하나의 통합 회원 관리 플랫폼을 제공합니다.<br/><br/>
[📎 서비스 소개 UCC](https://youtu.be/y7M6HSjPhTU)

## 🥳 서비스 설계

### 기술 스택

|               | Front                                   | Back                                     | AI                       |
| ------------- | --------------------------------------- | ---------------------------------------- | ------------------------ |
| **Language**  | JavaScript(ES6+), TypeScript            | Java17                                   | Python 3.12.3            |
| **IDE**       | Visual Studio Code                      | IntelliJ                                 | PyCharm                  |
| **Framework** | React, Vite                             | Spring Boot, Spring security, Spring JPA | Flask                    |
| **Library**   | zustand, styled-components, tailwindcss |                                          | Numpy, OpenCV, Mediapipe |

| DB           |  WebRTC  |              CI/CD              |        Tools         |
| :----------- | :------: | :-----------------------------: | :------------------: |
| MySQL, Redis | OpenVidu | AWS EC2, Docker, Caddy, Jenkins | GitLab, Jira, Notion |

### ERD

![ERD](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpRuOS%2FbtsI4Qf5cpV%2FigW45hpTpeETzZ6JTL9Fp0%2Fimg.png)

### Wireframe

[📎 Figma Link](https://www.figma.com/design/OUzltIEeqeKcKJdzqfLrU6/C203?node-id=288-20349&t=KBVhyv5V09vPi9jU-1)

![화면설계](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fkx0Cj%2FbtsI40bD622%2FHyEjH6EBC56yKtk93i6jeK%2Fimg.png)

### Architecture

![아키텍쳐 구성도](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCv5gT%2FbtsI5XFfrIT%2FKmqMOBCaKoEpCDKWb7yg60%2Fimg.png)

### Docs

[📎 API](https://ineedalotofmoney.notion.site/API-008c364cb07640b493ec7c6b6dafbc9e?pvs=4)  
[📎 기능 정의서](https://docs.google.com/spreadsheets/d/1JtF4Gig-YhRW3avezcZxjCviVLu-jb7BoQ3qwzn09Cc/edit?gid=521413906#gid=521413906)

## 🤗 기능 소개

### 로그인

OAuth로 네이버 간편 로그인을 지원합니다. 최초 로그인 시 트레이너/회원을 선택할 수 있고, 회원인 경우 설문조사를 진행합니다.<br/><br/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb7a7G8%2FbtsI6iWMCWe%2FTrqSJlDKIpyEFGykuKFEBK%2Fimg.png" width="200"/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F03yEr%2FbtsI5UhyQPn%2FuFvPRsw06QgJXW8WtazGjK%2Fimg.png" width="200"/><br/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdWjvKJ%2FbtsI4Yrsv2h%2Fp9ls671PwFUrGAGBtkq2j1%2Fimg.png" width="200"/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcU1dPZ%2FbtsI5iiX0Iu%2FrvhqCNzafSTVTa3r6CX6p0%2Fimg.png" width="200"/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnVYxA%2FbtsI4ZKFoZk%2FSZIEaf6oeo7NWcNThPmv80%2Fimg.png" width="200"/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxzyYD%2FbtsI6wmZwkB%2FlnES0lyHwgDLdjze6k12NK%2Fimg.png" width="200"/>

### 회원과 트레이너 연동

인증코드 입력을 통해서 회원과 트레이너를 연결합니다. QR 코드로 간편하게 인증할 수 있습니다.<br/><br/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPG8bj%2FbtsI42HqpZy%2FxsokDTUu573q3bFkkXJrU1%2Fimg.png" width="200"/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbiAXGm%2FbtsI5VgvdRk%2FyfGRXvMNgkkXTEpcRxCAz1%2Fimg.png" width="200"/>

### 일정 관리

회원과 트레이너의 PT 일정을 관리합니다. 트레이너는 회원의 일정을 등록하여 회원이 다음 일정을 확인할 수 있도록 합니다. PT 시간이 지나면 자동으로 횟수가 차감됩니다.<br/><br/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F9IrfT%2FbtsI4vXmNfL%2FnlF0fO8hLiSuUdJk3n4ek1%2Fimg.png" width="200"/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFlsRh%2FbtsI5iXAeHc%2F7GUwT9dPbkH1YzskZmE1SK%2Fimg.png" width="200"/>

### 회원 관리

전체 리스트에서 식단 등록, 운동 인증, WebRTC 요청을 확인할 수 있습니다.<br/><br/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc0zJzj%2FbtsI5YK2ftX%2FsaE2r5ajSdWicjLNupv2dk%2Fimg.png" width="200"/>

### 식단 관리

회원은 그 날의 식단 사진을 업로드하여 식단을 관리합니다. 트레이너는 해당 식단에 피드백을 남길 수 있습니다.<br/><br/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJQKKw%2FbtsI4qPCXGd%2FweFXphsOwothyVOCvSwf3K%2Fimg.png" width="200"/>

### 운동 관리

트레이너는 운동 종목과 횟수로 운동 처방을 내릴 수 있습니다. 회원은 사진으로 운동 했음을 인증합니다.<br/><br/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FoYpRS%2FbtsI4alRRdU%2FmJgNTnfXIV2Gljt7sN9X0K%2Fimg.png" width="200"/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbiZcen%2FbtsI6BaJClf%2F76ir2qBQksheKVCqU52kG1%2Fimg.png" width="200"/>

### 검사지 기록

인바디 검사지를 기록합니다. OCR로 검사지를 인식하여 간편하게 등록할 수 있습니다.<br/><br/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbR8Qx8%2FbtsI5CVNLXp%2FPoamegHUiiirXzk9HlIU30%2Fimg.png" width="200"/>

### 동영상 피드백

운동 영상을 업로드하여 운동 이력을 기록합니다. 트레이너는 해당 영상에 피드백을 남길 수 있습니다. 일부 자세의 경우 MediaPipe를 사용하여 동영상에 자세 피드백 정보가 남습니다.<br/><br/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fd41FCZ%2FbtsI4n6n539%2FbgtytiIRzgTKMaNTF4D8j1%2Fimg.png" width="200"/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fd41FCZ%2FbtsI4n6n539%2FbgtytiIRzgTKMaNTF4D8j1%2Fimg.png" width="200"/>

### 채팅 및 WebRTC 트레이너 피드백

회원과 트레이너의 1:1 채팅을 지원합니다. 트레이너와 회원은 영상통화를 통해서도 소통할 수 있습니다.<br/><br/>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fpp7RX%2FbtsI4OioCRz%2FkJDU4U3coJKN5FpmMmJ0HK%2Fimg.png" width="200"/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTxuJC%2FbtsI5O9thUQ%2F5dnJJKcPItzi47hqYiCvU0%2Fimg.png" width="200"/>

## 😆 느낀점

<table>
  <tr>
    <th rowspan="3">Front</th>
    <td>강동형</td>
    <td>
    지금껏 여러 팀장 역할을 도맡아 해왔지만, 6인 규모의 제대로된 프로젝트 팀장은 처음 맡아서 해보게 되었습니다. 그런만큼 지금까지와의 경험과는 다르게 새로운 경험들을 많이 할 수 있었습니다. 그 중 가장 큰 점은 팀장은 어디까지나 팀원들을 대표하여 공식적인 자료 제출 등을 하는 사람에 지나지 않고, 필요한 때에는 팀장의 역할 일부를 다른 사람에게 주기도 하는 상당한 유연성을 요구하는 직책다고 느낀 점이었습니다. 이 외에 프로젝트가 최종 목표를 향하게 할 수 있도록 지표에서 벗어나지 않게 가이드하고, 중간 목표를 제시하고 스케줄 관리를 해주는 등의 역할이 도드라지게 중요하다고 느꼈습니다.
<br/><br/>
비단 팀장의 역할 뿐 아니라 React, Git, Tailwind, Zustand 와 같은 프로그래밍에 대한 지식적인 부분을 상당히 습득할 수 있었습니다. 특히 Git은 매일매일 사용해도 어려운 부분이었는데, 백앤드 담당 팀원들이 친절하게 브랜치 분할과 커밋 메세지 컨벤션 등을 용이하게 작성해준 덕분에 Git의 새로운 기능들을 많이 배울 수 있는 기회를 가졌습니다.<br/>
Tailwind 관련해서는 처음 쓸때는 이해가 되지 않아서 어려웠는데, 쓰다보니 확실히 편리한 점이 많았습니다. 그만큼 테일윈드의 가독성 문제가 대두되었는데, 다음 프로젝트에서는 그런 가독성 문제를 해결하면서 css 코드를 작성해 보고 싶습니다.<br/>
더불어 React의 상태 관리 및 useEffect 등의 훅을 사용하며, React 문법에 대한 이해도를 좀 더 높일 수 있었습니다. 리액트의 문법 자체는 완벽하게 이해했지만 아직 hook에 대한 공부가 많이 부족하다고 느꼈습니다. 다음 프로젝트에서 좀 더 완벽하게 코드를 작성하고 싶습니다.
<br/><br/>
프로젝트를 처음 진행할때와 지금의 코딩 숙련도가 상당히 다르다고 생각합니다. 원래 다른 사람의 코드 구조를 보는 것부터 상당히 어려웠는데, Git에서 머지 할때 반드시 다른 사람에게 코드 리뷰를 받는 구조를 만들어서, 그 부분이 많은 도움이 되었습니다. 앞으로 프로젝트를 진행할때, 어떤 부분이 얼마나 중요한지를 단편적으로나마 알게된 소중한 경험이 된 것 같습니다. 다음 프로젝트때는 더 좋은 코드를 작성하고 싶다는 마음만이 가득차게 되고 자신감이 많이 생겼습니다. 코드 구성이 중간에 막히기도 하고, 되던 부분이 안되기도 하는 등의 여러 문제가 있었지만, 유능한 팀원들과 함께해서 용이하게 헤쳐나갈 수 있었던 것 같습니다. 
    </td>
  </tr>
  <tr>
    <td>고충원</td>
    <td>
          이번 프로젝트를 진행하면서 정말 많은 것을 배웠습니다. <br/>비전공자로서 개발을 시작한 것도 쉽지 않았는데, 처음으로 팀원들과 협업하고, 리액트로 웹 애플리케이션을 만드는 과정은 저에게 큰 도전이었습니다.<br/>
      사실, 처음 팀 프로젝트를 진행한다고 했을 때, 걱정이 많았습니다. <br/>이전에 Vue로 2명이라는 인원으로 작은 프로젝트를 해본 적은 있지만, 리액트는 처음이었기 때문에 부담이 컸습니다. <br/>거기에 여러명의 팀원들과의 협업까지 더해지니 더욱 복잡하고 어려운 부분이 많았습니다. <br/>그 과정에서 협업과 커뮤니케이션의 중요성을 깊이 깨닫게 되었습니다. <br/>의견을 조율하고, 각자의 코드를 이해하면서 하나의 결과물로 만들어가는 과정이 쉽지 않았습니다.
      리액트를 처음 접하면서 컴포넌트 구조나 상태 관리와 같은 개념이 생소하고 어려웠습니다. <br/>특히 상태를 어떻게 효율적으로 관리할지, 부모 컴포넌트에서 자식 컴포넌트로 데이터를 어떻게 전달할지에 대해 고민하면서 시간을 많이 할애하게 되었습니다. <br/>하지만 시간이 지남에 따라 리액트가 얼마나 강력한 도구인지 이해하게 되었고, 컴포넌트를 재사용하면서 복잡한 기능을 구현해 나갈 때 큰 보람을 느꼈습니다.<br/>
      6주라는 짧은 기간 동안 팀과 함께 프로젝트를 진행하면서 단순히 개발하는 것 이상으로 많은 것을 배우게 되었습니다. 코드를 작성하는 것도 중요하지만, 협업의 중요성, 효율적인 커뮤니케이션, 그리고 서로의 의견을 존중하면서도 더 나은 방향을 찾아가는 과정에서 정말 많은 것을 배웠습니다.<br/>
      이번 경험을 통해, 비전공자라는 점이 더 이상 두렵지 않게 되었습니다.<br/> 여전히 배워야 할 것도 많고 부족한 점도 있지만, 계속해서 도전하고 성장할 수 있다는 자신감을 얻게 되었습니다. <br/>이번 프로젝트는 앞으로 개발자로서 성장해 나가는 데 큰 밑거름이 될 것 같습니다. 
    </td>
  </tr>
    <tr>
    <td>
     신재건
    </td>
    <td>
    이번 프로젝트를 통해 협업의 본질을 깊이 이해하게 되었습니다. 이전 프로젝트와는 달리, 백엔드 3명과 프론트 3명이 분업하여 진행하였기에 프로젝트 진행이 수월했습니다. 아이디어 구상부터 개발까지 6명이 함께 모여 작업하니, 분업 덕분에 업무 부담이 줄어들고 효율적으로 진행할 수 있었습니다.<br/><br/>저는 실력적으로 부족한 점이 많았고, 컨디션이 좋지 않아 실수도 많았지만, 팀원들이 격려해주고 옆에서 도와준 덕분에 큰 힘이 되었습니다. 제가 맡은 부분을 해결해준 팀원들에게 미안하면서도 고마움이 많이 남습니다.<br/><br/>프로젝트 때마다 매번 새로운 팀원들과 진행해야해서 팀원들과의 관계에 대한 걱정이 있었지만, 이번에는 좋은 팀원들과 함께 편안한 분위기에서 작업할 수 있어 매우 좋았습니다. 기술적으로는 많은 것을 얻지 못한 것 같지만, 리액트를 익히며 프로젝트를 진행할 수 있었던 것은 큰 수확이었습니다. 앞으로의 프로젝트에서도 이 기술을 잘 활용할 수 있을 것 같습니다
    </td>
  </tr>

  <tr>
    <th rowspan="3">Back</th>
    <td>이지영</td>
    <td>
    팀원들과 다함께 프로젝트를 진행하며 다양한 의견을 나눌 수 있어서 너무 즐거운 시간이였습니다. 새로운기술을 하나씩 적용해가는게 쉽진않았지만 팀원들 덕분에 가능했던것 같습니다!
    </td>

  </tr>
  <tr>
    <td>김정민</td>
    <td>
    항상 어려워 하던 인프라 역할을 맡았습니다. 많이 배웠고 더 열심히 해야겠다는 생각이 들었습니다. 
    </td>
  </tr>

  <tr>
    <td>김민주</td>
    <td>
     6주간 프로젝트를 진행하면서 느낀 점이 많습니다. 지금까지는 로컬에서만 돌아가는 서비스를 개발해왔었는데, 이제 배포하는 서비스를 개발해보니 보안, 요청, 성능 등 고려해야할 사항이 생각보다 더 많았습니다. Java와 Spring은 하면 할수록 어렵고, 계속해서 공부해도 새로운 지식이 계속해서 나오는 것 같습니다. 그만큼 부족한 점이 많다고 생각하고, 더 깊게 공부해보고 싶어졌습니다. 또한 Flask를 도입하면서 새로운 툴과 언어에 빠르게 적응해야하는 점이 어려웠지만 새로운 언어의 컨벤션과 다른 언어와의 차이점을 공부하면서 개발자로서 큰 성장을 했다고 생각합니다. 이번 프로젝트에서 개발 기간내에 기능 구현을 우선시하느라 하지 못했던 성능 개선과 테스트 코드 작성을 꼭 해봐야겠다고 다짐했습니다.<br/><br/>이번 프로젝트를 통해 얻은 가장 큰 경험은 협업이었습니다. 열정적으로 소통하고 아이디어와 피드백을 나누는 팀원 분들 덕분에 즐겁게 프로젝트를 진행할 수 있었습니다. 6인의 생각은 모두 다르고, 이를 맞춰나가는 과정에서 협업용 툴의 사용과 문서화의 중요성, 함께하는 개발에 대해서 배울 수 있었습니다. 코드리뷰 문화와 코드 컨벤션을 도입해서 코드 품질을 높이고자 노력했습니다. 다행히도 팀원분들 모두 열정적으로 참여해주셔서 프로젝트의 코드 일관성과 품질이 높아졌다고 생각합니다.<br/><br/>아직 미숙한 개발자이지만 팀원 분들과 함께하며 많은 성장을 했습니다. 항상 저의 질문과 피드백에 정성스러운 답변을 주셔서 감사합니다. 언젠가 좋은 기회로 또 함께했으면 좋겠습니다!🥰
    </td>
  </tr>
</table>
