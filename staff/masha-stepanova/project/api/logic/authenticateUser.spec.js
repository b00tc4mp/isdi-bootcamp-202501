import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError, ValidationError, SystemError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user with correct password', () => {
        let returnedUserId

        return User.create({
            name: 'Test Testing',
            email: 'test@testing.com',
            username: 'testing1',
            password: '$2b$12$Glw0xiJmWbN5aYs.O.YC7OWUZ523nFFoET4zoSVWA30n5yRiAmtIG' // hash de 'Patata2!'
        })
            .then(() => authenticateUser('testing1', 'Patata2!'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a('string'))
            .then(() => User.findOne({ username: 'testing1' }).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    it('fails on non-existing user', () => {
        return authenticateUser('eugeni', 'Patata2!')
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but wrong password', () => {
        return User.create({
            name: 'Test Testing',
            email: 'test@testing.com',
            username: 'testing1',
            password: '$2b$12$Glw0xiJmWbN5aYs.O.YC7OWUZ523nFFoET4zoSVWA30n5yRiAmtIG'
        })
            .then(() => authenticateUser('testing1', 'Wrong123!'))
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong credentials')
            })
    })


    it('fails on username not a string', () => {
        return authenticateUser(12345, 'Patata2!')
            .catch(error => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid username syntax')
            })
    })

    it('fails on password not a string', () => {
        return authenticateUser('testing1', 12345678)
            .catch(error => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid password syntax')
            })
    })

    it('fails on empty username', () => {
        return authenticateUser('', 'Patata2!')
            .catch(error => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid username syntax')
            })
    })

    it('fails on empty password', () => {
        return authenticateUser('testing1', '')
            .catch(error => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid password syntax')
            })
    })

    it('fails on short username', () => {
        return authenticateUser('abc', 'Patata2!')
            .catch(error => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid username minLength')
            })
    })

    it('fails on invalid password (no mayúscula, número o símbolo)', () => {
        return authenticateUser('testing1', 'patata')
            .catch(error => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid password minLength') // o 'invalid password syntax'
            })
    })

    it('fails when User.findOne throws error', () => {
        const originalFindOne = User.findOne
        User.findOne = () => { throw new Error('DB failure') }

        return authenticateUser('testing1', 'Patata2!')
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal('DB failure')
            })
            .finally(() => {
                User.findOne = originalFindOne
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
