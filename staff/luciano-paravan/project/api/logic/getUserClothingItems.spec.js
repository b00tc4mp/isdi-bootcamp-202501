import 'dotenv/config'
import { data, User, ClothingItem } from '../data/index.js'
import { getUserClothingItems } from './getUserClothingItems.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, DB_NAME } = process.env
const { ObjectId } = Types

describe('getUserClothingItems', () => {
    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            ClothingItem.deleteMany({})
        ])
    })

    it('succeds on existing user', () => {
        let returnedClothingItems
        let user, user2
        let clothingItem, clothingItem2, clothingItem3

        return Promise.all([
            User.create({
                name: 'Diego',
                lastname: 'Maradona',
                email: 'diego@gmail.com',
                username: 'maradona',
                password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
            }),
            User.create({
                name: 'claudio',
                lastname: 'caniggia',
                email: 'claudio@gmail.com',
                username: 'elpajaro',
                password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
            })
        ])
            .then(([_user, _user2]) => {
                user = _user
                user2 = _user2
            })
            .then(() => Promise.all([
                ClothingItem.create({
                    owner: user.id,
                    itemName: 'black leather jacket',
                    category: 'top',
                    type: 'jacket',
                    color: 'black',
                    season: ['autumn', 'winter'],
                    occasion: ['casual', 'party'],
                    createdAt: new Date(2025, 4, 1)
                }),
                ClothingItem.create({
                    owner: user.id,
                    itemName: 'grey wool sweater',
                    category: 'top',
                    type: 'sweater',
                    color: 'grey',
                    season: ['autumn', 'winter'],
                    occasion: ['casual', 'formal'],
                    createdAt: new Date(2025, 3, 1)
                }),
                ClothingItem.create({
                    owner: user.id,
                    itemName: 'white sneakers',
                    category: 'shoes',
                    type: 'sneakers',
                    color: 'white',
                    season: ['summer', 'spring', 'autumn'],
                    occasion: ['casual', 'sport'],
                    createdAt: new Date(2025, 2, 1)
                })
            ]))
            .then(([_clothingItem, _clothingItem2, _clothingItem3]) => {
                clothingItem = _clothingItem
                clothingItem2 = _clothingItem2
                clothingItem3 = _clothingItem3
            })
            .then(() => getUserClothingItems(user.id))
            .then(items => returnedClothingItems = items)
            .finally(() => {
                expect(returnedClothingItems).to.be.instanceOf(Array)
                expect(returnedClothingItems).to.have.lengthOf(3)

                let returnedClothingItem = returnedClothingItems[0]
                expect(returnedClothingItem.owner.id).to.equal(user.id)
                expect(returnedClothingItem.itemName).to.equal(clothingItem.itemName)
                expect(returnedClothingItem.category).to.equal(clothingItem.category)
                expect(returnedClothingItem.type).to.equal(clothingItem.type)
                expect(returnedClothingItem.color).to.equal(clothingItem.color)
                expect(returnedClothingItem.season).to.deep.equal(clothingItem.season)
                expect(returnedClothingItem.createdAt).to.deep.equal(clothingItem.createdAt)

                returnedClothingItem = returnedClothingItems[1]
                expect(returnedClothingItem.owner.id).to.equal(user.id)
                expect(returnedClothingItem.itemName).to.equal(clothingItem2.itemName)
                expect(returnedClothingItem.category).to.equal(clothingItem2.category)
                expect(returnedClothingItem.type).to.equal(clothingItem2.type)
                expect(returnedClothingItem.color).to.equal(clothingItem2.color)
                expect(returnedClothingItem.season).to.deep.equal(clothingItem2.season)
                expect(returnedClothingItem.createdAt).to.deep.equal(clothingItem2.createdAt)
            })

    })

    afterEach(() => Promise.all([User.deleteMany({}), ClothingItem.deleteMany({})]))

    after(() => data.disconnect())

})
