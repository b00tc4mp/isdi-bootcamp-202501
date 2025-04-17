import { data, User, Timer } from '../data/index.js'
import { setAndStartExtraTime } from './setAndStartExtraTime.js'
import { ValidationError, NotFoundError, DuplicityError, TimerError, OwnershipError } from 'com/errors.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'
import 'dotenv/config'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('setAndStartExtraTime', () => {
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
                Timer.create({ author: user._id, time: 50, startDate: new Date, pauseTime: 5, pausesCount: 1, tag: 'Study', status: 'active', createdAt: new Date(2025, 1, 11) })
            ]))
            .then(([_timer]) => {
                timer = _timer
            })
            .then(() => setAndStartExtraTime(user.id, timer.id, 15))
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(timer1 => {
                timer = timer1
                expect(timer.extraTimes).to.have.lengthOf(1)
                expect(timer.extraTimes).to.deep.equal([15])
                expect(timer.status).to.equal('extraTime')
            })

    })

    it('succeeds on existing user and timer in extraTime', () => {
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
                Timer.create({ author: user._id, time: 50, startDate: new Date, pauseTime: 3, pausesCount: 1, extraTimes: [10], tag: 'Study', status: 'extraTime', createdAt: new Date(2025, 1, 11) })
            ]))
            .then(([_timer]) => {
                timer = _timer
            })
            .then(() => setAndStartExtraTime(user.id, timer.id, 15))
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(timer1 => {
                timer = timer1
                expect(timer.extraTimes).to.have.lengthOf(2)
                expect(timer.extraTimes).to.deep.equal([10, 15])
                expect(timer.status).to.equal('extraTime')
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
                    status: 'active',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(_timer => timer = _timer)
            .then(() => setAndStartExtraTime(new ObjectId().toString(), timer._id.toString(), 20))
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
                    status: 'active',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(_timer => timer = _timer)
            .then(() => {
                expect(() => setAndStartExtraTime(123, timer._id.toString(), 30)).to.throw(ValidationError, 'invalid userId type')
                expect(() => setAndStartExtraTime('123', timer._id.toString(), 30)).to.throw(ValidationError, 'invalid userId length')
                expect(() => setAndStartExtraTime(' '.repeat(24), timer._id.toString(), 30)).to.throw(ValidationError, 'invalid userId syntax')
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
                    status: 'active',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(_timer => timer = _timer)
            .then(() => {
                expect(() => setAndStartExtraTime(user._id.toString(), 123, 30)).to.throw(ValidationError, 'invalid timerId type')
                expect(() => setAndStartExtraTime(user._id.toString(), '123', 30)).to.throw(ValidationError, 'invalid timerId length')
                expect(() => setAndStartExtraTime(user._id.toString(), ' '.repeat(24), 30)).to.throw(ValidationError, 'invalid timerId syntax')
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
                    status: 'active',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(_timer => timer = _timer)
            .then(() => setAndStartExtraTime(user._id.toString(), timer._id.toString(), 30))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(OwnershipError)
                expect(catchedError.message).to.equal('user is not author of timer')
            })

    })


    it('falis on timer has not started', () => {
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
            .then(() => Timer.findOne({ author: user._id.toString() }).lean())
            .then(_timer => timer = _timer)
            .then(() => setAndStartExtraTime(user._id.toString(), timer._id.toString(), 30))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(TimerError)
                expect(catchedError.message).to.equal('timer has not start')
            })

    })

    it('falis on timer has already end', () => {
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
                    startDate: new Date,
                    endDate: new Date,
                    pauseTime: 3,
                    tag: 'Study',
                    status: 'end',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => Timer.findOne({ author: user._id.toString() }).lean())
            .then(_timer => timer = _timer)
            .then(() => setAndStartExtraTime(user._id.toString(), timer._id.toString(), 30))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(TimerError)
                expect(catchedError.message).to.equal('timer already end')
            })

    })

    it('falis on timer is not active or in extraTime', () => {
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
                    startDate: new Date,
                    pauseTime: 3,
                    tag: 'Study',
                    status: 'pause',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => Timer.findOne({ author: user._id.toString() }).lean())
            .then(_timer => timer = _timer)
            .then(() => setAndStartExtraTime(user._id.toString(), timer._id.toString(), 20))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(TimerError)
                expect(catchedError.message).to.equal('timer is not active or in extraTime')
            })

    })

    it('falis on maximum time reached for timer', () => {
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
                    time: 90,
                    startDate: new Date,
                    pauseTime: 3,
                    extraTimes: [30, 60, 20],
                    tag: 'Study',
                    status: 'active',
                    createdAt: new Date(2025, 1, 11)
                })
            })
            .then(() => Timer.findOne({ author: user._id.toString() }).lean())
            .then(_timer => timer = _timer)
            .then(() => setAndStartExtraTime(user._id.toString(), timer._id.toString(), 50))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(TimerError)
                expect(catchedError.message).to.equal('maximum time reached for timer')
            })

    })


    afterEach(() => Promise.all([User.deleteMany({}), Timer.deleteMany({})]))

    after(() => data.disconnect())
})


// TODO fails on non-exsiting timer
// TODO finish this spec