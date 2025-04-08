import { constant } from 'com'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

// Esquema de usuario
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
        type: Date, // <- estaba "Type"
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})


const recipe = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        match: constant.URL_REGEX,
        maxLength: 500,
        required: true,
    },
    text: {
        type: String,
        required: true,
        maxLength: 500,
    },
    cookingTime: {
        type: Number,
        required: true,
        min: 1
    },
    estimatedTime: {
        type: Number,
        required: true,
        min: 1
    },
    steps: [{
        type: String,
        required: true,
        maxLength: 1000
    }],
    ingredients: [{
        type: String,
        required: true,
        maxLength: 200
    }],
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const User = model('User', user)
const Recipe = model('Recipe', recipe)

export {
    User,
    Recipe
}