import { constant } from "com"
import { Schema, model } from "mongoose"

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
    }

})

const vehicle = new Schema({
    marca: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30
    },
    modelo: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30
    },
    año: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 30
    },
    color: {
        type: String,
        required: true,
    },
    matricula: {
        type: String,
        required: true,
    },
    km: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 10
    },
    itv: {
        type: Date,
        required: true,
    },
    author: {
        type: String,
        required: true
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
const Vehicle = model('Vehicle', vehicle)


export {
    User,
    Vehicle
}