import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, DB_NAME } = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => User.deleteMany({}))

    it('succeds on existing user', () => {
        let returnedUserId

        return User.create({
            name: 'Diego Armando',
            lastname: 'Maradona',
            email: 'diego@gmail.com',
            username: 'maradona',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(() => authenticateUser('maradona', '123123123'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ username: 'maradona' }).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return authenticateUser('maradona', '123123123')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('fails on existing user but wrong password', () => {
        let returnedUserId
        let catchedError

        return User.create({
            name: 'Diego Armando',
            lastname: 'Maradona',
            email: 'diego@gmail.com',
            username: 'maradona',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(() => authenticateUser('maradona', '123123124'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('wrong credentials')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})