import 'dotenv/config'
import { data, User, Couple, List, ListItem } from "../data/index.js"
import { updateItem } from "./updateItem.js"
import { expect } from 'chai'
import { NotFoundError, AuthorizationError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('updateItem', () => {
    let userId, partnerId, coupleId, listId, itemId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), List.deleteMany({}), ListItem.deleteMany({})])
    })

    it('succeeds at updating item', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return User.create({
                    name: 'Jane Doe',
                    email: 'jane@doe.com',
                    username: 'janedoe',
                    password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
                })
            })
            .then(partner => {
                partnerId = partner._id.toString()
                return Couple.create({
                    members: [userId, partnerId],
                    dateStart: new Date('2021-01-01')
                })
            })
            .then(couple => {
                coupleId = couple._id.toString()
                return List.create({ title: 'Shopping List', color: 'blue', couple: coupleId, author: userId, items: [] })
            })
            .then(list => {
                listId = list._id.toString()
                return ListItem.create({ text: 'Item 1', list: listId })
            })
            .then(item => {
                itemId = item._id.toString()
                return updateItem(userId, itemId, 'Updated Item')
            })
            .then(() => ListItem.findById(itemId).lean())
            .then(item => {
                expect(item.text).to.equal('Updated Item')
            })
    })

    it('fails at non existing couple', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return updateItem(userId, '605c72ef1532073d4a8b4e1e', 'Updated Item')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('couple not found')
            })
    })

    it('fails at non existing item', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return User.create({
                    name: 'Jane Doe',
                    email: 'jane@doe.com',
                    username: 'janedoe',
                    password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
                })
            })
            .then(partner => {
                partnerId = partner._id.toString()
                return Couple.create({
                    members: [userId, partnerId],
                    dateStart: new Date('2021-01-01')
                })
            })
            .then(couple => {
                coupleId = couple._id.toString()
                return updateItem(userId, '605c72ef1532073d4a8b4e1e', 'Updated Item')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('item not found')
            })
    })

    it('fails at non existing list', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return User.create({
                    name: 'Jane Doe',
                    email: 'jane@doe.com',
                    username: 'janedoe',
                    password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
                })
            })
            .then(partner => {
                partnerId = partner._id.toString()
                return Couple.create({
                    members: [userId, partnerId],
                    dateStart: new Date('2021-01-01')
                })
            })
            .then(couple => {
                coupleId = couple._id.toString()
                return ListItem.create({ text: 'Item 1', list: '605c72ef1532073d4a8b4e1e' })
            })
            .then(item => {
                itemId = item._id.toString()
                return updateItem(userId, itemId, 'Updated Item')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('list not found')
            })
    })

    it('fails at list is not from user\'s couple', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return User.create({
                    name: 'Jane Doe',
                    email: 'jane@doe.com',
                    username: 'janedoe',
                    password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
                })
            })
            .then(partner => {
                partnerId = partner._id.toString()
                return Couple.create({
                    members: [userId, partnerId],
                    dateStart: new Date('2021-01-01')
                })
            })
            .then(couple => {
                coupleId = couple._id.toString()
                return List.create({ couple: '605c72ef1532073d4a8b4e1e', author: '605c72ef1532073d4a8b8e1e', title: 'Testing', color: 'red' })
            })
            .then(list => {
                listId = list._id.toString()
                return ListItem.create({ text: 'Item 1', list: listId })
            })
            .then(item => {
                itemId = item._id.toString()
                return updateItem(userId, itemId, 'Updated Item')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(AuthorizationError)
                expect(error.message).to.equal('Couple is not the owner of the list')
            })
    })

    afterEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), List.deleteMany({}), ListItem.deleteMany({})])
    })

    after(() => data.disconnect())
})
