import 'dotenv/config'
import { data, User, Level } from '../data/index.js'
import { getCurrentLevel } from './getCurrentLevel.js'
import { expect } from 'chai'
import { NotFoundError, ValidationError, SystemError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getCurrentLevel', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => Promise.all([User.deleteMany({}), Level.deleteMany({})]))

  it("succeeds and returns user's current level if exists", () => {
    let user
    let levelReturned
    let levelRef

    return Level.create({
      ordinal: 1,
      type: 'quiz',
      name: 'JS Basics',
      description: 'This is a simple JS quiz',
      body: 'What is let?',
      resultOptions: ['var', 'const', 'let'],
      expectedResult: 'let',
    })
      .then((_level) => {
        levelRef = _level

        return User.create({
          name: 'User One',
          email: 'user@one.com',
          username: 'userone',
          password: 'TestPwd123!',
          currentLevel: _level._id,
        })
      })
      .then((_user) => {
        user = _user
        return getCurrentLevel(user._id.toString())
      })
      .then((_level) => {
        levelReturned = _level
      })
      .finally(() => {
        expect(levelReturned).to.exist
        expect(levelReturned).to.be.an('object')
        expect(levelReturned.id).to.equal(levelRef._id.toString())
        expect(levelReturned.type).to.equal(levelRef.type)
        expect(levelReturned.name).to.equal(levelRef.name)
        expect(levelReturned.description).to.equal(levelRef.description)
        expect(levelReturned.body).to.equal(levelRef.body)
        expect(levelReturned.resultOptions).to.deep.equal(levelRef.resultOptions)
        expect(levelReturned.expectedResult).to.equal(levelRef.expectedResult)
        expect(levelReturned.difficulty).to.equal(levelRef.difficulty)
        expect(new Date(levelReturned.createdAt).toISOString()).to.equal(levelRef.createdAt.toISOString())
        expect(levelReturned.modifiedAt).to.equal(null)
      })
  })

  it('returns first level if user has no current level set', () => {
    let levelCreated
    let levelReturned

    return Level.create({
      ordinal: 1,
      type: 'fillBlank',
      name: 'Intro',
      description: 'Starting point',
      body: 'Hello ___!',
      resultOptions: ['world', 'js', 'test'],
      expectedResult: 'world',
    })
      .then((_level) => {
        levelCreated = _level

        return User.create({
          name: 'No Level User',
          email: 'no@level.com',
          username: 'noleveluser',
          password: 'NoLevel123!',
        })
      })
      .then((user) => getCurrentLevel(user._id.toString()))
      .then((_level) => (levelReturned = _level))
      .finally(() => {
        expect(levelReturned).to.exist
        expect(levelReturned.id).to.equal(levelCreated._id.toString())
        expect(levelReturned.type).to.equal(levelCreated.type)
        expect(levelReturned.name).to.equal(levelCreated.name)
        expect(levelReturned.description).to.equal(levelCreated.description)
        expect(levelReturned.body).to.equal(levelCreated.body)
        expect(levelReturned.resultOptions).to.deep.equal(levelCreated.resultOptions)
        expect(levelReturned.expectedResult).to.equal(levelCreated.expectedResult)
        expect(levelReturned.difficulty).to.equal(levelCreated.difficulty)
        expect(new Date(levelReturned.createdAt).toISOString()).to.equal(levelCreated.createdAt.toISOString())
        expect(levelReturned.modifiedAt).to.equal(null)
      })
  })

  it('fails with NotFoundError if user does not exist', () => {
    let errorCaught
    const fakeUserId = '645c1234567890abcdef1234'

    return getCurrentLevel(fakeUserId)
      .catch((error) => (errorCaught = error))
      .finally(() => {
        expect(errorCaught).to.be.instanceOf(NotFoundError)
        expect(errorCaught.message).to.equal('user not found')
      })
  })

  afterEach(() => Promise.all([User.deleteMany({}), Level.deleteMany({})]))

  after(() => data.disconnect())
})
