import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import books100 from '@test/dummyData/books100.json';
import {searchBookByNameSchema, paramSearchByBookName, getAllBooksSchema, addBookSchema, addBookBody} from "./schema";
import {bookModel} from "@models/books/Book";

async function route(fastify: FastifyInstance) {
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

    fastify.route({
        method: 'POST',
        url: '/books',
        schema: addBookSchema,
        handler: createBook
    })
}


async function getAllBooksHandler(request: FastifyRequest, reply: FastifyReply) {
    return books100;
}

async function searchByBookNameHandler(request: FastifyRequest<{Params: paramSearchByBookName}>, reply: FastifyReply) {
    return books100.find(book=>book.name === request.params.bookName) ?? reply.callNotFound();
}

// Model 을 통한 create
async function createMockBooks() {
    return bookModel.create(books100);
}

async function createBook(request: FastifyRequest<{Body: addBookBody}>, reply: FastifyReply) {
    const newBook = request.body;

    try {
        const result = await bookModel.create(newBook);

        return reply
            .code(201)
            .headers({
                'Content-Location': `/books/1`
            })
            .send(result);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err);
        }
    }
}

export {
    route as bookRoute,
    createMockBooks,
    createBook
};