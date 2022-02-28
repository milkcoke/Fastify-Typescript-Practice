import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import books100 from '../../../dummy/books100.json';
import {searchBookByNameSchema, paramSearchByBookName, getAllBooksSchema} from "./schema";

async function route(fastify: FastifyInstance, options: any) {
    // Full declaration for generating OAI 3.0.3 yaml file
    fastify.route({
        method: 'GET',
        url: '/books',
        schema: getAllBooksSchema,
        handler: getAllBooksHandler
    });

    fastify.route({
        method: 'GET',
        url: '/books/:bookName',
        schema: searchBookByNameSchema,
        handler: searchByBookNameHandler
    });
}


async function getAllBooksHandler(request: FastifyRequest, reply: FastifyReply) {
    return books100;
}

async function searchByBookNameHandler(request: FastifyRequest<{Params: paramSearchByBookName}>, reply: FastifyReply) {
    return books100.find(book=>book.name === request.params.bookName) ?? reply.callNotFound();
}


export {route as bookRoute};