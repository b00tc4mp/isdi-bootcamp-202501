import 'dotenv/config'
import { data, User } from "../data/index.js";
import { registerUser } from "./registerUser.js"
import { expect } from 'chai'
import { DuplicityError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('registerUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds at register new user', () => {
        let user2

        return registerUser('prueba', 'prueba@prueba.com', 'prueba', '123123123')
            .then(() => User.findOne({ username: 'prueba' }).lean())
            .then(user => user2 = user)
            .finally(() => {
                expect(user2.name).to.equal('prueba')
                expect(user2.email).to.equal('prueba@prueba.com')
                expect(user2.username).to.equal('prueba')
            })
    })

    it('fails on already existing user', () => {
        let catchedError

        return User.create({
            name: 'prueba',
            email: 'prueba@prueba.com',
            username: 'prueba',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => registerUser('prueba', 'prueba@prueba.com', 'prueba', '123123123'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('user already exists')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})