//importamos MongoClient, que nos conecta mongobd con Node.js
import { MongoClient } from 'mongodb'
//importamos bcrypt para hashear los passwords
import bcrypt from 'bcryptjs'

//creamos una nueva instancia con el puerto por defecto de mongoDB(27017)
const client = new MongoClient('mongodb://localhost:27017')

/*
-Se inicia conexión con Mongo, lo cual devuelve una promesa.
-Una vez conectados, se accede a la base de datos test.
-Y se obtiene de allí las colecciones users y posts.
-Eliminamos todos los documentos de ambas colecciones y hacemos que se ejecuten en paralelo (promise.all).
-Insertamos usuarios en la colección users con insertMany(). InsertMany() devuelve un objeto con los ID de mongo.
-result.insertedIds contiene los IDs generados y se almacenan cada uno en una variable.
-Se insertan publicaciones en la colección de posts.
-Se imprimen los datos insertados.

*/
client.connect()
    .then(() => {
        const db = client.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')
        
        return Promise.all([
            users.deleteMany(),
            posts.deleteMany()
        ])
            .then(() => bcrypt.hash('123123aa', 10))
            .then(hash => {
                return users.insertMany([
                    { name: 'Abeja Maya', username: 'MayaBee', password: hash, email: 'abeja@maya.com' },
                    { name: 'Pantera Rosa', username: 'PinkPanter', password: hash, email: 'pantera@rosa.com' },
                    { name: 'Daisy Donald', username: 'DonnyDaisy', password: hash, email: 'daisy@donald.com' },
                    { name: 'Minnie Mouse', username: 'MousMin', password: hash, email: 'minnie@mouse.com' },
                    { name: 'Goffrey Hall', username: 'HallGoff', password: hash, email: 'goffrey@hall.com' },
                    { name: 'Pato Donald', username: 'DonnyDuck', password: hash, email: 'pato@donald.com' }
                ])
            })
            .then(result => {
                const { 0: abejaId, 1: panteraId, 2: daisyId, 3: minnieId, 4: goffreyId, 5: patoId } = result.insertedIds

                return posts.insertMany([
                    { author: abejaId, image: 'https://media.giphy.com/media/oz4jYoMA0IFTgvmPXL/giphy.gif?cid=790b761146ukyp856nlwgke17khtixuq5olqa7whl801ve4g&ep=v1_gifs_search&rid=giphy.gif&ct=g', text: 'I love honey!!', likes: [daisyId, patoId], createdAt: new Date, modifiedAt: null },
                    { author: panteraId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejB1N3g0aHVjOHQ3djl0Yzd2NmVhano1N3JuaG51Z3FtajB1MzhvdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rtvLZ7DKtjvjO/giphy.gif', text: 'Orghh....', likes: [minnieId, patoId], createdAt: new Date, modifiedAt: null },
                    { author: minnieId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJ1MG5jYXhuZzI1eXl6dzBuNzIybXdzbnZiNjU5ems2dzBhaW1waiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/L45Nt0ttUm4zZ3kmex/giphy.gif', text: 'Dancing with my love..', likes: [goffreyId], createdAt: new Date, modifiedAt: null }
                ])
            })
    })
    .then(result => {
        console.log(result)
    })

    .finally(() => client.close())