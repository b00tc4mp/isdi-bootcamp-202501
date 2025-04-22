import 'dotenv/config'
import { data, Season, User } from '../../data/index.js'
import { getFinishedSeasons } from './getFinishedSeasons.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const { NotFoundError, NotAllowedError } = errors

const { MONGO_URL, MONGO_DB } = process.env

describe('getFinishedSeasons', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => User.deleteMany({})) 

    it('Succeed on get finished Seasons', ()=>{
        return Promise.all([
            Season.create({
                startDate: new Date(2025, 4, 23),
                endDate: new Date(2025, 4, 24),
                status:'finished',
                name: 'season 1'
            }),
            Season.create({
                startDate: new Date(2025, 4, 23),
                endDate: new Date(2025, 4, 24),
                status:'finished',
                name: 'season 2'
            })
        ])
        .then(() => {
            return getFinishedSeasons()
        })
        .finally(seasons=>{
            expect(seasons).to.exist

            expect(seasons[0].status).to.equal('finished')
            expect(seasons[1].status).to.equal('finished')
            
        })

        
    })


    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({}))
    
    after(() => data.disconnect())


})