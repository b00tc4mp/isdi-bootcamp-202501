import 'dotenv/config'
import { data, User } from '../../data/index.js'
import { searchUsers } from './searchUsers.js'
import { expect } from 'chai'
import { Types } from 'mongoose'

const { ObjectId } = Types

const { MONGO_URL, MONGO_DB } = process.env

describe('searchUsers', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succed on searchUsers'), () => {

        return User.create({
            name: 'arnau',
            surname: 'romero',
            email: 'arnau@gmail.com',
            username: 'arnau_sots',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                return searchUsers(query)
            })
            .then(user => {
                expect(user)
            })
    }
})