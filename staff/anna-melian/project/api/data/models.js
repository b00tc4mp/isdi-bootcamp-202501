import { constant } from 'com'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
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
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }, gems: {
        type: Number,
        required: true,
        default: 0
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const User = model('User', user)

export {
    User
}