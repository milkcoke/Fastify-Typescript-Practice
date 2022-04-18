

# Testing
Fastify 로 Mock 테스팅하려면 다음 패키지가 필요하다.
- jest
- ts-jest, typescript
- (optional) pino-pretty
- (optional) tap

그리고 `inject()` 를 Mock Request 로 넣으면 된다.
> `inject()` 덕분에 `server.listen()` 같은 코드없이 테스트를 할 수 있다. \
별도의 서버를 띄우지 않아도 된다.

### Fastify inject() 란?
Fake HTTP request\
=> [axios](https://github.com/axios/axios) 와 비슷한 형식으로 request configuration 을 통해 mock test 를 용이하게한다.

## How to Configure application & test code
### 1. 앱 서버 빌더 정의

#### appBuilder.ts
```typescript
import fastify, {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify'

export function build() : FastifyInstance {
    const app = fastify({
        logger: false
    });

    app.get('/test', async (req: FastifyRequest, rep: FastifyReply) => {
        return {test: true}
    });
    
    return app;
}
```

### 2. 테스트 코드에 빌더 포함

```typescript
import {build} from './appBuilder'
import {FastifyInstance} from "fastify";
import {expect} from "@jest/globals";

describe('Should response code 200 test builder', () => {
    let app: FastifyInstance;
    beforeAll(() => {
        app = build();
    });

    afterAll(() => {
        app.close();
    });

    test('builder test', async () => {
        // ✅ 마법의 메소드 `inject`  를 사용해서 test 가능하다. (리스너를 달 필요가 없다)
        const resonse = await app.inject({
                            method: 'GET',
                            url: '/test'
                        });
        expect(response.statusCode).toStrictEqual(200); // ✅ true
        expect(JSON.parse(response.payload).test).toBeTruthy() // ✅ true
    })
})
```

---

## Reference
- [Fastify Testing Guide docs](https://www.fastify.io/docs/latest/Guides/Testing/)
