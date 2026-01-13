import 'dotenv/config'
import { data, User, Post } from '../data/index.js'
import { deletePost } from './deletePost.js'
import { expect } from 'chai'
import { NotFoundError, ValidationError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('deletePost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]))

    ImageTrack('')




    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})