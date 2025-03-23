import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(() => {
        const db = client.db('test')

        const users = db.collection('users')

        const posts = db.collection('posts')

        // insertamos un usuario
        // return users.insertOne({ name: 'Paulita', email: 'paula@galindo.com', username: 'paulita', password: '123123123'})
        
        // visualizamos los users
        //return users.find().toArray() 
        
        // delete post
        // return users.deleteOne({ _id: new ObjectId('67dae6855684ca78f8d6f4f7') })

        // visualizamos los posts
         return posts.find().toArray() 
        
        // create a post
        // return posts.insertOne({ author: '67dab819946509559c3fa81e', image: 'https://media.giphy.com/media/shkh5vfrJ56BAoeWqt/giphy.gif?cid=790b7611or5b4ap8btdrs8j5ez3a53aec0z2zf4nb1cwnnna&ep=v1_gifs_search&rid=giphy.gif&ct=g', text: 'frieren', createdAt: new Date, modifiedAt: null})

        // modify users
        // return users.updateOne({ name: 'Arnau' }, { $set: { age: 25}})
    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())