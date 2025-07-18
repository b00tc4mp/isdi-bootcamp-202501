import 'dotenv/config'
import { User, Post, data, ObjectId } from './index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123123'))
            .then(hash => {
                return User.insertMany([
                    {
                        name: "Sergi",
                        email: "ser@gi.com",
                        username: "serchi",
                        password: hash,
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        name: "Aaron",
                        email: "aa@ron.com",
                        username: "aaron",
                        password: hash,
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        name: "Eugeni",
                        email: "eu@geni@.com",
                        username: "eugeni",
                        password: hash,
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        name: "Luciano",
                        email: "luci@ano.com",
                        username: "lucho",
                        password: hash,
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        name: "Victor",
                        email: "vic@tor.com",
                        username: "victor",
                        password: hash,
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        name: "Arnau",
                        email: "ar@nau.com",
                        username: "arnau",
                        password: hash,
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        name: "Marc",
                        email: "ma@rc.com",
                        username: "marc",
                        password: hash,
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                ])
            })

        // inseratr un usuario
        // return users.insertOne({ name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo', password: '123123123' })

        // return posts.insertOne({
        //     author: new ObjectId('67dad2afd0ca2ef28db71237'), image: "https://images.moviesanywhere.com/fb2b794375535661f04b0e79c1205b90/c5f1f717-e215-4486-9f45-ae29fe5108e5.jpg?w=2560&r=16x9", text: "Hello my new friends!", createdAt: new Date, modifiedAt: null
        // })

        // return users.deleteOne({ _id: new ObjectId('67dad2afd0ca2ef28db71237') })

        // return users.find().toArray()

        // return posts.find().toArray()

        // return posts.findOne({ _id: new ObjectId('67dae7f7353bd56d3ba57bc0') })

        // return posts.updateMany({ modifiedAt: null }, { $set: { likes: [] } })



    })
    .then(result => { console.log(result) })
    .finally(() => client.close())

