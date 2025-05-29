import 'dotenv/config'
import { data, User } from '../data/index.js'
import { registerUser } from './registerUser.js'
import { expect } from 'chai'
import { DuplicityError, PasswordValidationError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('registerUser', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => User.deleteMany({}))

  it('succeeds at register new user', () => {
    let user2

    return registerUser('testing', 'testing@testing.com', 'testing', 'Patata2!', 'Patata2!')
      .then(() => User.findOne({ username: 'testing' }).lean())
      .then((user) => (user2 = user))
      .finally(() => {
        expect(user2.name).to.equal('testing')
        expect(user2.email).to.equal('testing@testing.com')
        expect(user2.username).to.equal('testing')
      })
  })

  it('fails on already existing user', () => {
    let catchedError

    return User.create({
      name: 'testing',
      email: 'testing@testing.com',
      username: 'testing',
      password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO',
    })
      .then(() => registerUser('testing', 'testing@testing.com', 'testing', 'Patata2!', 'Patata2!'))
      .catch((error) => (catchedError = error))
      .finally(() => {
        expect(catchedError).to.be.instanceOf(DuplicityError)
        expect(catchedError.message).to.equal('user already exists')
      })
  })

  it('fails on password does not match the repeated password', () => {
    let catchedError
    try {
      return registerUser('testing', 'testing@testing.com', 'testing', 'Patata2!', 'Patata7!')
    } catch (error) {
      catchedError = error
      expect(catchedError).to.be.instanceOf(PasswordValidationError)
      expect(catchedError.message).to.equal('Password does not match the repeated password')
    }
  })

  afterEach(() => User.deleteMany({}))

  after(() => data.disconnect())
})
