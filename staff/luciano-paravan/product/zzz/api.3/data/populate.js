import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://localhost://27017') //con MongoClient vamos a crear un cliente que conecta con Mongo. Es para conectar el cliente al servidor con Node, nos conectamos a Mongo.

client.connect()
    .then(() => {
        const db = client.db('test') //le decis client quiero usar la db 'test', devuelve la db que vamos a usar.

        const users = db.collection('users') //le decis quiero usar la collection users.
        const posts = db.collection('posts') // ... quiero usar la collection posts.

        return users.insertOne({ name: 'phepito', email: 'pep@ito.com', username: 'phepitogrilho', password: '123123123' })  //recordar que las promesas para encadenarlas hay que retornarlas.
    })
    .then(result => {
        console.log(result)
    }) //esto devuelve un resultado con la insercion.
    .finally(() => client.close()) //se hace un finally para desconectar, que cierre la conexion y no se quede abierta.
