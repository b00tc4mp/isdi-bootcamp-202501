import 'dotenv/config'
import { data, User, Couple, CalendarEvent } from "../data/index.js"
import { retrieveCoupleEvents } from "./retrieveCoupleEvents.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('retrieveCoupleEvents', () => {
    let userId, partnerId, coupleId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Couple.deleteMany({}), CalendarEvent.deleteMany({})])
    })

    it('success at getting couple events', () => {
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
                    dateStart: new Date('2020-01-01')
                })
            })
            .then(couple => {
                coupleId = couple._id.toString()
                return Promise.all([
                    CalendarEvent.create({
                        couple: coupleId,
                        author: userId,
                        title: 'Anniversary',
                        description: 'Our first anniversary!',
                        eventDate: new Date('2025-06-18')
                    }),
                    CalendarEvent.create({
                        couple: coupleId,
                        author: partnerId,
                        title: 'Special Dinner',
                        description: 'With our special friends',
                        eventDate: new Date('2025-06-15')
                    })
                ])
            })
            .then(() => {
                return retrieveCoupleEvents(userId, new Date('2025-06-01'), new Date('2025-06-30'))
            })
            .then(events => {
                expect(events).to.have.lengthOf(2)
                expect(events[0].title).to.equal('Special Dinner')
                expect(events[0].eventDate.toISOString()).to.equal('2025-06-15T00:00:00.000Z')
                expect(events[1].title).to.equal('Anniversary')
                expect(events[1].eventDate.toISOString()).to.equal('2025-06-18T00:00:00.000Z')
            })
    })

    it('fails at couple not found', () => {
        return retrieveCoupleEvents('605c72ef1532073d4a8b4e0e', new Date('2025-06-01'), new Date('2025-06-30'))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Couple not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany({}), Couple.deleteMany({}), CalendarEvent.deleteMany({})]))

    after(() => data.disconnect())
})
