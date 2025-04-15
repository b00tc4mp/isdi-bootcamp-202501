import 'dotenv/config'
import { data, Season, User } from '../../data/index.js'
import { finishSeason } from './finishSeason.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const { NotFoundError, NotAllowedError } = errors

const { MONGO_URL, MONGO_DB } = process.env

describe('finishSeason', () =>{
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => User.deleteMany({})) 

    it('succeed on finish a season', () => {
        return Promise.all([
            Season.create({
                startDate: new Date(2025, 4, 23),
                endDate: new Date(2025, 4, 24),
                status:'active',
                name: 'season 1'
            }),
            User.create({ 
                name: 'Arnau',
                surname: 'Romero',
                role: 'admin',
                email: 'arnau@romero.com',
                username: 'arnau_sots',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
        ])
            .then(([season, user]) => {
               return finishSeason(user.id, season.id)
            })
            .then(seasonFinished => {
                expect(seasonFinished.status).to.equal('finished')
            })
    })

    it('Fail: Only admins can finish a season', () => {
        let catchedError
        return Promise.all([
            Season.create({
                startDate: new Date(2025, 4, 23),
                endDate: new Date(2025, 4, 24),
                status:'active',
                name: 'season 1'
            }),
            User.create({ 
                name: 'Arnau',
                surname: 'Romero',
                email: 'arnau@romero.com',
                username: 'arnau_sots',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            })
        ])
            .then(([season, user]) => {
                return finishSeason(user.id, season.id)
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotAllowedError)
                expect(catchedError.message).to.equal('Only admins can finish a season')
            })
    })

    it('Fail: User not found', () => {
        let catchedError
        return Promise.all([
            Season.create({
                startDate: new Date(2025, 4, 23),
                endDate: new Date(2025, 4, 24),
                status:'active',
                name: 'season 1'
            })
        ])
            .then(([season]) => {
                return finishSeason(new ObjectId().toString(), season.id)
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found')
            })
    })

    it('Fail: Season not found', () => {
        let catchedError
        return Promise.all([
            User.create({ 
                name: 'Arnau',
                surname: 'Romero',
                role: 'admin',
                email: 'arnau@romero.com',
                username: 'arnau_sots',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            })
        ])
            .then(([user]) => {
                return finishSeason(user.id, new ObjectId().toString())
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('Season not found')
            })
    })

    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({}))
    
    after(() => data.disconnect()) 
})
