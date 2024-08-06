# react-deploy

### 질문 1. SPA 페이지를 정적 배포를 하려고 할 때 Vercel을 사용하지 않고 한다면 어떻게 할 수 있을까요?

#### 1. GitHub Pages

- GitHub Pages란 깃허브에서 제공하는 정적 웹 호스팅 서비스이다.
- 깃허브 레포지토리의 gh-pages 브랜치에 정적 파일을 배포할 수 있다.

#### 2. Netlify

- Netlify는 무료로 정적 사이트 호스팅을 제공한다.
- 빌드와 배포를 자동으로 처리할 수 있다.
- GitHub, GitLab, Bitbucket과 통합하여 배포를 자동화할 수 있다.

#### 3. Amazon S3

- Amazon S3란 Amazon Web Services(AWS)에서 제공하는 객체 스토리지 서비스로, 정적 웹사이트 호스팅이 가능하다.
- S3에 파일을 업로드하고 CloudFront를 사용하여 CDN 기능을 추가할 수 있다.

### 질문 2. CSRF나 XSS 공격을 막는 방법은 무엇일까요?

#### CSRF 공격이란?

- 사용자가 인증된 상태에서 웹 애플리케이션에 의도하지 않은 요청을 전송하도록 하는 공격이다.

#### CSRF 공격 방지 방법

- CSRF Token 사용: 서버는 클라이언트에 고유한 CSRF 토큰을 제공하고, 클라이언트는 이 토큰을 요청에 포함시킨다. 서버에서는 요청을 받을 때 이 토큰을 검증하여 유효한 요청인지 확인합니다.
- SameSite 쿠키 속성 설정: SameSite 쿠키 속성을 Strict 또는 Lax로 설정하여, 쿠키가 다른 사이트에서 전송되는 것을 방지한다.
- Referer 헤더 검증: 요청의 Referer 헤더를 확인하여, 요청이 올바른 출처에서 왔는지 검증한다.

#### XSS 공격이란?

- 공격자가 악성 스크립트를 웹페이지에 삽입해 해당 페이지를 방문하는 다른 사용자에게 스크립트를 실행하도록 하는 공격이다.
- 주로 웹 애플리케이션에서 사용자 입력을 적절히 처리하지 않을 때 발생한다.

#### XSS 공격 방지 방법

- 입력 검증 및 인코딩: 사용자 입력을 철저히 검증하고, HTML 인코딩 또는 URL 인코딩을 사용하여 악의적인 스크립트가 실행되지 않도록 한다.
- Content Security Policy (CSP): CSP 헤더를 설정하여 웹 페이지에서 허용된 스크립트 출처를 제한한다.
- HTTPOnly 및 Secure 플래그 설정: 쿠키에 HTTPOnly 플래그를 설정하여 JavaScript에서 접근할 수 없도록 하고, Secure 플래그를 설정하여 HTTPS 연결에서만 쿠키를 전송하도록 한다.

### 질문 3. 브라우저 렌더링 원리에 대해 설명해주세요.

- HTML 파싱: 브라우저는 HTML 문서를 받아들여 DOM(Document Object Model) 트리를 구성한다. DOM 트리는 문서의 구조를 표현하며, 각 HTML 태그는 DOM의 노드로 변환된다.
- CSS 파싱: CSS 파일은 CSSOM(CSS Object Model) 트리로 변환된다.
- Render Tree 생성: DOM과 CSSOM이 결합되어 Render Tree를 형성한다. Render Tree는 페이지의 시각적 구성 요소를 포함하며, 각 노드는 화면에 어떻게 표시될지를 나타낸다.
- Layout (Reflow): Render Tree를 기반으로 각 요소의 정확한 위치와 크기를 계산한다. 이 과정은 레이아웃을 설정하며, 모든 요소의 위치와 크기가 결정된다.
- Painting: Layout 단계 후, 브라우저는 각 요소를 화면에 그린다. 이 단계에서 색상, 배경, 그림자 등을 포함하여 실제 픽셀로 렌더링된다.
- Composite: 브라우저는 모든 레이어를 결합하여 최종적으로 화면에 표시한다. 이 단계에서 스크롤, 애니메이션 등과 같은 최종 렌더링 작업이 처리된다.
- JavaScript 실행: 브라우저는 JavaScript를 실행하여 DOM과 CSSOM을 수정하거나, 사용자 인터페이스를 동적으로 업데이트한다.
- 위 과정이 비동기적으로 수행되며, 브라우저는 성능 최적화를 위해 렌더링을 효율적으로 처리한다.

## 포인트 기능 API 명세

GET `/api/points` - 포인트 조회 (헤더로 유저 토큰 받음)

```
Response
{
  "userId": 1,
  "points": 1000
}
```

POST `/api/points/charge` - 포인트 충전

```
Request
{
  "userId": 1,
  "points": 500
}
```

```
Response
{
  "userId": 1,
  "points": 1500 (해당 유저 보유 포인트)
}
```

POST `/api/orders` - 주문하기에서 할인받는 경우

```
Request
{
 "OptionId": 0,
 "quantity": 0,
 "message": "string"
 "usePoint": true
}
```

```
Response (포인트 사용 시)
{
  "id": 0,
  "OptionId": 0,
  "quantity": 0,
  "orderDateTime": "2024-07-30T04:47:41.707Z",
  "message": "string"
  "totalPrice": 0 (포인트 할인 적용 된 후 가격)
  "pointUsed": 0 (사용한 포인트)
  "remainPoint": 0 (사용하고 남은 포인트)
}
```
