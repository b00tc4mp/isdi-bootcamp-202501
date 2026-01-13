import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserName } from './getUserName.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUserName', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    // Si el usuario existe
    it('succeeds on existing user', () => {
        let returnedName

        return User.create({
            name: 'David',
            email: 'dallen@31.com',
            username: 'dallen',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => getUserName(user.id))
            .then(name => returnedName = name)
            .finally(() => expect(returnedName).to.equal('David'))
    })

    // Algo falla en un usuario inexistente
    it('fails on non-existing user', () => {
        let catchedError

        return getUserName(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})