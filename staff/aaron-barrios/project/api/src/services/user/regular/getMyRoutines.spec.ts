import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Routine, Workout } from "../../../data"
import getMyRoutines from "./getMyRoutines"
import { errors } from "com"

chai.use(chaiAsPromised)

const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get My Routines", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({}),
            Routine.deleteMany({})
        ])
    })

    // --- HAPPY PATH ---
    it("succeeds on retrieving user's own routines", () => {
        return bcrypt.hash("mamama", 10)
            .then(hashedPassword => {
                return User.insertMany([
                    { alias: "User", email: "user@test.com", password: hashedPassword, createdAt: new Date() }
                ])
            })
            .then(([_user]) => {
                const user = { id: _user._id.toString() }

                return Workout.insertMany([
                    {
                        author: user.id,
                        name: "Push Up",
                        muscleGroup: "chest",
                        feedImage: "https://res.cloudinary.com/demo/image/upload/v1234567890/example.jpg",
                        description: "Push up desc",
                        status: "accepted"
                    },
                    {
                        author: user.id,
                        name: "Squat",
                        muscleGroup: "legs",
                        feedImage: "https://res.cloudinary.com/demo/image/upload/v1234567890/example.jpg",
                        description: "Squat desc",
                        status: "accepted"
                    }
                ])
                    .then(([pushUp, squat]) => {
                        return Routine.insertMany([
                            {
                                author: user.id,
                                name: "My Routine",
                                muscleGroup: "chest",
                                feedImage: "https://res.cloudinary.com/demo/image/upload/v1234567890/example.jpg",
                                description: "Routine description",
                                difficulty: "easy",
                                duration: 30,
                                workouts: [
                                    {
                                        workout: pushUp._id,
                                        sets: 3,
                                        reps: 10,
                                        weight: 0,
                                        restTime: 60,
                                        order: 1
                                    },
                                    {
                                        workout: squat._id,
                                        sets: 3,
                                        reps: 12,
                                        weight: 0,
                                        restTime: 90,
                                        order: 2
                                    }
                                ],
                                status: "pending",
                                createdAt: new Date()
                            }
                        ])
                    })
                    .then(() => getMyRoutines(user.id))
                    .then(myRoutines => {
                        expect(myRoutines).to.be.an("array")
                        expect(myRoutines).to.have.lengthOf(1)
                        expect(myRoutines[0].author.id).to.equal(user.id)
                        expect(myRoutines[0].workouts).to.have.lengthOf(2)
                        expect(myRoutines[0].name).to.equal("My Routine")
                    })
            })
    })

    // --- NOT FOUND USER ERROR PATH ---
    it("fails on non-existing user", () => {
        return expect(
            getMyRoutines(new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    after(() => data.disconnect())
})