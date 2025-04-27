import 'dotenv/config'
import { expect } from 'chai'
import { errors } from 'com'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'

import { data, Routine, User, Workout } from '../../data'
import createRoutine from './createRoutine'
import { UserDocType, WorkoutDocType } from '../../data/types'

const { NotFoundError } = errors
const { ObjectId } = Types
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe('create Routine', () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    let manu: UserDocType
    let frankie: UserDocType
    let workout: WorkoutDocType
    let workout2: WorkoutDocType
    let workout3: WorkoutDocType
    let workout4: WorkoutDocType
    let workout5: WorkoutDocType

    it('succeeds on create Routine', () => {
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
                        interests: [],
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        name: 'Frank',
                        lastName: 'Pereira',
                        email: 'fran@kie.com',
                        alias: 'frankie',
                        password: hashedPassword,
                        role: 'regular',
                        level: 'intermediate',
                        interests: [],
                        createdAt: new Date(),
                        modifiedAt: null
                    }
                ])
            })
            .then(([m, f]) => {
                manu = m
                frankie = f

                return Workout.insertMany([
                    {
                        author: manu._id,
                        name: "bench press",
                        muscleGroup: "chest",
                        feedImage: "https://exampleeeeeeeeeeeeeeeeeeee.com/curl.jpg",
                        type: "strength",
                        difficulty: "easy",
                        description: "chest builder",
                        executionImages: ["url1", "url2"],
                        status: "accepted",
                        createdAt: new Date(),
                        modifiedAt: new Date()
                    },
                    {
                        author: frankie._id,
                        name: "lateral raises",
                        muscleGroup: "shoulders",
                        feedImage: "https://exampleeeeeeeeeeeeeeeeeeee.com/curl.jpg",
                        type: "strength",
                        difficulty: "medium",
                        description: "shoulder strength",
                        executionImages: ["url1", "url2"],
                        status: "accepted",
                        createdAt: new Date(),
                        modifiedAt: new Date()
                    },
                    {
                        author: manu._id,
                        name: "bulgarian squat",
                        muscleGroup: "legs",
                        feedImage: "https://exampleeeeeeeeeeeeeeeeeeee.com/curl.jpg",
                        type: "strength",
                        difficulty: "hard",
                        description: "leg destroyer",
                        executionImages: ["url1", "url2"],
                        status: "accepted",
                        createdAt: new Date(),
                        modifiedAt: new Date()
                    },
                    {
                        author: frankie._id,
                        name: "hammer curl",
                        muscleGroup: "biceps",
                        feedImage: "https://exampleeeeeeeeeeeeeeeeeeee.com/curl.jpg",
                        type: "strength",
                        difficulty: "medium",
                        description: "biceps gains",
                        executionImages: ["url1", "url2"],
                        status: "accepted",
                        createdAt: new Date(),
                        modifiedAt: new Date()
                    },
                    {
                        author: frankie._id,
                        name: "rowing",
                        muscleGroup: "back",
                        feedImage: "https://exampleeeeeeeeeeeeeeeeeeeee.com/row.jpg",
                        type: "strength",
                        difficulty: "easy",
                        description: "back burner",
                        executionImages: ["url1", "url2"],
                        status: "accepted",
                        createdAt: new Date(),
                        modifiedAt: new Date()
                    }
                ])
            })
            .then(([w1, w2, w3, w4, w5]) => {
                workout = w1
                workout2 = w2
                workout3 = w3
                workout4 = w4
                workout5 = w5

                return createRoutine(
                    frankie._id.toString(),
                    "Chest and Shoulders Blast",
                    "chest",
                    "https://example.com/routineeeeeeeeeeeeeeeeee.jpg",
                    "Routine for chest and shoulders",
                    45,
                    [
                        {
                            workout: workout._id, sets: 4, reps: 10, restTime: 90, order: 1,
                            _id: new ObjectId,
                            __v: 0
                        },
                        {
                            workout: workout2._id, sets: 3, reps: 12, restTime: 60, order: 2,
                            _id: new ObjectId,
                            __v: 0
                        },
                        {
                            workout: workout3._id, sets: 3, reps: 12, restTime: 60, order: 3,
                            _id: new ObjectId,
                            __v: 0
                        },
                        {
                            workout: workout5._id, sets: 3, reps: 12, restTime: 60, order: 4,
                            _id: new ObjectId,
                            __v: 0
                        }
                    ]
                )
            })
            .then(routine => {
                expect(routine).to.exist
                expect(routine.name).to.equal("Chest and Shoulders Blast")
                expect(routine.muscleGroup).to.equal("chest")
                expect(routine.feedImage).to.be.a("string")
                expect(routine.workouts).to.have.lengthOf(4)
            })
    })

    it('fails on non-existing user', () => {
        let caughtError: Error

        return createRoutine(
            new ObjectId().toString(),
            "Test Routine",
            "chest",
            "https://example.com/routineeeeeeeeeeeeeeeeeeeeee.jpg",
            "invalid user",
            45,
            [
                {
                    workout: workout._id, sets: 3, reps: 12, restTime: 60, order: 1,
                    _id: new ObjectId,
                    __v: 0
                },
                {
                    workout: workout._id, sets: 3, reps: 12, restTime: 60, order: 2,
                    _id: new ObjectId,
                    __v: 0
                },
                {
                    workout: workout._id, sets: 3, reps: 12, restTime: 60, order: 3,
                    _id: new ObjectId,
                    __v: 0
                },
                {
                    workout: workout._id, sets: 3, reps: 12, restTime: 60, order: 4,
                    _id: new ObjectId,
                    __v: 0
                }
            ]
        )
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.be.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal("User not found!")
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    after(() => data.disconnect())
})