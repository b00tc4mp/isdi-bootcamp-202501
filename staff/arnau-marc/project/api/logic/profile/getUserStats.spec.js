import 'dotenv/config'
import { getUserStats } from './getUserStats.js'
import { expect } from 'chai'
import { data, Game, Season } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'
import { Types } from 'mongoose'

const { SystemError, NotFoundError } = errors
const { ObjectId } = Types

describe('getUserStats', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))
})