import sinon from 'sinon'

import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, ClothingItem } from '../data/index.js'
import { expect } from 'chai'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

const { MONGO_URL, DB_NAME } = process.env

const { ObjectId } = Types

console.info('TEST lookRequest')

let lookRequest

before(() => {
    return import('./lookRequest.js')
        .then(module => {
            lookRequest = module.lookRequest
        })
})

describe('lookRequest', () => {
    let fetchStub

    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => {
        if (fetchStub && fetchStub.restore) fetchStub.restore()

        return Promise.all([
            User.deleteMany({}),
            ClothingItem.deleteMany({})
        ])
    })

    it('succeds and returns mock suggestions', () => {
        fetchStub = sinon.stub(global, 'fetch').resolves({
            status: 200,
            json: () => Promise.resolve({
                choices: [{
                    message: {
                        content: JSON.stringify({
                            suggestions: [
                                {
                                    look: [
                                        { category: 'top', itemName: 'mock t-shirt', source: 'user' },
                                        { category: 'bottom', itemName: 'mock jeans', source: 'user' },
                                        { category: 'shoes', itemName: 'mock sneakers', source: 'external' }
                                    ],
                                    notes: 'Mock look 1'
                                },
                                {
                                    look: [
                                        { category: 'top', itemName: 'mock shirt', source: 'user' },
                                        { category: 'bottom', itemName: 'mock chinos', source: 'user' },
                                        { category: 'shoes', itemName: 'mock loafers', source: 'external' },
                                        { category: 'accessory', itemName: 'mock watch', source: 'user' }
                                    ],
                                    notes: 'Mock look 2'
                                }
                            ]
                        })
                    }
                }]
            })
        })

        let userId

        return User.create({
            name: 'Eugeni',
            lastname: 'Castells',
            email: 'eugeni@gmail.com',
            username: 'eugeni',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(user => {
                userId = user._id.toString()

                return Promise.all([
                    ClothingItem.create({ owner: user._id, itemName: 'blue t-shirt', category: 'top', type: 'basic', color: 'blue', season: ['summer'], occasion: ['casual'] }),
                    ClothingItem.create({ owner: user._id, itemName: 'black jeans', category: 'bottom', type: 'jeans', color: 'black', season: ['autumn'], occasion: ['casual'] }),
                    ClothingItem.create({ owner: user._id, itemName: 'silver watch', category: 'accessory', type: 'watch', color: 'silver', season: ['spring', 'summer'], occasion: ['formal', 'casual'] }),
                    ClothingItem.create({ owner: user._id, itemName: 'grey hoodie', category: 'top', type: 'hoodie', color: 'grey', season: ['winter'], occasion: ['sport'] }),
                    ClothingItem.create({ owner: user._id, itemName: 'blue jeans', category: 'bottom', type: 'jeans', color: 'blue', season: ['winter'], occasion: ['sport'] }),
                    ClothingItem.create({ owner: user._id, itemName: 'running shoes', category: 'shoes', type: 'sport', color: 'white', season: ['winter'], occasion: ['sport'] })
                ])
            })
            .then(() => {
                return lookRequest(
                    userId,
                    ['casual'],
                    'outdoor',
                    'warm',
                    'evening',
                    'classic',
                    'date',
                    true,
                    fetchStub
                )
            })
            .then(result => {
                expect(result).to.have.property('requestId').that.is.a('string')
                expect(result).to.have.property('suggestions').that.is.an('array').with.lengthOf(2)

                result.suggestions.forEach(suggestion => {
                    expect(suggestion).to.have.property('look').that.is.an('array')
                    expect(suggestion).to.have.property('notes').that.is.a('string')
                })
            })
    })

    it('fails on invalid userId', () => {
        try {
            lookRequest(
                '123',
                ['casual'],
                'indoor',
                'warm',
                'morning',
                'classic',
                '',
                false
            )
                .then(() => { throw new Error('should not reach this point') })
                .catch(() => { throw new Error('should not reach this point') })

        } catch (error) {
            console.log('instanceof ValidationError:', error instanceof ValidationError)
            console.log('error.constructor.name:', error.constructor.name)
            console.log('error.name:', error.name)

            expect(error).to.be.an.instanceOf(Error)
            expect(error.constructor.name).to.equal('ValidationError')
            expect(error.message).to.equal('invalid id length')
        }
    })

    it('fails on non-existing user', () => {
        const fakeUserId = new ObjectId().toString()

        return lookRequest(
            fakeUserId,
            ['casual'],
            'indoor',
            'cold',
            'morning',
            'classic',
            'colorful',
            '',
            false
        )
            .then(() => {
                throw new Error('should not reach this point')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails when user has no clothing items', () => {
        return User.create({
            name: 'Eugeni',
            lastname: 'Castells',
            email: 'eugeni@gmail.com',
            username: 'eugeni',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(user => {
                return lookRequest(
                    user._id.toString(),
                    ['party'],
                    'indoor',
                    'warm',
                    'night',
                    'trendy',
                    '',
                    false
                )
            })
            .then(() => {
                throw new Error('should not reach this point')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User has no clothing items')
            })
    })

    it('fails on invalid occasion array', () => {
        return User.create({
            name: 'Eugeni',
            lastname: 'Castells',
            email: 'eugeni@gmail.com',
            username: 'eugeni',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(user => {
                return lookRequest(
                    user._id.toString(),
                    ['invalid_occasion'],
                    'indoor',
                    'warm',
                    'night',
                    'trendy',
                    '',
                    false
                )
            })

            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid occasion')
            })
    })

    it('fails on invalid style', () => {
        return User.create({
            name: 'Eugeni',
            lastname: 'Castells',
            email: 'test2@email.com',
            username: 'eugeni2',
            password: '12345678'
        })
            .then(user => {
                return lookRequest(
                    new ObjectId().toString(),
                    ['party'],
                    'indoor',
                    'warm',
                    'night',
                    'invalid_style',
                    '',
                    false
                )
            })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid style')
            })
    })

    it('fails when OpenAI API returns error response', () => {
        return User.create({
            name: 'Eugeni',
            lastname: 'Castells',
            email: 'eugeni@gmail.com',
            username: 'eugeni',
            password: '12345678'
        })
            .then(user => {
                fetchStub = sinon.stub(global, 'fetch').resolves({
                    status: 500,
                    json: () => Promise.resolve({ error: { message: 'mock error from OpenAI' } })
                })

                return ClothingItem.create({
                    owner: user._id,
                    itemName: 'mock item',
                    category: 'top',
                    type: 'shirt',
                    color: 'white',
                    season: ['summer'],
                    occasion: ['casual']
                }).then(() => user)
            })
            .then(user => {
                return lookRequest(
                    user._id.toString(),
                    ['casual'],
                    'outdoor',
                    'warm',
                    'evening',
                    'classic',
                    '',
                    true,
                    fetchStub
                )
            })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal('mock error from OpenAI')
            })
            .finally(() => {
                if (fetchStub && fetchStub.restore)
                    fetchStub.restore()
            })
    })
})