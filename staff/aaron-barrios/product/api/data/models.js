import { constant } from 'com'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

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

const comment = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        minlength: 1,
        maxlength: 200,
        required: true
    },
    likes:[{
        type: ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifiedAt: {
        type: Date,
        default: null
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
        maxlength: 500
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    },
    comments: [comment]
})

const message = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        minlength: 1,
        maxlength: 1000,
        required: true
    },
    likes:[{
        type: ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const chat = new Schema({
    participants: [{
        type: ObjectId,
        ref: 'User',
        required: true
    }],
    title: {
      type: String
    },
    messages: [message],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const User = new model('User', user)
const Post = new model('Post', post)
const Comment = new model('Comment', comment)
const Message = new model('Message', message)
const Chat = new model('Chat', chat)

export {
    User,
    Post,
    Comment,
    Message,
    Chat
}