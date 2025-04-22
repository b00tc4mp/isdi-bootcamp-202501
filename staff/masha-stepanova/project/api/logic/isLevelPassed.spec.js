import 'dotenv/config'
import { data, User, Level } from '../data/index.js'
import { isLevelPassed } from './isLevelPassed.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('isLevelPassed', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => Promise.all([User.deleteMany({}), Level.deleteMany({})]))

  it('succeeds and updates user progress if answer is correct', () => {
    let user, userUpdated
    let level1, level2
    let passed

    return Promise.all([
      Level.create({
        ordinal: 1,
        type: 'quiz',
        name: 'Level 1',
        description: 'Level 1 description',
        body: 'What is 2+2?',
        resultOptions: ['3', '4', '5'],
        expectedResult: '4',
        difficulty: 100,
      }),
      Level.create({
        ordinal: 2,
        type: 'quiz',
        name: 'Level 2',
        description: 'Next level',
        body: 'What is JS?',
        resultOptions: ['language', 'library', 'framework'],
        expectedResult: 'language',
        difficulty: 100,
      }),
    ])
      .then(([l1, l2]) => {
        level1 = l1
        level2 = l2

        return User.create({
          name: 'Progress Tester',
          email: 'progress@test.com',
          username: 'progresstester',
          password: 'Test123!',
          score: 0,
          generalProgress: [],
          currentLevel: level1._id,
        })
      })
      .then((_user) => {
        user = _user
        return isLevelPassed(user._id.toString(), level1._id.toString(), '4')
      })
      .then((_passed) => (passed = _passed))
      .then(() => User.findById(user._id).lean())
      .then((updatedUser) => {
        userUpdated = updatedUser
      })
      .finally(() => {
        expect(passed).to.be.true
        expect(userUpdated.score).to.equal(100)
        expect(userUpdated.generalProgress.map((l) => l.toString())).to.include(level1._id.toString())
        expect(userUpdated.currentLevel.toString()).to.equal(level2._id.toString())
      })
  })

  it('returns false and does not update progress if answer is incorrect', () => {
    let user, userUpdated
    let level

    return Level.create({
      ordinal: 1,
      type: 'quiz',
      name: 'Wrong Answer Level',
      description: 'Try to fail',
      body: 'Capital of Spain?',
      resultOptions: ['Madrid', 'Barcelona', 'Valencia'],
      expectedResult: 'Madrid',
      difficulty: 50,
    })
      .then((_level) => {
        level = _level

        return User.create({
          name: 'Wrong Answer Tester',
          email: 'fail@test.com',
          username: 'failtester',
          password: 'Test123!',
          score: 0,
          generalProgress: [],
          currentLevel: level._id,
        })
      })
      .then((u) => {
        user = u
        return isLevelPassed(user._id.toString(), level._id.toString(), 'Barcelona')
      })
      .then((result) => {
        expect(result).to.be.false
        return User.findById(user._id).lean()
      })
      .then((updatedUser) => {
        userUpdated = updatedUser
      })
      .finally(() => {
        expect(userUpdated.score).to.equal(0)
        expect(userUpdated.generalProgress).to.be.empty
        expect(userUpdated.currentLevel.toString()).to.equal(level._id.toString())
      })
  })

  it('fails if user does not exist', () => {
    let level
    let errorCaught

    return Level.create({
      ordinal: 1,
      type: 'quiz',
      name: 'Ghost Level',
      description: 'Haunted...',
      body: 'To whom?',
      resultOptions: ['A', 'B', 'C'],
      expectedResult: 'B',
    })
      .then((_level) => {
        level = _level
        return isLevelPassed('705c72ef1532073d4a8b4e0a', level._id.toString(), 'B')
      })
      .catch((error) => (errorCaught = error))
      .finally(() => {
        expect(errorCaught).to.be.instanceOf(NotFoundError)
        expect(errorCaught.message).to.equal('user not found')
      })
  })

  it('fails if level does not exist', () => {
    let errorCaught

    return User.create({
      name: 'Missing Level Tester',
      email: 'nolevel@test.com',
      username: 'nolevel',
      password: 'Test123!',
      score: 0,
      generalProgress: [],
    })
      .then((user) => {
        return isLevelPassed(user._id.toString(), '705c72ef1532073d4a8b4e0a', 'whatever')
      })
      .catch((error) => (errorCaught = error))
      .finally(() => {
        expect(errorCaught).to.be.instanceOf(NotFoundError)
        expect(errorCaught.message).to.equal('level not found')
      })
  })

  afterEach(() => Promise.all([User.deleteMany({}), Level.deleteMany({})]))

  after(() => data.disconnect())
})
