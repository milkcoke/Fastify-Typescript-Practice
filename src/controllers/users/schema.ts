// 이건 마치 타입스크립트에서 interface 강제한 효과와 비슷한..?
// 그러나 미묘하게 다름, Fastify 는 완벽히 typescript 를 지원하진 않음.
import {FromSchema} from "json-schema-to-ts";
import userJsonSchema from '@docs/schemas/public/User.json';

// Reference: https://github.com/fastify/fastify-example-twitter/blob/master/user/schemas.js

// Transform existing JSON Schemas into TS interface.
import {
    userSchema,
    notFoundSchema
} from "@docs/swagger";

const searchByIdJson = {
    type: 'object',
    properties: {
        userId: { type: 'number' }
    },
    // required 용도가 무엇인지 정확히 파악할 필요가 있음.
    // required: ['userId']
} as const;

// FromSchema lets you infer Typescript types directly from JSON Schema
type SearchByIdParam = FromSchema<typeof searchByIdJson>;

// The reason to use response schema
// Drastically increase throughput and help prevent accidental disclosure of sensitive information.

// 다음과 같은 상황 방지하기 편하다.
// ex1) Throw new Error 코드를 그대로 노출시킴으로써 DB 설정 정보를 노출 (IP, PORT)
// ex2) 특정한 개인 정보 디버깅 stacktrace 를 노출
const getUserByIdSchema = {
    tags: ['Users'],
    // it's not allowed null or undefined
    // body: null,
    // querystring: null,
    params: searchByIdJson,
    // headers: undefined

    response: {
        200: userSchema,
        // Coerce the value according to this schema type
        // https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
        403: {
            type: 'string'
        },
        404: notFoundSchema
    }

}


const getAllUserResponseJson = {
    type: 'array',
    items: userSchema
} as const;

const getAllUserSchema = {
    tags: ['Users'],
    response: {
        200: getAllUserResponseJson,
        404: notFoundSchema
    }
}

const getUserWithContentsParamsJson = {
    type: 'object',
    properties: {
        userId: {
            type: 'string'
        }
    },
    required: ['userId'],
} as const;

type getUserWithContentsParams = FromSchema<typeof getUserWithContentsParamsJson>;

const getUserWithContentsSchema = {
    tags: ['Users'],
    params: getUserWithContentsParamsJson
}

const updateUserParamsJson = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            description: 'PK, auto_increment'
        }
    },
    required: ['id']
} as const;

type updateUserParams = FromSchema<typeof updateUserParamsJson>;

const updateUserBodyJson = {
    type: 'object',
    properties: {
        name: {
            type: userJsonSchema.properties.name.type,
        },
        loginId: {
            type: userJsonSchema.properties.login_id.type,
            maxLength: userJsonSchema.properties.login_id.maxLength
        }
    }
} as const;

type updateUserBody = FromSchema<typeof updateUserBodyJson>;

const updateUserSchema = {
    tags: ['Users'],
    body: updateUserBodyJson,
    params: updateUserParamsJson,
}

export {
    SearchByIdParam,
    getUserByIdSchema,

    getAllUserSchema,

    getUserWithContentsParams,
    getUserWithContentsSchema,

    updateUserParams,
    updateUserBody,
    updateUserSchema
}