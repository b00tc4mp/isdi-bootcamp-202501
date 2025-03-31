import 'dotenv/config'
import { Types } from 'mongoose'
import { data, User, Post } from "../data/index.js";
import { getPosts } from "./getPosts.js"
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGO_URL, MONGO_DB } = process.env

describe('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => {
        return Promise.all([
            Post.deleteMany({}),
            User.deleteMany({})
        ])
    })

    it('succeeds at getting posts', () => {
        const userId = new ObjectId('67dd9ed19312d9e32d86590a')
        let posts2

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
                textDescription: 'testing1',
            }),
            Post.create({
                authorId: userId,
                imageSrc: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                textDescription: 'testing2',
            })
        ])
            .then(() => getPosts(userId.toString()))
            .then(posts => posts2 = posts)
            .finally(() => {
                const [post1, post2] = posts2
                expect(post1.textDescription).to.equal('testing1')
                expect(post2.textDescription).to.equal('testing2')
                expect(posts2).to.have.lengthOf(2)
            })
    })

    it('fails at non-existing user', () => {
        const userId = new ObjectId('67dd9ed19312d9e32d86590a')
        let catchedError

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
                textDescription: 'testing1',
            }),
            Post.create({
                authorId: userId,
                imageSrc: 'https://i.blogs.es/a19bfc/testing/450_1000.webp',
                textDescription: 'testing2',
            })
        ])
            .then(() => getPosts('67dd9ed19312d9e32d86590c'))
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