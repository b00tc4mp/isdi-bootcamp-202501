import 'dotenv/config'
import { data, ClothingItem, User } from '../data/index.js'
import { addClothingItem } from './addClothingItem.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ValidationError } from 'com/errors.js'

const { MONGO_URL, DB_NAME } = process.env

describe('addClothingItem', () => {
    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => Promise.all([ClothingItem.deleteMany({}), User.deleteMany({})]))

    it('succeds on new item', () => {
        let result2
        let userId

        return User.create({
            name: 'Eugeni',
            lastname: 'Castells',
            email: 'eugeni@gmail.com',
            username: 'eltofita',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(user => {
                userId = user.id

                return addClothingItem(userId, 'blue jeans', 'bottom', 'jeans', 'blue', ['summer', 'winter', 'spring', 'autumn'], ['casual'])
            })
            .then(result => result2 = result)
            .finally(() => expect(result2).to.be.undefined)
            .then(() => ClothingItem.findOne({ itemName: 'blue jeans' }).lean())
            .then(clothingItem => {
                expect(clothingItem.category).to.equal('bottom')
                expect(clothingItem.type).to.equal('jeans')
                expect(clothingItem.color).to.equal('blue')
                expect(clothingItem.season).to.include.members(['summer', 'winter', 'spring', 'autumn'])
                expect(clothingItem.occasion).to.include('casual')
            })
    })

    it('fails on invalid id', () => {
        let catchedError

        return User.create({
            name: 'Eugeni',
            lastname: 'Castells',
            email: 'eugeni@gmail.com',
            username: 'eltofita',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(() => addClothingItem('user123', 'cotton t-shirt', 'top', 't-shirt', 'white', ['summer'], ['casual']))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(ValidationError)
                expect(catchedError.message).to.equal('invalid id length')
            })
    })

    it('fails when itemName is empty', () => {
        let catchedError

        debugger
        return User.create({
            name: 'Luciano',
            lastname: 'Para',
            email: 'luciano@gmail.com',
            username: 'lucianop',
            password: '$2b$10$oY2b/u2dBjdZrnH4D.4Huea3XzT.vUMhq99.KVwWPIqwNQFByUbJu'
        })
            .then(user => addClothingItem(user.id, '', 'top', 'shirt', 'white', 'summer', ['casual']))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(ValidationError)
                expect(catchedError.message).to.equal('invalid name minLength')
            })
    })

    afterEach(() => ClothingItem.deleteMany({}))

    after(() => data.disconnect())
})