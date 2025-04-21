import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUser } from './getUser.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'
import mongoose from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env

describe('getUser', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => {
    return User.deleteMany({})
  })

  it('succeeds at getting own user', () => {
    let userId

    return User.create({
      name: 'Test Testing',
      email: 'test@testing.com',
      username: 'testtesting',
      password: '$2b$10$gHuXGJV4SnSX4Sy2eYgi5e/596QicI4Mn.jPUDav93jPz7ZjfoJwO',
    })
      .then((user) => {
        userId = user._id.toString()
        return getUser(userId)
      })
      .then((user) => {
        expect(user).to.exist
        expect(user._id.toString()).to.equal(userId)
        expect(user.name).to.equal('Test Testing')
        expect(user.email).to.equal('test@testing.com')
        expect(user.username).to.equal('testtesting')
      })
  })

  it('fails at user not found', () => {
    const nonExistentUserId = '605c72ef1532073d4a8b4e0e'

    return getUser(nonExistentUserId).catch((error) => {
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal('user not found')
    })
  })

  afterEach(() => User.deleteMany({}))

  after(() => data.disconnect())
})
