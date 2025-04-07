import "dotenv/config"
import { updatePostText } from './updatePostText.js'
import { data, User, Post } from '../data/index.js'
import { expect } from 'chai';
import { Types } from 'mongoose';
import { NotFoundError, OwnershipError } from "com/errors.js";

const { ObjectId } = Types;
const { MONGO_URL, MONGO_DB } = process.env;

describe('updatePostText', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Post.deleteMany({}));

    it('succeed on update text from a post', () => {
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
                return updatePostText('67e3b7de759d2b7079073a7e', post._id.toString(), 'potatoooes')
                    .then(result => result2 = result)
                    .finally(() => {
                        expect(result2).to.be.undefined;
                    })
                    .then(() => { return Post.findOne().lean() })
                    .then(post => {
                        expect(post.text.toString()).to.be.equal('potatoooes')
                    })
            })
    })

    it('failed on existing user at update a text from a post', () => {
        let catchedError;

        return Post.create({
            author: new ObjectId('67e3b7de759d2b7079093a7e'),
            image: 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg',
            text: 'potatoes'
        })
            .then(post => { return updatePostText('67e3b7de759d2b7079073a7e', post._id.toString(), 'potatoooes') })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('failed on existing post at update a text from a post', () => {
        let catchedError;

        return User.create({
            _id: new ObjectId('67e3b7de759d2b7079073a7e'),
            name: 'admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => { return updatePostText(user._id.toString(), '67eacd06d164568dc0990722', 'potatoooes') })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('post not found')
            })
    })

    it('failed on ownership user at update a text from a post', () => {
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
            .then(post => { return updatePostText('67e3b7de759d2b7079073a7e', post._id.toString(), 'potatoooes') })
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