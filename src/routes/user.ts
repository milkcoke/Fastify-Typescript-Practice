import {
    FastifyRequest,
    FastifyReply,
    FastifyInstance
} from "fastify";
import users100 from '../../dummy/users100.json';
import {FromSchema} from "json-schema-to-ts";


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


// 이건 마치 타입스크립트에서 interface 강제한 효과와 비슷한..?
// 그러나 미묘하게 다름, Fastify 는 완벽히 typescript 를 지원하진 않음.

// Shared Schema! or JSON Schema validator which relies upon Ajv v6
// async 하지말것.

// Transform existing JSON Schemas into TS interface.
const userParamSchema = {
    type: 'object',
    properties: {
        userId: { type: 'number' }
    }
} as const;

type UserParam = FromSchema<typeof userParamSchema>;


const userSchema = {
    // it's not allowed null or undefined
    // body: null,
    // querystring: null,
    params: userParamSchema,
    // headers: undefined
}

async function routes(fastify: FastifyInstance, options: any) {
    fastify.get<{
        Params: UserParam
    }>('/users/:userId',
        {
            schema: userSchema
        },
        async (request: FastifyRequest<{Params: UserParam}>, reply: FastifyReply)=>{
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

export {routes as userRoute};