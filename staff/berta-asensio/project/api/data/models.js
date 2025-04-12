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

const menu = new Schema({
    ordinal: {
    type: Number,
    required: true
    },
    name: {
        type: String, 
        required: true,
        minLength: 1,
        maxLength: 200
    },
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 500
    },
    allergens: {
        type: [String],
        required: true,
        default: []
    },
    categories: {
        type: [String],
        enum: ['regular', 'vegetarian', 'vegan', 'halal'],
        required: true,
        default: []
    },
    price: {
        type: Number,
        required: true
    }
})

const User = model('User', user)
const Menu = model('Menu', menu)

export {
    User,
    Menu
}