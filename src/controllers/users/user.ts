import {
    FastifyRequest,
    FastifyReply,
    FastifyInstance
} from "fastify";
import users100 from '../../../dummy/users100.json';
import {
    getAllUserSchema,
    getUserByIdSchema,
    SearchByIdParam
} from "./schema";
import {NotFoundError, UserError} from "../../error/UserError";


// [Recommended]
// 1. wrapping with async route function
// 2. Make handler function as async too.
async function routeAsync(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/users',
        schema: getAllUserSchema,
        handler : getAllUsers
    });

    fastify.route({
        method: 'GET',
        url: '/users/:userId',
        schema: getUserByIdSchema,
        handler : searchByUserIdHandler
    });
}


async function routes(fastify: FastifyInstance, options: any) {
    fastify.get('/users/:userId',
        {
            // 🌟 실제로 validation 은 이 파라미터에 따라 결정됨.
            schema: getUserByIdSchema
        },
        // 💡 <{}> 는 Generic Type 을 사용하기 위한 Debugging 용도일 뿐임.
        async (request: FastifyRequest<{Params: SearchByIdParam}>, reply: FastifyReply)=>{
        // 그냥 하면 에러남.
        // Object is of type 'unknown'.
        return users100.find(user=>user.id === request.params.userId) ?? reply.callNotFound();
    })
}

async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    return users100;
}

async function searchByUserIdHandler(request: FastifyRequest<{Params: SearchByIdParam}>, reply: FastifyReply) {
    const user = users100.find(user=>user.id === request.params.userId);

    if (!user) {
        // new NotFoundError(`userId : ${request.params.userId} doesn't exist`);
        // 공식 문서에도 이렇게 나와있긴함..
        reply.code(403).send(new NotFoundError(`userId : ${request.params.userId} doesn't exist`));
        // return reply.callNotFound();
    } else {
       return user;
    }
}

export {
    // routes as userRoute,
    routeAsync as usersRoute
};