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
    },
    gems: {
        type: Number,
        required: true,
        default: 0
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const timer = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: Number,
        required: true,
        max: 120,
        min: 5,
    },
    startDate: {
        type: Date,
        default: null,
    },
    endDate: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: ['created', 'active', 'exit', 'pause', 'extraTime', 'end'],
        default: 'created',
        required: true,
    },
    pauseTime: {
        type: Number,
        max: 10,
        min: 2,
    },
    pausesCount: {
        type: Number,
        max: 8,
        min: 0,
    },
    extraTimes: {
        type: Array,
        default: []
    },
    tag: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})



const User = model('User', user)
const Timer = model('Timer', timer)

export {
    User,
    Timer
}