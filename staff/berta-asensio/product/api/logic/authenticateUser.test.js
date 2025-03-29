//importamos los módulos necesarios
import 'dotenv/config'
import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'

const { MONGO_URL, MONGO_DBNAME} = process.env
/*
-Se establece una conexión con una base de datos de MongoDB.
-Si la conexión se establece exitosamente, entramos en el then y se intenta
verificar un usuario.
-Se llama a la función authenticateUser con sus parametros. Ésta función devuelve
una promesa que en el caso de ser exitosa, resolverá el userId del usuario.
-Se asigna pues el id devuelto por authenticate user a la variable userId, en el caso de no 
ser encontrado, devolverá undefined.
-Se verificará si o si con un finally() que el tipo de userId devuelto sea una cadena de caracteres.
-Capturamos cualquier error ocurrido durante el proceso de autenticación.
-El último finally se desconecta de la base de datos.
-TEST: node logic/authenticate.test.js
 */

console.info('TEST authenticateUser')

data.connect(MONGO_URL, MONGO_DBNAME)
    .then(() => {
        try {
            let userId //undefined

            return authenticateUser('MayaBee', '123123aa')
                .then(id => userId = id) //si el id coincide, lo guarda en la variable userId.
                .finally(() => console.assert(typeof userId === 'string', 'userId is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
