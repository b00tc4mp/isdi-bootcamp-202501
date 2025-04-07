import 'dotenv/config' // Carga variables de entorno desde un archivo .env
import { data, User } from '../data/index.js'
import { getUserName } from './getUserName.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB} = process.env // Credenciales de la base de datos obtenidas de las variables de entorno.
const { ObjectId } = Types // Permite generar un ID válido de MongoDB

describe('getUserName', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB)) // Conectar a la base de datos antes de correr los tests

    beforeEach(() => User.deleteMany({})) // Vaciar la base de datos antes de cada test

    it('succeeds on existing user', () => { // TEST 1: Verificamos que getUserName funcione correctamente cuando el usario existe
        let returnedName // Declaramos una variable para almacenar el nombre devuelto por la función.

        return User.create({ // Creamos un usuario en la base de datos
            name: 'Marc',
            email: 'marc@ramos.com',
            username: 'marcramos',
            password: '$2b$10$urTZjniY1WuYD3DO9wLQquGoJrZPt2S2NcaJ/PV/ot1zPwB7GJ/kS'
        })
            .then(user => getUserName(user.id)) // LLamamos a getUserName con el Id del usuario que acabamos de crear.
            .then(name => returnedName = name) // Si getUserName devuelve un nombre, se almacena en returnedName
            .finally(() => expect(returnedName).to.equal('Marc')) // Verificamos que el nombre devuelto sea "Marc"
    })

    it('fails on non-existing user', () => { // TEST 2: Verificamos que getUserName lance un error si el usuario no existe
        let catchedError // Variable para almacenar el error capturado

        return getUserName(new ObjectId().toString()) // Se llama a getUserName con un Id que no exisste en la base de datos
            .catch(error => catchedError = error) // Si getUserName lanza un error, se guarda en catchedError
            .finally(() => {
                // Se verifica que el error sea una instancia de NotFoundError y que el mensaje sea "user not found".
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({})) // Vaciar la base de datos después de cada test

    after(() => data.disconnect()) // Desconectar la base de datos al finalizar los tests
})

/*
Resumen
Este test valida:

Que getUserName devuelva el nombre correcto cuando el usuario existe.

Que getUserName lance un NotFoundError si el usuario no existe.

Que la base de datos esté limpia antes y después de cada test.

Que se conecte y desconecte de MongoDB correctamente.
*/