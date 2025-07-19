import 'dotenv/config'
import { data, User, LookSuggestion } from '../data/index.js'
import { getSavedLooks } from './getSavedLooks.js'
import { expect } from 'chai'
import { errors } from 'com'
import { Types } from 'mongoose'

const { ValidationError, NotFoundError } = errors
const { MONGO_URL, DB_NAME } = process.env
const { ObjectId } = Types

describe('getSavedLooks', () => {
    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        LookSuggestion.deleteMany({})
    ]))

    it('succeeds and returns saved looks for valid user', () => {
        let userId

        return User.create({
            name: 'Luciano',
            lastname: 'Paravan',
            email: 'luciano@gmail.com',
            username: 'lucianop',
            password: '12345678'
        })
            .then(user => {
                userId = user._id.toString()

                return LookSuggestion.create([
                    {
                        user: userId,
                        request: new ObjectId(),
                        look: [
                            { category: 'top', itemName: 'mock shirt', source: 'user' },
                            { category: 'bottom', itemName: 'mock jeans', source: 'user' },
                            { category: 'shoes', itemName: 'mock sneakers', source: 'external' }
                        ],
                        notes: 'Look for summer event',
                        createdAt: new Date(2025, 4, 1)
                    },
                    {
                        user: userId,
                        request: new ObjectId(),
                        look: [
                            { category: 'top', itemName: 'hoodie', source: 'user' },
                            { category: 'bottom', itemName: 'joggers', source: 'user' },
                            { category: 'shoes', itemName: 'sneakers', source: 'user' }
                        ],
                        notes: 'Casual sporty',
                        createdAt: new Date(2025, 3, 1)
                    }
                ])
            })
            .then(() => getSavedLooks(userId))
            .then(looks => {
                expect(looks).to.be.an('array').with.lengthOf(2)

                expect(looks[0]).to.have.property('notes').that.equals('Look for summer event')
                expect(looks[1]).to.have.property('notes').that.equals('Casual sporty')
            })
    })

    it('fails on invalid user id', () => {
        try {
            getSavedLooks('123')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid user id length')
        }
    })

    it('fails if user does not exist', () => {
        const fakeUserId = new ObjectId().toString()

        return getSavedLooks(fakeUserId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        LookSuggestion.deleteMany({})
    ]))

    after(() => data.disconnect())
})
