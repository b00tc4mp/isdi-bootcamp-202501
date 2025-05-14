import 'dotenv/config'
import { data, User, Timer } from '../data/index.js'
import { createTimer } from './createTimer.js'
import { ValidationError, NotFoundError, DuplicityError } from 'com/errors.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('createTimer', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Promise.all([User.deleteMany({}), Timer.deleteMany({})]))

    it('succeeds on existing user', () => {
        let user
        let timerId

        return Promise.all([User.create({
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'GryffindorSeeker',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })])

            .then(([_user]) => {
                user = _user
            })
            .then(() => createTimer(user.id, 50, 3, 'Study'))
            .then(newTimerId => timerId = newTimerId)

            .then(() => Timer.findById(timerId).lean())
            .then(timer => {
                expect(timerId).to.be.a('string')
                expect(timer.status).to.be.a('string')
                expect(timer.status).to.equal('created')
                expect(timer.time).to.equal(50)
                expect(timer.pauseTime).to.equal(3)
                expect(timer.tag).to.equal('Study')
                expect(timer.author.toString()).to.equal(user.id)
            })

    })

    it('falis on non-existing user', () => {
        let catchedError

        return createTimer(new ObjectId().toString(), 80, 10, 'Work')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('fails on invalid user id', () => {

        expect(() => createTimer(123, 90, 10, 'Yoga')).to.throw(ValidationError, 'invalid userId type')
        expect(() => createTimer('123', 100, 10, 'Exercice')).to.throw(ValidationError, 'invalid userId length')
        expect(() => createTimer(' '.repeat(24), 110, 10, 'Play')).to.throw(ValidationError, 'invalid userId syntax')
    })

    it('fails on invalid time', () => {
        return User.create({
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'GryffindorSeeker',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => User.findOne({ username: 'GryffindorSeeker' }).lean())
            .then(user => {
                expect(() => createTimer(user._id.toString(), '90', 10, 'Yoga')).to.throw(ValidationError, 'invalid time type')
                expect(() => createTimer(user._id.toString(), 140, 10, 'Exercice')).to.throw(ValidationError, 'invalid time maxValue')
                expect(() => createTimer(user._id.toString(), 3, 10, 'Exercice')).to.throw(ValidationError, 'invalid time minValue')
                expect(() => createTimer(user._id.toString(), -4, 10, 'Play')).to.throw(ValidationError, 'invalid time syntax')
            })

    })

    it('fails on invalid pauseTime', () => {
        return User.create({
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'GryffindorSeeker',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => User.findOne({ username: 'GryffindorSeeker' }).lean())
            .then(user => {
                expect(() => createTimer(user._id.toString(), 90, '10', 'Yoga')).to.throw(ValidationError, 'invalid pause type')
                expect(() => createTimer(user._id.toString(), 110, 15, 'Exercice')).to.throw(ValidationError, 'invalid pause maxValue')
                expect(() => createTimer(user._id.toString(), 35, 1, 'Exercice')).to.throw(ValidationError, 'invalid pause minValue')
                expect(() => createTimer(user._id.toString(), 70, -10, 'Play')).to.throw(ValidationError, 'invalid pause syntax')
            })

    })

    it('fails on invalid tag', () => {
        return User.create({
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'GryffindorSeeker',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => User.findOne({ username: 'GryffindorSeeker' }).lean())
            .then(user => {
                expect(() => createTimer(user._id.toString(), 90, 10, 123)).to.throw(ValidationError, 'invalid tag type')
                expect(() => createTimer(user._id.toString(), 110, 7, 'Exerciceeeeeeeeeeeeeeeee')).to.throw(ValidationError, 'invalid tag maxLength')
                expect(() => createTimer(user._id.toString(), 35, 1, 'Do')).to.throw(ValidationError, 'invalid tag minLength')
                expect(() => createTimer(user._id.toString(), 70, 10, 'Play tennis')).to.throw(ValidationError, 'Invalid tag syntax. Use a single word with letters only.')
            })

    })

    it('falis on user already have a timer in progress', () => {
        let user
        let timer

        return Promise.all([User.create({
            name: 'Hermione Granger',
            email: 'hermione@granger.com',
            username: 'Granger',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })])

            .then(([_user]) => {
                user = _user
            })
            .then(() => Promise.all([
                Timer.create({ author: user.id, time: 50, pauseTime: 3, tag: 'Study', status: 'created', createdAt: new Date(2025, 1, 11) })
            ]))
            .then(([_timer]) => {
                timer = _timer
            })
            .then(() => User.findOne({ username: 'Granger' }).lean())
            .then(user => {
                createTimer(user._id.toString(), 80, 10, 'Work')
                    .catch(error => catchedError = error)
                    .then(() => {
                        expect(catchedError).to.be.instanceOf(DuplicityError)
                        expect(catchedError.message).to.equal('a timer already in progress')
                    })
            })

    })


    afterEach(() => Promise.all([User.deleteMany({}), Timer.deleteMany({})]))

    after(() => data.disconnect())
})