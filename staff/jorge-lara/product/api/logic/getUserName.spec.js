import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserName } from './getUsername.js'
import { expect } from 'chai';
import { NotFoundError } from 'com/errors.js';

const { MONGO_URL, MONGO_DB } = process.env;

describe('getUserName', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeed on getting username', () => {
        let returnedName;

        return User.create({
            name: 'John Doe',
            email: 'johndoe@doe.com',
            username: 'johndoe',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                return getUserName(user._id.toString())
            })
            .then(userName => returnedName = userName)
            .finally(() => expect(returnedName).to.be.a.string)
            .then(() => User.findOne({ username: 'johndoe' }).lean())
            .then(user => expect(user.name).to.be.equal(returnedName))
    })

    it('fails on non existing user', () => {
        let catchedError;

        return getUserName('67e3b7de759d2b7079073a7e')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}));

    after(() => data.disconnect());
})
