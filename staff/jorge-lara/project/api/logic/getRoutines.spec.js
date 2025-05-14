import 'dotenv/config'
import { data, Exercise, Routine, User } from '../data/index.js';
import { getRoutines } from './getRoutines.js';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';

const { MONGO_URL, MONGO_DB } = process.env;

describe('getRoutines', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    it('succeed on getting routines', () => {
        let user;
        let exercise, exercise2;
        let routine, routine2;
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
                        user: user.id,
                        name: 'lunges',
                        muscleCategory: 'legs',
                        sets: 3,
                        reps: 12,
                        restTime: 60
                    })
                ]);
            })
            .then(([_exercise, _exercise2]) => {
                exercise = _exercise;
                exercise2 = _exercise2;

                return Promise.all([
                    Routine.create({
                        user: user.id,
                        title: 'test routine',
                        description: 'description test',
                        duration: 60,
                        difficulty: 'medium',
                        category: 'strength',
                        type: 'circuit',
                        exercises: [_exercise.id],
                        createdAt: new Date(2025, 5, 2),
                        startDate: new Date('2025-05-01'),
                        endDate: new Date('2025-05-13')
                    }),
                    Routine.create({
                        user: user.id,
                        title: 'Routine 2',
                        description: 'too much routines',
                        duration: 45,
                        difficulty: 'easy',
                        category: 'cardio',
                        type: 'interval',
                        exercises: [_exercise.id, _exercise2.id],
                        createdAt: new Date(2025, 5, 3),
                        startDate: new Date('2025-05-01'),
                        endDate: new Date('2025-05-06')
                    })
                ]);
            })
            .then(([_routine, _routine2]) => {
                routine = _routine;
                routine2 = _routine2;
            })
            .then(() => getRoutines(user.id))
            .then(routines => returnedRoutines = routines)
            .then(() => {
                expect(returnedRoutines).to.be.instanceOf(Array);

                let returnedRoutine = returnedRoutines[0];
                expect(returnedRoutine.user.id).to.equal(user.id);
                expect(returnedRoutine.title).to.equal(routine2.title);
                expect(returnedRoutine.description).to.equal(routine2.description);
                expect(returnedRoutine.duration).to.equal(routine2.duration);
                expect(returnedRoutine.difficulty).to.equal(routine2.difficulty);
                expect(returnedRoutine.category).to.equal(routine2.category);
                expect(returnedRoutine.type).to.equal(routine2.type);

                expect(returnedRoutine.exercises.map(exercise => exercise._id.toString())).to.deep.equal([exercise.id.toString(), exercise2.id.toString()]);

                returnedRoutine = returnedRoutines[1];
                expect(returnedRoutine.user.id).to.equal(user.id);
                expect(returnedRoutine.title).to.equal(routine.title);
                expect(returnedRoutine.description).to.equal(routine.description);
                expect(returnedRoutine.duration).to.equal(routine.duration);
                expect(returnedRoutine.difficulty).to.equal(routine.difficulty);
                expect(returnedRoutine.category).to.equal(routine.category);
                expect(returnedRoutine.type).to.equal(routine.type);

                expect(returnedRoutine.exercises.map(exercise => exercise._id.toString())).to.deep.equal([exercise.id.toString()]);

            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    after(() => data.disconnect());
});