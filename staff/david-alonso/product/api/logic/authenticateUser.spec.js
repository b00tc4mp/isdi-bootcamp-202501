import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    // Si el usuario existe
    it('succeeds on existing user', () => {
        let returnedUserId

        return User.create({
            name: 'David',
            email: 'dallen@31.com',
            username: 'dallen',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => authenticateUser('dallen', '123123123'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ username: 'dallen' }).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    // Algo falla en un usuario inexistente
    it('fails on non-existing user', () => {
        let catchedError

        return authenticateUser('dalle', '123123123')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    // Usuario existente pero la contraseña es incorrecta
    it('fails on existing user but wrong password', () => {
        let catchedError

        return User.create({
            name: 'David',
            email: 'dallen@31.com',
            username: 'dallen',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => authenticateUser('dallen', '123456789'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('wrong credentials')
            })

    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})