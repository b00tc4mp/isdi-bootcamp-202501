import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserUserName } from './getUserUserName.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DBNAME } = process.env
const { ObjectId } = Types

describe('getUserUserName', () => {
    before(() => data.connect(MONGO_URL, MONGO_DBNAME))
    

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user', () => {
        let returnedUserName

        return User.create({
            name: 'Abeja Maya',
            username: 'MayaBee',
            password: '$2b$10$3VGV4ikMrowelNGSbtgGG.5nhJmWYJx8F3U4ZWVLnT/wiyHQNbQQm',
            email: 'abeja@maya.com'
        })
            .then(user => getUserUserName(user.id))
            .then(username => returnedUserName = username)
            .finally(() => expect(returnedUserName).to.equal('MayaBee'))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return getUserUserName(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())


})

/*
-DESCRIBE: definimos bloque de pruebas llamado getUserName.
-BEFORE: antes de ejecutar las pruebas, conectamos con la base de datos.
-BEFORE EACH: antes de ejecutar cada prueba, limpiamos la colección de Users.
-IT 1 happy path:
    -Declaramos variable returnedName donde almacenaremos el resultado de la función de la lógica.
    -Creamos un usuario manualmente para poder simular la prueba (password en hash)
    -THEN 1: llamamos a la lógica y le pasamos el id del usuario creado
    -THEN 2: al resolver la promesa, devolvemos el nombre del usuario guardado en returnedName
    -FINALLY: esperamos que returnedName sea igual al nombre que hemos pasado.
    (En este caso, cuando creamos el usuario manualmente, Mongo crea un ObjectId el cual mongoose convierte
    directamente a string cuando lo accedemos en la función como user.id)
-IT 2: unhappy path:
    -Declaramos una variable donde almacenaremos el resultado (que en este caso será el error dominado)
    -Llamamos a la lógica con un new ObjectId (creamos un object id aleatorio para simular un usuario inexistente)
    y lo pasamos a string.
    -Capturamos cualquier error y lo guardamos en nuestra variable catchedError. (tanto un error cualquiera como el nuestro dominado)
    -Finalmente:
        -Esperamos que el error capturado sea Not Found User.
        -Esperamos que el mensaje de respuesta sea user not found.
*/


