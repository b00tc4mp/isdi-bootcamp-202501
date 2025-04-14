import 'dotenv/config'
import { data, User } from "../data/index.js"
import { deleteUser } from "./deleteUser.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('deleteUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user', () => {
        let userId

        return User.create({
            name: 'Test User',
            email: 'test@user.com',
            username: 'testuser',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => userId = user._id.toString())
            .then(() => deleteUser(userId))
            .then(() => User.findById(userId).lean())
            .then(user => expect(user).to.be.null)
    })

    it('fails on non-existing user', () => {
        let catchedError
        const nonExistentUserId = '605c72ef1532073d4a8b4e0e'

        return deleteUser(nonExistentUserId)
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
