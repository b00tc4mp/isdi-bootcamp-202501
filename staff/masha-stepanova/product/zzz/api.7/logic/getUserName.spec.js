import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User } from '../data/index.js'
import { getUserName } from './getUserName.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUserName', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user', () => {
        let userName

        return User.create({
            name: 'Test Testing',
            email: 'test@testing.com',
            username: 'testing',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => User.findOne({ username: 'testing' }))
            .then(user => getUserName(user._id.toString()))
            .then(name => userName = name)
            .finally(() => expect(userName).to.be.a.string)
            .then(() => User.findOne({ username: 'testing' }).lean())
            .then(user => expect(user.name).to.equal(userName))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return getUserName('67e812e0a5d9869c01300928')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})

