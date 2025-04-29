import "dotenv/config"
import { expect } from "chai"
import { Types } from "mongoose"
import bcrypt from "bcryptjs"

import { data } from "../../data"
import { User, Workout, CustomRoutine } from "../../data"
import getMyCustomRoutines from "./getMyCustomRoutines"
import { errors } from "com"

const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get MyCustomRoutines", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))

    // --- HAPPY PATH ---
    it("successfully retrieves user's custom routines", () => {
        let userId: string
        let workoutId: string
        let customRoutineOriginalId: Types.ObjectId

        return bcrypt.hash("123456", 10)
            .then(hashedPassword =>
                User.create({
                    name: "John",
                    lastName: "Doe",
                    email: "john@example.com",
                    alias: "johnDoe",
                    password: hashedPassword
                })
            )
            .then(user => {
                userId = user.id
                return Workout.create({
                    author: userId,
                    name: "Push Up",
                    muscleGroup: "chest",
                    feedImage: "https://exampleeeeeeeee.com/pushup.jpg",
                    description: "A simple push up",
                    status: "accepted",
                    duration: 10
                })
            })
            .then(workout => {
                workoutId = workout.id
                customRoutineOriginalId = new ObjectId()
                return CustomRoutine.create({
                    userId: new ObjectId(userId),
                    originalRoutineId: customRoutineOriginalId,
                    name: "Custom Chest Routine",
                    muscleGroup: "chest",
                    feedImage: "https://exampleeeeeeeee.com/chest.jpg",
                    description: "My custom chest plan",
                    duration: 45,
                    workouts: [{
                        workoutId: workout._id,
                        order: 1,
                        sets: 3,
                        reps: 12,
                        weight: 0,
                        restTime: 60
                    }]
                })
            })
            .then(() => {
                return getMyCustomRoutines(userId, customRoutineOriginalId.toString())
            })
            .then(routines => {
                expect(routines).to.have.lengthOf(1)

                const routine = routines[0]
                expect(routine.name).to.equal("Custom Chest Routine")
                expect(routine.muscleGroup).to.equal("chest")
                expect(routine.feedImage).to.be.a("string")
                expect(routine.workouts).to.have.lengthOf(1)

                const workout = routine.workouts[0]
                expect(workout.order).to.equal(1)
                expect(workout.sets).to.equal(3)
                expect(workout.reps).to.equal(12)
                expect(workout.weight).to.equal(0)
                expect(workout.restTime).to.equal(60)
            })
    })

    // --- NOT FOUND USER PATH ---
    it("fails if user does not exist", () => {
        return expect(
            getMyCustomRoutines(new ObjectId().toString(), new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))

    after(() => data.disconnect())
})