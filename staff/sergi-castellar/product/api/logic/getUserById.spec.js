import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, Post } from "../data/index.js";
import { getUserById } from "./getUserById.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGO_URL, MONGO_DB } = process.env

describe('getUserById', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([
            Post.deleteMany({}),
            User.deleteMany({})
        ])
    })

    it('succeeds at getting existing user', () => {
        const objectUserId = new ObjectId('67dd9ed19312d9e32d86590a')
        let user2
        return User.create({
            _id: objectUserId,
            name: 'prueba',
            email: 'prueba@prueba.com',
            username: 'prueba',
            password: '$2b$10$.od0CuzCT6HHQdw/K3P/A.slG37zTbukraw1hLqa1r/TfBvY4C2mq'
        })
            .then(() => getUserById(objectUserId.toString()))
            .then(user => user2 = user)
            .finally(() => {
                expect(user2.name).to.equal('prueba')
                expect(user2.email).to.equal('prueba@prueba.com')
                expect(user2.username).to.equal('prueba')
            })
    })

    it('fails on non-existing user', () => {
        const userId = '67dd9ed19312d9e32d86590a'
        let catchedError

        return getUserById(userId)
            .then(user => expect(user).to.be.null)
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => {
        return Promise.all([
            Post.deleteMany({}),
            User.deleteMany({})
        ])
    })

    after(() => data.disconnect())
})