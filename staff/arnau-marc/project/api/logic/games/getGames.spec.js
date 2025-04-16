import 'dotenv/config'
import { data, Game } from '../../data/index.js'
import { getGames } from './getGames.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { SystemError } = errors
const { ObjectId } = Types
const { MONGO_URL, MONGO_DB } = process.env

describe('getGames', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => Game.deleteMany({}))

  it('succeeds and returns all games ordered by date descending', () => {
    const authorId = new ObjectId()

    return Promise.all([
      Game.create({
        author: authorId,
        season: 'season 1',
        status: 'finished',
        title: 'game 1',
        participants: [],
        date: '24-04-2025',
        place: 'bodeguita',
        winner: authorId,
        points: 1
      }),
      Game.create({
        author: authorId,
        season: 'season 1',
        status: 'finished',
        title: 'game 2',
        participants: [],
        date: '25-04-2025',
        place: 'bodeguita',
        winner: authorId,
        points: 2
      })
    ])
      .then(() => getGames())
      .then(games => {
        expect(games).to.be.an('array').with.lengthOf(2)
        expect(games[0].title).to.equal('game 2')
        expect(games[1].title).to.equal('game 1')
      })
  })

  it('returns empty array if there are no games', () => {
    return getGames()
      .then(games => {
        expect(games).to.be.an('array').that.is.empty
      })
  })

  afterEach(() => Game.deleteMany({}))
  after(() => data.disconnect())
})
