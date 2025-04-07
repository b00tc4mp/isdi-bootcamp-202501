import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, Post } from "../data/index.js";
import { editPost } from "./editPost.js"
import { expect } from 'chai'
import { NotFoundError, OwnershipError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGO_URL, MONGO_DB } = process.env

describe('editPost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([
            Post.deleteMany({}),
            User.deleteMany({})
        ])
    })

    it('succeeds at deleting post', () => {
        const userId = new ObjectId('67dd9ed19312d9e32d86590a')
        let postId

        return Promise.all([
            User.create({
                _id: userId,
                name: 'prueba',
                email: 'prueba@prueba.com',
                username: 'prueba',
                password: '$2b$10$.od0CuzCT6HHQdw/K3P/A.slG37zTbukraw1hLqa1r/TfBvY4C2mq'
            }),
            Post.create({
                author: userId,
                image: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                text: 'testing',
            })
        ])
            .then(() => Post.findOne({ text: 'testing' }).lean())
            .then(post => {
                postId = post._id
                return editPost(userId.toString(), postId.toString(), 'testing edited')
            })
            .then(() => Post.findOne({ text: 'testing' }).lean())
            .then(post => expect(post).to.be.null)
    })

    it('fails on non existing user', () => {
        let catchedError

        return editPost('67dd9ed19312d9e32d86590c', '67dd9ed19312d9e32d865913', 'testing edited')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('fails on non existing post', () => {
        let catchedError
        const userId = new ObjectId('67dd9ed19312d9e32d86590a')

        return User.create({
            _id: userId,
            name: 'prueba',
            email: 'prueba@prueba.com',
            username: 'prueba',
            password: '$2b$10$.od0CuzCT6HHQdw/K3P/A.slG37zTbukraw1hLqa1r/TfBvY4C2mq'
        })
            .then(() => {
                return editPost(userId.toString(), '67dd9ed19312d9e32d865913', 'testing edited')
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('post not found')
            })
    })

    it('fails in user is not the post author', () => {
        let catchedError
        const userId = new ObjectId('67dd9ed19312d9e32d86590a')
        const nonUserId = new ObjectId('67dd9ed19312d9e32d865913')
        let postId

        return Promise.all([
            User.create({
                _id: userId,
                name: 'prueba',
                email: 'prueba@prueba.com',
                username: 'prueba',
                password: '$2b$10$.od0CuzCT6HHQdw/K3P/A.slG37zTbukraw1hLqa1r/TfBvY4C2mq'
            }),
            Post.create({
                author: nonUserId,
                image: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                text: 'testing',
            })
        ])
            .then(() => Post.findOne({ text: 'testing' }).lean())
            .then(post => {
                postId = post._id

                return editPost(userId.toString(), postId.toString(), 'testing edited')
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(OwnershipError)
                expect(catchedError.message).to.equal('user is not the post author')
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