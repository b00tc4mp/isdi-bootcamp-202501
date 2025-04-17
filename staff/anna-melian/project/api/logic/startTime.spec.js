import 'dotenv/config'
import { data, User, Timer } from '../data/index.js'
import { startTimer } from './startTimer.js'
import { ValidationError, NotFoundError, DuplicityError, TimerError, OwnershipError } from 'com/errors.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('startTimer', () => {
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
            .then(() => startTimer(user.id, timer.id))
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(timer1 => {
                timer = timer1
                expect(timer.startDate).to.be.an.instanceOf(Date)
                expect(timer.startDate).to.not.be.null
                expect(timer.status).to.equal('active')
            })

    })

    it('falis on non-existing user', () => {
        let catchedError
        let timer
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
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(_timer => timer = _timer)
            .then(() => startTimer(new ObjectId().toString(), timer._id.toString()))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('fails on invalid user id', () => {
        let timer
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
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(_timer => timer = _timer)
            .then(() => {
                expect(() => startTimer(123, timer._id.toString())).to.throw(ValidationError, 'invalid userId type')
                expect(() => startTimer('123', timer._id.toString())).to.throw(ValidationError, 'invalid userId length')
                expect(() => startTimer(' '.repeat(24), timer._id.toString())).to.throw(ValidationError, 'invalid userId syntax')
            })


    })

    it('fails on invalid timer id', () => {
        let timer
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
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(_timer => timer = _timer)
            .then(() => {
                expect(() => startTimer(user._id.toString(), 123)).to.throw(ValidationError, 'invalid timerId type')
                expect(() => startTimer(user._id.toString(), '123')).to.throw(ValidationError, 'invalid timerId length')
                expect(() => startTimer(user._id.toString(), ' '.repeat(24))).to.throw(ValidationError, 'invalid timerId syntax')
            })


    })


    it('fails on user is not the timer owner', () => {
        let catchedError
        let timer
        let user, user2
        return Promise.all([
            User.create({
                name: 'Harry Potter',
                email: 'harry@potter.com',
                username: 'GryffindorSeeker',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
            User.create({
                name: 'Hermione Granger',
                email: 'hermione@granger.com',
                username: 'Granger',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            })
        ])
            .then(([_user, _user2]) => {
                user = _user
                user2 = _user2
            })
            .then(() => {
                return Timer.create({
                    author: user2._id,
                    time: 50,
                    pauseTime: 3,
                    tag: 'Study',
                    status: 'created',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(_timer => timer = _timer)
            .then(() => startTimer(user._id.toString(), timer._id.toString()))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(OwnershipError)
                expect(catchedError.message).to.equal('user is not author of timer')
            })

    })


    it('falis on timer already started', () => {
        let catchedError
        let timer
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
                    startDate: new Date(2025, 3, 16),
                    pauseTime: 3,
                    tag: 'Study',
                    status: 'created',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => Timer.findOne({ author: user._id.toString() }).lean())
            .then(_timer => timer = _timer)
            .then(() => startTimer(user._id.toString(), timer._id.toString()))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(TimerError)
                expect(catchedError.message).to.equal('timer already start')
            })

    })


    afterEach(() => Promise.all([User.deleteMany({}), Timer.deleteMany({})]))

    after(() => data.disconnect())
})


// TODO fails on non-exsiting timer