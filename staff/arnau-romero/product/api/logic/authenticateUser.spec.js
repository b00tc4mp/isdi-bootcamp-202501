import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser' , () => {
    before(() => data.connect(MONGO_DB, MONGO_URL))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user', () => {
        let returnedUserId

        return User.create({
            name: 'Arnau Romero',
            email: 'arnau@romero.com',
            username: 'arnau_sots',
            password: ''
        })
            .then(() => authenticateUser('arnau_sots', '123123123'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({username: 'arnau_sots'}).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return authenticateUser('arnau_sots', '123123123')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('fails on existing user but wrong password', () => {
        let catchedError

        return User.create({
            name: 'Arnau Romero',
            email: 'arnau@romero.com',
            username: 'arnau_sots',
            password: ''
        })
            .then(() => authenticateUser('arnau_sots', '234234234'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('wrong credentials')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})