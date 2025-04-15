import 'dotenv/config'
import { expect } from 'chai'
import { errors } from 'com'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'

import { data, User, Workout } from '../../data'
import createWorkout from './createWorkout'

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe('create Workout', () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    //--- HAPPY PATH---
    it('succeeds on createWorkout', () => {
        return bcrypt.hash('123123', 10)
            .then(hashedPassword => {
                return User.insertMany([
                    {
                        name: 'Manu',
                        lastName: 'Barzi',
                        email: 'ma@nu.com',
                        alias: 'manu',
                        password: hashedPassword,
                        role: 'regular',
                        level: 'beginner',
                        interests: ['flexibility', 'calisthenics'],
                        createdAt: new Date(),
                        modifiedAt: null,
                        workouts: [],
                        routines: []
                    },
                    {
                        name: 'Frank',
                        lastName: 'Pereira',
                        email: 'fran@kie.com',
                        alias: 'frankie',
                        password: hashedPassword,
                        role: 'regular',
                        level: 'intermediate',
                        interests: ['strength', 'resistance'],
                        createdAt: new Date(),
                        modifiedAt: null,
                        workouts: [],
                        routines: []
                    }
                ])
            })
            .then(([manu, frankie]) => {
                return createWorkout(manu.id, 'press bench', 'chest', 'best workout to grow chest')
                    .then(() => Workout.find({ author: manu.id }).lean())
                    .then(workout => {
                        expect(workout).not.to.be.undefined
                        expect(workout[0].name).to.equal('press bench')
                        expect(workout[0].muscleGroup).to.equal('chest')
                    })
            })
        // .finally(() => {
        //     expect() ??
        // })
    })


    // --- CASE DOES NOT FIND USER ---
    it('fails on existingUser', () => {
        let catchedError: Error

        return createWorkout(new ObjectId().toString(), 'press bench', 'chest', 'best workout to grow chest')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found!')
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    after(() => data.disconnect())
})