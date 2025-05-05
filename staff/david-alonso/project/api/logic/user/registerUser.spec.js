import 'dotenv/config'
import { expect } from 'chai'
import { data, User } from '../../data/index.js'
import { registerUser } from './registerUser.js'
import { DuplicityError } from 'com/errors.js'

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
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => registerUser('Dallen', 'dallen@example.com', '123123123'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('user already exists')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
