import 'dotenv/config'
import { expect } from 'chai'
import { errors } from 'com'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'

import { data, User } from '../../data/index.js'
import getUserAlias from './getUserAlias.js'

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe('getUserAlias', () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => User.deleteMany({}))

    // --- HAPPY PATH ---   
    it('succeds on obtaining user alias', () => {
        let returnedUserAlias: string

        return bcrypt.hash('eueueu', 10)
            .then(hashedPassword => User.create({
                name: 'Eu Geni',
                lastName: 'Castells',
                email: 'eu@geni.com',
                alias: 'euge',
                password: hashedPassword
            }))
            .then(user => getUserAlias(user.id))
            .then(alias => returnedUserAlias = alias)
            .finally(() => expect(returnedUserAlias).to.equal('euge'))
    })


    // --- NOTFOUND ERROR PATH ---   
    it('succeds on not existing user', () => {
        let catchedError: Error

        return getUserAlias(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found!')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})