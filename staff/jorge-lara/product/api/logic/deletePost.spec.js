import 'dotenv/config'
import { deletePost } from './deletePost.js'
import { data, Post, User } from '../data/index.js';
import { expect } from 'chai';
import { Types } from 'mongoose';
import { NotFoundError, OwnershipError } from 'com/errors.js';

const { ObjectId } = Types;
const { MONGO_URL, MONGO_DB } = process.env;

describe('deletePost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Post.deleteMany({}));

    it('suceed on delete a post', () => {
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
                return deletePost(post.author.toString(), post._id.toString())
                    .then(result => result2 = result)
                    .finally(() => {
                        expect(result2).to.be.undefined;
                    })
                    .then(() => Post.findOne())
                    .finally(post => expect(post).to.be.undefined)
            })
    })

    it('failed on existing user at delete a post', () => {
        let catchedError;

        return Post.create({
            author: new ObjectId('67e3b7de759d2b7079093a7e'),
            image: 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg',
            text: 'potatoes'
        })
            .then(post => { return deletePost('67e3b7de759d2b7079073a7e', post._id.toString()) })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })

    })

    it('failed on existing post at delete a post', () => {
        let catchedError;

        return User.create({
            _id: new ObjectId('67e3b7de759d2b7079073a7e'),
            name: 'admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => { return deletePost(user._id.toString(), '67eacd06d164568dc0990722') })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('post not found')
            })

    })

    it('failed on ownership user at delete a post', () => {
        let catchedError;

        return User.create({
            _id: new ObjectId('67e3b7de759d2b7079073a7e'),
            name: 'admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                return Post.create({
                    author: '67e3b7de759d2b7079073a6e',
                    image: 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg',
                    text: 'potatoes'
                })
            })
            .then(post => { return deletePost('67e3b7de759d2b7079073a7e', post._id.toString()) })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(OwnershipError)
                expect(catchedError.message).to.equal('user is not author of the post')
            })

    })

    afterEach(() => Post.deleteMany({}));
    afterEach(() => User.deleteMany({}));

    after(() => data.disconnect());
})
