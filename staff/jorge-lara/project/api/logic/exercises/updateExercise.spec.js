import 'dotenv/config'
import { data, Exercise, Routine, User } from '../../data/index.js';
import bcrypt from 'bcryptjs';
import { updateExercise } from './updateExercise.js';
import { expect } from 'chai';
import { Types } from 'mongoose';
import { errors } from 'com';

const { NotFoundError } = errors;

const { ObjectId } = Types;
const { MONGO_URL, MONGO_DB } = process.env;

describe('updateExercise', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Promise.all([User.deleteMany({}), Exercise.deleteMany({})]))

    it('succed on updating exercise', () => {
        let user;

        return bcrypt.hash('123123123', 10)
            .then((passwordCrypted) => {
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
                    name: 'push ups',
                    muscleCategory: 'chest',
                    sets: 3,
                    reps: 12,
                    restTime: 60
                })
            })
            .then(exercise => {
                const updateFields = {
                    name: 'pull ups',
                    muscleCategory: 'back',
                    sets: 4,
                    reps: 10,
                    restTime: 90,
                    instructions: 'hang on the bar and go up'
                }

                return updateExercise(user.id, exercise.id, updateFields)
            })
            .then(updatedExercise => {
                expect(updatedExercise.name).to.equal('pull ups')
                expect(updatedExercise.muscleCategory).to.equal('back')
                expect(updatedExercise.sets).to.equal(4)
                expect(updatedExercise.reps).to.equal(10)
                expect(updatedExercise.restTime).to.equal(90)
                expect(updatedExercise.instructions).to.equal('hang on the bar and go up')
            })
    })

    it('fail on existing user at update a exercise', () => {
        let catchedError;

        return Exercise.create({
            user: new ObjectId('67e3b7de759d2b7079093a7e'),
            name: 'biceps curl',
            muscleCategory: 'biceps',
            sets: 3,
            reps: 8,
            restTime: 90
        })
            .then(exercise => {
                const updateFields = {
                    name: 'pull ups',
                    muscleCategory: 'back',
                    sets: 4,
                    reps: 10,
                    restTime: 90,
                    instructions: 'hang on the bar and go up'
                }

                return updateExercise('67e3b7de759d2b7079093a7e', exercise.id, updateFields)
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })
    afterEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({})
    ]));

    after(() => data.disconnect());
})