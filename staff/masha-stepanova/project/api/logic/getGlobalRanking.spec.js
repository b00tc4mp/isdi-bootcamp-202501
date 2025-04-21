import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getGlobalRanking } from './getGlobalRanking.js'
import { expect } from 'chai'
import { NotFoundError, SystemError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getGlobalRanking', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => User.deleteMany({}))

  it('succeeds and returns users ranked by score including current user', () => {
    let user1, user2, user3
    let ranking

    return Promise.all([
      User.create({
        name: 'User One',
        email: 'one@test.com',
        username: 'userone',
        password: 'Test1234!',
        score: 150,
      }),
      User.create({
        name: 'User Two',
        email: 'two@test.com',
        username: 'usertwo',
        password: 'Test1234!',
        score: 300,
      }),
      User.create({
        name: 'User Three',
        email: 'three@test.com',
        username: 'userthree',
        password: 'Test1234!',
        score: 200,
      }),
    ])
      .then(([u1, u2, u3]) => {
        user1 = u1
        user2 = u2
        user3 = u3

        return getGlobalRanking(user1._id.toString())
      })
      .then((_ranking) => {
        ranking = _ranking
      })
      .finally(() => {
        expect(ranking).to.be.an('array').with.lengthOf(3)

        expect(ranking[0].username).to.equal('usertwo')
        expect(ranking[0]).to.have.property('position', 1)
        expect(ranking[0]).to.not.have.property('score')

        expect(ranking[1].username).to.equal('userthree')
        expect(ranking[1]).to.have.property('position', 2)
        expect(ranking[1]).to.not.have.property('score')

        expect(ranking[2].username).to.equal('userone')
        expect(ranking[2]).to.have.property('position', 3)
        expect(ranking[2]).to.not.have.property('score')
      })
  })

  it('fails if user does not exist', () => {
    let errorCaught
    const nonExistentId = '645c72ef1532073d4a8b4e0e'

    return getGlobalRanking(nonExistentId)
      .catch((error) => (errorCaught = error))
      .finally(() => {
        expect(errorCaught).to.be.instanceOf(NotFoundError)
        expect(errorCaught.message).to.equal('user not found')
      })
  })

  afterEach(() => User.deleteMany({}))

  after(() => data.disconnect())
})
