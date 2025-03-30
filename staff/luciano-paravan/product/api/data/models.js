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
    }
})

const User = model('User', user)
const Post = model('Post', post)

export {
    User,
    Post
}