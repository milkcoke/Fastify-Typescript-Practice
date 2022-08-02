import path from "path";
import {SchemaConverter} from 'pg-tables-to-jsonschema';
import {postgreSqlDBConnectionConfig} from "@db/config";


const schemas = new SchemaConverter({
    pg: postgreSqlDBConnectionConfig,
    input: {
        schemas: ['public'],
        exclude: [],
        include: [],
    },
    output: {
        additionalProperties: false,
        baseUrl: 'localhost:8080',
        defaultDescription: ' ',
        indentSpaces: 2,
        outDir: path.join(__dirname, '..', 'docs/schemas'),
        unwrap: false
    }
});

// Generate JSON Schema files.
schemas.convert()
    .then(()=>{
        console.log('convert complete!');
    })
    .catch(console.error);


