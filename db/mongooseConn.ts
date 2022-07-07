import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from "path";

const {
    MONGO_DB_URI,
    MONGO_DB_USERNAME, MONGO_DB_PASSWORD
} = dotenv.config({path: path.join(__dirname, '../..', '.env')}).parsed!;

const mongooseConn = mongoose.connect(MONGO_DB_URI, {
    user: MONGO_DB_USERNAME,
    pass: MONGO_DB_PASSWORD
});


export {
    mongoose,
    mongooseConn
}
