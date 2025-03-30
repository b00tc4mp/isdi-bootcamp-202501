import 'dotenv/config'
import { data, User, Post } from "../data/index.js";
import { createNewPost } from "./createNewPost.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('createNewPost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([
            Post.deleteMany({}),
            User.deleteMany({})
        ])
    })

    it('succeeds at creating new post', () => {
        let userId
        let postAuthorId
        return User.create({
            name: 'prueba',
            email: 'prueba@prueba.com',
            username: 'prueba',
            password: '$2b$10$.od0CuzCT6HHQdw/K3P/A.slG37zTbukraw1hLqa1r/TfBvY4C2mq'
        })
            .then(() => User.findOne({ username: 'prueba' }).lean())
            .then(user => {
                userId = user._id.toString()
                return createNewPost(userId, 'https://i.blogs.es/a19bfc/testing/450_1000.webp', 'testing')
            })
            .then(() => Post.findOne({ textDescription: 'testing' }).lean())
            .then(post => postAuthorId = post.authorId._id.toString())
            .finally(() => {
                expect(postAuthorId).to.be.a('string')
                expect(userId).to.be.equal(postAuthorId)
            })
    })

    it('fails on non existing user', () => {
        let catchedError

        return createNewPost('67dd9ed19312d9e32d865910', 'https://i.blogs.es/a19bfc/testing/450_1000.webp', 'testing')
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