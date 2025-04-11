import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserName } from './getUserName.js'
import { expect } from 'chai'
import { Types } from 'mongoose'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUserName', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeedds on existing user', () => {
        let returnedUserName

        return User.create({
            name: 'Burro Blanco',
            email: 'burro@blanco.com',
            password: '$2b$10$4D3Y686gEs0VgVBGGzr5R.IcqojhTk.CuOKz7pLpe7JPkxSD6liYK'
        })
            .then(user => getUserName(user.id))
            .then(userName => returnedUserName = userName)
            .finally(() => expect(returnedUserName).to.be.equal('Burro Blanco'))
    })

    it('fails on non existing user', () => {
        let catchedError

        return getUserName(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.be.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})