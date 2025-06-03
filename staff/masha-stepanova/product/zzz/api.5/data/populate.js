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
            posts.deleteMany
        ])
        // .then(() => bcrypt.hash(''))

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

