import 'dotenv/config'
import { data, User } from '../data/index.js'
import { addUserCredit } from './addUserCredit.js'
import { expect } from 'chai'
import { NotFoundError, SystemError } from 'com/errors.js'

import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('addUserCredit', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user + increasing credit', () => {
        let createdUser
        let newCredit

        return User.create({
            name: 'Delfín Dorado',
            email: 'delfin@dorado.com',
            password: '123123aa',
            credit: 0
        })
            .then(user => {
                createdUser = user
                return addUserCredit(user.id, 25) 
            })
            .then(credit => {
                newCredit = credit
                return User.findById(createdUser.id)
            })
            .then(updatedUser => {
                expect(newCredit).to.equal(25)
                expect(updatedUser.credit).to.equal(25)
            })
    })

    it('Fails on non-existing user', () => {
            let catchedError

            const randomId = new ObjectId().toString()
    
            return addUserCredit(randomId, 25)
                .catch(error => catchedError = error)
                .finally(() => {
                    expect(catchedError).to.exist
                    expect(catchedError).to.be.instanceOf(NotFoundError)
                    expect(catchedError.message).to.be.equal('user not found')
                })
        })
})