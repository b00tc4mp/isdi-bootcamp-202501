import 'dotenv/config'
import { data, User, Timer } from '../data/index.js'
import { deleteTimer } from './deleteTimer.js'
import { ValidationError, NotFoundError, DuplicityError, OwnershipError, TimerError } from 'com/errors.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('deleteTimer', () => {
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
            .then(() => deleteTimer(user.id, timer.id))
            .then(timer1 => {
                expect(timer1).to.equal(undefined)

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
            .then(() => deleteTimer(new ObjectId().toString(), timer._id.toString()))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('falis on non-existing timer', () => {
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
            .then(() => deleteTimer(user._id.toString(), new ObjectId().toString()))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('timer not found')
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
                expect(() => deleteTimer(123, timer.id)).to.throw(ValidationError, 'invalid userId type')
                expect(() => deleteTimer('123', timer.id)).to.throw(ValidationError, 'invalid userId length')
                expect(() => deleteTimer(' '.repeat(24), timer.id)).to.throw(ValidationError, 'invalid userId syntax')
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
                expect(() => deleteTimer(user._id.toString(), 123)).to.throw(ValidationError, 'invalid timerId type')
                expect(() => deleteTimer(user._id.toString(), '123')).to.throw(ValidationError, 'invalid timerId length')
                expect(() => deleteTimer(user._id.toString(), ' '.repeat(24))).to.throw(ValidationError, 'invalid timerId syntax')
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
            .then(() => deleteTimer(user._id.toString(), timer._id.toString()))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(OwnershipError)
                expect(catchedError.message).to.equal('user is not author of timer')
            })

    })

    it('falis on timer not able to delete', () => {
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
                    status: 'end',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => Timer.findOne({ author: user._id.toString() }).lean())
            .then(_timer => timer = _timer)
            .then(() => deleteTimer(user._id.toString(), timer._id.toString()))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(TimerError)
                expect(catchedError.message).to.equal('timer is active or finish and not able to delete')
            })

    })

    afterEach(() => Promise.all([User.deleteMany({}), Timer.deleteMany({})]))

    after(() => data.disconnect())
})