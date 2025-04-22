import 'dotenv/config'
import { data, User, Couple, DiaryEntry } from "../../data/index.js"
import { retrieveDiaryEntries } from "./retrieveDiaryEntries.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('retrieveDiaryEntries', () => {
    let userId, partnerId, coupleId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), DiaryEntry.deleteMany({})])
    })

    it('succeeds at retrieving diary entries', () => {
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
                return DiaryEntry.create({
                    couple: coupleId,
                    author: userId,
                    text: 'This is a diary entry',
                    createdAt: new Date()
                })
            })
            .then(() => retrieveDiaryEntries(userId))
            .then(entries => {
                expect(entries).to.have.lengthOf(1)
                expect(entries[0].text).to.equal('This is a diary entry')
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
                return retrieveDiaryEntries(userId)
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Couple not found')
            })
    })

    afterEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), DiaryEntry.deleteMany({})])
    })

    after(() => data.disconnect())
})
