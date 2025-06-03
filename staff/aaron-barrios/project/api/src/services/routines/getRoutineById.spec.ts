import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout, Routine } from "../../data"
import getRoutineById from "./getRoutineById"
import { errors } from "com"

chai.use(chaiAsPromised)

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get Routine by Id", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({}),
            Routine.deleteMany({})
        ])
    })

    // --- HAPPY PATH ---
    it("succeeds on getting a Routine by Id", () => {
        let user: any
        let routine: any

        return bcrypt.hash("123123", 10)
            .then(hashedPassword => {
                return User.create({
                    name: "Manu",
                    lastName: "Barzi",
                    email: "ma@nu.com",
                    alias: "manu",
                    password: hashedPassword,
                    role: "regular",
                    level: "beginner",
                    interests: [],
                    createdAt: new Date(),
                    modifiedAt: null
                })
            })
            .then(createdUser => {
                user = createdUser

                return Workout.create({
                    author: user._id,
                    name: "bench press",
                    muscleGroup: "chest",
                    feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg",
                    description: "classic chest workout",
                    type: "strength",
                    difficulty: "easy",
                    status: "accepted",
                    executionImages: ["url1", "url2"],
                    createdAt: new Date(),
                    modifiedAt: new Date()
                })
            })
            .then(workout => {
                return Routine.create({
                    author: user._id,
                    name: "Chest Routine",
                    muscleGroup: "chest",
                    feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg",
                    description: "The best chest routine!",
                    difficulty: "easy",
                    duration: 45,
                    status: "accepted",
                    workouts: [
                        {
                            workout: workout._id,
                            sets: 3,
                            reps: 10,
                            weight: 50,
                            restTime: 90,
                            order: 1
                        }
                    ],
                    createdAt: new Date()
                })
            })
            .then(createdRoutine => {
                routine = createdRoutine

                return getRoutineById(routine._id.toString(), user._id.toString())
            })
            .then(returnedRoutine => {
                expect(returnedRoutine).to.be.an("object")
                expect(returnedRoutine.id).to.equal(routine._id.toString())
                expect(returnedRoutine.name).to.equal(routine.name)
                expect(returnedRoutine.author.id).to.equal(user._id.toString())
                expect(returnedRoutine.workouts).to.be.an("array")
                expect(returnedRoutine.workouts.length).to.equal(1)
            })
    })

    // --- NOT FOUND ROUTINE PATH ---
    it("fails when Routine does not exist", () => {
        return expect(
            getRoutineById(new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "routine not found!")
    })

    afterEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({}),
            Routine.deleteMany({})
        ])
    })

    after(() => data.disconnect())
})