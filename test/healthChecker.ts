import {FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify";
import {FastifyPlugin} from "fastify";

const healthCheck: FastifyPluginAsync = async (fastify: FastifyInstance) : Promise<void> => {
    fastify.get('/healthCheck', async (request: FastifyRequest, reply: FastifyReply)=>{
        return {healthCheck: true};
    });
}
async function route(fastify: FastifyInstance) {
    fastify.get('/healthCheck', async (request: FastifyRequest, reply: FastifyReply)=>{
        return {healthCheck: true};
    });
}

export {
    healthCheck,
    route as heathCheckRoute
}