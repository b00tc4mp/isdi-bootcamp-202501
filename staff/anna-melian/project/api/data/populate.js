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
                    { name: 'Anna', email: 'an@na.com', username: 'Anneta', password: hash },
                    { name: 'Hermione Granger', email: 'hermione@granger.com', username: 'Granger', password: hash, gems: 30 }
                ])
            })
            .then(([anna, hermione]) => {
                return Timer.insertMany([
                    { author: anna.id, time: 60, startDate: new Date, endDate: new Date, pauseTime: 5, pausesCount: 2, tag: 'Study', status: 'end', createdAt: new Date(2025, 1, 11) }
                ])
            })
    })
    .finally(() => data.disconnect())