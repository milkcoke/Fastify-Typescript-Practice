
// name, publishDate, author

import {FromSchema} from "json-schema-to-ts";

const paramSchema = {
    type: 'object',
    properties: {
        bookName: { type: 'string' }
    }
} as const;

type ParamSchema = FromSchema<typeof paramSchema>;

const searchByBookNameOpts = {
    schema : {
        params: paramSchema
    }

};

export {
    ParamSchema,
    searchByBookNameOpts
}

