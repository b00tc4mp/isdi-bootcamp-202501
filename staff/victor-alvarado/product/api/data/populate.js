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
                    { name: 'IronMan', email: 'iron@man.com', username: 'ironMan', password: hash },
                    { name: 'Grood', email: 'grood@grood.com', username: 'grood', password: hash },
                    { name: 'spiderMan', email: 'spider@man.com', username: 'spiderMan', password: hash },
                    { name: 'hulk', email: 'hulk@verde.com', username: 'hulk', password: hash }
                ])
            })
            .then(([ironMan, grood, spiderman, hulk]) => {
                return Post.insertMany([
                    { author: ironMan.id, image: 'https://media1.tenor.com/m/McY9R4_xYOIAAAAC/iron-man-tony-stark.gif', text: 'Soy iron man', likes: [GroodId, spiderManId], createdAt: new Date, modifiedAt: null },
                    { author: grood.id, image: 'https://media4.giphy.com/media/R97jJCEGEmh0I/giphy.gif?cid=6c09b95230ylflnu6jpg29lusjfb0815mklm1ts7x7p33z6t&ep=v1_gifs_search&rid=giphy.gif&ct=g', text: 'hola', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: spiderman.id, image: 'https://media1.tenor.com/m/6qYEVu_G1wkAAAAC/ninja-aranha.gif', text: 'hola!!', likes: [], createdAt: new Date, modifiedAt: null }
                ])
            })
    })

    .finally(() => data.disconnect())