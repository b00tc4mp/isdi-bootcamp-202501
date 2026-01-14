import mongoose from 'mongoose'
import { errors } from 'com'
import { User, Vehicle, Manteinance } from './models.js'

const { SystemError } = errors

const data = {

    connect(url, dbName) {
        return mongoose.connect(`${url}/${dbName}`)
            .catch(error => new SystemError(error.message))
    },

    disconnect() {
        return mongoose.disconnect()
    },
}

export {
    data,
    User,
    Vehicle,
    Manteinance
}