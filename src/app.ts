import fastify from "fastify";
import axios from "axios";
import {createWriteStream} from "fs";
import path from "path";
import fastifySwagger from "@fastify/swagger";
import fastifyTypeorm from "fastify-typeorm-plugin";
import {usersRoute} from './controllers/users/user';
import {bookRoute} from './controllers/books/book';
import {bookSchema, swaggerOptions, userSchema} from "@docs/swagger";
import {dataSource} from "@db/typeORMDataSource";
import {Readable} from "stream";
import {pipeline} from "stream/promises"


const fastifyServer = fastify({
    logger: false
});
//@ts-ignore
fastifyServer.register(fastifyTypeorm, {connection: dataSource});
fastifyServer.addSchema(userSchema);
fastifyServer.addSchema(bookSchema);
fastifyServer.register(fastifySwagger, swaggerOptions);

// 핵심 기능.
// 이 방법 외에는 라우트와 플러그인을 추가할 수 없음.
// fastifyServer.register(userRoute);
fastifyServer.register(usersRoute);
fastifyServer.register(bookRoute);
/*
Fastify 에서 무적권 'register' 를 통해서만 외부 Library, Plugin 을 추가하게 한 것은
Asynchronous 하게 동작하는 노드의 기본 철학을 지키면서, 다른 외부 종속 모듈의 '순서'를 지키게 하기 위해서다.
register 순서대로 로드된다.
ex) 웹 서버가 동작하기 전에 DB에 연결을 선결조건으로
=> register(DB Connection) => listen

express 나 다른 프레임워크에선 복잡한 콜백이나 promise 로 로직을 끼워맞출 필요가 있었다.
 */

// default listening ip : localhost => 0.0.0.0 (All), IPv6 0.0.0.0::0
fastifyServer.listen({
    port: Number(5000),
    host: 'localhost'
}, (err, address)=>{
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.log(`Server is listening at : ${address}`);
    }
});

fastifyServer.ready()
    .then(async ()=>{
        return await axios({
            method: 'GET',
            baseURL: 'http://localhost:5000',
            url: '/documentation/yaml',
            responseType: 'stream'
        })
        .then(async ({data}: Readable)=>{
            await pipeline(data, createWriteStream(path.join(__dirname, '..', 'docs/OAI.yaml')))
            // fs.writeFileSync(path.join(__dirname, '..', 'docs/OAI.yaml'), data, {encoding : 'utf8'});
            console.log('Document.yaml file created!')
        })
        .catch(console.error);
    })