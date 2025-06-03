import 'dotenv/config';
import { expect } from 'chai';
import { data, Exercise, User } from '../../data/index.js';
import bcrypt from 'bcryptjs';
import { getExercises } from './getExercises.js';


const { MONGO_URL, MONGO_DB } = process.env;

describe('getExercises', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Promise.all([User.deleteMany({}), Exercise.deleteMany({})]))

    it('succed on get exercises', () => {
        let returnedExercises;
        let user;
        let exercise;

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
            })
            .then(() => Exercise.create({
                user: user.id,
                name: 'biceps curl',
                muscleCategory: 'biceps',
                sets: 3,
                reps: 8,
                restTime: 90
            }))
            .then(_exercise => {
                exercise = _exercise;
            })
            .then(() => getExercises(user.id))
            .then(exercises => returnedExercises = exercises)
            .then(() => {
                expect(returnedExercises).to.be.instanceOf(Array);
                expect(returnedExercises).to.have.lengthOf(1);

                let returnedExercise = returnedExercises[0];

                expect(returnedExercise.name).to.equal(exercise.name)
            })
    })

    afterEach(() => Promise.all([User.deleteMany({}), Exercise.deleteMany({})]))

    after(() => data.disconnect());
})