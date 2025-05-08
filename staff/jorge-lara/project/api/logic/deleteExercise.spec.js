import 'dotenv/config'
import { data, Exercise, User } from '../data/index.js';
import bcrypt from 'bcryptjs';
import { deleteExercise } from './deleteExercise.js';
import { expect } from 'chai'

const { MONGO_URL, MONGO_DB } = process.env;

describe('deleteExercise', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Promise.all([User.deleteMany({}), Exercise.deleteMany({})]))

    it('succeed on delete exercise', () => {
        let result2 = null;
        let user;
        return bcrypt.hash('123123123', 10)
            .then(passwordCrypted => {
                return User.create({
                    email: 'admin@admin.com',
                    username: 'admin',
                    password: passwordCrypted
                })
            })
            .then(_user => {
                user = _user;
                return Exercise.create({
                    user: _user.id,
                    name: 'biceps curl',
                    muscleCategory: 'biceps',
                    sets: 3,
                    reps: 8,
                    restTime: 90
                })
            })
            .then(exercise => {
                return deleteExercise(user.id, exercise._id.toString())
                    .then(result => result2 = result)
                    .finally(() => {
                        expect(result2).to.be.undefined;
                    })
                    .then(() => Exercise.findOne())
                    .finally(exercise => expect(exercise).to.be.undefined)
            })
    })

    afterEach(() => Promise.all([User.deleteMany({}), Exercise.deleteMany({})]))

    after(() => data.disconnect());
})