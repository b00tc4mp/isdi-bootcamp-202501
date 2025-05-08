import 'dotenv/config'
import { expect } from "chai";
import { data, User } from "../data/index.js"
import { getUserUsername } from "./getUserUsername.js";
import bcrypt from 'bcryptjs';

const { MONGO_URL, MONGO_DB } = process.env;

describe('getUserusername', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => User.deleteMany({}));

    it('succeed on getting username', () => {
        let returnedUsername;

        return bcrypt.hash('123123123', 10)
            .then(passwordCrypted => {
                return User.create({
                    email: 'admin@admin.com',
                    username: 'admin',
                    password: passwordCrypted
                })
            })
            .then(user => { debugger; return getUserUsername(user._id.toString()) })
            .then(username => returnedUsername = username)
            .finally(() => {
                expect(returnedUsername).to.be.a.string;
                expect(returnedUsername).to.equal('admin');
            })
    })

    afterEach(() => User.deleteMany({}));

    after(() => data.disconnect());
})