import 'dotenv/config'
import { data, User } from '../data/index.js'
import registerUser from './registerUser.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { errors } from 'com'

const { DuplicityError } = errors

// const {MONGO_URL , MONGO_DB } = process.env

describe('registerUser', () => {
    // before(() => data.connect())
})
