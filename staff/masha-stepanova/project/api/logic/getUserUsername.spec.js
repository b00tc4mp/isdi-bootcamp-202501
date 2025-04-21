import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getUserUsername', () => {
  let userId

  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => {
    return User.deleteMany({})
  })

  it('succeeds at getting own username', () => {
    return User.insertOne({
      name: 'Test Test',
      email: 'test@test.com',
      username: 'testtest',
      password: '$2b$10$gHuXGJV4SnSX4Sy2eYgi5e/596QicI4Mn.jPUDav93jPz7ZjfoJwO',
    })
      .then((user) => {
        userId = user._id.toString()
        return getUserUsername(userId)
      })
      .then((user) => {
        console.log(user)
        expect(user).to.exist
        expect(user).to.equal('testtest')
      })
  })

  it('fails at user not found', () => {
    const nonExistentUserId = '605c72ef1532073d4a8b4e0e'

    return getUserUsername(nonExistentUserId).catch((error) => {
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal('user not found')
    })
  })

  afterEach(() => User.deleteMany({}))

  after(() => data.disconnect())
})
