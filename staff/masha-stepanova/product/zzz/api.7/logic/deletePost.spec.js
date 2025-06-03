import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, Post } from '../data/index.js'
import { deletePost } from './deletePost.js'
import { expect } from 'chai'
import { NotFoundError, OwnershipError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('deletePost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
    })

    it('succeeds on deleted post', () => {
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
                        Post.create({
                            author: user._id,
                            image: 'https://imgs.search.brave.com/RsLFMvrWg6yhxAib7bOTe6hVChF9oOEQBpoQPUBA5TE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1nbG9iYWwuY29t/L2ltYWdlcy9saWJy/YXJ5L3RoZS1pbWct/YWR2YW50YWdlLS0t/c3ZnLWdyYXBoaWNz/L2ltZy1hZHYtLW1l/bWJlcnMuc3Zn',
                            text: 'Hello, World! TEST'
                        })
                            .then(() => Post.findOne({ text: 'Hello, World! TEST' }))
                            .then(post => deletePost(user._id.toString(), post._id.toString()))
                            .then(result => result2 = result)
                            .finally(() => expect(result2).to.be.undefined)
                            .then(() => Post.findOne({ text: 'Hello, World! TEST' }))
                            .then(post => {
                                expect(post).to.be.null
                            })
                    })

            })
    })

    it('fails on user is not author of the post', () => {
        let catchedError

        return Promise.all([
            User.create({
                name: 'Test Testing',
                email: 'test@testing.com',
                username: 'testing',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
            User.create({
                name: 'Eu Geni',
                email: 'eu@geni.com',
                username: 'eugeni',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
        ])
            .then(() => {
                Promise.all([
                    User.findOne({ username: 'testing' }).lean(),
                    User.findOne({ username: 'eugeni' }).lean()
                ])
                    .then(([userTesting, userEugeni]) => {
                        Post.create({
                            author: userEugeni._id,
                            image: 'https://imgs.search.brave.com/RsLFMvrWg6yhxAib7bOTe6hVChF9oOEQBpoQPUBA5TE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1nbG9iYWwuY29t/L2ltYWdlcy9saWJy/YXJ5L3RoZS1pbWct/YWR2YW50YWdlLS0t/c3ZnLWdyYXBoaWNz/L2ltZy1hZHYtLW1l/bWJlcnMuc3Zn',
                            text: 'Hello, World! TEST'
                        })
                            .then(() => {
                                Post.findOne({ text: 'Hello, World! TEST' })
                                    .then(post => {
                                        deletePost(userTesting._id.toString(), post._id.toString())
                                            .catch(error => catchedError = error)
                                            .finally(() => {
                                                expect(catchedError).to.be.instanceOf(OwnershipError)
                                                expect(catchedError.message).to.equal('user is not author of post')
                                            })
                                    })
                            })
                    })
            })

    })

    it('fails on non-existing user', () => {
        debugger
        let catchedError

        return Post.create({ author: new ObjectId('67e812e0a5d9869c01300928'), image: 'https://imgs.search.brave.com/RsLFMvrWg6yhxAib7bOTe6hVChF9oOEQBpoQPUBA5TE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1nbG9iYWwuY29t/L2ltYWdlcy9saWJy/YXJ5L3RoZS1pbWct/YWR2YW50YWdlLS0t/c3ZnLWdyYXBoaWNz/L2ltZy1hZHYtLW1l/bWJlcnMuc3Zn', text: 'Hello, World! TEST' })
            .then(() => {
                Post.find().lean()
                    .then(post => {
                        deletePost('67e812e0a5d9869c01300954', post._id.toString())
                            .catch(error => catchedError = error)
                            .finally(() => {
                                expect(catchedError).to.be.instanceOf(NotFoundError)
                                expect(catchedError.message).to.equal('user not found')
                            })
                    })
            })

    })

    it('fails on non-existing post', () => {
        let catchedError

        return User.create({
            name: 'Test Testing',
            email: 'test@testing.com',
            username: 'testing',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => User.findOne({ username: 'testing' }))
            .then(user => {
                deletePost(user._id.toString(), '67e86b851937a78043d97ebb')
                    .catch(error => catchedError = error)
                    .finally(() => {
                        expect(catchedError).to.be.instanceOf(NotFoundError)
                        expect(catchedError.message).to.equal('post not found')
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

