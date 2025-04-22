import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout } from "../../data"
import filterWorkouts from "./filterWorkouts"
import { errors } from "com"

const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("filter Workouts", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    // --- FILTERS BY POPULARITY ---
    it("succeeds on filtering workouts by POPULARITY", () => {
        let userId: string

        return bcrypt.hash("123456", 10)
            .then(hash =>
                User.create({
                    name: "Test",
                    lastName: "User",
                    email: "test@user.com",
                    alias: "testuser",
                    password: hash
                })
            )
            .then(user => {
                userId = user.id

                return Workout.insertMany([
                    {
                        author: userId,
                        name: "Workout A",
                        muscleGroup: "arms",
                        feedImage: "https://titanboxwear.com/wp-content/uploads/workout-ejercicios-sin-material-1.jpg",
                        description: "Desc A",
                        difficulty: "easy",
                        type: "strength",
                        status: "accepted",
                        likes: [userId, userId],
                        saves: [userId],
                        createdAt: new Date("2024-01-01")
                    },
                    {
                        author: userId,
                        name: "Workout B",
                        muscleGroup: "legs",
                        feedImage: "https://titanboxwear.com/wp-content/uploads/workout-ejercicios-sin-material-1.jpg",
                        description: "Desc B",
                        difficulty: "medium",
                        type: "strength",
                        status: "accepted",
                        likes: [],
                        saves: [],
                        createdAt: new Date("2024-02-01")
                    }
                ])
            })
            .then(() => filterWorkouts(userId, "popular"))
            .then((result) => {
                expect(result).to.be.an("array")
                expect(result.length).to.equal(2)
                expect(result[0].name).to.equal("Workout A") // => most Popular
            })
    })


    it("succeeds on filtering workouts by SAVES", () => {
        let userId: string

        return bcrypt.hash("123456", 10)
            .then(hash =>
                User.create({
                    name: "Test",
                    lastName: "User",
                    email: "test@user.com",
                    alias: "testuser",
                    password: hash
                })
            )
            .then(user => {
                userId = user.id

                return Workout.insertMany([
                    {
                        author: userId,
                        name: "Workout A",
                        muscleGroup: "arms",
                        feedImage: "https://titanboxwear.com/wp-content/uploads/workout-ejercicios-sin-material-1.jpg",
                        description: "Desc A",
                        difficulty: "easy",
                        type: "strength",
                        status: "accepted",
                        likes: [userId, userId],
                        saves: [userId],
                        createdAt: new Date("2024-01-01")
                    },
                    {
                        author: userId,
                        name: "Workout B",
                        muscleGroup: "legs",
                        feedImage: "https://titanboxwear.com/wp-content/uploads/workout-ejercicios-sin-material-1.jpg",
                        description: "Desc B",
                        difficulty: "medium",
                        type: "strength",
                        status: "accepted",
                        likes: [],
                        saves: [],
                        createdAt: new Date("2024-02-01")
                    }
                ])
            })
            .then(() => filterWorkouts(userId, "saved"))
            .then((result) => {
                expect(result).to.be.an("array")

                const saved = result.filter(workout => workout.savedByMe)
                expect(saved.length).to.equal(1)
                expect(saved[0].name).to.equal("Workout A")
            })
    })

    it("succeeds on filtering workouts by RECENT", () => {
        let userId: string

        return bcrypt.hash("123456", 10)
            .then(hash =>
                User.create({
                    name: "Test",
                    lastName: "User",
                    email: "test@user.com",
                    alias: "testuser",
                    password: hash
                })
            )
            .then(user => {
                userId = user.id

                return Workout.insertMany([
                    {
                        author: userId,
                        name: "Workout A",
                        muscleGroup: "arms",
                        feedImage: "https://titanboxwear.com/wp-content/uploads/workout-ejercicios-sin-material-1.jpg",
                        description: "Desc A",
                        difficulty: "easy",
                        type: "strength",
                        status: "accepted",
                        likes: [userId, userId],
                        saves: [userId],
                        createdAt: new Date("2024-01-01")
                    },
                    {
                        author: userId,
                        name: "Workout B",
                        muscleGroup: "legs",
                        feedImage: "https://titanboxwear.com/wp-content/uploads/workout-ejercicios-sin-material-1.jpg",
                        description: "Desc B",
                        difficulty: "medium",
                        type: "strength",
                        status: "accepted",
                        likes: [],
                        saves: [],
                        createdAt: new Date("2024-02-01")
                    }
                ])
            })
            .then(() => filterWorkouts(userId, "recent"))
            .then((result) => {
                expect(result).to.be.an("array")
                expect(result.length).to.equal(2)
                expect(result[0].name).to.equal("Workout B") // => most RECENT
            })
    })

    // --- USER NOT FOUND ---
    it("fails if user does not exist", () => {
        const fakeUserId = new ObjectId().toString()

        return filterWorkouts(fakeUserId, "recent")
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("User not found!")
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    after(() => data.disconnect())
})