import { constant } from 'com'
import { Schema, model, Types } from 'mongoose'

const user = new Schema({
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: constant.EMAIL_REGEX
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 200
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

const User = model('User', user)

export {
    User
}