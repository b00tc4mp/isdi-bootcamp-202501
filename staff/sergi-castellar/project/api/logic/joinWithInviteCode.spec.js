import 'dotenv/config'
import { data, User, Couple, InviteCode } from "../data/index.js"
import { joinWithInviteCode } from "./joinWithInviteCode.js"
import { expect } from 'chai'
import { NotFoundError, NotAllowedError, NotSingleError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('joinWithInviteCode', () => {
    let userId, partnerId, randomUserId, creatorId, coupleId, inviteCodeId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), InviteCode.deleteMany({})])
    })

    it('succeeds at creating couple', () => {
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
                return InviteCode.create({
                    code: 'COUPLE-374fd5ae4a0a83a87832',
                    createdBy: partnerId
                })
            })
            .then(inviteCode => {
                inviteCodeId = inviteCode._id.toString()
                return joinWithInviteCode(userId, 'COUPLE-374fd5ae4a0a83a87832')
            })
            .then(response => {
                expect(response).to.have.property('coupleId')
                expect(response).to.have.property('members')
                expect(response.members).to.include(userId)
                expect(response.members).to.include(partnerId)
                return InviteCode.findOne({ code: 'COUPLE-374fd5ae4a0a83a87832' })
            })
            .then(code => {
                expect(code).to.be.null
            })
    })

    it('fails at invite code not found', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return joinWithInviteCode(userId, 'COUPLE-374fd5ae4a0a83a87833')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Invite code not found')
            })
    })

    it('fails at cannot use your own code', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return InviteCode.create({
                    code: 'COUPLE-374fd5ae4a0a83a87832',
                    createdBy: userId
                })
            })
            .then(() => {
                return joinWithInviteCode(userId, 'COUPLE-374fd5ae4a0a83a87832')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotAllowedError)
                expect(error.message).to.equal('Cannot use your own code')
            })
    })

    it('fails at you are already in a couple', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return User.create({
                    name: 'Ran Dom',
                    email: 'ran@dom.com',
                    username: 'random',
                    password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
                })
            })
            .then(randomUser => {
                randomUserId = randomUser._id.toString()
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
                    members: [userId, randomUserId],
                    dateStart: new Date('2020-01-01')
                })
            })
            .then(() => {
                return InviteCode.create({
                    code: 'COUPLE-374fd5ae4a0a83a87832',
                    createdBy: partnerId
                })
            })
            .then(() => {
                return joinWithInviteCode(userId, 'COUPLE-374fd5ae4a0a83a87832')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotSingleError)
                expect(error.message).to.equal('You are already in a couple')
            })
    })

    it('fails at the invite code creator is already in a couple', () => {
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return User.create({
                    name: 'Ran Dom',
                    email: 'ran@dom.com',
                    username: 'random',
                    password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
                })
            })
            .then(randomUser => {
                randomUserId = randomUser._id.toString()
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
                    members: [randomUserId, userId],
                    dateStart: new Date('2020-01-01')
                })
            })
            .then(() => {
                return InviteCode.create({
                    code: 'COUPLE-374fd5ae4a0a83a87832',
                    createdBy: userId
                })
            })
            .then(() => {
                return joinWithInviteCode(partnerId, 'COUPLE-374fd5ae4a0a83a87832')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotSingleError)
                expect(error.message).to.equal('The invite code creator is already in a couple')
            })
    })

    afterEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), InviteCode.deleteMany({})])
    })

    after(() => data.disconnect())

    //TODO comprobar que se borre invitecode
})
