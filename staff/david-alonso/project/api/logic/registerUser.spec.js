import 'dotenv/config'
import { expect } from 'chai'
import { data, User } from '../data/index.js'
import { registerUser } from './registerUser.js'
import { DuplicityError, SystemError } from '../../com/errors.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

describe('registerUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on new user', () => {
        const name = 'Dallen'
        const email = 'dallen@example.com'
        const password = '123123123'

        return registerUser(name, email, password)
            .then(() => User.findOne({ email }).lean())
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.password).to.be.a('string')
                expect(user.password).to.not.equal(password)
            })
    })

    it('fails on duplicate user', () => {
        const name = 'Dallen'
        const email = 'dallen@example.com'
        const password = '123123123'

        return User.create({ name, email, password })
            .then(() => registerUser(name, email, password))
            .catch(error => {
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal('user already exists')
            })
    })

    it('fails on invalid email', () => {
        let error

        return registerUser('Test', 'invalid-email', '123123123')
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid email syntax')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
