import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"
import { errors } from "com"

import { data, User } from "../../../data"
import authenticateUser from "./authenticateUser"

const { NotFoundError, CredentialsError } = errors

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => User.deleteMany({}))

    // --- HAPPY PATH ---
    it('succeds on authentication', () => {
        let returnedUserId: string

        return bcrypt.hash('eueueu', 10)
            .then(hashedPassword => User.create({
                name: 'Eu Geni',
                lastName: 'Castells',
                email: 'eu@geni.com',
                alias: 'euge',
                password: hashedPassword
            }))
            .then(() => authenticateUser('euge', 'eueueu'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ alias: 'euge' }).lean())
            .then(user => expect(user?._id.toString()).to.equal(returnedUserId))
    })

    // --- NOTFOUND ERROR PATH ---
    it('fails on NOTFOUND USER ERROR PATH', () => {
        let catchedError: Error

        return authenticateUser('masha', 'mamama')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found!')
            })
    })

    // --- CREDENTIALS ERROR PATH ---
    it('fails on CREDENTIALS ERROR PATH', () => {
        let catchedError: Error

        return User.create({
            name: 'Eu Geni',
            lastName: 'Castells',
            email: 'eu@geni.com',
            alias: 'euge',
            password: 'eueueu'
        })
            .then(() => authenticateUser('euge', 'soyIdiota'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('Wrong Credentials!')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
