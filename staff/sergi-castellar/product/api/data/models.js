import { constant } from 'com'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const user = new Schema({
    _id: {
        type: ObjectId,
        required: false,
        auto: true
    },
    name: {
        type: String,
        minLength: 3,
        maxLength: 15,
        required: true,
        unique: false,
        //match:
    },
    email: {
        type: String,
        minLength: 1,
        maxLength: 30,
        required: true,
        unique: true,
        match: constant.EMAIL_REGEX
    },
    username: {
        type: String,
        minLength: 3,
        maxLength: 15,
        required: true,
        unique: true,
        //match:
    },
    password: {
        type: String,
        minLength: 6,
        maxLength: 100,
        required: true,
        unique: false,
        //match:
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const post = new Schema({
    _id: {
        type: ObjectId,
        required: false,
        auto: true
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        minLength: 1,
        maxLength: 5000,
        required: true,
        unique: false,
        match: constant.URL_REGEX
    },
    text: {
        type: String,
        minLength: 1,
        maxLength: 1000,
        required: true,
        unique: false,
        //match:
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }]
})

const User = model('User', user)
const Post = model('Post', post)

export {
    User,
    Post
}