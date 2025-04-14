import mongoose from 'mongoose'
import { User, Couple, DiaryEntry, CalendarEvent, ListItem, List, Feelings } from './models.js'
import { errors } from 'com'

const { SystemError } = errors

const data = {
    connect(url, dbName) {
        return mongoose.connect(`${url}/${dbName}`)
            .catch(error => new SystemError(error.message))
    },

    disconnect() {
        return mongoose.disconnect()
    }
}

export {
    data,
    User,
    Couple,
    DiaryEntry,
    CalendarEvent,
    ListItem,
    List,
    Feelings
}