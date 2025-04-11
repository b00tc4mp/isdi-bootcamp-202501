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
                    { name: 'Hermione Granger', email: 'hermione@granger.com', username: 'Granger', password: hash }
                ])
            })
            .then(([anna, hermione]) => {
                return Timer.insertMany([
                    { author: anna.id, time: 60, pauseTime: 5, pausesCount: 2, tag: 'Study', status: 'created', createdAt: new Date(2025, 1, 11) },
                    { author: hermione.id, time: 90, pauseTime: 7, pausesCount: 4, tag: 'Memomry', status: 'created', createdAt: new Date(2025, 0, 11) }
                ])
            })
    })
    .finally(() => data.disconnect())