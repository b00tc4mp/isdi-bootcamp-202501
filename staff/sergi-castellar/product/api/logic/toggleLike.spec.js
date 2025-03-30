import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, Post } from "../data/index.js";
import { toggleLike } from "./toggleLike.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGO_URL, MONGO_DB } = process.env

describe('toggleLike', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([
            Post.deleteMany({}),
            User.deleteMany({})
        ])
    })

    it('succeeds at adding like', () => {
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
                authorId: userId,
                imageSrc: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                textDescription: 'testing',
            })
        ])
            .then(() => Post.findOne({ textDescription: 'testing' }).lean())
            .then(post => {
                postId = post._id
                return toggleLike(userId.toString(), postId.toString())
            })
            .then(() => Post.findById(postId.toString()).lean())
            .then(post => {
                expect(post.likes.some(id => id.equals(userId))).to.be.true;
                expect(post.likes).to.have.lengthOf(1)
            })
    })
    it('succeeds at removing like', () => {
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
                authorId: userId,
                imageSrc: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                textDescription: 'testing',
                likes: [userId]
            })
        ])
            .then(() => Post.findOne({ textDescription: 'testing' }).lean())
            .then(post => {
                postId = post._id
                return toggleLike(userId.toString(), postId.toString())
            })
            .then(() => Post.findById(postId.toString()).lean())
            .then(post => {
                expect(post.likes).to.not.include(userId.toString())
                expect(post.likes).to.have.lengthOf(0)
            })
    })

    it('fails on non existing user', () => {
        let catchedError

        return toggleLike('67dd9ed19312d9e32d86590c', '67dd9ed19312d9e32d865913')
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
                return toggleLike(userId.toString(), '67dd9ed19312d9e32d865913')
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('post not found')
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