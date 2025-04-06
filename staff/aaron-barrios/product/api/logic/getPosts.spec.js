import 'dotenv/config'
import { data, User, Post } from '../data/index.js'
import { getPosts } from './getPosts.js'
import { NotFoundError, ValidationError } from 'com/errors.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    debugger

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
    })

    it('succeds on getPosts', () => {
        let returnedPosts
        let user, user2
        let post, post2

        return User.insertMany([
            { name: 'Diver Tido', email: 'diver@tido.com', username: 'diver', password: 'dididi' },
            { name: 'John Doe', email: 'john@doe.com', username: 'john', password: 'jojojo' }
        ])
            .then(([_user, _user2]) => {
                user = _user
                user2 = _user2
            })
            .then(() => {
                return Post.insertMany([
                    { author: user.id, image: 'https://media.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.gif?cid=790b7611hqe6rpquy1lo6acfy5cbmnkfaqmu4pn7mc77m2py&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'post from user1', likes: [user2.id], createdAt: new Date(2025, 1, 11) },
                    { author: user2.id, image: 'https://media.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.gif?cid=790b7611hqe6rpquy1lo6acfy5cbmnkfaqmu4pn7mc77m2py&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'user2 post', likes: [user.id, user2.id], createdAt: new Date(2025, 1, 12), modifiedAt: new Date(2025, 1, 13) },
                ])
            })
            .then(([_post, _post2]) => {
                post = _post
                post2 = _post2
            })
            .then(() => getPosts(user2.id))
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
                expect(returnedPost.own).to.be.true
                expect(returnedPost.liked).to.be.true
                expect(returnedPost.likesCount).to.equal(2)

                returnedPost = returnedPosts[1]
                expect(returnedPost.author.id).to.equal(user.id)
                expect(returnedPost.author.username).to.equal(user.username)
                expect(returnedPost.image).to.equal(post.image)
                expect(returnedPost.text).to.equal(post.text)
                expect(returnedPost.createdAt).to.deep.equal(post.createdAt)
                expect(returnedPost.modifiedAt).to.be.null
                expect(returnedPost.own).to.be.false
                expect(returnedPost.liked).to.be.true
                expect(returnedPost.likesCount).to.equal(1)
            })
    })

    it('fails on existingUser', () => {
        return expect(
            getPosts(new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, 'User not found!')
    })

    it('fails on validates', () => {
        expect(() => getPosts(123)).to.throw(ValidationError, 'invalid userId type')
        expect(() => getPosts('123')).to.throw(ValidationError, 'invalid userId length')
        expect(() => getPosts(' '.repeat(24))).to.throw(ValidationError, 'invalid userId syntax')
    })

    afterEach(() => {
        User.deleteMany({})
        Post.deleteMany({})
    })

    after(() => data.disconnect())
})