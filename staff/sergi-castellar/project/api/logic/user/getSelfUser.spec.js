import 'dotenv/config'
import { data, User } from "../../data/index.js"
import { getSelfUser } from "./getSelfUser.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getSelfUser', () => {
    let userId

    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return User.deleteMany({})
    })

    it('succeeds at getting own user', () => {
        return User.create({
            name: 'Test User',
            email: 'test@user.com',
            username: 'testuser',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                userId = user._id.toString()
                return getSelfUser(userId)
            })
            .then(user => {
                expect(user).to.exist
                expect(user._id.toString()).to.equal(userId)
                expect(user.name).to.equal('Test User')
                expect(user.email).to.equal('test@user.com')
                expect(user.username).to.equal('testuser')
            })
    })

    it('fails at User not found', () => {
        const nonExistentUserId = '605c72ef1532073d4a8b4e0e'

        return getSelfUser(nonExistentUserId)
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})