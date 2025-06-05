import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DBNAME} = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DBNAME))

    beforeEach(() => User.deleteMany({}))

    it('Usuario existente', () => {
        let returnedUserId

        return User.create({
            name: 'Abeja Maya',
            username: 'MayaBee',
            password: '$2b$10$3VGV4ikMrowelNGSbtgGG.5nhJmWYJx8F3U4ZWVLnT/wiyHQNbQQm',
            email: 'abeja@maya.com'
        })
            .then(() => authenticateUser('MayaBee', '123123aa'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ username: 'MayaBee'}).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    it('Usuario no existente', () => {
        let catchedError

        return authenticateUser('MayaBee', '123123aa')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.be.equal('user not found')
            })
    })

    it('Usuario existente pero contraseña erronea', () => {
        let catchedError

        return User.create({
            name: 'Abeja Maya',
            username: 'MayaBee',
            password: '$2b$10$3VGV4ikMrowelNGSbtgGG.5nhJmWYJx8F3U4ZWVLnT/wiyHQNbQQm',
            email: 'abeja@maya.com'
        })
            .then(() => authenticateUser('MayaBee', '123123123'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('wrong credentials')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())

})

/*
-DEFINE: se define un bloque de pruebas llamado 'authenticateUser'
-BEFORE: antes de ejecutar las pruebas, se conecta a la base de datos.
-BEFORE EACH: antes de cada prueba, se limpia la base de datos de User.
-IT 1: happy path:
    -El objetivo de este IT es comprobar que la autenticación de un usuario existente funciona.
    -Se declara returnedUserId que almacenará el ID del usuario autenticado.
    -Se crea un usuario manualmente para hacer la simulación (password en hash)
    -THEN 1: se llama a la lógica para que autentique al usuario.
    -THEN 2: si la logica es exitosa, se pasa a este then donde se asigna a reutnredUserId el ID del 
    usuario retornaod por la lógica.
    -FINALLY: se espera que returnedUserId sea un string válido, lo que indica
    que se devolvió un ID de usuario.
    -THEN 3: se busca en la base de datos un usuario con el username que queremos verificar.
    -THEN 4: se pasa el _id del usuario encontrado a string y se espera que coincida con returnedUserId.
-IT 2: unhappy path: 

*/ 