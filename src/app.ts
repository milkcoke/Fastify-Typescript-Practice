import fastify from "fastify";
import {userRoute} from './routes/user';

const fastifyServer = fastify({
    logger: true
});

fastifyServer.addSchema({
    $id: 'user',
    type: 'object',
    properties: {
        id: {type: 'number'},
        name: {type: 'string'},
        email: {type: 'string'},
        registerDate: {type: 'string'}
    }
});


// 핵심 기능.
// 이 방법 외에는 라우트와 플러그인을 추가할 수 없음.
fastifyServer.register(userRoute);

/*
Fastify 에서 무적권 'register' 를 통해서만 외부 Library, Plugin 을 추가하게 한 것은
Asynchronous 하게 동작하는 노드의 기본 철학을 지키면서, 다른 외부 종속 모듈의 '순서'를 지키게 하기 위해서다.
register 순서대로 로드된다.
ex) 웹 서버가 동작하기 전에 DB에 연결을 선결조건으로
=> register(DB Connection) => listen

express 나 다른 프레임워크에선 복잡한 콜백이나 promise 로 로직을 끼워맞출 필요가 있었다.
 */

// default listening ip : localhost => 0.0.0.0 (All), IPv6 0.0.0.0::0
fastifyServer.listen(5000 ,'127.0.0.1', (err, address)=>{
    if (err) {
        throw err;
    } else {
        console.log(`fastify server is listening on ${address}`);
    }
})