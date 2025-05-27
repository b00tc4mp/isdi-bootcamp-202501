//importamos los módulos necesarios
import 'dotenv/config'
import { data } from '../data/index.js'
import { registerUser } from './registerUser.js'

const { MONGO_URL, MONGO_DBNAME } = process.env
/*
-Se establece una conexión con una base de datos de MongoDB.
-Si la conexión se establece exitosamente, entramos en el then y se intenta
registrar un usuario.
-En el caso que no salga bien, se imprimirá un error.
-Pasamos al siguiente then, el cual le decimos que queremos que el resultado
sea undefined ya que no queremos devolver nada. Solo registrar el usuario.
-Desconectamos con finally.
-TEST: node logic/registerUser.test.js
 */

console.info('TEST registerUser')

data.connect(MONGO_URL, MONGO_DBNAME)
    .then(() => {
        try {
            let result2 = null
            return registerUser('Antoni Estrader', 'EstraderToni', '123123aa', 'antoni@estrader.com')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined') )

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error) // Esto es igual a: .catch(error => console.error(error))
    .finally(data.disconnect) // Y esto es igual a: .finally(() => data.disconnect())


/*Hacemos lo mismo que arriba, pero con Promise.all e intentamos registrar los dos
mismos usuarios a la vez. Sí que se crearan porque con Promise.all se ejecutarán exactamente
a la vez. PROBLEM!
-Para hacerlo más robusto: creamos INDICES
    -db.users.createIndex({ email: 1 }, { unique: true })
    -db.users.createIndex({ username: 1 }, { unique: true })
*/
/*
console.info('TEST registerUser')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            return Promise.all([
                registerUser('Scooby Doo', 'Doo Scooby', '123123a', 'scooby@doo.com'),
                registerUser('Scooby Doo', 'Doo Scooby', '123123a', 'scooby@doo.com')
            ])
               
        } catch (error) {
            console.error(error)
        }
    })
    .then(result => {
        console.assert(result === undefined, 'result is undefined')
    })
    .catch(console.error) // Esto es igual a: .catch(error => console.error(error))
    .finally(data.disconnect) // Y esto es igual a: .finally(() => data.disconnect())
*/
