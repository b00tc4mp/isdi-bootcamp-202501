import 'dotenv/config'
import { data, User, Timer } from '../data/index.js'
import { checkUserTimers } from './checkUserTimers.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('checkUserTimers', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user and a timer is on', () => {
        let user
        let timer
        let result

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
                Timer.create({ author: user.id, time: 50, pauseTime: 3, tag: 'Study', status: 'active', startDate: new Date, createdAt: new Date(2025, 1, 11) })
            ]))
            .then(([_timer]) => {
                timer = _timer
            })
            .then(() => checkUserTimers(user.id))
            .then(timerOn => result = timerOn)
            .finally(() => expect(result).to.equal(timer._id.toString()))
    })

    it('succeeds on existing user and non timers on', () => {
        let user
        let timer
        let result

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
                Timer.create({ author: user.id, time: 50, pauseTime: 3, tag: 'Study', status: 'end', startDate: new Date, endDate: new Date, createdAt: new Date(2025, 1, 11) })
            ]))
            .then(([_timer]) => {
                timer = _timer
            })
            .then(() => checkUserTimers(user.id))
            .then(timerOn => result = timerOn)
            .finally(() => expect(result).to.equal(undefined))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return checkUserTimers(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})