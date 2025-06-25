import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserCredit } from './getUserCredit.js'
import { expect } from 'chai'
import { NotFoundError, ValidationError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUserCredit', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user without credit', () => {
        let returnedCredit

        return User.create({
            name: 'Abeja Amarilla',
            email: 'abeja@amarilla.com',
            password: '123123aa'
        })
            .then(user => getUserCredit(user.id))
            .then(credit => returnedCredit = credit)
            .finally(() => {
                expect(returnedCredit).to.be.a('number')
                expect(returnedCredit).to.be.equal(0)
            })
    })

    it('succeeds on existing user with credit', () => {
        let returnedCredit

        return User.create({
            name: 'Abeja Amarilla',
            email: 'abeja@amarilla.com',
            password: '123123aa',
            credit: '10.25'
        })
            .then(user => getUserCredit(user.id))
            .then(credit => returnedCredit = credit)
            .finally(() => {
                expect(returnedCredit).to.be.a('number')
                expect(returnedCredit).to.be.equal(10.25)
             })
    })

    it('fails on non-existing user', () => {
        let catchedError

        return getUserCredit(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.be.equal('user not found')
            })
    })

    it('fails on invalid user id', () => {
        let catchedError

        try {
            getUserCredit(123)
        } catch (error) {
            catchedError = error
        } finally {
            expect(catchedError).to.be.instanceOf(ValidationError)
            expect(catchedError.message).to.equal('invalid id type')
        }
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())

})