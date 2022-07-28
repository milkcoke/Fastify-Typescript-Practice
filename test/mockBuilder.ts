import fastify, {FastifyInstance} from "fastify";
import {heathCheckRoute} from "@test/healthChecker";
import fastifyTypeorm from "fastify-typeorm-plugin";
import { dataSource } from "@db/typeORMDataSource";
import {usersRoute} from "@controllers/users/user";

// Automatically build and tear down own instance.
export function build() : FastifyInstance {

    const mockServer = fastify({
        logger: false
    });
    mockServer.register(heathCheckRoute);
    //@ts-ignore
    mockServer.register(fastifyTypeorm, {connection: dataSource})
    // Ready called when all plugins have been loaded
    // mockServer.ready();
    mockServer.register(usersRoute);


    return mockServer;
}


