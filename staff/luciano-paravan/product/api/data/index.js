import mongoose, { Types } from 'mongoose'
import { errors } from 'com'
import { User, Post } from './models.js'

const { SystemError } = errors

// Creamos el objeto data, y lo exportamos
const data = {
    //usamos el metodo connect
    connect(url, dbName) {
        return mongoose.connect(`${url}/${dbName}`)
            .catch(error => new SystemError(error)) //maneja los errores que puedan ocurrir durante la conexion. Si ocurre un error crea una nueva instancia de System error y la pasa a la promesa rechazada.
    },

    disconnect() {
        return mongoose.disconnect()
    }, //Cierra la conexion con el servidor. Devuelve una promesa que se resuelve cuando la conexión se cierra correctamente.

}

export {
    data,
    User,
    Post
}