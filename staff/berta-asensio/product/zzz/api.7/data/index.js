/*
IMPORTACIONES: 
    -mongoose: biblioteca para conectarse y trabajar con MongoDB.
    -Types: contiene tipos especiales de Mongoose, como ObjectId.
    -Errors
    -User y Post de models
EXTRACCIONES:
    -ObjectId, para manejar los Ids únicos de Mongo.
    -System error.
*/
import mongoose, { Types } from 'mongoose'
import { errors } from 'com' 
import { User, Post } from './models.js'

const { SystemError } = errors

/*
Creamos objecto data con dos funciones:
    -Connect(url, dbName): 
        -Conecta MongoDB usando mongoose.connect(url/dbName)
        -Si falla, captura error y lo maneja con un SystemError
    -Disconnect: desconecta la base de datos con mongoose.
Exportamos ObjectId, data y models para acceder a ellos desde otros módulos en un mismo recipiente.
 */
const data = {
    connect(url, dbName) {
        return mongoose.connect(`${url}/${dbName}`)
            .catch(error => { throw new SystemError(error.message) })
    },

    disconnect() {
        return mongoose.disconnect()
    }
}

export {
    data,
    User,
    Post,
}