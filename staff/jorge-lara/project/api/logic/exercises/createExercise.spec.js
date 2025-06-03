import 'dotenv/config';
import { expect } from 'chai';
import { data, Exercise, User } from '../../data/index.js';
import bcrypt from 'bcryptjs';
import { createExercise } from './createExercise.js';

const { MONGO_URL, MONGO_DB } = process.env;

describe('createExercise', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Promise.all([User.deleteMany({}), Exercise.deleteMany({})]))

    it('succed on creating exercises', () => {
        let result2;

        return bcrypt.hash('123123123', 10)
            .then(passwordCrypted => {
                return User.create({
                    email: 'admin@admin.com',
                    username: 'admin',
                    password: passwordCrypted
                })
            })
            .then(user => {
                return createExercise(user.id, 'biceps curl', 'biceps', 3, 8, 90)
            })
            .then(result => {
                result2 = result;
                expect(result2).to.be.undefined;
                return Exercise.findOne().lean()
            })
            .then(exercise => {
                expect(exercise.name).to.equal('biceps curl');
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect());
})