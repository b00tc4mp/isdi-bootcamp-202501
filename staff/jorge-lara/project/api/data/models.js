import { Schema, model } from 'mongoose'


const user = new Schema({
    email: {
        type: String,
        required: true,
        maxLength: 30,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100
    }
})

const User = model('User', user);

export {
    User
}