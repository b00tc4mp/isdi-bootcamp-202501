import { MongoClient, ObjectId} from 'mongodb'
import bcrypt from 'bcryptjs'

//instancia del cliente de mongo que como parametros pide una url y te proporciona métodos para acceder a la base de datos, desconectarnos, etc. 
const client = new MongoClient('mongodb://localhost:27017')

client.connect() // => retorna una promesa
    .then(() => {
        const db = client.db('test') //=> base de datos 'test' (juguete)

        const users = db.collection('users')
        const posts = db.collection('posts')

        return Promise.all([
            users.deleteMany(),
            posts.deleteMany()
        ])

            .then(() => bcrypt.hash('123123', 10))
            .then(hash => {
                return users.insertMany([
                    { name: 'Arnau', email: 'ar@nau.com', username: 'arnau', password: hash },
                    { name: 'Marc', email: 'marc@arc.com', username: 'marc', password: hash },
                    { name: 'Masha', email: 'ma@sha.com', username: 'mashinsky', password: hash },
                    { name: 'Diver Tido', email: 'diver@tido.com', username: 'diver', password: hash },
                    { name: 'John Doe', email: 'john@doe.com', username: 'john', password: hash }
                ])
            })
            .then(result => {
                const {0: arnauId, 1: marcId, 2: mashaId, 3: diverId, 4: johnId} = result.insertedIds

                return posts.insertMany([
                    { author: johnId, image: 'https://media.giphy.com/media/sTczweWUTxLqg/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'free day!', likes: [marcId, arnauId], createdAt: new Date, modifiedAt: null },
                    { author: diverId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW53Zjk1OWFrMjFyYmV3bDJqc3A5YjJhOHd1Nng3dnhpZjRlaXNtNSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/uQgXjl505BdYAv8H0X/giphy.gif', text: 'i am free!', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: mashaId, image: 'https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'so happy for you... mf', likes: [mashaId], createdAt: new Date, modifiedAt: null }
                ])
            })

        // --- BASE DE DATOS DOCUMENTAL O NO RELACIONAL//NO SQL (MONGO DB) --- 
        // hierarchy => base de datos ('test') > collecciones ('posts', 'users') > documentos (users: 'arnau, masha, etc', posts: '....')

        //should return masha data
        // return users.findOne({ _id: new ObjectId('67dad747c4a65ccf6b1b104c') })

        //should return user collection
        //=> if thrown in mongosh, syntax is: db.users.find() 
        // return users.find().toArray() // =>needs to be parsed cause it returns mongosh documents


        //should return post collection
        //=> if thrown in mongosh, syntax is: db.posts.find()
        // return posts.find().toArray() //=>needs to be parsed cause it returns mongosh documents


        //should return Masha userId
        // return users.insertOne({ name: 'Masha', email: 'ma@sha.com', username: 'mashinsky', password: 'mamama' })

        //should return superman userId
        // return users.insertOne({ name: 'Superman', email: 'super@man.com', username: 'supeeeeer', password: 'sususu' })

        //should return { acknowledged: true, deletedCount: 1 }
        // return users.deleteOne({ _id: new ObjectId('67dc2ee1504f4d2b6a1b0146') })

        //should return postId
        // return posts.insertOne({
        //     author: '67dad4ed3e909e877bb71239', image: 'https://media.giphy.com/media/RDXA1v15uqWru45c4Y/giphy.gif?cid=790b7611q09g8jyfbcaa943ulhpo2y4uxtb9bablp0h1am6t&ep=v1_gifs_search&rid=giphy.gif&ct=g', text: 'meat hand pie', createdAt: new Date, modifiedAt: null, likes: []
        // })

        //should return { acknowledged: true, deletedCount: 1 }
        // return posts.deleteOne({ _id: new ObjectId('67dd8559d2491e40711d0ce8') })

        //should return true
        // return posts.updateOne({ _id: new ObjectId('67dadb3ba9738d9b9ad96ff9') }, { $set: { text: 'f meat hand pie' } })

        //should return true && add Like
        // return posts.updateOne({ _id: new ObjectId('67dadf57628cf6f9c27846da') }, { $set: { likes: [{ _id: new ObjectId('67dab80c3e909e877bb71236') }] } })

        //should return true && remove Like
        // return posts.updateOne({ _id: new ObjectId('67dadf57628cf6f9c27846da') }, { $pull: { likes: { _id: new ObjectId('67dab80c3e909e877bb71236') } } })

        //return true (WIP)
        // db.posts.updateMany(
        //     { userId: { $exists: true } }, // Encuentra documentos con la propiedad "userId"
        //     { $rename: { userId: "author" } } // Renombra "userId" a "author"
        // )
    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())