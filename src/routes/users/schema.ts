// 이건 마치 타입스크립트에서 interface 강제한 효과와 비슷한..?
// 그러나 미묘하게 다름, Fastify 는 완벽히 typescript 를 지원하진 않음.

// Reference: https://github.com/fastify/fastify-example-twitter/blob/master/user/schemas.js

// Shared Schema! or JSON Schema validator which relies upon Ajv v6
// async 하지말것.

// Transform existing JSON Schemas into TS interface.
import {FromSchema} from "json-schema-to-ts";

const searchById = {
    type: 'object',
    properties: {
        userId: { type: 'number' }
    },
    // required 용도가 무엇인지 정확히 파악할 필요가 있음.
    // required: ['userId']
} as const;

const userProfileOutput = {
    200: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            email: { type: 'string' },
            registerDate: {type: 'string'}
        }
    }
    // Use '2xx' when you want to use same schema for multiple status codes
} as const;

// FromSchema lets you infer Typescript types directly from JSON Schema
type SearchByIdParam = FromSchema<typeof searchById>;
// type UserResponse = FromSchema<typeof userResponseSchema>;

const userSchema = {
    // it's not allowed null or undefined
    // body: null,
    // querystring: null,
    params: searchById
    // headers: undefined
}


export {
    SearchByIdParam,
    userSchema
}