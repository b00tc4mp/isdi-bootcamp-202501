import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserRanking } from './getUserRanking.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getUserRanking', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => User.deleteMany({}))

  it("succeeds and returns the user's global ranking position", () => {
    let user1, user2, user3
    let result

    return Promise.all([
      User.create({
        name: 'One',
        email: 'one@test.com',
        username: 'userone',
        password: 'Test123!',
        score: 300,
      }),
      User.create({
        name: 'Two',
        email: 'two@test.com',
        username: 'usertwo',
        password: 'Test123!',
        score: 500,
      }),
      User.create({
        name: 'Three',
        email: 'three@test.com',
        username: 'userthree',
        password: 'Test123!',
        score: 100,
      }),
    ])
      .then(([u1, u2, u3]) => {
        user1 = u1
        user2 = u2
        user3 = u3

        return getUserRanking(user3._id.toString())
      })
      .then((_result) => (result = _result))
      .finally(() => {
        expect(result).to.be.an('object')
        expect(result.username).to.equal('userthree')
        expect(result.position).to.equal(3) // porque tiene el menor score
      })
  })

  it('fails if user does not exist', () => {
    const fakeUserId = '605c72ef1532073d4a8b4e0e'
    let errorCaught

    return getUserRanking(fakeUserId)
      .catch((error) => (errorCaught = error))
      .finally(() => {
        expect(errorCaught).to.be.instanceOf(NotFoundError)
        expect(errorCaught.message).to.equal('user not found')
      })
  })

  afterEach(() => User.deleteMany({}))

  after(() => data.disconnect())
})
