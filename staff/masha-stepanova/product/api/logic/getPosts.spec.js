import 'dotenv/config'
import { Types } from 'mongoose'
import { getPosts } from './getPosts.js'
import { data, User, Post } from '../data/index.js'
import { expect } from 'chai'
import { NotFoundError, ValidationError } from 'com/errors.js'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([User.deleteMany({}), Post.deleteMany({})])
    })

    it('succeeds at getting posts', () => {
        let returnedPosts
        let user, user2
        let post, post2

        return Promise.all([
            User.create({
                name: 'Test Testing',
                email: 'test@testing.com',
                username: 'testing',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
            User.create({
                name: 'Test Testing',
                email: 'test@testing.com',
                username: 'testing',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            })
        ])
            .then(([_user, _user2]) => {
                user = _user
                user2 = _user2
            })
            .then(() => Promise.all([
                Post.create({
                    author: user._id,
                    imageSrc: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                    textDescription: 'testing1',
                }),
                Post.create({
                    author: user._id,
                    imageSrc: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                    textDescription: 'testing2',
                })
            ]))
            .then(([_post, _post2]) => {
                post = _post
                post2 = _post2
            })
            .then(() => getPosts(user.id))
            .then(posts => returnedPosts = posts)
            .finally(() => {
                expect(returnedPosts).to.be.instanceOf(Array)
                expect(returnedPosts).to.have.lengthOf(2)

                let returnedPost = returnedPosts[0]
                expect(returnedPost.author.id).to.equal(user2.id)
                expect(returnedPost.author.username).to.equal(user2.username)
                expect(returnedPost.image).to.equal(post2.image)
                expect(returnedPost.text).to.equal(post2.text)
                expect(returnedPost.createdAt).to.deep.equal(post2.createdAt)
                expect(returnedPost.modifiedAt).to.deep.equal(post2.modifiedAt)
                expect(returnedPost.own).to.be.false
                expect(returnedPost.liked).to.be.true
                expect(returnedPost.likesCount).to.equal(2)

                returnedPost = returnedPosts[1]
                expect(returnedPost.author.id).to.equal(user.id)
                expect(returnedPost.author.username).to.equal(user.username)
                expect(returnedPost.image).to.equal(post.image)
                expect(returnedPost.text).to.equal(post.text)
                expect(returnedPost.createdAt).to.deep.equal(post.createdAt)
                expect(returnedPost.modifiedAt).to.be.null
                expect(returnedPost.own).to.be.true
                expect(returnedPost.liked).to.be.false
                expect(returnedPost.likesCount).to.equal(1)

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
                            .then(() => getPosts('67e812e0a5d9869c01300928'))
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

