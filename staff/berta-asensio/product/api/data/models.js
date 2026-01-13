/*
IMPORTACIONES:
-constant: que contiene las regex
-De mongoose:
    -Schema: define la estructura de datos
    -model: crea modelos basados en los esquemas
    -Types: contiene tipos de datos especiales, como ObjectId el cual extraemos más abajo.
*/
import { constant } from 'com'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types


/*
CREACIÓN DE ESQUEMAS (user y post)
*/
const user = new Schema({
    name: {
        type: String,
        required: true, 
        minLength: 1,
        maxLength: 20,
        //match: constant.EMPTY_OR_BLANK_REGEX
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20,
       // match: constant.EMPTY_OR_BLANK_REGEX
    },
    password: {
        type: String,
        required: true, 
        minLength: 4,
        maxLength: 100,
       // match: constant.EMPTY_OR_BLANK_REGEX
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
        match: constant.EMAIL_REGEX 
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now //Al crear un post, moongose creará la fecha por defecto.
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

const post = new  Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true

    },
    image: {
        type: String,
        match: constant.URL_REGEX,
        required: true,
        maxLength: 500
    },
    text: {
        type: String,
        required: true,
        maxLength: 500,
        //match: constant.EMPTY_OR_BLANK_REGEX
    },
    // Los likes son un array de tipo ObjectId que se refiere a la colección de User 
    likes:[{
        type: ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now //Al crear un post, moongose creará la fecha por defecto.
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

/*
CREACIÓN DE MODELOS:
Esto convierte los esquemas user y post en modelos User y Post, listos para ser usados en la base de datos.
 */
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