import path from "path";
import dotenv, {DotenvParseOutput} from "dotenv";

let env: DotenvParseOutput;

switch (process.env.NODE_ENV) {
    case 'production':
    case 'prod':
        env = dotenv.config({path: path.join(__dirname, '..', '.env.prod'), encoding: 'utf-8'}).parsed!;
        break;
    case 'development':
    case 'dev':
        env = dotenv.config({path: path.join(__dirname, '..', '.env.dev'), encoding: 'utf-8'}).parsed!;
        break;
    case 'test':
        env = dotenv.config({path: path.join(__dirname, '..', '.env.test'), encoding: 'utf-8'}).parsed!;
        break;
    default:
        env = dotenv.config({path: path.join(__dirname, '..', '.env'), encoding: 'utf-8'}).parsed!;
        break;
}

const postgreSqlDBConnectionConfig = {
    user: env.POSTGRE_DB_USER,
    password: env.POSTGRE_DB_PASSWORD,
    host: env.POSTGRE_DB_HOST,
    port: Number(env.POSTGRE_DB_PORT),
    database: env.POSTGRE_DB_NAME,
}

export {
    postgreSqlDBConnectionConfig
}