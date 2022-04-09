import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    publishDate: {
        type: Date
    },
    author: {
        type: String,
    },
});

const bookModel = mongoose.model('Book', bookSchema);

export {
    bookModel
}
