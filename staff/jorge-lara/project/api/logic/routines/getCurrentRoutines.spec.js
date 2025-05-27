import 'dotenv/config';
import { data, Exercise, Routine, User } from '../../data/index.js';
import { getCurrentRoutines } from './getCurrentRoutines.js';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';

const { MONGO_URL, MONGO_DB } = process.env;

describe('getCurrentRoutines', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    it('succeeds retrieving only current routines', () => {
        let user;
        let exercise;
        let currentRoutine;
        let returnedRoutines;

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

                const now = new Date();
                const yesterday = new Date(now);
                yesterday.setDate(now.getDate() - 1);

                const tomorrow = new Date(now);
                tomorrow.setDate(now.getDate() + 1);

                const lastWeek = new Date(now);
                lastWeek.setDate(now.getDate() - 7);

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
                        title: 'past routine',
                        description: 'already finished',
                        duration: 30,
                        difficulty: 'easy',
                        category: 'cardio',
                        type: 'interval',
                        exercises: [exercise.id],
                        startDate: lastWeek,
                        endDate: yesterday
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
            .then(([_current]) => {
                currentRoutine = _current;
            })
            .then(() => getCurrentRoutines(user.id))
            .then(_routines => returnedRoutines = _routines)
            .then(() => {
                expect(returnedRoutines).to.be.instanceOf(Array);
                expect(returnedRoutines.length).to.equal(1);

                const routine = returnedRoutines[0];
                expect(routine.user.id.toString()).to.equal(user.id);

                expect(routine.title).to.equal(currentRoutine.title);
                expect(routine.description).to.equal(currentRoutine.description);
                expect(routine.duration).to.equal(currentRoutine.duration);
                expect(routine.difficulty).to.equal(currentRoutine.difficulty);
                expect(routine.category).to.equal(currentRoutine.category);
                expect(routine.type).to.equal(currentRoutine.type);
                expect(routine.id).to.equal(currentRoutine.id);

            });
    });

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    after(() => data.disconnect());
});
