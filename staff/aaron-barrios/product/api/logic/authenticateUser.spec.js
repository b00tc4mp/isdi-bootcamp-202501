import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeds on existing user', () => {
        let returnedUserId

        return bcrypt.hash('eueueu', 10)
            .then(hash => User.create({
                name: 'Eu Geni',
                email: 'eu@geni.com',
                username: 'eugeni',
                password: hash
            }))
            .then(() => authenticateUser('eugeni', 'eueueu'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ username: 'eugeni' }).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    it('fails on existing user', () => {
        let catchedError

        return authenticateUser('eugeni', 'eueueu')
            .catch(error => catchedError = error)
            .finally(() => {
                expect (catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found!')
            })
    })

    it('fails on existing user but wrong password', () => {
        let catchedError

        return User.create({
                name: 'Eu Geni',
                email: 'eu@geni.com',
                username: 'eugeni',
                password: 'eueueu'
            })
            .then(() => authenticateUser('eugeni', 'eueueu'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('Wrong credentials!')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})