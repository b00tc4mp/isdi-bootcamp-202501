import 'dotenv/config'
import { data, User, Post } from '../data/index.js'
import { getPosts } from './getPosts.js'
import { NotFoundError, ValidationError } from 'com/errors.js'
import { expect } from 'chai' //chai tiene varias herramientas para assertar cosas, expect es una
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe.only('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]))

    it('succeds on existing user', () => {
        debugger
        let returnedPosts
        let user, user2
        let post, post2

        return Promise.all([
            User.create({
                name: 'Manu Barzi',
                email: 'manu@barzi.com',
                username: 'manubarzi',
                password: '$2b$10$ERxBwIezegR8XtXQWM6eZeudwOvjSWqjFp4xsakzJqjQyiVCiSvAm'
            }),
            User.create({
                name: 'Lucas Gamba',
                email: 'lucas@gamba.com',
                username: 'lucasgamba',
                password: '$2b$10$ERxBwIezegR8XtXQWM6eZeudwOvjSWqjFp4xsakzJqjQyiVCiSvAm'
            })
        ])
            .then(([_user, _user2]) => {
                user = _user
                user2 = _user2
            })
            .then(() => Promise.all([
                Post.create({ author: user.id, image: 'http://image.com/123', text: 'Que post!', likes: [user2.id], createdAt: new Date(2025, 1, 10) }),
                Post.create({ author: user2.id, image: 'http://image.com/653', text: 'Que post2!', likes: [user.id, user2.id], createdAt: new Date(2025, 1, 11), modifiedAt: new Date(2025, 1, 12) })
            ]))
            .then(([_post, _post2]) => { //destructuring _post y _post2
                post = _post
                post2 = _post2
            })
            .then(() => getPosts(user.id)) //voy a testear como si fuese el user
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
        /* let catchedError

        return getPosts(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            }) */

        return expect(getPosts(new ObjectId().toString())).to.be.rejectedWith(NotFoundError, 'user not found') //Probamos que al no encontrar usuario devuelva error not found. Se puede hacer en una linea con el child-as-promised
    })

    it('fails on non-existing user id', () => {
        /* let catchedError

        try {
            getPosts(123)
        } catch (error) {
            catchedError = error
        } finally {
            expect(catchedError).to.be.instanceOf(ValidationError)
            expect(catchedError.message).to.equal('invalid userId type')
        } */

        expect(() => getPosts(123)).to.throw(ValidationError, 'invalid userId type')
        expect(() => getPosts('123')).to.throw(ValidationError, 'invalid userId length')
        expect(() => getPosts(' '.repeat(24))).to.throw(ValidationError, 'invalid userId syntax')
    })

    afterEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]))

    after(() => data.disconnect())
})
