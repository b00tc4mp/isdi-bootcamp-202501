import 'dotenv/config'
import { data, User, Couple, CalendarEvent } from "../../data/index.js"
import { updateCalendarEvent } from "./updateCalendarEvent.js"
import { expect } from 'chai'
import { NotFoundError, AuthorizationError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('updateCalendarEvent', () => {
    let userId, partnerId, coupleId, eventId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), CalendarEvent.deleteMany({})])
    })

    it('succeeds at updating calendar event', () => {
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
                return CalendarEvent.create({
                    couple: coupleId,
                    author: userId,
                    eventDate: new Date('2023-05-01'),
                    title: 'Anniversary',
                    description: 'Our special day'
                })
            })
            .then(event => {
                eventId = event._id.toString()
                return updateCalendarEvent(userId, eventId, 'Updated Anniversary', 'Updated special day')
            })
            .then(() => CalendarEvent.findById(eventId).lean())
            .then(event => {
                expect(event.title).to.equal('Updated Anniversary')
                expect(event.description).to.equal('Updated special day')
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
                return updateCalendarEvent(userId, eventId, 'Updated Anniversary', 'Updated special day')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Couple not found')
            })
    })

    it('fails at non existent event', () => {
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
                return updateCalendarEvent(userId, '605c72ef1532073d4a8b4e1e', 'Updated Anniversary', 'Updated special day')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Event not found')
            })
    })

    it('fails at authorization error', () => {
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
                return CalendarEvent.create({
                    couple: '605c72ef1532073d4a8b4e1e',
                    author: '605c72ef1532073d4a8b8e1e',
                    eventDate: new Date('2023-05-01'),
                    title: 'Anniversary',
                    description: 'Our special day'
                })
            })
            .then(event => {
                eventId = event._id.toString()
                return updateCalendarEvent(userId, eventId, 'Updated Anniversary', 'Updated special day')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(AuthorizationError)
                expect(error.message).to.equal('Couple is not the owner of the event')
            })
    })

    afterEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), CalendarEvent.deleteMany({})])
    })

    after(() => data.disconnect())
})
