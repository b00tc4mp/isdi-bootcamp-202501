import 'dotenv/config'
import { data, User, Couple, List, ListItem } from "../../data/index.js"
import { createItem } from "./createItem.js"
import { expect } from 'chai'
import { NotFoundError, AuthorizationError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('createItem', () => {
    let userId, partnerId, coupleId, listId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), List.deleteMany({}), ListItem.deleteMany({})])
    })

    it('succeeds at create new item', () => {
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
                return List.create({ title: 'Shopping List', color: '#ff0a0a', couple: coupleId, author: userId, items: [] })
            })
            .then(list => {
                listId = list._id.toString()
                return createItem(userId, listId, 'Item 1')
            })
            .then(() => {
                return ListItem.find({ test: 'Item 1' })
            })
            .then(item => {
                expect(item).to.exist
            })
    })

    it('fails at non-existent couple', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return createItem(userId, '605c72ef1532073d4a8b4e1e', 'Item 1')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Couple not found')
            })
    })

    it('fails at non-existent list', () => {
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
                return createItem(userId, '605c72ef1532073d4a8b4e1e', 'Item 1')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('List not found')
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
            .then(() => List.create({ couple: '605c72ef1532073d4a8b4e1e', author: '605c72ef1532073d4a8b8e1e', title: 'Testing', color: 'red' }))
            .then(list => {
                listId = list._id.toString()
                return createItem(userId, listId, 'Item 1')
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
