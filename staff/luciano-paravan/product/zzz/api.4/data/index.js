import { MongoClient, ObjectId } from 'mongodb'
import { errors } from 'com'

// Importamos MongoClient que es la clase que nos permite conectarnos a Mongodb

// Necesito conectarme con mongo, desconectarme, y los modelos de datos (las colecciones)
const { SystemError } = errors

let client

// Creamos el objeto data, y lo exportamos
export const data = {
    users: null,
    posts: null,

    //usamos el metodo connect
    connect(url, dbName) {
        return (client = new MongoClient(url)).connect()
            .catch(error => new SystemError(error)) //maneja los errores que puedan ocurrir durante la conexion. Si ocurre un error crea una nueva instancia de System error y la pasa a la promesa rechazada.

            //se ejecuta .then si la conexion se establece correctamente
            .then(client => { //Si logra conectarse traigo al cliente, y lo que quiero es la base de datos
                const db = client.db(dbName)

                data.users = db.collection('users')
                data.posts = db.collection('posts')
            })
    },

    disconnect() {
        return client.close()
    }, //Cierra la conexion con el servidor. Devuelve una promesa que se resuelve cuando la conexión se cierra correctamente.

    ObjectId //Estoy exportando el ObjectId para despues usarlo en getUserName por ej
}