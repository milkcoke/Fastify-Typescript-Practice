
const swaggerOptions = {
    routePrefix: 'documentation',
    openapi: {
        info: {
            title: 'Fastify-Typescript-Project',
            description: 'This is for testing fastify with typescript',
            version: '1.0.0'
        },
        servers: [{
            url: 'http://localhost'
        }],
        components: {

        },
        tags: [
            {name: 'books', description: 'Books operations'},
            {name: 'users', description: 'Users operations'}
        ]
    },
    hideUntagged: false,
    exposeRoute: true
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