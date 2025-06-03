// tests/routines/getCustomRoutineById.spec.ts

import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { Types } from "mongoose"
import bcrypt from "bcryptjs"

import { data, User, Workout, CustomRoutine } from "../../data"
import getCustomRoutineById from "../../services/routines/getCustomRoutineById"
import { errors } from "com"

chai.use(chaiAsPromised)

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get Custom Routine By Id", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))


    // --- HAPPY PATH ---
    it("succeeds retrieving a custom routine by id", () => {
        let userId: string
        let workoutId: string

        return bcrypt.hash("123123", 10)
            .then(hash => User.create({
                alias: "tester",
                email: "test@test.com",
                password: hash
            }))
            .then(user => {
                userId = user._id.toString()
                return Workout.create({
                    name: "Push-up",
                    muscleGroup: "chest",
                    feedImage: "https://imageeeeeeeeeeeeeeeee.com/feed.jpg",
                    type: "strength",
                    difficulty: "easy",
                    description: "descr",
                    status: "accepted",
                    author: userId
                })
            })
            .then(workout => {
                workoutId = workout._id.toString()
                return CustomRoutine.create({
                    userId,
                    originalRoutineId: new ObjectId(),
                    name: "Routine 1",
                    description: "descr",
                    muscleGroup: "chest",
                    feedImage: "https://imgeeeeeeeeeeeeeeeeeee.com/feed.jpg",
                    duration: 30,
                    status: "accepted",
                    workouts: [{
                        workoutId,
                        sets: 3,
                        reps: 10,
                        weight: 0,
                        restTime: 60,
                        order: 1,
                        time: 0
                    }],
                    createdAt: new Date()
                })
            })
            .then(routine => getCustomRoutineById(routine._id.toString(), userId))
            .then(routine => {
                expect(routine).to.exist
                expect(routine.name).to.equal("Routine 1")
                expect(routine.workouts[0].workout.name).to.equal("Push-up")
            })
    })


    // --- NOT FOUND ROUTINE ERROR PATH ---
    it("fails on non-existent routine", () => {
        return expect(
            getCustomRoutineById(new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "custom routine not found")
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))

    after(() => data.disconnect())
})