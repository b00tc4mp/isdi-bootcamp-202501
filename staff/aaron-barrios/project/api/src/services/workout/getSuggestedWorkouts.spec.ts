import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout } from "../../data"
import getSuggestedWorkouts from "./getSuggestedWorkouts"
import { errors } from "com"

chai.use(chaiAsPromised)

const { ObjectId } = Types
const { NotFoundError } = errors

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get Suggested Workouts", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    // --- HAPPY PATH ---
    it("returns workouts matching user interests", () => {
        let userId: string

        return bcrypt.hash("123123", 10)
            .then(hash => User.create({
                name: "Test", lastName: "User", alias: "tester", email: "test@test.com",
                password: hash, role: "regular", level: "beginner",
                interests: ["cardio"], createdAt: new Date()
            }))
            .then(user => {
                userId = user._id.toString()

                return Workout.insertMany([
                    {
                        name: "Jump Rope",
                        muscleGroup: "legs",
                        feedImage: "imaaaaaaaaaaaaaaaaaaaaaaaaaaage",
                        type: "cardio",
                        difficulty: "easy",
                        description: "jumping workout",
                        status: "accepted",
                        author: userId,
                        createdAt: new Date()
                    },
                    {
                        name: "Deadlift",
                        muscleGroup: "back",
                        feedImage: "imaaaaaaaaaaaaaaaaaaaaaaaaaaage",
                        type: "strength",
                        difficulty: "hard",
                        description: "lifting",
                        status: "accepted",
                        author: userId,
                        createdAt: new Date()
                    }
                ])
            })
            .then(() => getSuggestedWorkouts(userId))
            .then(results => {
                expect(results).to.have.lengthOf(1)
                expect(results[0].name).to.equal("Jump Rope")
            })
    })

    // --- FALLBACK: user with no interests ---
    it("returns top popular workouts when no interests", () => {
        let userId: string

        return bcrypt.hash("123123", 10)
            .then(hash => User.create({
                name: "NoInterest", lastName: "User", alias: "empty", email: "no@int.com",
                password: hash, role: "regular", level: "beginner",
                interests: [], createdAt: new Date()
            }))
            .then(user => {
                userId = user._id.toString()

                return Workout.insertMany([
                    {
                        name: "Plank",
                        muscleGroup: "chest",
                        feedImage: "imaaaaaaaaaaaaaaaaaaaaaaaaaaage",
                        type: "strength",
                        description: "core holding",
                        status: "accepted",
                        author: userId,
                        likes: [userId, new ObjectId(), new ObjectId()],
                        createdAt: new Date()
                    },
                    {
                        name: "Burpees",
                        muscleGroup: "legs",
                        feedImage: "imaaaaaaaaaaaaaaaaaaaaaaaaaaage",
                        type: "cardio",
                        description: "killer",
                        status: "accepted",
                        author: userId,
                        likes: [userId],
                        createdAt: new Date()
                    }
                ])
            })
            .then(() => getSuggestedWorkouts(userId))
            .then(results => {
                expect(results).to.have.lengthOf(2)
                expect(results[0].name).to.equal("Plank")
            })
    })

    // --- NOT FOUND USER ERROR PATH ---
    it("throws NotFoundError on non-existing user", () => {
        return expect(
            getSuggestedWorkouts(new ObjectId().toString()))
            .to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    after(() => data.disconnect())
})