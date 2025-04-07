import 'dotenv/config'
import { toggleLikePost } from './toggleLikePost.js'
import { data, User, Post } from '../data/index.js';
import { Types } from 'mongoose';
import { expect } from 'chai';
import { NotFoundError } from 'com/errors.js';

const { ObjectId } = Types;
const { MONGO_URL, MONGO_DB } = process.env;

describe('toggleLikePost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Post.deleteMany({}));

    it('succeed on like a post', () => {
        let result2 = null;

        return User.create({
            _id: new ObjectId('67e3b7de759d2b7079073a7e'),
            name: 'admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                return Post.create({
                    author: user._id.toString(),
                    image: 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg',
                    text: 'potatoes'
                })
            })
            .then(post => {
                return toggleLikePost('67e3b7de759d2b7079073a7e', post._id.toString())
                    .then(result => result2 = result)
                    .finally(() => {
                        expect(result2).to.be.undefined;
                    })
                    .then(() => { return Post.findOne().lean() })
                    .then(post => {
                        expect(post.likes[0].toString()).to.be.equal('67e3b7de759d2b7079073a7e')
                    })
            })
    })

    it('failed on existing user at like a post', () => {
        let catchedError;

        return Post.create({
            author: new ObjectId('67e3b7de759d2b7079093a7e'),
            image: 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg',
            text: 'potatoes'
        })
            .then(post => { return toggleLikePost('67e3b7de759d2b7079073a7e', post._id.toString()) })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })

    })

    it('failed on existing post at like a post', () => {
        let catchedError;

        return User.create({
            _id: new ObjectId('67e3b7de759d2b7079073a7e'),
            name: 'admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => { return toggleLikePost(user._id.toString(), '67eacd06d164568dc0990722') })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('post not found')
            })

    })

    afterEach(() => Post.deleteMany({}));
    afterEach(() => User.deleteMany({}));

    after(() => data.disconnect());
})