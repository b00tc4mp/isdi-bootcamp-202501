import 'dotenv/config'
import { data, User, Timer } from '../data/index.js'
import { createTimer } from './createTimer.js'
import { ValidationError, NotFoundError } from 'com/errors.js'
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
        let timerStatus
        let user
        let timer

        return Promise.all([
            User.create({
                name: 'Harry Potter',
                email: 'harry@potter.com',
                username: 'GryffindorSeeker',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            })
        ])
            .then(([_user]) => {
                user = _user
            })
            .then(() => Promise.all([
                Timer.create({ author: user.id, time: 50, tag: 'Study', status: 'created', createdAt: new Date(2025, 1, 11) })
            ]))
            .then(([_timer]) => {
                timer = _timer
            })
            .then(() => createTimer(user.id, 50, 'Study'))
            .then(status => timerStatus = status)
            .finally(() => {
                expect(timerStatus).to.be.a('string')
                expect(timerStatus).to.equal('created')

            })
            .then(() => Timer.findOne({ createdAt: new Date(2025, 1, 11) }).lean())
            .then(timer => {
                expect(timer.time).to.equal(50)
                expect(timer.tag).to.equal('Study')
            })

    })
    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})