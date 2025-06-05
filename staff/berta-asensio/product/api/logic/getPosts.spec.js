import 'dotenv/config'
import { data, User, Post } from '../data/index.js'
import { getPosts } from './getPosts.js'
import { expect } from 'chai'
import { NotFoundError, ValidationError } from 'com/errors.js'
// import * as chai from 'chai' //OPCIONAL, para hacer camino corto del test de user non existing
// import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'

// chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DBNAME } = process.env
const { ObjectId } = Types

describe('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DBNAME))

    beforeEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]))

    it('succeeds on existing user', () => {
        let returnedPosts
        let user, user2
        let post, post2

        return Promise.all([
            User.create({
                name: 'Abeja Maya',
                username: 'MayaBee', 
                password: '$2b$10$3VGV4ikMrowelNGSbtgGG.5nhJmWYJx8F3U4ZWVLnT/wiyHQNbQQm',
                email: 'abeja@maya.com'
            }),
            User.create({
                name: 'Minnie Mouse',
                username: 'MousMin', 
                password: '$2b$10$3VGV4ikMrowelNGSbtgGG.5nhJmWYJx8F3U4ZWVLnT/wiyHQNbQQm',
                email: 'minnie@mouse.com' 
            })
        ])
            .then(([_user, _user2]) => {
                user = _user
                user2 = _user2
            })
            .then(() => Promise.all([
                Post.create({ author: user.id, image: 'http://image.com/123', text: 'Hola Didi', likes: [user2.id], createdAt: new Date(2025, 2, 8) }),
                Post.create({ author: user2.id, image: 'http://image.com/789', text: 'Hola Nico', likes: [user.id, user2.id], createdAt: new Date(2025, 2, 15), modifiedAt: new Date(2025, 2, 16) })
            ]))
            .then(([_post, _post2]) => {
                post = _post
                post2 = _post2
            })
            .then(() => getPosts(user.id)) //own to be true porque estamos pidiendo los posts desde este usuario
            .then(posts => returnedPosts = posts)
            .finally(() => {
                expect(returnedPosts).to.be.instanceOf(Array)
                expect(returnedPosts).to.have.lengthOf(2)
                
                let returnedPost = returnedPosts[0]
                expect(returnedPost.author.id).to.equal(user2.id)
                expect(returnedPost.author.username).to.equal(user2.username)
                expect(returnedPost.image).to.equal(post2.image)
                expect(returnedPost.text).to.equal(post2.text)
                expect(returnedPost.createdAt).to.deep.equal(post2.createdAt) //to deep porque es un objeto y quiero que me compruebe sus datos, no el objeto en sí.
                expect(returnedPost.modifiedAt).to.deep.equal(post2.modifiedAt)
                expect(returnedPost.own).to.be.false
                expect(returnedPost.liked).to.be.true
                expect(returnedPost.totalLikes).to.equal(2)
                // npm test. Only en describe si solo queremos testear este test

                returnedPost = returnedPosts[1]
                expect(returnedPost.author.id).to.equal(user.id)
                expect(returnedPost.author.username).to.equal(user.username)
                expect(returnedPost.image).to.equal(post.image)
                expect(returnedPost.text).to.equal(post.text)
                expect(returnedPost.createdAt).to.deep.equal(post.createdAt)
                expect(returnedPost.modifiedAt).to.be.null
                expect(returnedPost.own).to.be.true
                expect(returnedPost.liked).to.be.false //no hemos dado like a nuestro propio post
                expect(returnedPost.totalLikes).to.equal(1)

            })
    })

    it('fails on non-existing user', () => {
        let catchedError

        return getPosts(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })

       // return expect(getPosts(newObjectId().toString())).to.be.rejectedWith(NotFoundError, 'user not found') // otra manera de hacerlo con la libreria chai as promise
    })

    it('fails on invalid user id', () => {
        let catchedError

        try {
            getPosts(123)
        } catch (error) {
            catchedError = error
        } finally {
            expect(catchedError).to.be.instanceOf(ValidationError)
            expect(catchedError.message).to.equal('invalid id type')
        }
        // expect(() => getPosts(123)).to.throw(ValidationError, 'invalid userId type')
        // expect(() => getPosts('123')).to.throw(ValidationError, 'invalid userId length')
        // expect(() => getPosts(' '.repeat(24))).to.throw(ValidationError, 'invalid userId syntax')
    })


    afterEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]))

    after(() => data.disconnect())
})