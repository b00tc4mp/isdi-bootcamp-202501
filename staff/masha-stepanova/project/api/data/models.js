import { constant } from 'com/constant.js'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
        match: constant.NAME_REGEX
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 30,
        match: constant.EMAIL_REGEX,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 20,
        unique: true,
        match: constant.USERNAME_REGEX
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
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    },
    generalProgress: [{
        type: ObjectId,
        ref: 'Level'
    }],
    score: {
        type: Number,
        default: 0
    },
    currentLevel: {
        type: ObjectId,
        ref: 'Level'
    }
})

const level = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 300
    },
    body: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 300
    },
    resultOptions: {
        type: Array,
        minLength: 3,
        maxLength: 7
    },
    expectedResult: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    difficulty: {
        type: Number,
        default: 1
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
const Level = model('Level', level)

export {
    User,
    Level
}