import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(() => {
        const db = client.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        return Promise.all([
            users.deleteMany(),
            posts.deleteMany()
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return users.insertMany([
                    { 
                        name: 'Dallen',
                        email: 'dallen@31.com', 
                        username: 'dallen', 
                        password: hash,
                        createdAt: new Date(), 
                        modifiedAt: null 
                    
                    },
                    
                    { 
                        name: 'Paco', 
                        email: 'pa@quete.com', 
                        username: 'paquete', 
                        password: hash,
                        createdAt: new Date(), 
                        modifiedAt: null 
                    }
                ])
            })
            .then(result => {
                const { 0: dallenId, 1: paqueteId } = result.insertedIds

                return posts.insertMany([
                    { 
                        author: dallenId, 
                        image: 'https://riskracing.com/cdn/shop/articles/a7dd91b2918ba5d7c02c028f50cb48a5_1024x.jpg?v=1623174765', 
                        text: 'Race', 
                        createdAt: new Date, 
                        modifiedAt: null,
                        likes: [] 
                    },

                    { 
                        author: paqueteId, 
                        image: 'https://img.pixers.pics/pho_wat(s3:700/FO/55/51/95/89/700_FO55519589_b74f9891feacf0ca445fb13b05f3128e.jpg,700,467,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,417,jpg)/fotomurales-motocross-en-la-puesta-de-sol.jpg.jpg', 
                        text: 'Atardecer', 
                        createdAt: new Date, 
                        modifiedAt: null,
                        likes: [],
                    }
                ])
            })
    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())
