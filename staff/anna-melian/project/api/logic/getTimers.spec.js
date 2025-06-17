import 'dotenv/config'
import { data, User, Timer } from '../data/index.js'
import { getTimers } from './getTimers.js'
import { ValidationError, NotFoundError, DuplicityError, TimerError, OwnershipError } from 'com/errors.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getTimers', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Promise.all([User.deleteMany({}), Timer.deleteMany({})]))

    it('succeeds on existing user and timer', () => {
        let user
        let timer

        return Promise.all([User.create({
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'GryffindorSeeker',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })])

            .then(([_user]) => {
                user = _user
            })
            .then(() => Promise.all([
                Timer.create({ author: user._id, time: 50, pauseTime: 3, tag: 'Study', status: 'created', createdAt: new Date(2025, 1, 11) })
            ]))
            .then(([_timer]) => {
                timer = _timer
            })
            .then(() => getTimers(user.id))
            .then(timers => {
                expect(timers).to.be.an('array')
                expect(timers).to.have.lengthOf(1)
            })

    })

    it('succeeds on existing user and no timers created', () => {
        let user
        let timer

        return Promise.all([User.create({
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'GryffindorSeeker',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })])

            .then(([_user]) => {
                user = _user
            })
            .then(() => getTimers(user.id))
            .then(timers => {
                expect(timers).to.be.an('array')
                expect(timers).to.have.lengthOf(0)
            })

    })

    it('falis on non-existing user', () => {
        let catchedError
        let user
        return User.create({
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'GryffindorSeeker',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => User.findOne({ username: 'GryffindorSeeker' }).lean())
            .then(_user => user = _user)
            .then(() => {
                return Timer.create({
                    author: user._id,
                    time: 50,
                    pauseTime: 3,
                    tag: 'Study',
                    status: 'created',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => getTimers(new ObjectId().toString()))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })


    it('fails on invalid user id', () => {
        let user
        return User.create({
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'GryffindorSeeker',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => User.findOne({ username: 'GryffindorSeeker' }).lean())
            .then(_user => user = _user)
            .then(() => {
                return Timer.create({
                    author: user._id,
                    time: 50,
                    pauseTime: 3,
                    tag: 'Study',
                    status: 'created',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => {
                expect(() => getTimers(123)).to.throw(ValidationError, 'invalid userId type')
                expect(() => getTimers('123')).to.throw(ValidationError, 'invalid userId length')
                expect(() => getTimers(' '.repeat(24))).to.throw(ValidationError, 'invalid userId syntax')
            })


    })


    afterEach(() => Promise.all([User.deleteMany({}), Timer.deleteMany({})]))

    after(() => data.disconnect())
})

