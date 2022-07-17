import {
    FastifyRequest,
    FastifyReply,
    FastifyInstance
} from "fastify";
import users100 from '@test/dummyData/users100.json';
import {
    getAllUserSchema,
    getUserByIdSchema,
    SearchByIdParam
} from "@controllers/users/schema";
import {NotExistUser} from '../../../custom_error/NotExistUser';



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

async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    return users100;
}

async function searchByUserIdHandler(request: FastifyRequest<{Params: SearchByIdParam}>, reply: FastifyReply) {
    const user = users100.find(user=>user.id === request.params.userId);

    if (!user) {
        return reply
            .code(404)
            .send(new NotExistUser(`userId : ${request.params.userId} doesn't exist`));
    } else {
       return user;
    }
}

export {
    routeAsync as usersRoute
};