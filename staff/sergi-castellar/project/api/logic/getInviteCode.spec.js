import 'dotenv/config'
import { data, User, Couple, InviteCode } from "../data/index.js"
import { getInviteCode } from "./getInviteCode.js"
import { expect } from 'chai'
import { NotSingleError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getInviteCode', () => {
    let userId, inviteCodeId, invitecodeCode

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), InviteCode.deleteMany({})])
    })

    it('succeeds at existing invite code', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return InviteCode.create({ createdBy: userId, code: 'COUPLE-374fd5ae4a0a83a87832', used: false })
            })
            .then(inviteCode => {
                inviteCodeId = inviteCode._id.toString()
                invitecodeCode = inviteCode.code
                return getInviteCode(userId)
            })
            .then(code => {
                expect(code.id).to.equal(inviteCodeId)
                expect(code.code).to.equal('COUPLE-374fd5ae4a0a83a87832')
            })
    })

    it('succeeds at create new invite code', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return getInviteCode(userId)
            })
            .then(code => {
                expect(code).to.match(/^COUPLE-[a-fA-F0-9]{20}$/)
            })
    })

    it('fails when user is already in a couple', () => {
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
                    dateStart: new Date('2020-01-01')
                })
            })
            .then(() => {
                return getInviteCode(userId)
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotSingleError)
                expect(error.message).to.equal('User is already in couple')
            })
    })

    afterEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), InviteCode.deleteMany({})])
    })

    after(() => data.disconnect())
})
