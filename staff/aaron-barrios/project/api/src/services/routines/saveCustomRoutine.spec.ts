import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout, Routine, CustomRoutine } from "../../data"
import saveCustomRoutine from "./saveCustomRoutine"
import { errors } from "com"

const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("save CustomRoutine", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))

    // --- HAPPY PATH ---
    it("successfully saves a custom routine", () => {
        let userId: string
        let workoutId: string
        let routineId: string

        return bcrypt.hash("123456", 10)
            .then(hashedPassword =>
                User.create({
                    name: "Regular",
                    lastName: "User",
                    email: "user@example.com",
                    alias: "regular",
                    password: hashedPassword,
                    level: "veteran",
                    role: "regular"
                })
            )
            .then(user => {
                userId = user.id
                return Workout.create({
                    author: user.id,
                    name: "Test Workout",
                    muscleGroup: "chest",
                    feedImage: "https://imageeeeeeeeeeeeeeeee.jpg",
                    description: "Workout description",
                    status: "accepted",
                    difficulty: "medium",
                    duration: 10,
                })
            })
            .then(workout => {
                workoutId = workout.id
                return Routine.create({
                    author: workout.author,
                    name: "Test Routine",
                    muscleGroup: "chest",
                    feedImage: "https://routineimageeeeeeeeeee.jpg",
                    description: "Routine description",
                    duration: 45,
                    status: "accepted",
                    workouts: [{
                        workout: workout.id,
                        sets: 3,
                        reps: 10,
                        weight: 50,
                        restTime: 60,
                        order: 1
                    }]
                })
            })
            .then(routine => {
                routineId = routine.id
                return saveCustomRoutine(userId, routineId)
            })
            .then(() => CustomRoutine.findOne({ userId }).lean())
            .then(customRoutine => {
                expect(customRoutine).to.exist
                expect(customRoutine?.userId.toString()).to.equal(userId)
                expect(customRoutine?.originalRoutineId.toString()).to.equal(routineId)
                expect(customRoutine?.workouts).to.have.lengthOf(1)
                expect(customRoutine?.workouts[0].sets).to.equal(3)
            })
    })

    // --- FAIL USER NOT FOUND PATH ---
    it("fails if user doesn't exist", () => {
        return saveCustomRoutine(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("User not found!")
            })
    })

    // --- FAIL ROUTINE NOT FOUND PATH ---
    it("fails if routine doesn't exist", () => {
        let userId: string

        return bcrypt.hash("123456", 10)
            .then(hashedPassword =>
                User.create({
                    name: "Regular",
                    lastName: "User",
                    email: "user2@example.com",
                    alias: "regular2",
                    password: hashedPassword,
                    level: "beginner",
                    role: "regular"
                })
            )
            .then(user => {
                userId = user.id
                return saveCustomRoutine(userId, new ObjectId().toString())
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("Routine not found!")
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))

    after(() => data.disconnect())
})