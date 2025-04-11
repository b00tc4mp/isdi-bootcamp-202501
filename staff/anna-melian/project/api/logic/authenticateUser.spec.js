import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user', () => {
        let returnedUserId

        return User.create({
            name: 'Anna',
            email: 'an@na.com',
            username: 'Anneta',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => authenticateUser('Anneta', '123123123'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ username: 'Anneta' }).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    it('falis on non-existing user', () => {
        let catchedError

        return authenticateUser('Anneta', '123123123')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('fails on existing user but wrong password', () => {
        let catchedError

        return User.create({
            name: 'Anna',
            email: 'an@na.com',
            username: 'Anneta',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => authenticateUser('Anneta', '234234234'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('wrong credentials')
            })

    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})