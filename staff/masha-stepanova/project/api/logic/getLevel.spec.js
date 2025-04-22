import 'dotenv/config'
import { data, User, Level } from '../data/index.js'
import { getLevel } from './getLevel.js'
import { expect } from 'chai'
import { NotFoundError, SystemError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getLevel', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => Promise.all([User.deleteMany({}), Level.deleteMany({})]))

  it('succeeds and returns the requested level', () => {
    let user
    let levelCreated
    let returnedLevel

    return User.create({
      name: 'Test User',
      email: 'test@user.com',
      username: 'testuser',
      password: 'TestPwd123!',
    })
      .then((_user) => {
        user = _user

        return Level.create({
          ordinal: 1,
          type: 'quiz',
          name: 'Intro JS',
          description: 'A level to test basic JS',
          body: 'What does `const` mean?',
          resultOptions: ['mutable', 'constant', 'var'],
          expectedResult: 'constant',
        })
      })
      .then((_level) => {
        levelCreated = _level
        return getLevel(user._id.toString(), levelCreated._id.toString())
      })
      .then((_level) => {
        returnedLevel = _level
      })
      .finally(() => {
        expect(returnedLevel).to.exist
        expect(returnedLevel._id.toString()).to.equal(levelCreated._id.toString())
        expect(returnedLevel.type).to.equal(levelCreated.type)
        expect(returnedLevel.name).to.equal(levelCreated.name)
        expect(returnedLevel.description).to.equal(levelCreated.description)
        expect(returnedLevel.body).to.equal(levelCreated.body)
        expect(returnedLevel.resultOptions).to.deep.equal(levelCreated.resultOptions)
        expect(returnedLevel.expectedResult).to.equal(levelCreated.expectedResult)
        expect(returnedLevel.difficulty).to.equal(levelCreated.difficulty)
        expect(new Date(returnedLevel.createdAt).toISOString()).to.equal(levelCreated.createdAt.toISOString())
        expect(returnedLevel.modifiedAt).to.equal(null)
      })
  })

  it('fails if user does not exist', () => {
    let errorCaught
    let fakeUserId = '605c72ef1532073d4a8b4e0e'
    let level

    return Level.create({
      ordinal: 1,
      type: 'quiz',
      name: 'Non-user Level',
      description: 'Level for nonexistent user',
      body: 'Some question?',
      resultOptions: ['1', '2', '3'],
      expectedResult: '2',
    })
      .then((_level) => {
        level = _level
        return getLevel(fakeUserId, level._id.toString())
      })
      .catch((error) => (errorCaught = error))
      .finally(() => {
        expect(errorCaught).to.be.instanceOf(NotFoundError)
        expect(errorCaught.message).to.equal('user not found')
      })
  })

  it('fails if level does not exist', () => {
    let errorCaught
    let user

    return User.create({
      name: 'Levelless User',
      email: 'level@none.com',
      username: 'leveless',
      password: 'Level1234!',
    })
      .then((_user) => {
        user = _user
        return getLevel(user._id.toString(), '605c72ef1532073d4a8b4e0e')
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
