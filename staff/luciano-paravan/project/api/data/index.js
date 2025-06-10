import mongoose from 'mongoose'
import { User, ClothingItem, LookRequest, LookSuggestion } from './models.js'
import { errors } from 'com'

const { SystemError } = errors

const data = {
    connect(url, dbName) {
        return mongoose.connect(`${url}/${dbName}`)
            .then(() => console.log('Connected to DB'))
            .catch(error => new SystemError(error.message))
    },
    disconnect() {
        return mongoose.disconnect()
    }
}

export {
    data,
    User,
    ClothingItem,
    LookRequest,
    LookSuggestion
}