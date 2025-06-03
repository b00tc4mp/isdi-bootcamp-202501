import 'dotenv/config'
import { data, User, Post } from '../data/index.js'
import { createPost } from './createPost.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('createPost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
    })

    it('suceeds on new post', () => {
        let result2

        return User.create({
            name: 'Test Testing',
            email: 'test@testing.com',
            username: 'testing',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => User.findOne({ username: 'testing' }).lean())
            .then(user => createPost(user._id.toString(), 'https://imgs.search.brave.com/RsLFMvrWg6yhxAib7bOTe6hVChF9oOEQBpoQPUBA5TE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1nbG9iYWwuY29t/L2ltYWdlcy9saWJy/YXJ5L3RoZS1pbWct/YWR2YW50YWdlLS0t/c3ZnLWdyYXBoaWNz/L2ltZy1hZHYtLW1l/bWJlcnMuc3Zn', 'Hello, World! TEST')

                .then(result => result2 = result)
                .finally(() => expect(result2).to.be.undefined)
                .then(() => Post.findOne({ text: 'Hello, World! TEST' }).lean())
                .then(post => {
                    expect(post.author.toString()).to.equal(user._id.toString())
                    expect(post.image).to.equal('https://imgs.search.brave.com/RsLFMvrWg6yhxAib7bOTe6hVChF9oOEQBpoQPUBA5TE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1nbG9iYWwuY29t/L2ltYWdlcy9saWJy/YXJ5L3RoZS1pbWct/YWR2YW50YWdlLS0t/c3ZnLWdyYXBoaWNz/L2ltZy1hZHYtLW1l/bWJlcnMuc3Zn')
                    expect(post.text).to.equal('Hello, World! TEST')
                }))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return createPost('67e812e0a5d9869c01300954', 'https://imgs.search.brave.com/RsLFMvrWg6yhxAib7bOTe6hVChF9oOEQBpoQPUBA5TE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1nbG9iYWwuY29t/L2ltYWdlcy9saWJy/YXJ5L3RoZS1pbWct/YWR2YW50YWdlLS0t/c3ZnLWdyYXBoaWNz/L2ltZy1hZHYtLW1l/bWJlcnMuc3Zn', 'Hello, World!')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => {
        User.deleteMany({})
        Post.deleteMany({})
    })

    after(() => data.disconnect())
})