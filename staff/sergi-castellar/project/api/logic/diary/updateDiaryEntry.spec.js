import 'dotenv/config'
import { data, User, Couple, DiaryEntry } from "../../data/index.js"
import { updateDiaryEntry } from "./updateDiaryEntry.js"
import { expect } from 'chai'
import { NotFoundError, AuthorizationError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('updateDiaryEntry', () => {
    let userId, partnerId, coupleId, entryId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), DiaryEntry.deleteMany({})])
    })

    it('succeeds at updating diary entry', () => {
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
            .then(entry => {
                entryId = entry._id.toString()
                return updateDiaryEntry(userId, entryId, 'Updated diary entry text')
            })
            .then(() => DiaryEntry.findById(entryId).lean())
            .then(entry => {
                expect(entry.text).to.equal('Updated diary entry text')
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
                return updateDiaryEntry(userId, '68078541d746d7c09cd60288', 'Updated diary entry text')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Couple not found')
            })
    })

    it('fails at non-existent entry', () => {
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
                return updateDiaryEntry(userId, '68078541d746d7c09cd60288', 'Updated diary entry text')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Diary entry not found')
            })
    })

    it('fails at entry is not from user\'s couple', () => {
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
                    couple: '605c72ef1532073d4a8b4e1e',
                    author: '605c72ef1532073d4a8b8e1e',
                    text: 'This is a diary entry',
                    createdAt: new Date()
                })
            })
            .then(entry => {
                entryId = entry._id.toString()
                return updateDiaryEntry(userId, entryId, 'Updated diary entry text')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(AuthorizationError)
                expect(error.message).to.equal('Couple is not the owner of the diary entry')
            })
    })

    afterEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), DiaryEntry.deleteMany({})])
    })

    after(() => data.disconnect())
})
