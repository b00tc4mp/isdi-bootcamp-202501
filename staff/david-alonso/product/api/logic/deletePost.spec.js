import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserName } from './getUserName.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('deletePost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))




    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})