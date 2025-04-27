import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout, Routine } from "../../data"
import getUserRoutines from "./getUserRoutines"
import { errors } from "com"

chai.use(chaiAsPromised)

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get User Routines", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({}),
            Routine.deleteMany({})
        ])
    })

    // --- HAPPY PATH ---
    it("succeeds on getting routines of a target user", () => {
        let user: { id: string }
        let targetUser: { id: string }
        let workout: { id: string }
        let workout2: { id: string }

        return bcrypt.hash("123123", 10)
            .then(hashedPassword => {
                return User.insertMany([
                    { name: "Manu", lastName: "Barzi", email: "manu@example.com", alias: "manu", password: hashedPassword, role: "regular", level: "beginner", interests: [], createdAt: new Date(), modifiedAt: null },
                    { name: "Frank", lastName: "Pereira", email: "frankie@example.com", alias: "frankie", password: hashedPassword, role: "regular", level: "intermediate", interests: [], createdAt: new Date(), modifiedAt: null }
                ])
            })
            .then(([createdUser, createdTargetUser]) => {
                user = { id: createdUser._id.toString() }
                targetUser = { id: createdTargetUser._id.toString() }

                return Workout.insertMany([
                    { author: targetUser.id, name: "Deadlift", muscleGroup: "back", feedImage: "https://iiiiiiiiiiiiiiiiiiiimage.url/deadlift.jpg", description: "Heavy back exercise", difficulty: "hard", type: "strength", status: "accepted" },
                    { author: targetUser.id, name: "Overhead Press", muscleGroup: "shoulders", feedImage: "https://iiiiiiiiiiiiiiiiiiiimage.url/press.jpg", description: "Shoulder strength", difficulty: "medium", type: "strength", status: "accepted" }
                ])
            })
            .then(([createdWorkout, createdWorkout2]) => {
                workout = { id: createdWorkout._id.toString() }
                workout2 = { id: createdWorkout2._id.toString() }

                return Routine.insertMany([
                    {
                        author: targetUser.id,
                        name: "Back and Shoulders Strength",
                        muscleGroup: "back",
                        feedImage: "https://riiiiiiiiiiiiiiiiiiioutine.image/back-shoulders.jpg",
                        description: "Routine focused on back and shoulders",
                        difficulty: "hard",
                        duration: 60,
                        status: "accepted",
                        workouts: [
                            {
                                workout: workout.id,
                                sets: 4,
                                reps: 8,
                                weight: 100,
                                restTime: 120,
                                order: 1
                            },
                            {
                                workout: workout2.id,
                                sets: 3,
                                reps: 10,
                                weight: 60,
                                restTime: 90,
                                order: 2
                            }
                        ]
                    }
                ])
            })
            .then(() => getUserRoutines(user.id, targetUser.id))
            .then(returnedRoutines => {
                expect(returnedRoutines).to.be.instanceOf(Array)
                expect(returnedRoutines).to.have.lengthOf(1)
                expect(returnedRoutines[0].author.id).to.equal(targetUser.id)
                expect(returnedRoutines[0].workouts).to.have.lengthOf(2)
                expect(returnedRoutines[0].name).to.equal("Back and Shoulders Strength")
            })
    })

    // --- NOT FOUND USER PATH ---
    it("fails if current user does not exist", () => {
        const fakeUserId = new ObjectId().toString()
        const fakeTargetUserId = new ObjectId().toString()

        return expect(
            getUserRoutines(fakeUserId, fakeTargetUserId)
        ).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    // --- NOT FOUND TARGET USER PATH ---
    it("fails if target user does not exist", () => {
        let user: { id: string }

        return bcrypt.hash("123123", 10)
            .then(hashedPassword => {
                return User.create({
                    name: "Manu",
                    lastName: "Barzi",
                    email: "manu@example.com",
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
                user = { id: createdUser._id.toString() }

                return expect(
                    getUserRoutines(user.id, new ObjectId().toString())
                ).to.be.rejectedWith(NotFoundError, "Target user not found!")
            })
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