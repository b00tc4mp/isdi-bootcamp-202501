import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, LookRequest, LookSuggestion } from '../data/index.js'
import { saveLookSuggestion } from './saveLookSuggestion.js'
import { expect } from 'chai'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors
const { MONGO_URL, DB_NAME } = process.env
const { ObjectId } = Types

console.info('TEST saveLookSuggestion')

describe('saveLookSuggestion', () => {
    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        LookRequest.deleteMany({}),
        LookSuggestion.deleteMany({})
    ]))

    it('succeds on valid input', () => {
        let userId, requestId, fakeItemIds

        return User.create({
            name: 'Testname',
            lastname: 'Testlastname',
            email: 'email@test.com',
            username: 'testusername',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(user => {
                userId = user._id.toString()

                return LookRequest.create({
                    user: user._id,
                    contextOccasion: ['casual'],
                    location: 'indoor',
                    temperature: 'warm',
                    timeOfDay: 'afternoon',
                    style: 'trendy',
                    additionalDetails: 'date',
                    allowExternalSuggestions: true
                })
                    .then(request => {
                        requestId = request._id.toString()

                        const look = [
                            { category: 'top', itemName: 'mock shirt', source: 'user' },
                            { category: 'bottom', itemName: 'mock jeans', source: 'user' },
                            { category: 'shoes', itemName: 'mock shoes', source: 'external' }
                        ]

                        const notes = 'The ideal look for your situation'

                        return saveLookSuggestion(userId, requestId, look, notes)
                    })
                    .then(result => {
                        expect(result).to.be.undefined

                        return LookSuggestion.findOne({ user: userId, request: requestId }).lean()
                    })
                    .then(suggestion => {
                        expect(suggestion).to.exist
                        expect(suggestion.user.toString()).to.equal(userId)
                        expect(suggestion.request.toString()).to.equal(requestId)
                        expect(suggestion.look).to.have.lengthOf(3)
                        expect(suggestion.notes).to.equal('The ideal look for your situation')
                    })
            })
    })

    it('fails on invalid userId', () => {
        try {
            saveLookSuggestion('123', new ObjectId().toString(), [], 'notes')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid user id length')
        }
    })

    it('fails on invalid requestId', () => {
        try {
            saveLookSuggestion(new ObjectId().toString(), '123', [], 'notes')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid request id length')
        }
    })

    it('fails if look is not an array', () => {
        try {
            saveLookSuggestion(new ObjectId().toString(), new ObjectId().toString(), 'not-array', 'notes')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('look must be an array')
        }
    })

    it('fails if user does not exist', () => {
        const fakeUserId = new ObjectId().toString()
        const fakeRequestId = new ObjectId().toString()
        const fakeLook = [{ category: 'top', itemName: 'shirt', source: 'user' }]

        return saveLookSuggestion(fakeUserId, fakeRequestId, fakeLook, 'test')
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails if look request does not exist', () => {
        return User.create({
            name: 'Diego',
            lastname: 'Maradona',
            email: 'diego@gmail.com',
            username: 'diegomaradona',
            password: '123123123'
        })
            .then(user => {
                const fakeRequestId = new ObjectId().toString()
                const look = [{ category: 'top', itemName: 'shirt', source: 'user' }]
                return saveLookSuggestion(user._id.toString(), fakeRequestId, look, 'test')
            })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('look request not found')
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        LookRequest.deleteMany({}),
        LookSuggestion.deleteMany({})
    ]))

    after(() => data.disconnect())
})