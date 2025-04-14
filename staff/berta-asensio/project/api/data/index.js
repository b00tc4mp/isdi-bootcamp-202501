//CONEXIÓN A MONGODB
import mongoose from 'mongoose'
import { errors } from 'com'
import { User, Menu } from './models.js'

const { SystemError } = errors

const data = {
    connect(url, dbName) {
        return mongoose.connect(`${url}/${dbName}`)
            .then(() => console.log('Connected to MongoDB'))
            .catch(error => new SystemError(error.message))
    },

    disconnect() {
        return mongoose.disconnect()
    }
}

export {
    data,
    User,
    Menu
}
