import 'dotenv/config';
import { data, Exercise, Routine, User } from '../data/index.js';
import { getCurrentRoutines } from './getCurrentRoutines.js';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';
import { getNextRoutine } from './getNextRoutine.js';

const { MONGO_URL, MONGO_DB } = process.env;

describe('getNextRoutine', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    it('succeeds retrieving only next routine', () => {
        let user;
        let exercise;
        let futureRoutine;
        let returnedRoutine;

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
                return Exercise.create({
                    user: user.id,
                    name: 'jumping jacks',
                    muscleCategory: 'full body',
                    sets: 3,
                    reps: 20,
                    restTime: 30
                });
            })
            .then(_exercise => {
                exercise = _exercise;

                //This is to keep the test updated any time it executes
                const now = new Date();
                const yesterday = new Date(now);
                yesterday.setDate(now.getDate() - 1);

                const tomorrow = new Date(now);
                tomorrow.setDate(now.getDate() + 1);

                const nextWeek = new Date(now);
                nextWeek.setDate(now.getDate() + 7);

                return Promise.all([
                    Routine.create({
                        user: user.id,
                        title: 'current routine',
                        description: 'currently active',
                        duration: 40,
                        difficulty: 'medium',
                        category: 'functional',
                        type: 'circuit',
                        exercises: [exercise.id],
                        startDate: yesterday,
                        endDate: tomorrow
                    }),
                    Routine.create({
                        user: user.id,
                        title: 'future routine',
                        description: 'not started yet',
                        duration: 50,
                        difficulty: 'hard',
                        category: 'strength',
                        type: 'circuit',
                        exercises: [exercise.id],
                        startDate: tomorrow,
                        endDate: nextWeek
                    })
                ]);
            })
            .then(([_current, _future]) => {
                futureRoutine = _future;
            })
            .then(() => getNextRoutine(user.id))
            .then(_routines => returnedRoutine = _routines)
            .then(() => {
                expect(returnedRoutine).to.exist;
                expect(returnedRoutine.user.id.toString()).to.equal(user.id);

                expect(returnedRoutine.title).to.equal(futureRoutine.title);
                expect(returnedRoutine.description).to.equal(futureRoutine.description);
                expect(returnedRoutine.duration).to.equal(futureRoutine.duration);
                expect(returnedRoutine.difficulty).to.equal(futureRoutine.difficulty);
                expect(returnedRoutine.category).to.equal(futureRoutine.category);
                expect(returnedRoutine.type).to.equal(futureRoutine.type);
                expect(returnedRoutine.id).to.equal(futureRoutine.id);

            });
    });

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    after(() => data.disconnect());
});
