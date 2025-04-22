import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => User.deleteMany({}))

  it('succeeds on existing user', () => {
    let returnedUserId, userInDB

    return User.create({
      name: 'Test User',
      email: 'test@user.com',
      username: 'testuser',
      password: '$2b$10$3ku/zX4aFSeFQN4We3DPVuIVJFfhvdrl2f8T43KyC3nBuI0g0LsLW',
    })
      .then(() => authenticateUser('testuser', 'Patata2!'))
      .then((userId) => (returnedUserId = userId))
      .then(() => User.findOne({ username: 'testuser' }).lean())
      .then((user) => (userInDB = user))
      .finally(() => {
        expect(returnedUserId).to.be.a.string
        expect(userInDB._id.toString()).to.equal(returnedUserId)
      })
  })

  it('fails on non-existing user', () => {
    let catchedError

    return authenticateUser('testuser', 'Patata2!')
      .catch((error) => (catchedError = error))
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError)
        expect(catchedError.message).to.equal('user not found')
      })
  })

  it('fails on existing user but wrong password', () => {
    let catchedError

    return User.create({
      name: 'Test User',
      email: 'test@user.com',
      username: 'testuser',
      password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO',
    })
      .then(() => authenticateUser('testuser', 'Testing1!'))
      .catch((error) => (catchedError = error))
      .finally(() => {
        expect(catchedError).to.be.instanceOf(CredentialsError)
        expect(catchedError.message).to.equal('wrong credentials')
      })
  })

  afterEach(() => User.deleteMany({}))

  after(() => data.disconnect())
})
