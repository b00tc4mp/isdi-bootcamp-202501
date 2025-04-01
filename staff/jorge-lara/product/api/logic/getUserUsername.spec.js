import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'
import { expect } from 'chai';
import { NotFoundError } from 'com/errors.js';

const { MONGO_URL, MONGO_DB } = process.env;

describe('getUserUsername', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeed on getting username', () => {
        let returnedUsername;

        return User.create({
            name: 'John Doe',
            email: 'johndoe@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                return getUserUsername(user._id.toString())
            })
            .then(username => returnedUsername = username)
            .finally(() => expect(returnedUsername).to.be.a.string)
            .then(() => User.findOne({ username: 'johndoe' }).lean())
            .then(user => expect(user.username).to.be.equal(returnedUsername))
    })

    it('fails on non existing user', () => {
        let catchedError;

        return getUserUsername('67e3b7de759d2b7079073a7e')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}));

    after(() => data.disconnect());
})
