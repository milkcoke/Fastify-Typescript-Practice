import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import dotenv from "dotenv";
import {join} from "path";
import {DataSource} from "typeorm";

const {
    POSTGRE_DB_USER, POSTGRE_DB_PASSWORD,
    POSTGRE_DB_HOST, POSTGRE_DB_PORT,
    POSTGRE_DB_NAME
} = dotenv.config({path: join(__dirname, '..', '.env')}).parsed!;

const dbSourceConfig : PostgresConnectionOptions = {
    type: 'postgres',
    username: POSTGRE_DB_USER,
    password: POSTGRE_DB_PASSWORD,
    host: POSTGRE_DB_HOST,
    port: Number(POSTGRE_DB_PORT),
    database: POSTGRE_DB_NAME,
    synchronize: false,
    logging: true,
    entities: [join(__dirname , 'entities/**/*.{js,ts}')]
}

const dataSource = new DataSource(dbSourceConfig);

dataSource.initialize()
    .then(()=>console.log('PostgreSQL initialized!'))
    .catch(console.error);

export {
    dataSource
}