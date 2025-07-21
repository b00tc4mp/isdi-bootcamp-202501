//importamos MongoClient, que nos conecta mongobd con Node.js
import { MongoClient } from 'mongodb'

//creamos una nueva instancia con el puerto por defecto de mongoDB(27017)
const client = new MongoClient('mongodb://localhost:27017')

/*
-Conectamos el cliente con el servidor a partir de la promesa connect()
-Cuando la conexión es exitosa, se ejecuta la función dentro del then
-Se accede a la base de datos 'tests' (en la terminal)
-Se obtienen la colección de usuarios y de posts
-El siguiente then imprime por consola el resultado (por ejemplo, true y el _id del usuario creado)
-Siempre se ejecutará finally y cerrará la conexión con MongoDB para liberar recursos.
*/
client.connect()
    .then(connection => {
        const db = client.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')
        
        return posts.insertOne({
            author: '67dd4f2d77dca18baab7123a',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamZ3cm4zbmlrdWY0bDljNndpc2Z4cnZuZWJuMmhjaTE2dXZ2Mmh6dyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AQ7GWTm9iBxaU/giphy.gif',
            text: 'I love this girl',
            createdAd: new Date(),
            modifiedAt: null
        })
    })
    .then(result => {
        console.log('Post subido', result)
    })

        /*
        return users.insertMany([
            { name: 'Daisy Donald', username: 'DonnyDaisy', password: '123123aa', email: 'daisy@donald'},
            { name: 'Scooby Doo', username: 'DooScooby', password: '123123aa', email: 'scooby@doo'},
            { name: 'Goffrey Hall', username: 'HallGoff', password: '123123aa', email: 'goffrey@hall'}
        ])
        
    })
    .then(result => {
        console.log('Usuarios creados', result)
    })
    */
    .finally(() => client.close())