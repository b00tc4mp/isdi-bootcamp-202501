import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, ClothingItem } from '../data/index.js'
import { deleteClothingItem } from './deleteClothingItem.js'
import { expect } from 'chai'
import { errors } from 'com'

const { ValidationError, NotFoundError, OwnershipError } = errors

const { MONGO_URL, DB_NAME } = process.env
const { ObjectId } = Types

describe('deleteClothingItem', () => {
    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            ClothingItem.deleteMany({})
        ])
    })

    it('succeds on deleted post', () => {
        let result2

        return User.create({
            name: 'TesterName',
            lastname: 'TesterLastname',
            email: 'tester@email.com',
            username: 'testerusername',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(() => {
                User.findOne({ username: 'testerusername' })
                    .then(createdUser => {
                        ClothingItem.create({
                            owner: createdUser._id,
                            itemName: 't-shirt',
                            category: 'top',
                            type: 'basic',
                            color: 'white',
                            season: ['summer'],
                            occasion: ['casual']
                        })
                            .then(() => { ClothingItem.findOne({ itemName: 't-shirt' }) })
                            .then(item => deleteClothingItem(createdUser._id.toString(), item._id.toString()))
                            .then(result => result2 = result)
                            .finally(() => expect(result2).to.be.undefined)
                            .then(() => ClothingItem.findOne({ itemName: 't-shirt' }))
                            .then(item => {
                                expect(item).to.be.null
                            })
                    })
            })
    })

    it('fails on invalid userId', () => {
        try {
            deleteClothingItem('invalid_userId', new ObjectId().toString())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid user id length')
        }
    })

    it('fails on invalid clothingItemId', () => {
        try {
            deleteClothingItem(new ObjectId().toString(), '456')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid clothing item id length')
        }
    })


    it('fails if user does not exist', () => {
        const fakeUserId = new ObjectId().toString()

        return ClothingItem.create({
            owner: fakeUserId,
            itemName: 'ghost t-shirt',
            category: 'top',
            type: 'basic',
            color: 'black',
            season: ['winter'],
            occasion: ['casual']
        })
            .then(item => {
                return deleteClothingItem(fakeUserId, item._id.toString())
            })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails if clothing item does not exist', () => {
        const fakeItemId = new ObjectId().toString()

        return User.create({
            name: 'Eugeni',
            lastname: 'Castells',
            email: 'test2@email.com',
            username: 'eugeni2',
            password: '12345678'
        })
            .then(user => {
                return deleteClothingItem(user._id.toString(), fakeItemId)
            })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('clothing item not found')
            })
    })

    it('fails if user is not owner of the clothing item', () => {
        let user1, user2, item

        return User.create({ name: 'A', lastname: 'User', email: 'a@a.com', username: 'auser', password: '12345678' })
            .then(u => {
                user1 = u
                return User.create({ name: 'B', lastname: 'User', email: 'b@b.com', username: 'buser', password: '12345678' })
            })
            .then(u2 => {
                user2 = u2
                return ClothingItem.create({
                    owner: user1._id,
                    itemName: 'watch',
                    category: 'accessory',
                    type: 'luxury',
                    color: 'gold',
                    season: ['summer'],
                    occasion: ['party']
                })
            })
            .then(ci => {
                item = ci
                return deleteClothingItem(user2._id.toString(), item._id.toString())
            })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(OwnershipError)
                expect(error.message).to.equal('user is not owner of the clothing item')
            })
    })

    it('fails when trying to delete an already deleted clothingItem', () => {
        let userId, itemId

        return User.create({
            name: 'Delete',
            lastname: 'Twice',
            email: 'deletetwice@email.com',
            username: 'deletetwice',
            password: '12345678'
        })
            .then(user => {
                userId = user._id.toString()
                return ClothingItem.create({
                    owner: userId,
                    itemName: 'ghost item',
                    category: 'top',
                    type: 'shirt',
                    color: 'white',
                    season: ['summer'],
                    occasion: ['casual']
                })
            })
            .then(item => {
                itemId = item._id.toString()
                return deleteClothingItem(userId, itemId)
            })
            .then(() => deleteClothingItem(userId, itemId))
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('clothing item not found')
            })
    })

    it('fails when clothing item has invalid owner', () => {
        let invalidUserId = new ObjectId().toString()

        return User.create({
            name: 'Ghost',
            lastname: 'User',
            email: 'ghost@user.com',
            username: 'ghost',
            password: '12345678'
        })
            .then(() => {
                return ClothingItem.create({
                    owner: new ObjectId(), // ID que tampoco pertenece a un User
                    itemName: 'strange item',
                    category: 'accessory',
                    type: 'unknown',
                    color: 'invisible',
                    season: ['winter'],
                    occasion: ['party']
                })
            })
            .then(item => {
                return deleteClothingItem(invalidUserId, item._id.toString())
            })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })


    afterEach(() => {
        return Promise.all([
            User.deleteMany({}),
            ClothingItem.deleteMany({})
        ])
    })

    after(() => data.disconnect())
})