import {
    FastifyRequest,
    FastifyReply,
    FastifyInstance
} from "fastify";
import users100 from '../../../dummy/users100.json';
import {
    userSchema,
    SearchByIdParam
} from "./schema";

// 타입스크립트 Generics
interface IQuerystring {
    userId: number;
    userName: string;
    userEmail: string;
    userRegisterDate: string;
}
interface IParam {
    userId: number;
}
interface IHeaders {
    'h-Custom' : string;
}




async function routes(fastify: FastifyInstance, options: any) {
    fastify.get('/users/:userId',
        {
            // 🌟 실제로 validation 은 이 파라미터에 따라 결정됨.
            schema: userSchema
        },
        // 💡 <{}> 는 Generic Type 을 사용하기 위한 Debugging 용도일 뿐임.
        async (request: FastifyRequest<{Params: SearchByIdParam}>, reply: FastifyReply)=>{
        // 그냥 하면 에러남.
        // Object is of type 'unknown'.
        return {user: users100.find(user=>user.id === request.params.userId)}
    })
}

/*
async function routes(fastify: any, options: any) {
    fastify.get<{
        Params: IParam,
        Headers: IHeaders
    }>('/users/:userId', {schema}, async (request: FastifyRequest, reply: FastifyReply)=>{
        // 그냥 하면 에러남.
        // Object is of type 'unknown'.
        return {users: users100.find(user=>user.id === request.params.userId)}
    })
}
*/

export {
    // routes as userRoute,
    routeAsync as usersRoute
};