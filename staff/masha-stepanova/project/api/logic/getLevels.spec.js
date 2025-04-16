import 'dotenv/config'
import { Types } from 'mongoose'
import { getLevels } from './getLevels.js'
import { data, User, Level } from '../data/index.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { NotFoundError, ValidationError, SystemError } from 'com/errors.js'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB_TEST } = process.env
const { ObjectId } = Types

describe.only('getLevels', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Level.deleteMany({})
        ])
    })

    it('successfully retrieves levels and validates structure and isBlocked logic', () => {
        debugger

        let user
        let level1, level2
        let levelsReturned

        return User.create({
            name: 'Alice Test',
            email: 'alice@test.com',
            username: 'alicetest',
            password: 'Al1cePwd@2024'
        })
            .then(_user => {
                user = _user

                return Promise.all([
                    Level.create({
                        type: 'quiz',
                        name: 'Intro Level',
                        description: 'This is the first level',
                        body: 'What is JavaScript?',
                        resultOptions: ['A', 'B', 'C'],
                        expectedResult: 'A'
                    }),
                    Level.create({
                        type: 'fillBlank',
                        name: 'Basic Concepts',
                        description: 'Second level description',
                        body: 'Fill in the ___',
                        resultOptions: ['1', '2', '3'],
                        expectedResult: '2'
                    })
                ])
            })
            .then(([_level1, _level2]) => {
                level1 = _level1
                level2 = _level2

                user.currentLevel = level1._id
                return user.save()
            })
            .then(() => { return getLevels(user._id.toString()) })
            .then(_levels => {
                console.log(_levels)
                levelsReturned = _levels
            })
            .finally(() => {
                expect(levelsReturned).to.be.an('array').with.lengthOf(2)

                const levelA = levelsReturned.find(l => l.id === level1._id.toString())
                const levelB = levelsReturned.find(l => l.id === level2._id.toString())

                // Verifica Level A
                expect(levelA).to.exist
                expect(levelA.id).to.equal(level1._id.toString())
                expect(levelA.type).to.equal(level1.type)
                expect(levelA.name).to.equal(level1.name)
                expect(levelA.description).to.equal(level1.description)
                expect(levelA.body).to.equal(level1.body)
                expect(levelA.resultOptions).to.deep.equal(level1.resultOptions)
                expect(levelA.expectedResult).to.equal(level1.expectedResult)
                expect(levelA.difficulty).to.equal(level1.difficulty)
                expect(new Date(levelA.createdAt).toISOString()).to.equal(level1.createdAt.toISOString())
                expect(levelA.modifiedAt).to.equal(null)
                expect(levelA.isBlocked).to.equal(false)

                // Verifica Level B
                expect(levelB).to.exist
                expect(levelB.id).to.equal(level2._id.toString())
                expect(levelB.type).to.equal(level2.type)
                expect(levelB.name).to.equal(level2.name)
                expect(levelB.description).to.equal(level2.description)
                expect(levelB.body).to.equal(level2.body)
                expect(levelB.resultOptions).to.deep.equal(level2.resultOptions)
                expect(levelB.expectedResult).to.equal(level2.expectedResult)
                expect(levelB.difficulty).to.equal(level2.difficulty)
                expect(new Date(levelB.createdAt).toISOString()).to.equal(level2.createdAt.toISOString())
                expect(levelB.modifiedAt).to.equal(null)
                expect(levelB.isBlocked).to.equal(true)
            })
    })

    it('fails with NotFoundError if user does not exist', () => {
        let errorCaught

        return getLevels(new ObjectId().toString())
            .catch(error => errorCaught = error)
            .finally(() => {
                expect(errorCaught).to.be.instanceOf(NotFoundError)
                expect(errorCaught.message).to.equal('user not found')
            })
    })

    it('fails with ValidationError if userId is invalid', () => {
        let errorCaught

        return getLevels('123')
            .catch(error => errorCaught = error)
            .finally(() => {
                expect(errorCaught).to.be.instanceOf(ValidationError)
            })
    })

    it('fails with SystemError if Level.find fails unexpectedly', () => {
        let errorCaught
        let stub

        return User.create({
            name: 'Error Test',
            email: 'error@test.com',
            username: 'errortest',
            password: 'Err0rPwd@123'
        })
            .then(user => {
                // Stub del método Level.find
                stub = Level.find = () => { throw new Error('Simulated DB error') }
                return getLevels(user.id)
            })
            .catch(error => errorCaught = error)
            .finally(() => {
                expect(errorCaught).to.be.instanceOf(SystemError)
                expect(errorCaught.message).to.equal('Simulated DB error')
                stub = null // cleanup manual en este caso simple
            })
    })

    afterEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Level.deleteMany({})
        ])
    })

    after(() => data.disconnect())
})
