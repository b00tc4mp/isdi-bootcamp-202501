import 'dotenv/config'
import { data, User, Couple } from "../../data/index.js"
import { getIfUserIsInCouple } from "./getIfUserIsInCouple.js"
import { expect } from 'chai'

const { MONGO_URL, MONGO_DB } = process.env

describe('getIfUserIsInCouple', () => {
    let userId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({})])
    })

    it('returns true when user is in a couple', () => {
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
                const partnerId = partner._id.toString()
                return Couple.create({
                    members: [userId, partnerId],
                    dateStart: new Date('2021-01-01')
                })
            })
            .then(() => getIfUserIsInCouple(userId))
            .then(isInCouple => {
                expect(isInCouple).to.be.true
            })
    })

    it('returns false when user is not in a couple', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return getIfUserIsInCouple(userId)
            })
            .then(isInCouple => {
                expect(isInCouple).to.be.false
            })
    })

    afterEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({})])
    })

    after(() => data.disconnect())
})
