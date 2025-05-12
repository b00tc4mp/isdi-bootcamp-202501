import 'dotenv/config'
import { data, Exercise, Routine, User } from '../data/index.js';
import bcrypt from 'bcryptjs';
import { updateRoutine } from './updateRoutine.js';
import { expect } from 'chai';


const { MONGO_URL, MONGO_DB } = process.env;

describe('updateRoutine', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB));

    beforeEach(() => Promise.all([User.deleteMany({}), Exercise.deleteMany({})]))

    it('successfully update a routine', () => {
        let user;
        let exercises;
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
                    }),
                    Exercise.create({
                        user: user.id,
                        name: 'plank',
                        muscleCategory: 'core',
                        sets: 2,
                        reps: 1,
                        restTime: 30
                    })
                ]);

            })
            .then(_exercises => {
                exercises = _exercises;
                const exercisesIds = _exercises.map(ex => ex._id.toString())

                return Routine.create({
                    user: user.id,
                    title: 'test routine',
                    description: 'description test',
                    duration: 60,
                    difficulty: 'medium',
                    category: 'strength',
                    type: 'circuit',
                    exercises: exercisesIds,
                    startDate: new Date('2025-05-01'),
                    endDate: new Date('2025-05-13')
                })
            })
            .then(routine => {
                const updateFields = {
                    title: 'new routine',
                    difficulty: 'easy',
                    duration: 45,
                    exercises: exercises.slice(0, 2).map(ex => ex._id.toString()),
                    startDate: new Date('2025-05-05')
                }
                return updateRoutine(user.id, routine.id.toString(), updateFields)
            })
            .then(updatedRoutine => {
                expect(updatedRoutine).not.to.be.undefined
                expect(updatedRoutine.title).to.equal('new routine');
                expect(updatedRoutine.description).to.equal('description test');
                expect(updatedRoutine.duration).to.equal(45);
                expect(updatedRoutine.difficulty).to.equal('easy');
                expect(updatedRoutine.category).to.equal('strength');
                expect(updatedRoutine.type).to.equal('circuit');
                expect(updatedRoutine.startDate).to.deep.equal(new Date('2025-05-05'));
                expect(updatedRoutine.endDate).to.deep.equal(new Date('2025-05-13'));

                const expectedExercises = exercises.slice(0, 2).map(ex => ex._id.toString())
                expect(updatedRoutine.exercises.map(ex => ex.toString())).to.deep.equal(expectedExercises)

            })
    })
})