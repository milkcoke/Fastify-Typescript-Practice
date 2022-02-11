import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import books100 from '../../../dummy/books100.json';
import {searchByBookNameOpts, ParamSchema} from "./schema";

async function route(fastify: FastifyInstance, options: any) {
    // Shorthand declaration.
    fastify.get('/books',{}, getAllBooksHandler);

    // 왜 async 를 붙여야만할까?
    fastify.get('/books/:bookName', searchByBookNameOpts, searchByBookNameHandler);
}


async function getAllBooksHandler(request: FastifyRequest, reply: FastifyReply) {
    return books100;
}

async function searchByBookNameHandler(request: FastifyRequest<{Params: ParamSchema}>, reply: FastifyReply) {
    return books100.find(book=>book.name === request.params.bookName);
}


export {route as bookRoute};