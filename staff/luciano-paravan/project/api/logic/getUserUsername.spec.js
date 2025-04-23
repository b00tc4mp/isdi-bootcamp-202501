import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, DB_NAME } = process.env
const { ObjectId } = Types

describe('getUserUsername', () => {
    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => User.deleteMany({}))

    it('succeds on existing user', () => {
        let returnedUsername

        return User.create({
            name: 'Diego',
            lastname: 'Maradona',
            email: 'diego@gmail.com',
            username: 'maradona',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(user => getUserUsername(user.id))
            .then(username => returnedUsername = username)
            .finally(() => expect(returnedUsername).to.equal('maradona'))
    })

    it('fails on non-existing user', () => {
        let catchedError
        debugger
        return getUserUsername(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})