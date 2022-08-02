
const swaggerOptions = {
    routePrefix: '/documentation',
    exposeRoute: true,
    openapi: {
        info: {
            title: 'Fastify-Typescript-Project',
            description: 'This is for testing fastify with typescript',
            version: '1.0.1'
        },
        host: 'localhost:' + '5000',
        servers: [{
            url: 'http://localhost:5000'
        }],
        components: {

        },
        tags: [
            {name: 'Books', description: 'Books operations'},
            {name: 'Users', description: 'Users operations'}
        ]
    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    staticCSP: false,
    hideUntagged: false,

}

const userSchema = {
    $id: 'user',
    type: 'object',
    properties: {
        id: {type: 'number', format: 'int64', minimum: 1},
        name: {type: 'string'},
        email: {type: 'string', format: 'email'},
        registerDate: {type: 'string', format: 'date-time'}
    }
}

const bookSchema = {
    $id: 'book',
    type: 'object',
    properties: {
        name: {type: 'string'},
        publishDate: {type: 'string', format: 'date-time'},
        author: {type: 'string'}
    }
}

const notFoundSchema = {
    $id: 'notFound',
    type: 'object',
    properties: {
        message: {type: 'string'},
        error: {type: 'string'},
        statusCode: {type: 'number'}
    }
}

export {
    swaggerOptions,
    userSchema,
    bookSchema,
    notFoundSchema
}