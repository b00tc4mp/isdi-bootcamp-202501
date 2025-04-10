//CONEXIÓN A MONGODB
import mongoose from 'mongoose'
import { SystemError } from '../../com/errors.js'
import { User } from './models.js'

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
    User
}
