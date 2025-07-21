
import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data //recordemos que he importado en data/index el object id
const { SystemError, NotFoundError } = errors

/*
-La función getUserName recibe userId, que es el ID del usuario que se quiere buscar
en la base de datos.
-Se valida userId.
-Se busca en la colección users de la base de data un documento que coincida con _id.
Se convierte el userId en un ObjectId de Mongo ya que asi se identifican los documentos.
-FindOne devuelve null si no encuentra el usuario, si lo encuentra pasamos al siguiente then.
-System error si hay un error al acceder a la base de datos o a la conexión.
-Este then verifica si el usuario existe:
        -Si no existe devuelve un NotFoundError
        -Si existe, devuelve el nombre del usuario.
TEST: node logic.getUserName.test.js
-Una vez modificado index de api, comprobamos API: test/get-username.sh
*/

export const getUserName = userId => { 
        validate.id(userId, 'userId')

        return data.users.findOne({ _id: new ObjectId(userId) })
                .catch(error => { throw new SystemError(error.message) }) 
                .then(user => {
                        if(!user) throw new NotFoundError ('user not found')

                        return user.name
                })
}