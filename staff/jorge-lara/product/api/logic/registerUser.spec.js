import 'dotenv/config'
import { data, User } from '../data/index.js';
import { registerUser } from './registerUser.js';
import { expect } from 'chai'
import bcrypt from 'bcryptjs';
import { DuplicityError } from 'com/errors.js';

const { MONGO_URL, MONGO_DB } = process.env;

describe('registerUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => User.deleteMany({}));

    it('succed on new user', () => {
        let result2;

        return registerUser('John', 'john@doe.com', 'johndoe', '123123123')
            .then(result => result2 = result)
            .finally(() => {
                expect(result2).to.be.undefined;
            })
            .then(() => User.findOne({ username: 'johndoe' }).lean())
            .then(user => {
                expect(user.name).to.equal('John');
                expect(user.email).to.equal('john@doe.com');
                expect(user.username).to.equal('johndoe');

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on existing user', () => {
        let catchedError

        return User.create({
            name: 'John Doe',
            email: 'johndoe@doe.com',
            username: 'johndoe',
            password: '$2b$10$6eMZ9.aCdv4vGKbZ5XAQy.72yUFgPz7Xd.DJfWrWfVzvWqSPYHGUi'
        })
            .then(() => registerUser('John', 'john@doe.com', 'johndoe', '123123123'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError);
                expect(catchedError.message).to.equal('user already exists');
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect());
})