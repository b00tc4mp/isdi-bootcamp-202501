import 'dotenv/config'
import { getPosts } from './getPosts.js';
import { data, Post, User } from '../data/index.js';
import { expect } from 'chai';
import * as chai from 'chai';
import { Types } from 'mongoose';
import { errors } from 'com';
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

const { ObjectId } = Types;
const { MONGO_URL, MONGO_DB } = process.env;
const { NotFoundError, ValidationError } = errors

describe('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]));

    it('succed on get posts', () => {
        let returnedPosts
        let post;
        let user;

        return User.create({
            name: 'admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'

        })
            .then(_user => {
                user = _user;
            })
            .then(() => Post.create({
                author: user.id,
                image: 'https://testimage.com/aaa',
                text: 'potato',
                likes: [user.id],
                createdAt: new Date(2025, 1, 10)
            }))
            .then(_post => {
                post = _post;
            })
            .then(() => getPosts(user.id))
            .then(posts => returnedPosts = posts)
            .finally(() => {
                expect(returnedPosts).to.be.instanceOf(Array);
                expect(returnedPosts).to.have.lengthOf(1);

                let returnedPost = returnedPosts[0]

                expect(returnedPost.author.id).to.be.equal(user.id)
                expect(returnedPost.author.username).to.equal(user.username)
                expect(returnedPost.image).to.equal(post.image)
                expect(returnedPost.text).to.equal(post.text)
                expect(returnedPost.createdAt).to.deep.equal(post.createdAt)
                expect(returnedPost.modifiedAt).to.be.null
                expect(returnedPost.own).to.be.true
                expect(returnedPost.liked).to.be.true
                expect(returnedPost.likesCount).to.equal(1)
            })
    })

    it('failed on wrong user at get posts', () => {
        // let catchedError;
        // return getPosts('67e3b7de759d2b7079073a7e')
        //     .catch(error => catchedError = error)
        //     .finally(() => {
        //         expect(catchedError).to.be.instanceOf(NotFoundError)
        //         expect(catchedError.message).to.equal('user not found')
        //     })

        return expect(getPosts(new ObjectId().toString())).to.be.rejectedWith(NotFoundError, 'user not found');
    })

    it('fails on invalid user id', () => {
        expect(() => getPosts(123)).to.throw(ValidationError, 'invalid userId type');
        expect(() => getPosts('123')).to.throw(ValidationError, 'invalid userId length');
        expect(() => getPosts(' '.repeat(24))).to.throw(ValidationError, 'invalid userId syntax');
    })

    afterEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]));

    after(() => data.disconnect());
})