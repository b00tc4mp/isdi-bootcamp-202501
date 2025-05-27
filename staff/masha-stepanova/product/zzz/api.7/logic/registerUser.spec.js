import 'dotenv/config'
import { data, User } from '../data/index.js'
import { registerUser } from './registerUser.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { DuplicityError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('registerUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on new user', () => {
        let result2

        return registerUser('Test Testing', 'test@testing.com', 'testing', '123123123')
            .then(result => result2 === result)
            .finally(() => expect(result2).to.be.undefined)
            .then(() => User.findOne({ username: 'testing' }).lean())
            .then(user => {
                expect(user.name).to.equal('Test Testing')
                expect(user.email).to.equal('test@testing.com')
                expect(user.username).to.equal('testing')

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on existing user', () => {
        let catchedError

        return User.create({
            name: 'Test Testing',
            email: 'test@testing.com',
            username: 'testing',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => registerUser('Test Testing', 'test@testing.com', 'testing', '123123123'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('user already exists')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})

