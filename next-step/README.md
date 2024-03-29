# Node HTTP 웹 서버 구현

프레임워크를 사용하지 않고 Node 환경에서 HTTP 웹 서버를 구현한다.

## 요구사항 0 - 개발환경 구성

### 요청과 응답

시작에 앞서 요청을 보내는 클라이언트와 요청에 응답하는 서버의 관계를 이해해야 한다. 클라이언트는 요청(Request)을 보내고 서버는 요청을 처리하고 응답(Response) 하는 관계를 가진다.
예를들어 웹 프로그래밍에서 브라우저는 서버에게 로그인을 요청한다. 서버는 요청을 처리하고 클라이언트에게 사용자 정보를 응답한다.
이때 서로 소통하기 위해 HTTP(Hyper Text Transfer Protocol)를 사용한다.

> 현실로 비유하자면 음식 주문과 같다. 음식을 요청하는 고객과 음식을 응답하는 점원, 돈은 HTTP와 같은 역할을 한다.

#### ts-node-dev VS nodemon

수정한 파일의 결과를 반영하기 위해서는 서버를 재동작 해야한다. (기본동작) 하지만 `ts-node-dev` 또는 `nodemon` 을 사용하면 서버의 변화를 감시하고 재시작한다.

### 스트림, 프로세스

### 필수 패키지

```shell
npx tsc --init
yarn init
mkdir src && touch src/app.ts
yarn add typescript ts-node-dev @types/node -D # 개발 종속성으로 설치
```

### 테스트 환경 구성

모두 개발 의존성으로 설치한다

* jest: 테스트 프레임워크
* ts-jest: 타입스크립트로 작성된 프로젝트를 테스트할 수 있게 지원하는 전처리기
* supertest: API 테스트에 유용
* @types/jest
* @types/supertest

```shell
yarn add jest ts-jest supertest @types/jest @types/supertest -D
```

```text
서버구현: app.ts
서버실행: main.ts
```

## 요구사항 1 - `index.html` 응답하기

파일 모듈을 사용해서 `views` 파일에 정의된 `index.html` 파일을 확인

### 리팩터링

코드를 간결하고 응답 처리를 명확하게 사용한다.

```typescript
// 기존 방법
// res.statusCode = 200;
// res.setHeader('Content-Type', 'text/plain');

res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
```

## [요구사항 2 - GET 방식으로 회원가입하기]()

> 1. 회원가입 메뉴를 클릭하면 `/user/form.html`으로 이동해서 회원가입
> 2. 요청값을 서버에 전달, 입력한 값을 저장

REST API(Representational State Transfer) 만들기

> REST API: 주소를 정하는 규칙

* GET: 서버의 자원을 조회, 가져올 때 사용

## 요구사항 3 - POST 방식으로 회원가입하기

> form 태그 메서드를 `GET`에서 `POST`로 수정한 후 회원가입

* POST: 서버에 자원을 등록하고자 할 때 사용(예: 회원 가입)

# ETC

기본적으로 알고 있으면 유용한 정보

## 패키지 설치

![img.png](posts/images/typescript-module.png)
![img.png](posts/images/img.png)

```shell
yarn add winston
yarn add express @types/express -D
```

타입스크립트로 프로젝트를 진행할 때 주의사항이 있다. 사용하려는 패키지가 `TS` 표시가 되어 있다면 한 번의 설치로 끝난다. 하지만 만약 `DT` 표시라면 따로 타입 설치를 진행해야 한다.

## 로깅(Logging)

로그는 애플리케이션의 작동 상태를 기록하는데 필수적인 도구다. 로그를 통해 소프트웨어 진입점을 추적하고, 예상치 못한 에러를 식벽할 수 있다.

### 운영환경

> `console.log`는 휘발성이다. 로그는 파일에 기록해두는 것이 좋다.

`console.log`는 기본적인 디버깅 용도로 유용하지만, 실무에서 성능, 유연성, 분석 및 모니터링이 필요하기 때문에 전문 로그 라이브러리를 사용한다.
대표적인 Node.js 라이브러리 `Winston`에 대해 알아보자.

### 실제 사용하기

> src/config: 환경 애플리케이션 설정을 관리 데이터베이스 연결 정보, API 등 정의

```shell
yarn add winston winston-daily-rotate-file
```

> 개발 의존성으로 설치하지 않는다.

winston: 로그 라이브러리
winston-daily-rotate-file: 날짜 별로 로그 관리

개발 서버는 디버그로 운영 서버는 `info`로 설정, 배포할 때 설정 변경 가능 개발 서버는 디버그, 운영서버는 `info`로 바꿔서 배포 가능

* 로그의 심각도는 다음과 같다. `info`를 설정한 경우, info 보다 심각한 단계 로그도 같이 기록된다.
* 로그 포맷은 기본적으로 JSON으로 기록되지만 시간을 표시하려면 `timestamp`를 사용하는 것이 좋다.
* `transports`는 로그 저장방식을 의미한다.
    * `new transports.File`은 파일로 저장, `new transports.Console`은 콘솔에 출력한다.

```js
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
```

> helmet, hpp로 보안 관리하기