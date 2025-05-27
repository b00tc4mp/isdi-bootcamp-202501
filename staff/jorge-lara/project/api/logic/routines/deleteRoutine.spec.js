import 'dotenv/config'
import { data, Exercise, User, Routine } from '../../data/index.js';
import bcrypt from 'bcryptjs';
import { expect } from 'chai'
import { deleteRoutine } from './deleteRoutine.js';
import { Types } from 'mongoose';
import { errors } from 'com';

const { NotFoundError } = errors;

const { ObjectId } = Types;
const { MONGO_URL, MONGO_DB } = process.env;

describe('deleteRoutine', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    it('succed on delete routine', () => {
        let user;

        return bcrypt.hash('123123123', 10)
            .then(passwordCrypted => {
                return User.create({
                    email: 'admin@admin.com',
                    username: 'admin',
                    password: passwordCrypted
                });
            })
            .then(_user => {
                user = _user;
                return Promise.all([
                    Exercise.create({
                        user: _user.id,
                        name: 'push ups',
                        muscleCategory: 'chest',
                        sets: 3,
                        reps: 12,
                        restTime: 60
                    }),
                    Exercise.create({
                        user: _user.id,
                        name: 'squats',
                        muscleCategory: 'legs',
                        sets: 4,
                        reps: 15,
                        restTime: 90
                    })
                ]);
            })
            .then(_exercises => {
                const exercisesIds = _exercises.map(ex => ex._id.toString());

                return Routine.create({
                    user: user.id,
                    title: 'test routine',
                    description: 'description test',
                    duration: 60,
                    difficulty: 'medium',
                    category: 'strength',
                    type: 'circuit',
                    exercisesIds,
                    startDate: new Date('2025-05-01'),
                    endDate: new Date('2025-05-13')
                })
            })
            .then(routine => {
                return deleteRoutine(user.id, routine._id.toString())
                    .then(result => {
                        expect(result).to.be.undefined;
                    })
                    .then(() => Routine.findOne())
                    .finally(routine => expect(routine).to.be.undefined)

            })
    })

    it('failed on existing user at delete a routine', () => {
        let catchedError;

        return Routine.create({
            user: new ObjectId('67e3b7de759d2b7079093a7e'),
            title: 'test routine',
            description: 'description test',
            duration: 60,
            difficulty: 'medium',
            category: 'strength',
            type: 'circuit',
            exercises: [new ObjectId('67e3b7de759d2b7079093a7d')],
            startDate: new Date('2025-05-10'),
            endDate: new Date('2025-05-20')
        })
            .then(routine => deleteRoutine('67e3b7de759d2b7079093a7e', routine.id))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('failed on existing routin at delete a routine', () => {
        let catchedError;

        return bcrypt.hash('123123123', 10)
            .then(passwordCrypted => {
                return User.create({
                    email: 'admin@admin.com',
                    username: 'admin',
                    password: passwordCrypted
                })
            })
            .then(user => deleteRoutine(user._id.toString(), '67e3b7de759d2b7079093a7e'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('routine not found')
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    after(() => data.disconnect());
})