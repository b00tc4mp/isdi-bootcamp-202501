import 'dotenv/config'
import { data, User, Couple } from "../data/index.js"
import { getCoupleInfo } from "./getCoupleInfo.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getCoupleInfo', () => {
    let userId, coupleId, partnerId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({})])
    })

    it('success at getting own user', () => {
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
                    dateStart: new Date('2024-04-14')
                })
            })
            .then(couple => {
                coupleId = couple._id.toString()
                return getCoupleInfo(userId)
            })
            .then(info => {
                expect(info.partnerName).to.equal('Jane Doe')
                expect(info.daysInRelationship).to.be.a('number')
                expect(info.daysInRelationship).to.equal(365)
            })
    })

    it('fails at partner not found', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return Couple.create({
                    members: [userId, '605c72ef1532073d4a8b4e0f'],
                    dateStart: new Date('2020-01-01')
                })
            })
            .then(couple => {
                coupleId = couple._id.toString()
                return getCoupleInfo(userId)
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('partner not found')
            })
    })

    it('fails at couple not found', () => {
        return getCoupleInfo('605c72ef1532073d4a8b4e0e')
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('couple not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany({}), Couple.deleteMany({})]))

    after(() => data.disconnect())
})
