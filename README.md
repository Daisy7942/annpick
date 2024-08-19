# AnnPick
> 취향을 기반으로 애니메이션을 추천해 드립니다.
<br />

## 프로젝트 개요

### 1. 프로젝트 주제

- 애니메이션 취향을 기반으로 추천해 주는 서비스

### 2. 메인/서브 기능

```markdown
1. Recommend MVP : 추천 기능
2. Search MVP: 키워드로 검색
3. User MVP: 로그인, 회원가입, 회원정보 수정, 회원 탈퇴
```

### 3. 프로젝트 팀원

| 이름   | 역할          |
| ------ | ------------- |
| 김서정 | 팀장 / 기획    |
| 최윤석 | 기획    |
| 김수현 | 풀스택    |
| 정혜주 | 풀스택 |

---

## 프로젝트 진행 규칙

### 1. 데일리 스크럼
- **open**: 10시 30분 - 스프린트 후 각자 할 일 notion에 적기
- **close**: 4시 30분 - 작업 진행도, 이유

## 개발 규칙
### 1. 코드 컨벤션
- 텍스트 작성 기본 설정: VSCode Prettier Extension 사용

#### Front-end
- 변수, 함수 camelCase 사용, Class는 PascalCase 사용
- 상수는 Snack Case 활용해 대문자와 `_`를 사용

#### Back-end
- 변수, 함수 Snack Case 사용, Class는 PascalCase 사용
- 파일 구조는 MVC 패턴 따름
- 문자열에선 기본적으로 `""`를 씀 (특수한 경우 제외)

### 2. Branch 전략(GitFlow)

- **main**: 제품으로 출시되는 브랜치
- **develop**: 개발 브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들을 merge
- **feature**: 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 merge
- **release**: 배포를 위해 main 브랜치로 보내기 전 먼저 QA(품질검사)를 하기 위한 브랜치
- **hotfix**: main 브랜치로 배포를 했는데 버그가 생겼을 때 긴급 수정하는 브랜치

<details>
<summary>GitFlow 과정</summary>
- master 브랜치에서 develop 브랜치를 분기합니다.<br />
- 개발자들은 develop 브랜치에 자유롭게 커밋을 합니다.<br />
- 기능 구현이 있는 경우 develop 브랜치에서 feature-* 브랜치를 분기합니다.<br />
- 배포를 준비하기 위해 develop 브랜치에서 release-* 브랜치를 분기합니다.<br />
- 테스트를 진행하면서 발생하는 버그 수정은 release-* 브랜치에 직접 반영합니다.<br />
- 테스트가 완료되면 release 브랜치를 master와 develop에 merge합니다.
</details>

### 3. 커밋 메시지

- `type(타입): title(제목)`
- 제목 첫글자는 대문자로(EN)
- 제목 끝에 마침표 등 특수문자 X
- 제목은 명령문으로 사용, 과거형 X
- `type`은 아래 명시된 형태로

| Type 키워드 | 사용 시점 |
| ----------- | --------- |
| **feat**    | 새로운 기능 추가 |
| **fix**     | 버그 수정 |
| **docs**    | 문서 수정 |
| **style**   | 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등) 기능 수정이 없는 경우 |
| **design**  | 사용자 UI 디자인 변경 (CSS 등) |
| **test**    | 테스트 코드, 리팩토링 테스트 코드 추가 |
| **refactor**| 코드 리팩토링 |
| **build**   | 빌드 파일 수정 |
| **perf**    | 성능 개선 |
| **chore**   | 빌드 업무 수정, 패키지 매니저 수정 (gitignore 수정 등) |
| **rename**  | 파일 혹은 폴더명을 수정만 한 경우 |
| **remove**  | 파일을 삭제만 한 경우 |
