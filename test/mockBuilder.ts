import fastify, {FastifyInstance} from "fastify";
import {healthCheck, heathCheckRoute} from "@test/healthChecker";
// import fastifyPlugin from 'fastify-plugin';
// import tap from 'tap';
// export type Test = typeof tap['Test']['prototype'];

// Automatically build and tear down own instance.
export function build(opts = {}) : FastifyInstance {

    const mockServer = fastify({
        logger: false
    });
    mockServer.register(heathCheckRoute);
    // Ready called when all plugins have been loaded
    // mockServer.ready();

    mockServer.get('/books', async (req, rep)=>{
        return {hello: 'world'}
    });



    return mockServer;
}


