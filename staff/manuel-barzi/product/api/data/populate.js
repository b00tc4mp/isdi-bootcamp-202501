import 'dotenv/config'
import { data, User, Post, Comment, Chat, Message } from '../data/index.js'
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
                    { name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo', password: hash },
                    { name: 'Campa Nilla', email: 'campa@nilla.com', username: 'campanilla', password: hash },
                    { name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: hash },
                    { name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: hash },
                    { name: 'James Hook', email: 'james@hook.com', username: 'jameshook', password: hash },
                    { name: 'Pin Ocho', email: 'pin@ocho.com', username: 'pinocho', password: hash }
                ])
            })
            .then(([pepito, campa, peter, wendy, james, pin]) => {
                return Post.insertMany([
                    {
                        author: pepito.id,
                        image: 'https://media.giphy.com/media/sTczweWUTxLqg/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
                        text: 'free day!',
                        likes: [peter.id, wendy.id],
                        createdAt: new Date(2024, 11, 1),
                        comments: [
                            new Comment({ author: wendy.id, text: 'hello world', createdAt: new Date(2024, 11, 2) }),
                            new Comment({ author: james.id, text: 'pryvit mir', createdAt: new Date(2024, 11, 3) })
                        ]
                    },
                    { author: pepito.id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW53Zjk1OWFrMjFyYmV3bDJqc3A5YjJhOHd1Nng3dnhpZjRlaXNtNSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/uQgXjl505BdYAv8H0X/giphy.gif', text: 'i am free!', createdAt: new Date(2023, 9, 31) },
                    { author: wendy.id, image: 'https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'so happy for you... mf', likes: [peter.id], createdAt: new Date(2025, 2, 10) }
                ])
                    .then(([pepitoPost, pepitoPost2, wendyPost]) => {
                        const comment = new Comment({ author: campa.id, text: 'hola mundo' })

                        pepitoPost.comments.push(comment)

                        return pepitoPost.save()
                    })
                    .then(() => {
                        return Chat.create({
                            participants: [wendy.id, peter.id],
                            messages: [
                                new Message({ author: wendy.id, text: 'i love you' })
                            ]
                        })
                    })
                    .then(chat => {
                        chat.messages.push(new Message({ author: peter.id, text: 'me too, baby' }))

                        return chat.save()
                    })
            })
    })
    .finally(() => data.disconnect())