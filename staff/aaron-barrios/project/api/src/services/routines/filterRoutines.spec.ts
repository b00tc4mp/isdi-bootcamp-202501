import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout, Routine } from "../../data"
import filterRoutines from "./filterRoutines"
import { errors } from "com"

chai.use(chaiAsPromised)

const { NotFoundError } = errors
const { ObjectId } = Types
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("filter Routines", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    // --- HAPPY PATH ---
    it("succeeds on getting routines by popularity", () => {
        return bcrypt.hash("123123", 10)
            .then(hashedPassword => {
                return User.insertMany([
                    {
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
                    },
                    {
                        name: "Frank",
                        lastName: "Pereira",
                        email: "fran@kie.com",
                        alias: "frankie",
                        password: hashedPassword,
                        role: "regular",
                        level: "intermediate",
                        interests: [],
                        createdAt: new Date(),
                        modifiedAt: null
                    }
                ])
            })
            .then(([u1, u2]) => {
                return Workout.insertMany([
                    {
                        author: u1._id,
                        name: "bench press",
                        muscleGroup: "chest",
                        feedImage: "url1jaajajajajajajajajajajajaajajaj",
                        description: "pussh",
                        difficulty: "easy",
                        type: "strength",
                        status: "accepted"
                    },
                    {
                        author: u2._id,
                        name: "bulgarian squat",
                        muscleGroup: "legs",
                        feedImage: "url2jaajajajajajajajajajajajaajajaj",
                        description: "legss",
                        difficulty: "medium",
                        type: "strength",
                        status: "accepted"
                    },
                    {
                        author: u1._id,
                        name: "hammer curl",
                        muscleGroup: "biceps",
                        feedImage: "url3jaajajajajajajajajajajajaajajaj",
                        description: "biceps",
                        difficulty: "easy",
                        type: "strength",
                        status: "accepted"
                    },
                    {
                        author: u2._id,
                        name: "hip thrust",
                        muscleGroup: "buttocks",
                        feedImage: "url4jaajajajajajajajajajajajaajajaj",
                        description: "glutes",
                        difficulty: "medium",
                        type: "strength",
                        status: "accepted"
                    }
                ])
                    .then(([w1, w2, w3, w4]) => {
                        return Routine.insertMany([
                            {
                                author: u1._id,
                                name: "Chest Routine",
                                muscleGroup: "chest",
                                feedImage: "url1jaajajajajajajajajajajajaajajaj",
                                description: "Grow your chest!",
                                duration: 40,
                                status: "accepted",
                                likes: [u2._id],
                                saves: [],
                                createdAt: new Date(),
                                workouts: [
                                    { workout: w1._id, sets: 3, reps: 10, restTime: 60 },
                                    { workout: w3._id, sets: 3, reps: 8, restTime: 90 }
                                ]
                            },
                            {
                                author: u2._id,
                                name: "Leg Day",
                                muscleGroup: "legs",
                                feedImage: "url2jaajajajajajajajajajajajaajajaj",
                                description: "Destroy your legs!",
                                duration: 45,
                                status: "accepted",
                                likes: [u1._id, u2._id],
                                saves: [u1._id],
                                createdAt: new Date(),
                                workouts: [
                                    { workout: w2._id, sets: 4, reps: 12, restTime: 60 },
                                    { workout: w4._id, sets: 4, reps: 10, restTime: 90 }
                                ]
                            }
                        ])
                            .then(() => filterRoutines(u1._id.toString(), "popular"))
                            .then(routines => {
                                expect(routines).to.be.an("array")
                                expect(routines).to.have.lengthOf(2)
                                expect(routines[0].name).to.equal("Leg Day")
                                expect(routines[1].name).to.equal("Chest Routine")
                                expect(routines[0].likedByMe).to.equal(true)
                                expect(routines[1].likedByMe).to.equal(false)
                            })
                    })
            })
    })

    // --- NOT FOUND USER PATH ---
    it("fails on non-existing user", () => {
        const fakeUserId = new ObjectId().toString()

        return filterRoutines(fakeUserId, "recent")
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("User not found!")
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    after(() => data.disconnect())
})