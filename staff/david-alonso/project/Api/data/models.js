import { constant } from 'com/constant.js'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types


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
    //     ????
    id: {
        type: ObjectId,
        ref: 'Vehicle'
    },
    // COCHE-MOTO-SC    ????
    type: {
        type: String,

        required: true
    },
    // G-D-E-H    ????
    supplyType: {
        type: String,

        required: true
    },
    // MARCA
    brand: {
        type: String,
        required: true,
        maxLength: 20
    },
    // MODELO
    model: {
        type: String,
        required: true,
        maxLength: 20
    },
    // AÑO
    year: {
        type: Number,
        required: true
    },
    // MATRICULA
    licensePlate: {
        type: String,
        required: true,
        maxLength: 10
    },
    // KM
    km: {
        type: Number,
        required: true,
        maxLength: 10
    },
    // FECHA ITV
    inspectionDate: {
        type: Date,
        required: true
    },
    // COLOR
    color: {
        type: String,
        required: true,
        maxLength: 20
    }

})

const User = model('User', user)

// const Vehicle = model('Vehicle', vehicle)

// export {
//     User,
//     Vehicle
// }
