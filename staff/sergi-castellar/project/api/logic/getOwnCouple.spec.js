import 'dotenv/config'
import { data, Couple, User } from "../data/index.js"
import { getOwnCouple } from "./getOwnCouple.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getOwnCouple', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Couple.deleteMany({})
        ])
    })

    it('succeeds on finding couple', () => {
        let userId, partnerId
        debugger
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
            .then(() => {
                return getOwnCouple(userId)
            })
            .then(couple => {
                expect(couple).to.exist
                expect(couple.members[0].toString()).to.equal(userId)
                expect(couple.members[1].toString()).to.equal(partnerId)
                expect(couple.dateStart).to.deep.equal(new Date('2024-04-14'))
            })
    })

    it('fails on non-existing couple for the user', () => {
        return User.create({
            name: 'Test User',
            email: 'test@user.com',
            username: 'testuser',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                let userId = user._id.toString()

                return getOwnCouple(userId)
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('Couple not found')
                    })
            })
    })

    it('fails on non-existing user', () => {
        const nonExistentUserId = '605c72ef1532073d4a8b4e0e'

        return getOwnCouple(nonExistentUserId)
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    })

    afterEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Couple.deleteMany({})
        ])
    })

    after(() => data.disconnect())
})
