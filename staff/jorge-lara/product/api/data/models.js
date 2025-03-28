import { Schema, model, Types } from "mongoose"
import { constant } from "com"

const { ObjectId } = Types

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        match: constant.EMAIL_REGEX,
        maxLength: 30,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        match: constant.URL_REGEX,
        maxLength: 500,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxLength: 500
    },
    likes: {
        type: [ObjectId],
        ref: 'user'
    },
    createdAt: {
        type: Date,
        required: true
    },
    modifiedAt: {
        type: Date
    }

})

const User = model('User', user);
const Post = model('Post', post);

export {
    User,
    Post
}