import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, ClothingItem } from '../data/index.js'
import { deleteClothingItem } from './deleteClothingItem.js'
import { expect } from 'chai'

const { MONGO_URL, DB_NAME } = process.env
const { ObjerctId } = Types

describe('deleteClothingItem', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

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

    afterEach(() => {
        return Promise.all([
            User.deleteMany({}),
            ClothingItem.deleteMany({})
        ])
    })

    after(() => data.disconnect())
})