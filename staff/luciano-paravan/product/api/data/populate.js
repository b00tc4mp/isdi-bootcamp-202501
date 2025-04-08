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
                    { name: 'Diego Armando', email: 'diego@armando.com', username: 'maradona', password: hash },
                    { name: 'Luciano Para', email: 'luc@gmail.com', username: 'luciano', password: hash },
                    { name: 'Claudio Caniggia', email: 'claudio@pol.com', username: 'caniggia', password: hash },
                    { name: 'Eugeni Castells', email: 'eu@geni.com', username: 'eugeni', password: hash },
                    { name: 'Ricardo Caruso', email: 'ricardo@gmail.com', username: 'caruso', password: hash },
                    { name: 'Aaron Barrios', email: 'aaron@gmail.com', username: 'aaron', password: hash }
                ])
            })
            .then(([diego, luciano, pajaro, eugeni, caruso, aaron]) => {
                return Post.insertMany([
                    {
                        author: diego.id,
                        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHAwM2FyeHVmdTlhaXltdHF2NWkwYnprcm5reHY3M2FwbmkwMXE4bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dyuc5DfSUg1RGg8P3p/giphy.gif',
                        text: 'Ok!',
                        likes: [caruso.id, aaron.id],
                        createdAt: new Date(2024, 11, 1),
                        comments: [
                            new Comment({ author: luciano.id, text: 'el mas grande', createdAt: new Date(2024, 11, 4) }),
                            new Comment({ author: eugeni.id, text: 'el 10', createdAt: new Date(2024, 11, 2) })]
                    },
                    {
                        author: luciano.id,
                        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWc2b2lteHdsamxtOHQybTB1ZXEzZnA4dXYwbWQ1MnVmcmU5ZjI2ciZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/t3sZxY5zS5B0z5zMIz/giphy.gif',
                        text: 'Yeeeeah!',
                        likes: [eugeni.id],
                        createdAt: new Date(2023, 9, 31)
                    },
                    { author: eugeni.id, image: 'https://media.giphy.com/media/nk2C49mUNljb1scZgY/giphy.gif?cid=82a1493baqn7wxjf3ggljih51junamh33chxnevceuvfppe8&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'so happy for you... mf', likes: [pajaro.id], createdAt: new Date(2025, 2, 10) }
                ])
                    .then(([diegoPost, lucianoPost, eugeniPost]) => {
                        const comment = new Comment({ author: diego.id, text: 'el diego 10' })

                        lucianoPost.comments.push(comment)

                        return lucianoPost.save()
                    })
                    .then(() => {
                        return Chat.create({
                            participants: [diego.id, luciano.id],
                            messages: [
                                new Message({ author: diego.id, text: 'que haces?' })
                            ]
                        })
                    })
                    .then(chat => {
                        chat.messages.push(new Message({ author: luciano.id, text: 'dieeeego' }))

                        return chat.save()
                    })
            })
    })
    .finally(() => data.disconnect())
