import mongoose from "mongoose";

// Schema 는 Collection 및 Document 구조 정의
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    registerDate: {
        type: Date
    }
});

// Model: DBO (데이터 인터페이스)
// User model 생성
const userModel = mongoose.model('User', userSchema);

export {
    userModel
}
