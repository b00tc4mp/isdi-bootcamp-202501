import {constant} from 'com'
import {Schema, model, Types} from 'mongoose'

const { ObjectId} = Types

const user = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        match: constant.EMAIL_REGEX,
        maxlength: 30,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 16,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 80
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
    },
    image: {
        type: String,
        required: true,
        match: constant.URL_REGEX,
        maxlength: 500
    },
    text: {
        type: String,
        required: true,
        minlength: 500
    }
})

const User = new model('User', user)
const Post = new model('Post', post)

export {
    User,
    Post
}