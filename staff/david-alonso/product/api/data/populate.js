import 'dotenv/config'
import { data, User, Post } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])

            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return User.insertMany([
                    {
                        name: 'Dallen',
                        email: 'dallen@31.com',
                        username: 'dallen',
                        password: hash,
                    },

                    {
                        name: 'Paco',
                        email: 'pa@quete.com',
                        username: 'paquete',
                        password: hash,
                    }
                ])
            })
            .then(([dallen, paquete]) => {

                return Post.insertMany([
                    {
                        author: dallen.id,
                        image: 'https://riskracing.com/cdn/shop/articles/a7dd91b2918ba5d7c02c028f50cb48a5_1024x.jpg?v=1623174765',
                        text: 'Race',
                        likes: []
                    },

                    {
                        author: paquete.id,
                        image: 'https://img.pixers.pics/pho_wat(s3:700/FO/55/51/95/89/700_FO55519589_b74f9891feacf0ca445fb13b05f3128e.jpg,700,467,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,417,jpg)/fotomurales-motocross-en-la-puesta-de-sol.jpg.jpg',
                        text: 'Atardecer',
                        likes: [],
                    }
                ])
            })
    })
    .finally(() => data.disconnect())
