import 'dotenv/config'
import { getPosts } from './getPosts.js';
import { data, Post, User } from '../data/index.js';
import { expect } from 'chai';
import { Types } from 'mongoose';
import { NotFoundError } from 'com/errors.js';

const { ObjectId } = Types;
const { MONGO_URL, MONGO_DB } = process.env;

describe('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Post.deleteMany({}));

    it('succed on get posts', () => {
        let posts2;

        return User.create({
            _id: new ObjectId('67e3b7de759d2b7079073a7e'),
            name: 'admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'

        })
            .then(user => Post.create({
                author: user._id.toString(),
                image: 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg',
                text: 'potatoes'
            }))
            .then(() => {
                return getPosts('67e3b7de759d2b7079073a7e')
            })
            .then(posts => posts2 = posts)
            .finally(() => {
                expect(posts2[0].text).to.be.equal('potatoes')
            })
    })

    it('failed on wrong user at get posts', () => {
        let catchedError;
        return getPosts('67e3b7de759d2b7079073a7e')
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