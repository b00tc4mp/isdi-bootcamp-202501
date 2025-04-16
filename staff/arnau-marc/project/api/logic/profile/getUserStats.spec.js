import 'dotenv/config'
import { getUserStats } from './getUserStats.js'
import { expect } from 'chai'
import { data, User, Game, Season } from '../../data/index.js'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { SystemError, NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URL, MONGO_DB } = process.env

describe('getUserStats', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => Game.deleteMany({}))

    it('succeeds on get user stats', () => {
        let arnauId
        return Promise.all([
            User.create({
                name: 'arnau',
                _id: arnauId = new ObjectId(),
                surname: 'romero',
                email: 'ar@nau.com',
                username: 'arnau_sots',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
            Season.create({
                name: 'season 2',
                status: 'active',
                startDate: new Date(2025, 3, 31),
                endDate: new Date(2025, 6, 13)
            }),
            Game.create({
                author: arnauId,
                season: 'season 2',
                status: 'finished',
                title: 'timbita 4',
                participants: [arnauId],
                date: '25-04-2025',
                place: 'bodeguita',
                winner: arnauId,
                points: 1,
                createdAt: new Date(2025, 4, 29),
                modifiedAt: new Date(2025, 4, 30)
            })
        ])
        .then(() => {
            debugger
            return getUserStats(arnauId.toString())
        })
        .then((stats) => {
            expect(stats).to.exist
            expect(stats).to.be.an('object')
            expect(stats.gamesPlayed).to.be.a('number').and.equal(1)
            expect(stats.gamesWon).to.be.a('number').and.equal(1)
            expect(stats.winRate).to.be.a('number').and.equal(100)
        })
    })

    it('returns 0 if user has no participation in finished games', () => {
        let litaId
      
        return Promise.all([
          User.create({
            name: 'Lita',
            _id: litaId = new ObjectId(),
            surname: 'Lenta',
            email: 'li@ta.com',
            username: 'lita_lenta',
            password: '123123123'
          }),
          Season.create({
            name: 'winter season',
            status: 'active',
            startDate: new Date(),
            endDate: new Date()
          }),
          Game.create({
            title: 'game sin lita',
            author: new ObjectId(),
            season: 'winter season',
            status: 'finished',
            participants: [new ObjectId()],
            winner: new ObjectId(),
            date: '01-01-2025',
            place: 'bodega'
          })
        ])
          .then(() => getUserStats(litaId.toString()))
          .then(stats => {
            expect(stats.gamesPlayed).to.equal(0)
            expect(stats.gamesWon).to.equal(0)
            expect(stats.winRate).to.equal(0)
          })
    })

    it('fails when there is no active season', () => {
        let catchedError

        return User.create({
            name: 'Marc',
            surname: 'Ramos',
            email: 'marc@ramos.com',
            username: 'marc_ramos',
            password: '123123123'
        })
        .then(user => getUserStats(user._id.toString()))
        .catch(error => catchedError = error)
        .finally(() => {
            expect(catchedError).to.be.instanceOf(errors.NotFoundError)
            expect(catchedError.message).to.equal('No active season found')
        })
    })

    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({}))
    afterEach(() => Game.deleteMany({}))
        
    after(() => data.disconnect()) 
})