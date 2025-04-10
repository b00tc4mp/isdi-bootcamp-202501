import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js';
import { expect } from 'chai';

const { MONGO_URL, MONGO_DB } = process.env;

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user', () => {
        let returnedUserId;

        return User.create({
            email: 'admin@admin.com',
            username: 'admin',
            password: '$2b$10$tFyetuoMHl5Zf7GlboeDSuukQtnzDuXVLXXxyLBjvHy1T.QvSaLk.'
        })
            .then(() => authenticateUser('admin@admin.com', '123123123'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ email: 'admin@admin.com' }).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect());
})