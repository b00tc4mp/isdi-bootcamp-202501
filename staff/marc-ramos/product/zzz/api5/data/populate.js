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
                    { name: 'Marc', email: 'marc@ramos.com', username: 'marcramos13', password: hash },
                    { name: 'Arnau', email: 'arnau@sots.com', username: 'arnausots', password: hash },
                    { name: 'Paula', email: 'pau@lita.com', username: 'paulita', password: hash },
                    { name: 'Eugeni', email: 'eugeni@castells.com', username: 'eugeni', password: hash }
                ])
            })
            .then(result => {
                const { 0: marcId, 1: arnauId, 2: paulaId, 3: eugeniId} = result.insertedIds

                return posts.insertMany([
                    { author: marcId, image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2dobXduOWp0dXBhdWsyZG5yeTE3OXRqcjcyaDZsbWYxZjN0cWJpNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pVWuLuV1JESZJdebkI/giphy.gif', text: 'solo', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: arnauId, image: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2JrcDM5NWhqcGhlZW9nZHo2amR1YXQ2Z2tiYjF3YXlxMmt6eGNkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0IybQ6l8nfKjxQv6/giphy.gif', text: 'happy', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: marcId, image: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHl5YTdxaGo5dzNoMHZqdGJxMmRlMzQ4cXcwajNibXI4Nmt2eWpuaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/INxBytJzmnaATWSD44/giphy.gif', text: 'solo leveling', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: eugeniId, image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc254aTVqbmlobHU4YWl1aGxiMnpudGs1ZTNoeHFvZTF2OTY3dGs5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/shkh5vfrJ56BAoeWqt/giphy.gif', text: 'I like frieren', likes: [], createdAt: new Date, modifiedAt: null }
                ])
            })
        })
        .then(result => {
            console.log(result)
        })
        .finally(() => client.close())

        // return users.insertOne({ name: 'Paulita', email: 'paula@galindo.com', username: 'paulita', password: '123123123'})
        
        // visualizamos los users
        //return users.find().toArray() 
        
        // delete post
        // return users.deleteOne({ _id: new ObjectId('67dae6855684ca78f8d6f4f7') })

        // visualizamos los posts
         //return posts.find().toArray() 
        
        // create a post
        // return posts.insertOne({ author: '67dab819946509559c3fa81e', image: 'https://media.giphy.com/media/shkh5vfrJ56BAoeWqt/giphy.gif?cid=790b7611or5b4ap8btdrs8j5ez3a53aec0z2zf4nb1cwnnna&ep=v1_gifs_search&rid=giphy.gif&ct=g', text: 'frieren', createdAt: new Date, modifiedAt: null})

        // modify users
        // return users.updateOne({ name: 'Arnau' }, { $set: { age: 25}})