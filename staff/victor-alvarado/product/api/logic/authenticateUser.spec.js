import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeds on existing user', () => {
        let returnedUserId

        return User.create({
            name: 'jose',
            email: 'jose@jose.com',
            username: 'jose',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => authenticateUser('jose', '123123123'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ username: 'jose' }).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return User.create({
            name: 'jose',
            email: 'jose@jose.com',
            username: 'jose',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => authenticateUser('jose', '123123122'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError.message).to.equal('wrong credentials')
            })

    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})