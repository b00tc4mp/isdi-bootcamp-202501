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
        
    }
})