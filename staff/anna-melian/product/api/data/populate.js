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
                    { name: 'Harry Potter', email: 'harry@potter.com', username: 'GryffindorSeeker', password: hash },
                    { name: 'Hermione Granger', email: 'hermione@granger.com', username: 'Granger', password: hash },
                    { name: 'Ron Weasly', email: 'ron@weasly.com', username: 'QuidditchFan', password: hash }

                ])
            })
            .then(([harry, hermione, ron]) => {
                return Post.insertMany([
                    { author: harry.id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWl4dmRudTRlY3Vnb281emp0bG1ldnhsY3l0bWxxb2Zhb3Y5ODdmaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mz1kJeDVueKC4/giphy.gif', text: 'Searching my wand', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: hermione.id, image: 'https://media.giphy.com/media/IWvuFVQICQIr6/giphy.gif?cid=790b76118lomln5febmjku33rteti54ptvt8t5jlohw9bday&ep=v1_gifs_search&rid=giphy.gif&ct=g', text: 'It is leviosa, not leviosaaa', likes: [harry.id], createdAt: new Date, modifiedAt: null },
                    { author: ron.id, image: 'https://media.giphy.com/media/pFpzB1pzgxPbO/giphy.gif?cid=ecf05e47uuhdysbzcvo3gyffduh3evpfs9zqmwqh389bfq4o&ep=v1_gifs_search&rid=giphy.gif&ct=g', text: 'Nice to meet you!', likes: [hermione.id], createdAt: new Date, modifiedAt: null }
                ])
            })
    })
    .finally(() => data.disconnect())