import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserGems } from './getUserGems.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUserGems', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user', () => {
        let returnedGems

        return User.create({
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'GryffindorSeeker',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO',
            gems: 30
        })
            .then(user => getUserGems(user.id))
            .then(gems => returnedGems = gems)
            .finally(() => expect(returnedGems).to.equal(30))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return getUserGems(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})