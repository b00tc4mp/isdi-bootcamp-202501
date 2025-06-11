import { constant } from 'com'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

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
    credit: {
    type: Number,
    required: true,
    default: 0
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
        enum: ['regular', 'vegetariano', 'vegano', 'halal'],
        required: true,
        default: []
    },
    breadOptions: {
        type: [String],
        enum: ['gluten', 'sin gluten', 'integral'],
        default: ['gluten']
    },
    price: {
        type: Number,
        required: true
    }
})

const order = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    menu: {
        type: ObjectId,
        ref: 'Menu',
        required: true
    },
    bread: {
        type: String,
        enum: ['gluten', 'sin gluten', 'integral'],
        required: true
    },
    note: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pendiente', 'en camino', 'entregado', 'cancelado'],
        default: 'pendiente'
    },
    deliveryDate: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
})

const User = model('User', user)
const Menu = model('Menu', menu)
const Order = model('Order', order)

export {
    User,
    Menu,
    Order
}