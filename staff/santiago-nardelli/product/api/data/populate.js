import {MongoClient} from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(()=>{
        const db = client.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        return users.insertOne({
            name:'Diego Maradona',
            email:'diego@maradona.com',
            password:'123456'
        })

    })
    .then(result=>{
        console.log(result)
    })
    .finally(()=>{
        client.close()
    })