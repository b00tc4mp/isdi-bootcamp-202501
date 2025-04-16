import 'dotenv/config'
import { data, Game, User } from '../../data/index.js'
import { createGame } from './createGame.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'

const { AuthorizationError, NotFoundError, ValidationError } = errors
const { MONGO_URL, MONGO_DB } = process.env

describe('createGame', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => Promise.all([
    User.deleteMany({}),
    Game.deleteMany({})
  ]))

  it('succeeds in creating a game', () => {
    const title = 'Poker Night'
    const season = 'season 1'
    const date = '22-04-2025'
    const place = 'Casa Arnau'

    return User.create({
      name: 'arnau',
      surname: 'romero',
      email: 'ar@nau.com',
      username: 'arnau_sots',
      role: 'admin',
      password: '123123123'
    })
      .then(user => createGame(user.id, title, season, date, place))
      .then(game => {
        expect(game).to.exist
        expect(game.title).to.equal(title)
        expect(game.season).to.equal(season)
        expect(game.date).to.equal(date)
        expect(game.place).to.equal(place)
        expect(game.status).to.equal('scheduled')
        expect(game.author.toString()).to.be.a('string')
      })
  })

  it('fails if user is not admin', () => {
    let catchedError

    return User.create({
      name: 'marc',
      surname: 'ramos',
      email: 'marc@ramos.com',
      username: 'marc_ramos',
      role: 'regular',
      password: '123123123'
    })
      .then(user => createGame(user.id, 'timbita', 'season 1', '22-04-2025', 'casa roca'))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(AuthorizationError)
        expect(catchedError.message).to.equal('Only admins can create games')
      })
  })

  it('fails if are missing required fields', () => {
    let catchedError

    return User.create({
      name: 'arnau',
      surname: 'romero',
      email: 'ar@nau.com',
      username: 'arnau_sots',
      role: 'admin',
      password: '123123123'
    })
      .then(user => createGame(user.id, '', 'season 1', '', ''))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(ValidationError)
        expect(catchedError.message).to.equal('Missing required fields')
      })
  })

  afterEach(() => Promise.all([
    User.deleteMany({}),
    Game.deleteMany({})
  ]))

  after(() => data.disconnect())
})
