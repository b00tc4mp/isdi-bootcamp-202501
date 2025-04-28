import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Routine, Workout } from "../../../data"
import getSavedRoutines from "./getSavedRoutines"
import { errors } from "com"

chai.use(chaiAsPromised)

const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get Saved Routines", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({}),
            Routine.deleteMany({})
        ])
    })

    // --- HAPPY PATH ---
    it("succeeds on retrieving user's saved routines", () => {
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
                    }
                ])
                    .then(([pushUp]) => {
                        return Routine.insertMany([
                            {
                                author: user.id,
                                name: "Routine Saved",
                                muscleGroup: "chest",
                                feedImage: "https://res.cloudinary.com/demo/image/upload/v1234567890/example.jpg",
                                description: "Routine description",
                                difficulty: "easy",
                                duration: 30,
                                status: "accepted",
                                saves: [user.id],
                                workouts: [
                                    {
                                        workout: pushUp._id,
                                        sets: 3,
                                        reps: 10,
                                        weight: 0,
                                        restTime: 60,
                                        order: 1
                                    }
                                ],
                                createdAt: new Date()
                            }
                        ])
                    })
                    .then(() => getSavedRoutines(user.id))
                    .then(savedRoutines => {
                        expect(savedRoutines).to.be.an("array")
                        expect(savedRoutines).to.have.lengthOf(1)
                        expect(savedRoutines[0].author.id).to.equal(user.id)
                        expect(savedRoutines[0].savedByMe).to.be.true
                        expect(savedRoutines[0].name).to.equal("Routine Saved")
                    })
            })
    })

    // --- NOT FOUND USER PATH ---
    it("fails on non-existing user", () => {
        return expect(
            getSavedRoutines(new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    after(() => data.disconnect())
})