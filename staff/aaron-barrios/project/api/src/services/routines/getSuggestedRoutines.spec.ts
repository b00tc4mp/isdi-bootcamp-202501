import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout, Routine } from "../../data"
import getSuggestedRoutines from "./getSuggestedRoutines"
import { errors } from "com"

chai.use(chaiAsPromised)

const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get Suggested Routines", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() =>
        Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({}),
            Routine.deleteMany({})
        ])
    )

    // --- HAPPY PATH ---
    it("returns routines matching user interests", () => {
        let userId: string
        let workoutId: string

        return bcrypt.hash("123123", 10)
            .then(hash =>
                User.create({
                    name: "Test", lastName: "User", alias: "testuser", email: "test@mail.com",
                    password: hash, role: "regular", level: "beginner",
                    interests: ["strength"], createdAt: new Date()
                })
            )
            .then(user => {
                userId = user._id.toString()
                return Workout.create({
                    name: "Push-Up",
                    muscleGroup: "chest",
                    feedImage: "pushiiiiiiiiiiiiiiiiiiiiiiiiiiiing",
                    type: "strength",
                    difficulty: "easy",
                    description: "teste",
                    status: "accepted",
                    author: user._id,
                    createdAt: new Date()
                })
            })
            .then(workout => {
                workoutId = workout._id.toString()
                return Routine.create({
                    author: userId,
                    name: "Routine A",
                    muscleGroup: "chest",
                    feedImage: "pushiiiiiiiiiiiiiiiiiiiiiiiiiiiing",
                    type: "strength",
                    difficulty: "medium",
                    duration: 30,
                    description: "descr",
                    status: "accepted",
                    workouts: [{ workout: workoutId, sets: 3, reps: 10, weight: 0, order: 1, restTime: 60 }]
                })
            })
            .then(() => getSuggestedRoutines(userId))
            .then(routines => {
                expect(routines).to.have.lengthOf(1)
                expect(routines[0].name).to.equal("Routine A")
                expect(routines[0].workouts[0].workout.name).to.equal("Push-Up")
            })
    })

    it("returns fallback routines when no interests match", () => {
        let userId: string
        let workoutId: string

        return bcrypt.hash("123123", 10)
            .then(hash =>
                User.create({
                    name: "Ana", lastName: "Test", alias: "ana", email: "ana@mail.com",
                    password: hash, role: "regular", level: "intermediate",
                    interests: [], createdAt: new Date()
                })
            )
            .then(user => {
                userId = user._id.toString()
                return Workout.create({
                    name: "Squat",
                    muscleGroup: "legs",
                    feedImage: "pushiiiiiiiiiiiiiiiiiiiiiiiiiiiing",
                    type: "strength",
                    difficulty: "medium",
                    description: "descr",
                    status: "accepted",
                    author: user._id,
                    createdAt: new Date()
                })
            })
            .then(workout => {
                workoutId = workout._id.toString()
                return Routine.insertMany([
                    {
                        author: userId,
                        name: "Routine Popular",
                        muscleGroup: "legs",
                        feedImage: "pushiiiiiiiiiiiiiiiiiiiiiiiiiiiing",
                        type: "mobility",
                        difficulty: "easy",
                        duration: 20,
                        description: "popular",
                        status: "accepted",
                        likes: [new ObjectId(), new ObjectId()],
                        workouts: [{ workout: workoutId, sets: 3, reps: 10, weight: 0, order: 1, restTime: 30 }]
                    },
                    {
                        author: userId,
                        name: "Routine Less Popular",
                        muscleGroup: "legs",
                        feedImage: "pushiiiiiiiiiiiiiiiiiiiiiiiiiiiing",
                        type: "mobility",
                        difficulty: "easy",
                        duration: 20,
                        description: "lesss",
                        status: "accepted",
                        likes: [],
                        workouts: [{ workout: workoutId, sets: 3, reps: 10, weight: 0, order: 1, restTime: 30 }]
                    }
                ])
            })
            .then(() => getSuggestedRoutines(userId))
            .then(routines => {
                expect(routines).to.have.lengthOf(2)
                expect(routines[0].name).to.equal("Routine Popular")
            })
    })

    //--- NOT FOUND USER ERROR PATH ---
    it("fails on non-existing user", () => {
        return expect
            (getSuggestedRoutines(new ObjectId().toString()))
            .to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() =>
        Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({}),
            Routine.deleteMany({})
        ])
    )

    after(() => data.disconnect())
})