import 'dotenv/config'
import { data, Exercise, User } from '../data/index.js';
import bcrypt from 'bcryptjs';
import { deleteExercise } from './deleteExercise.js';
import { expect } from 'chai'
import { Types } from 'mongoose';
import { errors } from 'com';

const { NotFoundError } = errors;

const { ObjectId } = Types;
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

    it('fail on existing user at delete a exercises', () => {
        let catchedError;

        return Exercise.create({
            user: new ObjectId('67e3b7de759d2b7079093a7e'),
            name: 'biceps curl',
            muscleCategory: 'biceps',
            sets: 3,
            reps: 8,
            restTime: 90
        })
            .then(exercise => { return deleteExercise('67e3b7de759d2b7079093a7e', exercise.id) })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('failed on existing exercise at delete a exercise', () => {
        let catchedError;

        return bcrypt.hash('123123123', 10)
            .then(passwordCrypted => {
                return User.create({
                    email: 'admin@admin.com',
                    username: 'admin',
                    password: passwordCrypted
                })
            })
            .then(user => deleteExercise(user._id.toString(), '67eacd06d164568dc0990722'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('exercise not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany({}), Exercise.deleteMany({})]))

    after(() => data.disconnect());
})