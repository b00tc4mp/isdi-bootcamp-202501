import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout, Routine, CustomRoutine } from "../../data"
import getRoutineOfTheDay from "./getRoutineOfTheDay"
import { errors } from "com"

chai.use(chaiAsPromised)

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get Routine Of The Day", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))

    // --- HAPPY PATH ---
    it("excludes saved and custom routines and returns only available ones", () => {
        let userId: string, workoutId: string, routine1Id: string, routine2Id: string

        return bcrypt.hash("123123", 10)
            .then(password => User.create({
                name: "Aaron",
                lastName: "Test",
                email: "aaron2@test.com",
                alias: "aaron2",
                password,
                role: "regular",
                level: "beginner",
                interests: [],
                routines: [], // se sobreescribirá luego
                createdAt: new Date()
            }))
            .then(user => {
                userId = user._id.toString()

                return Workout.create({
                    name: "Plank",
                    muscleGroup: "chest",
                    feedImage: "https://imaaaaaaaaaage/plank.jpg",
                    description: "Hold the plank",
                    difficulty: "medium",
                    type: "strength",
                    status: "accepted",
                    author: user._id,
                    createdAt: new Date()
                })
            })
            .then(workout => {
                workoutId = workout._id.toString()

                return Routine.insertMany([
                    {
                        name: "Saved Routine",
                        muscleGroup: "chest",
                        feedImage: "https://imaaaaaaaaaage/plank.jpg",
                        description: "saved routine",
                        difficulty: "easy",
                        duration: 20,
                        status: "accepted",
                        author: userId,
                        workouts: [{
                            workout: workoutId,
                            sets: 3,
                            reps: 10,
                            order: 1,
                            weight: 0,
                            restTime: 1
                        }],
                        createdAt: new Date()
                    },
                    {
                        name: "Available Routine",
                        muscleGroup: "chest",
                        feedImage: "https://imaaaaaaaaaage/plank.jpg",
                        description: "this one should be returned",
                        difficulty: "easy",
                        duration: 20,
                        status: "accepted",
                        author: userId,
                        workouts: [{
                            workout: workoutId,
                            sets: 3,
                            reps: 10,
                            order: 1,
                            weight: 0,
                            restTime: 1
                        }],
                        createdAt: new Date()
                    }
                ])
            })
            .then(([routine1, routine2]) => {
                routine1Id = routine1._id.toString()
                routine2Id = routine2._id.toString()

                return Promise.all([
                    // update user with routine1 as saved
                    User.findByIdAndUpdate(userId, {
                        $set: { routines: [routine1Id] }
                    }),

                    // create a custom routine for the user
                    CustomRoutine.create({
                        originalRoutineId: routine1Id,
                        name: "My Custom Routine",
                        muscleGroup: "chest",
                        feedImage: "https://imaaaaaaaaaage/plank.jpg",
                        description: "customized",
                        duration: 25,
                        createdAt: new Date(),
                        author: {
                            id: userId,
                            alias: "aaron2"
                        },
                        userId: userId,
                        workouts: [{
                            workoutId: workoutId,
                            sets: 3,
                            reps: 10,
                            weight: 0,
                            order: 1,
                            restTime: 1
                        }]
                    })
                ])
            })
            .then(() => getRoutineOfTheDay(userId))
            .then(routine => {
                expect(routine).to.exist
                expect(routine!.name).to.equal("Available Routine")
            })
    })


    // --- NOT FOUND USER ---
    it("fails on non-existing user", () => {
        return expect(getRoutineOfTheDay(new ObjectId().toString()))
            .to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))

    after(() => data.disconnect())
})