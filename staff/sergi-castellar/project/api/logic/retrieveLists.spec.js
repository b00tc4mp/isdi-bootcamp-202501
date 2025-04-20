import 'dotenv/config'
import { data, User, Couple, List } from "../data/index.js"
import { retrieveLists } from "./retrieveLists.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('retrieveLists', () => {
    let userId, partnerId, coupleId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), List.deleteMany({})])
    })

    it('succeeds at retrieving lists', () => {
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
                List.create({ title: 'Shopping List', color: '#ff0a0a', couple: coupleId, author: userId, items: [] })
            })
            .then(() => retrieveLists(userId))
            .then(lists => {
                expect(lists).to.have.lengthOf(1)
                expect(lists[0].title).to.equal('Shopping List')
            })
    })

    it('fails at non existent couple', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return retrieveLists(userId)
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Couple not found')
            })
    })

    afterEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), List.deleteMany({})])
    })

    after(() => data.disconnect())
})
