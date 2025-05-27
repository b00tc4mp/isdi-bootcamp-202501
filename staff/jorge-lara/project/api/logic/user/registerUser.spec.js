import 'dotenv/config'
import { data, User } from '../../data/index.js'
import { registerUser } from './registerUser.js';
import { expect } from 'chai';
import bcrypt from 'bcryptjs';
import { errors } from 'com';

const { DuplicityError } = errors;

const { MONGO_URL, MONGO_DB } = process.env;

describe('registerUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => User.deleteMany({}));

    it('succed on new user', () => {
        let result2;

        return registerUser('admin@gmail.com', 'admin', '123123123')
            .then(result => result2 = result)
            .finally(() => {
                expect(result2).to.be.undefined;
            })
            .then(() => User.findOne({ email: 'admin@gmail.com' }).lean())
            .then(user => {
                expect(user.email).to.equal('admin@gmail.com');

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on existing user', () => {
        let catchedError

        return bcrypt.hash('123123123', 10)
            .then(passwordCrypted => {
                return User.create({
                    email: 'admin@admin.com',
                    username: 'admin',
                    password: passwordCrypted
                })
            })
            .then(() => registerUser('admin@admin.com', 'admin', '123123123'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError);
                expect(catchedError.message).to.equal('user already exists');
            })
    })

    afterEach(() => User.deleteMany({}));

    after(() => data.disconnect());
})