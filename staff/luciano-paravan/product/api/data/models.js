import { constant } from 'com'
import { Schema, model, Types } from "mongoose"

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
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now //Cuando le pasas este metodo mongoose cuando crea cualquier post le crea una fecha por defecto.
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
        minLength: 1,
        maxLength: 200
    },
    likes: [{
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
        required: true
    },
    image: {
        type: String,
        match: constant.URL_REGEX,
        maxLength: 500,
        required: true
    },
    text: {
        type: String,
        require: true,
        maxLength: 500,
    },
    likes: [{
        type: ObjectId,
        ref: 'User' //Se refieren a la coleccion de usuarios
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now //Cuando le pasas este metodo mongoose cuando crea cualquier post le crea una fecha por defecto.
    },
    modifiedAt: {
        type: Date,
        default: null
    },
    comments: [comment] //embebido en post ponemos comment, creamos un array comments con los comentarios, mongoose aprovecha el esquema de comment
})

const message = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        minLength: 1,
        maxLength: 1000
    },
    likes: [{
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

const User = model('User', user)
const Post = model('Post', post)
const Comment = model('Comment', comment)
const Message = model('Message', message)
const Chat = model('Chat', chat)

export {
    User,
    Post,
    Comment,
    Message,
    Chat
}