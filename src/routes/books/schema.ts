
// name, publishDate, author
import {FromSchema} from "json-schema-to-ts";
import {bookSchema} from "@docs/swagger";


// book 타입이 반복되고있음
// 이놈을 공통 Schema 로 미리 정의하자.
const responseAllBooksJson = {
    200 : {
        type: 'array',
        items: bookSchema
    }
} as const;

const paramSearchByBookNameJson = {
    type: 'object',
    properties: {
        bookName: { type: 'string' }
    }
} as const;

const responseByBookNameJson = {
    // 200: { $ref: 'bookSchema#'}
    200 : bookSchema
} as const;

type paramSearchByBookName = FromSchema<typeof paramSearchByBookNameJson>;

const searchBookByNameSchema = {
    tags: ['books'],
    params: paramSearchByBookNameJson,
    response: responseByBookNameJson
};

const getAllBooksSchema = {
    tags: ['books'],
    response: responseAllBooksJson
}

export {
    paramSearchByBookName,
    getAllBooksSchema,
    searchBookByNameSchema
}

