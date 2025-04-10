import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB} = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('Succeeds on authenticate user', () => {
        let returnedUserId

        return User.create({
            name: 'Burro Blanco',
            email: 'burro@blanco.com',
            password: '$2b$10$4D3Y686gEs0VgVBGGzr5R.IcqojhTk.CuOKz7pLpe7JPkxSD6liYK'
        })
            .then(() => authenticateUser('burro@blanco.com', '123123aa'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ email: 'burro@blanco.com'}).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    it('Succeeds on non-existing user', () => {
        let catchedError

        return authenticateUser('burro@blanco.com', '123123aa**')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.be.equal('user not found')
            })
    })

    it('Succeeds on existing user but wrong credentials', () => {
        let catchedError

        return User.create({
            name: 'Burro Blanco',
            email: 'burro@blanco.com',
            password: '$2b$10$4D3Y686gEs0VgVBGGzr5R.IcqojhTk.CuOKz7pLpe7JPkxSD6liYK'
        })
            .then(() => authenticateUser('burro@blanco.com', '123123456'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError)
                expect(catchedError.message).to.be.equal('wrong credentials')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect({}))
})