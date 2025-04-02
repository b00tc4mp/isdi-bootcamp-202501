import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, Post } from '../data/index.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getUserPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
    })

    it('succeeds at getting user posts', () => {
        let result2

        return User.create({
            name: 'Test Testing',
            email: 'test@testing.com',
            username: 'testing',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => {
                User.findOne({ username: 'testing' })
                    .then(user => {
                        return Promise.all([
                            Post.create({
                                author: user._id,
                                imageSrc: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                                textDescription: 'testing1',
                            }),
                            Post.create({
                                author: user._id,
                                imageSrc: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                                textDescription: 'testing2',
                            })])
                            .then(() => getUserPosts(user._id.toString(), user._id.toString()))
                            .then(result => result2 = result)
                            .finally(() => {
                                const [post1, post2] = result2
                                expect(post1.textDescription).to.equal('testing1')
                                expect(post2.textDescription).to.equal('testing2')
                                expect(post2).to.have.lengthOf(2)
                            })
                    })

            })
    })

    it('fails on non-existing user', () => {
        let catchedError

        return User.create({
            name: 'Test Testing',
            email: 'test@testing.com',
            username: 'testing',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => {
                User.findOne({ username: 'testing' })
                    .then(user => {
                        return Promise.all([
                            Post.create({
                                author: user._id,
                                imageSrc: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                                textDescription: 'testing1',
                            }),
                            Post.create({
                                author: user._id,
                                imageSrc: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                                textDescription: 'testing2',
                            })])
                            .then(() => getUserPosts('67e812e0a5d9869c01300928'))
                            .catch(error => catchedError = error)
                            .finally(() => {
                                expect(catchedError).to.be.instanceOf(NotFoundError)
                                expect(catchedError.message).to.equal('user not found')
                            })
                    })

            })
    })

    afterEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
    })

    after(() => data.disconnect())
})

