import 'dotenv/config';
import { expect } from 'chai';
import { data, Exercise, Routine, User } from '../../data/index.js';
import bcrypt from 'bcryptjs';
import { createRoutine } from './createRoutine.js';

const { MONGO_URL, MONGO_DB } = process.env;

describe('createRoutine', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    it('succed on creating routines', () => {
        let user;
        let exercises;
        const now = new Date();
        const yesterday = new Date(now);
        const tomorrow = new Date(now);

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
            .then(() => {
                return Exercise.find({ user: user.id }).lean()
            })
            .then(_exercises => {
                exercises = _exercises;
                const exerciseIds = _exercises.map(ex => ex._id.toString());

                yesterday.setDate(now.getDate() - 1);

                tomorrow.setDate(now.getDate() + 1);

                return createRoutine(
                    user.id,
                    'test routine',
                    'description test',
                    60,
                    'medium',
                    'strength',
                    'circuit',
                    exerciseIds,
                    yesterday.toISOString(),
                    tomorrow.toISOString()
                );
            })
            .then(result => {
                expect(result).to.be.undefined;
                return Routine.findOne().lean();
            })
            .then(routine => {
                expect(routine).not.to.be.undefined
                expect(routine.title).to.equal('test routine');
                expect(routine.description).to.equal('description test');
                expect(routine.duration).to.equal(60);
                expect(routine.difficulty).to.equal('medium');
                expect(routine.category).to.equal('strength');
                expect(routine.type).to.equal('circuit');
                expect(routine.startDate).to.deep.equal(yesterday);
                expect(routine.endDate).to.deep.equal(tomorrow);

                const expectedExerciseIds = exercises.map(ex => ex._id.toString());
                expect(routine.exercises.map(ex => ex.toString())).to.deep.equal(expectedExerciseIds);
            });
    });

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Exercise.deleteMany({}),
        Routine.deleteMany({})
    ]));

    after(() => data.disconnect());
});
