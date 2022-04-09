import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from "path";

const {
    DB_URI,
    DB_USERNAME, DB_PASSWORD
} = dotenv.config({path: path.join(__dirname, '../..', '.env')}).parsed!;

const mongooseConn = mongoose.connect(DB_URI, {
    user: DB_USERNAME,
    pass: DB_PASSWORD
});


export {
    mongoose,
    mongooseConn
}
