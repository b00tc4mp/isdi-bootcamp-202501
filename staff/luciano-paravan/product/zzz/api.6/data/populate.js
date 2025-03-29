import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const client = new MongoClient('mongodb://localhost:27017') //con MongoClient vamos a crear un cliente que conecta con Mongo. Es para conectar el cliente al servidor con Node, nos conectamos a Mongo.

client.connect()
    .then(() => {
        const db = client.db('test') //le decis client quiero usar la db 'test', devuelve la db que vamos a usar.

        const users = db.collection('users') //le decis quiero usar la collection users.
        const posts = db.collection('posts') // ... quiero usar la collection posts.

        return Promise.all([
            users.deleteMany(),
            posts.deleteMany()
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return users.insertMany([
                    { name: 'Diego Armando', email: 'diego@armando.com', username: 'maradona', password: hash },
                    { name: 'Campa Nilla', email: 'campa@nilla.com', username: 'campanilla', password: hash },
                    { name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: hash },
                    { name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: hash },
                    { name: 'James Hook', email: 'james@hook.com', username: 'jameshook', password: hash },
                    { name: 'Pin Ocho', email: 'pin@ocho.com', username: 'pinocho', password: hash }
                ])
            })
            //recordar que las promesas para encadenarlas hay que retornarlas.
            .then(result => {
                const { 0: diegoId, 1: campaId, 2: peterId, 3: wendyId, 4: jamesId, 5: pinId } = result.insertedIds

                return posts.insertMany([
                    { author: diegoId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHAwM2FyeHVmdTlhaXltdHF2NWkwYnprcm5reHY3M2FwbmkwMXE4bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dyuc5DfSUg1RGg8P3p/giphy.gif', text: 'Ok!', likes: [peterId, wendyId], createdAt: new Date, modifiedAt: null },
                    { author: diegoId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWc2b2lteHdsamxtOHQybTB1ZXEzZnA4dXYwbWQ1MnVmcmU5ZjI2ciZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/t3sZxY5zS5B0z5zMIz/giphy.gif', text: 'Yeeeeah!', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: wendyId, image: 'https://media.giphy.com/media/nk2C49mUNljb1scZgY/giphy.gif?cid=82a1493baqn7wxjf3ggljih51junamh33chxnevceuvfppe8&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'so happy for you... mf', likes: [peterId], createdAt: new Date, modifiedAt: null }
                ])
            })
    })
    .then(result => {
        console.log(result)
    }) //esto devuelve un resultado con la insercion.
    .finally(() => client.close()) //se hace un finally para desconectar, que cierre la conexion y no se quede abierta.
