import 'dotenv/config'
import { data, User, Post } from '../data/index.js'
import { getPosts } from './getPosts.js'
import { ValidationError, NotFoundError } from 'com/errors.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]))

    it('succeeds on existing user', () => {
        let returnedPosts
        let user, user2
        let post, post2

        return Promise.all([
            User.create({
                name: 'Harry Potter',
                email: 'harry@potter.com',
                username: 'GryffindorSeeker',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
            User.create({
                name: 'Hermione Granger',
                email: 'hermione@granger.com',
                username: 'Granger',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            })
        ])
            .then(([_user, _user2]) => {
                user = _user
                user2 = _user2
            })
            .then(() => Promise.all([
                Post.create({ author: user.id, image: 'http://image.com/first', text: 'hello world', likes: [user2.id], createdAt: new Date(2025, 1, 10) }),
                Post.create({ author: user2.id, image: 'http://image.com/second', text: 'hola món', likes: [user.id, user2.id], createdAt: new Date(2025, 1, 11), modifiedAt: new Date(2025, 1, 12) })
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
                expect(returnedPost.text).to.equal(post2.text) //compara el tipo (strnig,object,array)
                expect(returnedPost.createdAt).to.deep.equal(post2.createdAt) //compara el valor(11/1/2025)
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
        return expect(getPosts(new ObjectId().toString())).to.be.rejectedWith(NotFoundError, 'user not found')
    })

    it('fails on invalid user id', () => {

        expect(() => getPosts(123)).to.throw(ValidationError, 'invalid userId type')
        expect(() => getPosts('123')).to.throw(ValidationError, 'invalid userId length')
        expect(() => getPosts(' '.repeat(24))).to.throw(ValidationError, 'invalid userId syntax')
    })

    afterEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]))

    after(() => data.disconnect())
})