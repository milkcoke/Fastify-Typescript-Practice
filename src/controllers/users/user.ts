import type {
    FastifyRequest,
    FastifyReply,
    FastifyInstance
} from "fastify";
import users100 from '@test/dummyData/users100.json';
import {
    getAllUserSchema,
    getUserByIdSchema, getUserWithContentsParams, getUserWithContentsSchema,
    SearchByIdParam, updateUserBody, updateUserParams, updateUserSchema
} from "./schema";
import {NotExistUser} from "../../../custom_error/NotExistUser";
import {Contents} from "@db/entities/Contents";
import {User} from "@db/entities/User";
import {userRepository} from "@db/entities/User.repository";


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
        url: '/users/name',
        handler: getAllUsersName
    })

    fastify.route({
        method: 'GET',
        url: '/users/:userId',
        schema: getUserByIdSchema,
        handler : searchByUserIdHandler
    });

    fastify.route({
        method: 'GET',
        url: '/users/test/:userId',
        schema: getUserWithContentsSchema,
        handler: getUserWithContents
    });

    fastify.route({
        method: 'PATCH',
        url: '/users/:id',
        schema: updateUserSchema,
        handler: updateUser
    })
}

async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    return users100;
}

async function getAllUsersName(request: FastifyRequest, reply: FastifyReply) {
    const names = await new userRepository(this.orm.connection)
                    .findAllNames();
    return reply
        .code(200)
        .send(names);
}

async function searchByUserIdHandler(request: FastifyRequest<{Params: SearchByIdParam}>, reply: FastifyReply) {
    const user = users100.find(user=>user.id === request.params.userId);

    if (!user) {
        // new NotFoundError(`userId : ${request.params.userId} doesn't exist`);
        // 공식 문서에도 이렇게 나와있긴함..
        return reply
            .code(403)
            .send(new NotExistUser(`userId : ${request.params.userId} doesn't exist`));
        // return reply.callNotFound();
    } else {
       return user;
    }
}

async function getUserWithContents(request: FastifyRequest<{Params: getUserWithContentsParams}>, reply: FastifyReply) {
    try {
        const userId = request.params.userId;
        console.log("What's this in here?")

        const userRepository = this.orm.getRepository(User);
        const rows = await this.orm.manager
                        .createQueryBuilder()
                        .select("u.id as id, u.name as name")
                        .addSelect("c.contents_id as contents_id, c.contents_type as contents_type")
                        .from(User, 'u')
                        // query..
                        // .where('u.id = :userId', {userId})
                        // JOIN and Select 은 조인된 모든 애들 다 불러옴 => 왠만하면 얘로 다 씀
                        // inner Join 만 자기가 속한 엔티티만 불러옴 (왼쪽)
                        .innerJoin(Contents, 'c', 'u.id = c.user_id')
                        // .printSql()
                        .getRawMany();

        console.dir(rows);

        return reply
            .code(200)
            .send(rows);

    } catch (err: unknown) {
       if (err instanceof Error) {
           console.error(err)
       }
       return reply
           .code(500)
           .send(err)
    }
}

async function updateUser(request: FastifyRequest<{Params: updateUserParams, Body: updateUserBody}>, reply: FastifyReply) {
    const {id} = request.params;

    try {
        const userRepository = await this.orm.getRepository(User);
        const user = await userRepository.findOne({
                        where: {id}
                    });


        // 1. Update using repository.update()
        await userRepository.update({id}, request.body);

        // 2. Update using queryBuilder
        // const updatedUser = await this.orm.createQueryBuilder()
        //                             .update(User)
        //                             .set(request.body)
        //                             .where({id})
        //                             .returning("*")
        //                             .execute()
        //                             .then(({raw})=>raw[0]);

        return reply
            .code(200)
            // .send(updatedUser);
            .send(user);

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err);
        }
        return reply
            .code(500)
            .send(err);
    }


}


export {
    routeAsync as usersRoute
};