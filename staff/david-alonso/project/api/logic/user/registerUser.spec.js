import 'dotenv/config'
import { expect } from 'chai'
import { data, User } from '../../data/index.js'
import { registerUser } from './registerUser.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import * as bcryptModule from 'bcryptjs'

const { MONGO_URL, MONGO_DB_TEST } = process.env

describe('registerUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on new user', () => {
        let user2

        return registerUser('Dallen', 'dallen@example.com', '123123123')
            .then(() => User.findOne({ email: 'dallen@example.com' }).lean())
            .then(user => user2 = user)
            .finally(() => {
                expect(user2.name).to.equal('Dallen')
                expect(user2.email).to.equal('dallen@example.com')
            })
    })

    it('fails on already existing user', () => {
        let catchedError

        return User.create({
            name: 'Dallen',
            email: 'dallen@example.com',
            password: '$2b$10$fakeHash'
        })
            .then(() => registerUser('Dallen', 'dallen@example.com', '123123123'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('user already exists')
            })
    })

    // Error al hacer User.findOne
    it('fails when User.findOne throws', () => {
        const original = User.findOne
        User.findOne = () => Promise.reject(new Error('db find error'))

        let error

        return registerUser('Test', 'test@example.com', '123123123')
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal('db find error')
                User.findOne = original
            })
    })



    // Error inesperado al hacer User.create
    it('fails when User.create throws non-duplicity error', () => {
        const original = User.create
        User.create = () => Promise.reject(new Error('unexpected create error'))

        let error

        return registerUser('Test', 'test3@example.com', '123123123')
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal('unexpected create error')
                User.create = original
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
