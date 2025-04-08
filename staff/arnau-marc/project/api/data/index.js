import mongoose from 'mongoose'
// import { errors } from 'com' TODO
import { User, Game, Season } from './models.js'

// const { SystemError } = errors TODO

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
    Game,
    Season
}