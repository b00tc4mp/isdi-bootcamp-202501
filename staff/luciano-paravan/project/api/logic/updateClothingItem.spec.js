import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, ClothingItem } from '../data/index.js'
import { updateClothingItem } from './updateClothingItem.js'
import { expect } from 'chai'
import { NotFoundError, OwnershipError } from 'com/errors.js'

const { MONGO_URL, DB_NAME } = process.env
const { ObjectId } = Types

console.info('TEST updateClothingItem')

describe('updateClothingItem', () => {
    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => Promise.all([User.deleteMany({}), ClothingItem.deleteMany({})]))

    it('succeds on updating a clothingItem', () => {
        let userId
        let clothingItemId

        return User.create({
            name: 'Eugeni',
            lastname: 'Castells',
            email: 'eugeni@gmail.com',
            username: 'eugeni',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(createdUser => {
                userId = createdUser._id.toString()

                return ClothingItem.create({
                    owner: createdUser._id,
                    itemName: 't-shirt',
                    category: 'top',
                    type: 'basic',
                    color: 'white',
                    season: ['summer'],
                    occasion: ['casual']
                })
            })
            .then(returnedItem => {
                clothingItemId = returnedItem._id.toString()

                return updateClothingItem(userId, clothingItemId, 'Sweater', 'top', 'knit', 'blue', ['autumn', 'winter'], ['formal', 'party'])
            })
            .then(result => expect(result).to.be.undefined)
            .then(() => ClothingItem.findById(clothingItemId).lean())
            .then(item => {
                expect(item.itemName).to.equal('Sweater')
                expect(item.category).to.equal('top')
                expect(item.type).to.equal('knit')
                expect(item.color).to.equal('blue')
                expect(item.season).to.deep.equal(['autumn', 'winter'])
                expect(item.occasion).to.deep.equal(['formal', 'party'])
            })
    })

    it('fails on non-existing user', () => {
        const falseUserId = new ObjectId().toString()

        return ClothingItem.create({
            owner: new ObjectId(),
            itemName: 'shirt',
            category: 'top',
            type: 'cotton',
            color: 'red',
            season: ['spring'],
            occasion: ['formal']
        })
            .then(item => {
                return updateClothingItem(
                    falseUserId,
                    item._id.toString(),
                    'Blazer',
                    'top',
                    'formal',
                    'black',
                    ['winter'],
                    ['formal']
                )
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails when user is not the ower of clothing item', () => {
        let userA, userB, itemId

        return Promise.all([
            User.create({
                name: 'Eugeni',
                lastname: 'Castells',
                email: 'eugeni@gmail.com',
                username: 'eugeni',
                password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
            }),
            User.create({
                name: 'Luciano',
                lastname: 'Para',
                email: 'luciano@gmail.com',
                username: 'luciano',
                password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
            })
        ])
            .then(([_userA, _userB]) => {
                userA = _userA
                userB = _userB

                return ClothingItem.create({
                    owner: userB._id,
                    itemName: 'Jacket',
                    category: 'top',
                    type: 'leather',
                    color: 'brown',
                    season: ['winter'],
                    occasion: ['casual']
                })
            })
            .then(item => {
                itemId = item._id.toString()

                return updateClothingItem(
                    userA._id.toString(),
                    itemId,
                    'Jacket',
                    'top',
                    'leather',
                    'brown',
                    ['winter'],
                    ['casual']
                )
            })
            .catch(error => {
                expect(error).to.be.instanceOf(OwnershipError)
                expect(error.message).to.equal('user is not the owner of the clothing item')
            })
    })

    it('fails on non-existing clothing item', () => {
        debugger
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

                const fakeItemId = new ObjectId().toString()

                return updateClothingItem(
                    userId,
                    fakeItemId,
                    'Pants',
                    'bottom',
                    'denim',
                    'blue',
                    ['spring'],
                    ['casual']
                )
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('clothing item not found')
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        ClothingItem.deleteMany({})
    ]))

    after(() => data.disconnect())
})
