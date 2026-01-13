import 'dotenv/config'
import { data, User } from "../data/index.js";
import { authenticateUser } from "./authenticateUser.js"
import { expect } from 'chai'
import { NotFoundError, CredentialsError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds at authenticating user', () => {
        let returnedUserId

        return User.create({
            name: 'prueba',
            email: 'prueba@prueba.com',
            username: 'prueba',
            password: '$2b$10$.od0CuzCT6HHQdw/K3P/A.slG37zTbukraw1hLqa1r/TfBvY4C2mq'
        })
            .then(() => authenticateUser('prueba', '123456'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ username: 'prueba' }).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    it('fails on non existing user', () => {
        let catchedError

        return authenticateUser('prueba', '123456')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })

    })

    it('fails on existing user but wrong password', () => {
        let catchedError

        return User.create({
            name: 'prueba',
            email: 'prueba@prueba.com',
            username: 'prueba',
            password: '$2b$10$.od0CuzCT6HHQdw/K3P/A.slG37zTbukraw1hLqa1r/TfBvY4C2mq'
        })
            .then(() => authenticateUser('prueba', '123456_'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('wrong credentials')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})