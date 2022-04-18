import {build} from "@test/mockBuilder";


// https://zentered.co/articles/setup-async-fastify-with-jest-test/
// Instead of calling fastify.listen() straight away,
// we should wait for the build, then initiate the server

async function start() {
    const server = build();

    try {
        const res = await server.listen(4000);
        console.log('server start with string : ', res);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err);
        }
    }
}

start();