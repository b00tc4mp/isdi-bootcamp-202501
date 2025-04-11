import 'dotenv/config'
import { data, User, Timer } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Timer.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return User.insertMany([
                    { name: 'Anna', email: 'an@na.com', username: 'Anneta', password: hash }
                ])
            })
        // .then(([anna]) => {
        //     return Timer.insertMany([])
        // })
    })
    .finally(() => data.disconnect())