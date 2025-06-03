import 'dotenv/config';
import { data, Exercise, Routine, User } from '../../data/index.js';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';
import { getPastRoutine } from './getPastRoutine.js';

const { MONGO_URL, MONGO_DB } = process.env;

describe('getPastRoutines', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    it('succeeds retrieving only past routine', () => {
        let user;
        let exercise;
        let pastRoutine;
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

                const lastWeek = new Date(now);
                lastWeek.setDate(now.getDate() - 7);

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
                    })
                ]);
            })
            .then(([_current, _past]) => {
                pastRoutine = _past;
            })
            .then(() => getPastRoutine(user.id))
            .then(_routines => returnedRoutine = _routines)
            .then(() => {
                expect(returnedRoutine).to.exist;
                expect(returnedRoutine.user.id.toString()).to.equal(user.id);

                expect(returnedRoutine.title).to.equal(pastRoutine.title);
                expect(returnedRoutine.description).to.equal(pastRoutine.description);
                expect(returnedRoutine.duration).to.equal(pastRoutine.duration);
                expect(returnedRoutine.difficulty).to.equal(pastRoutine.difficulty);
                expect(returnedRoutine.category).to.equal(pastRoutine.category);
                expect(returnedRoutine.type).to.equal(pastRoutine.type);
                expect(returnedRoutine.id).to.equal(pastRoutine.id);

            });
    });

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    after(() => data.disconnect());
});
