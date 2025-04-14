import 'dotenv/config'
import { data, User } from "../data/index.js"
import { getSelfUser } from "./getSelfUser.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getSelfUser', () => {
    let userId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        // Limpiar la base de datos antes de cada test
        return User.deleteMany({})
    })

    it('succeeds at getting own user', () => {
        // Creamos un usuario para hacer la prueba
        return User.create({
            name: 'Test User',
            email: 'test@user.com',
            username: 'testuser',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()  // Guardamos el userId para la búsqueda
                return getSelfUser(userId)  // Llamamos a la lógica para obtener el usuario
            })
            .then(user => {
                // Verificamos que los datos del usuario sean correctos
                expect(user).to.exist
                expect(user._id.toString()).to.equal(userId)
                expect(user.name).to.equal('Test User')
                expect(user.email).to.equal('test@user.com')
                expect(user.username).to.equal('testuser')
            })
    })

    it('fails at user not found', () => {
        const nonExistentUserId = '605c72ef1532073d4a8b4e0e'  // Un ID que no existe en la base de datos

        return getSelfUser(nonExistentUserId)  // Intentamos obtener un usuario inexistente
            .catch(error => {
                // Verificamos que se lance el error esperado
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})