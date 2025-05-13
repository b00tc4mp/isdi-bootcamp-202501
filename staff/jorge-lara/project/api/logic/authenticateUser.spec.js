import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js';
import { expect } from 'chai';
import bcrypt from 'bcryptjs';
import { errors } from 'com';

const { CredentialsError, NotFoundError } = errors;

const { MONGO_URL, MONGO_DB } = process.env;

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user', () => {
        let returnedUserId;

        return bcrypt.hash('123123123', 10)
            .then(passwordCrypted => {
                return User.create({
                    email: 'admin@admin.com',
                    username: 'admin',
                    password: passwordCrypted
                })
            })
            .then(() => authenticateUser('admin@admin.com', '123123123'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ email: 'admin@admin.com' }).lean())
            .then(user => expect(user._id.toString()).to.equal(returnedUserId))
    })


    it('fails on non-existing user', () => {
        let catchedError;

        return authenticateUser('johndoe@gmail.com', '123123123')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError);
                expect(catchedError.message).to.equal('user not found');
            })
    })

    it('fails on existing user but wrong password', () => {
        let catchedError;

        return bcrypt.hash('123123123', 10)
            .then(passwordCrypted => {
                return User.create({
                    email: 'admin@admin.com',
                    username: 'admin',
                    password: passwordCrypted
                })
            })
            .then(() => authenticateUser('admin@admin.com', '321321321'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError);
                expect(catchedError.message).to.equal('wrong credentials');
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect());
})