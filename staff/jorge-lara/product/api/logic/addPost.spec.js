import 'dotenv/config'
import { addPost } from './addPost.js'
import { data, Post, User } from '../data/index.js'
import { expect } from 'chai';
import { Types } from 'mongoose';
import { errors } from 'com';

const { ObjectId } = Types;
const { MONGO_URL, MONGO_DB } = process.env;
const { NotFoundError } = errors

describe('addPost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Post.deleteMany({}));

    it('suceed on create new post', () => {
        let result2;

        return User.create({
            _id: new ObjectId('67e3b7de759d2b7079073a7e'),
            name: 'admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                return addPost(user._id.toString(), 'potatooo', 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg')
            })
            .then(result => {
                result2 = result
                expect(result2).to.be.undefined;
                return Post.findOne().lean()
            })
            .then(post => {
                expect(post.author.toString()).to.equal('67e3b7de759d2b7079073a7e');
                expect(post.image).to.equal('https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg')
                expect(post.text).to.equal('potatooo')
            })
    })

    it('fails on not founding user', () => {
        let catchedError;
        return addPost('67e3b7de759d2b7079073a7e', 'potatooo', 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => Post.deleteMany({}));

    afterEach(() => User.deleteMany({}));

    after(() => data.disconnect());
})