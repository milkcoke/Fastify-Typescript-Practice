# Fastify-Practice

## Introduction
express 대비 약 3배의 throughput 을 자랑하는 프레임워크

## Pros
#### async API 지원
ES7 이후 모든 API 문법 지원, 외부 모듈 필요 ❌

#### 플러그인 라우팅 등 종속성 추가
보통의 비동기 매커니즘을 갖는 API 들은 복잡한 콜백함수나 프로미스 기법을 연계해서 짜야하는데 그런거 없이 \
**`fastipy.register()` 한 순서대로 import 됨.** (express의 `app.use()` 와 비슷한 맥락)


#### Data validation
스키마 기반의 validation, Throughput 향상의 원인. \
기본적으로 **JSON Schema** 를 정의한다.

### Schema?
#### Shared Schema
Fastify 전역에 걸쳐 사용 가능.\
`$ref` 키워드로 정의 및 사용

- body \
body of request [POST, PUT, PATCH]
- querystring or query
- params \
route parameters
- headers \
request headers

## Cons
- **Typescript 를 완벽하게 지원하지 않음.** 
  - **JSON Schema 타입지정 문제** \
Typescript interface 로 변환해주는 [json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript) 등을 써야함. \
  순수 디버깅용도인데 별도의 작업이 한번 더 들어가는 것은 귀찮은 일. \
  interface 생성없이 코드를 사용하고 싶다면 [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) \
  그러나 이때도 `as const` 등의 키워드를 반드시 붙여야함.

---
## 🔗 Reference
- [Fastify official document](https://www.fastify.io/docs/latest/Guides/Getting-Started/)
- [Fastify Twitter Example (Best practice) Repository](https://github.com/fastify/fastify-example-twitter/blob/master/user/schemas.js)
