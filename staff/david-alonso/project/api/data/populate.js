import 'dotenv/config'
import { data, User, Vehicle } from './index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Vehicle.deleteMany({})
        ])
    })
    .then(() => bcrypt.hash('123123123', 10))
    .then(hash => {
        return User.insertMany([
            {
                name: 'Dallen',
                email: 'dallen@31.com',
                password: hash
            }
        ])
    })
    // .then(users => {
    //     const user = users[0] 
    //     const userId = user._id

    //     return Vehicle.insertMany([
    //         {
    //             marca: 'Honda',
    //             modelo: 'CBR 600',
    //             año: 2020,
    //             matricula: '2525CFR',
    //             km: 75000,
    //             itv: new Date(2025, 5, 20),
    //             author: userId
    //         }
    //     ])
    // })
    .finally(() => data.disconnect())
