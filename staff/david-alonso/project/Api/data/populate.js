import 'dotenv/config'
import { data, User } from './index.js'
import bcrypt from 'bcryptjs'


const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({})
        ])

            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return User.insertMany([
                    {
                        name: 'Dallen',
                        email: 'dallen@31.com',
                        password: hash
                    },
                    {
                        name: 'Yuki',
                        email: 'Yuki@31.com',
                        password: hash
                    }
                ])
            })

    })
    .finally(() => data.disconnect())