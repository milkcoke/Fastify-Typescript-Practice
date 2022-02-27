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

// The reason to use response schema
// Drastically increase throughput and help prevent accidental disclosure of sensitive information.

// 다음과 같은 상황 방지하기 편하다.
// ex1) Throw new Error 코드를 그대로 노출시킴으로써 DB 설정 정보를 노출 (IP, PORT)
// ex2) 특정한 개인 정보 디버깅 stacktrace 를 노출

const userSchema = {
    // it's not allowed null or undefined
    // body: null,
    // querystring: null,
    params: searchById,
    // headers: undefined



    response: {
        200: {
            type: 'object',
            properties: {
                id: {type: 'number'},
                name: {type: 'string'},
                email: {type: 'string'},
                registerDate: {type: 'string'}
            }
        },
        // Coerce the value according to this schema type
        // https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
        // 에러 커스터마이징은
        // 1. 커스텀 클래스 작성
        // 2. ajv schemaCompiler 사용
        // 총 2가지 방법이 있음.
        // 여기서는 커스텀 클래스로 대응해봄.
        403: {
            type: 'string'
        },
        404: {
            type: 'object',
            properties: {
                message: {type: 'string'},
                error: {type: 'string'},
                statusCode: {type: 'number'}
            }
        }
    }

}


export {
    SearchByIdParam,
    userSchema
}