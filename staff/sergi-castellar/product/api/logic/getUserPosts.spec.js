import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, Post } from "../data/index.js";
import { getUserPosts } from "./getUserPosts.js"
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { NotFoundError } from 'com/errors.js'

chai.use(chaiAsPromised)

const { ObjectId } = Types
const { MONGO_URL, MONGO_DB } = process.env

describe('getUserPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([
            Post.deleteMany({}),
            User.deleteMany({})
        ])
    })

    it('succeeds at getting posts', () => {
        const user1Id = new ObjectId('67dd9ed19312d9e32d86590a')
        const user2Id = new ObjectId('67dd9ed19312d9e32d86490a')

        let dbUser1, dbUser2
        let dbPost1, dbPost2, dbPost3

        let posts

        debugger

        return Promise.all([
            User.create({
                _id: user1Id,
                name: 'prueba1',
                email: 'prueba1@prueba1.com',
                username: 'prueba1',
                password: '$2b$10$.od0CuzCT6HHQdw/K3P/A.slG37zTbukraw1hLqa1r/TfBvY4C2mq'
            }),
            User.create({
                _id: user2Id,
                name: 'prueba2',
                email: 'prueba2@prueba2.com',
                username: 'prueba2',
                password: '$2b$10$.od0CuzCT6HHQdw/K3P/A.slG37zTbukraw1hLqa1r/TfBvY4C2mq'
            })
        ])
            .then(([_user1, _user2]) => {
                dbUser1 = _user1
                dbUser2 = _user2
            })
            .then(() => {
                return Promise.all([
                    Post.create({
                        author: user1Id,
                        image: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                        text: 'testing1.1',
                        createdAt: new Date(2025, 3, 8),
                        likes: []
                    }),
                    Post.create({
                        author: user2Id,
                        image: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                        text: 'testing2.1',
                        createdAt: new Date(2025, 3, 9),
                        likes: [user1Id, user2Id]
                    }),
                    Post.create({
                        author: user2Id,
                        image: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                        text: 'testing2.2',
                        createdAt: new Date(2025, 3, 10),
                        likes: [user1Id]
                    })
                ])
            })
            .then(([_post1, _post2, _post3]) => {
                dbPost1 = _post1
                dbPost2 = _post2
                dbPost3 = _post3
                debugger
            })
            .then(() => getUserPosts(user1Id.toString(), user2Id.toString()))
            .then(_posts => posts = _posts)
            .finally(() => {
                const [post1, post2] = posts
                expect(posts).to.be.instanceOf(Array)
                expect(posts).to.have.lengthOf(2)

                expect(post1.author.id).to.equal(dbUser2._id.toString())
                expect(post1.author.username).to.equal(dbUser2.username)
                expect(post1.image).to.equal(dbPost3.image)
                expect(post1.text).to.equal(dbPost3.text)
                expect(post1.createdAt).to.deep.equal(dbPost3.createdAt)
                expect(post1.modifiedAt).to.deep.equal(dbPost3.modifiedAt)
                expect(post1.own).to.be.false
                expect(post1.liked).to.be.true

                expect(post2.author.id).to.equal(dbUser2.id)
                expect(post2.author.username).to.equal(dbUser2.username)
                expect(post2.image).to.equal(dbPost2.image)
                expect(post2.text).to.equal(dbPost2.text)
                expect(post2.createdAt).to.deep.equal(dbPost2.createdAt)
                expect(post2.modifiedAt).to.deep.equal(dbPost2.modifiedAt)
                expect(post2.own).to.be.false
                expect(post2.liked).to.be.true
            })
    })

    it('fails at non-existing user', () => {
        let catchedError

        return getUserPosts('67dd9ed19312d9e32d86590c', '67dd9ed19312d9e32d86590a')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
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