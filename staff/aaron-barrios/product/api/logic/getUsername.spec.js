import 'dotenv/config'
import { data, User } from '../data/index.js'
import {getUsername} from './getUserName.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'
import {get, Types} from 'mongoose'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUsername', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeds on existing user', () => {
        let returnedName

        return bcrypt.hash('eueueu', 10)
            .then(hash => User.create({
                name: 'Eu Geni',
                email: 'eu@geni.com',
                username: 'eugeni',
                password: hash
            }))
            .then(user => getUsername(user.id))
            .then(name => returnedName = name)
            .finally(() => expect(returnedName).to.equal('Eu Geni'))
    })

    it('fails on existing user', () => {
        let catchedError

        return getUsername(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found!')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})