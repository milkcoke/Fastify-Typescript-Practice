import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Date
    },
    author: {
        type: String,
    },
});

const Book = mongoose.model('Book', bookSchema);

export {
    Book
}
