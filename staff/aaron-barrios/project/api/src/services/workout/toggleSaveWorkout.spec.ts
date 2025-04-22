import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout } from "../../data"
import toggleSaveWorkout from "./toggleSaveWorkout"
import { errors } from "com"

const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("toggle Save Workout", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({})
        ])
    })

    //--- HAPPY PATH ---
    it("succeeds on toggle Save workout", () => {
        let userId: string
        let workoutId: string

        return bcrypt.hash("123456", 10)
            .then(hashedPassword =>
                User.create({
                    name: "Saver",
                    lastName: "McSave",
                    email: "save@me.com",
                    alias: "saveit",
                    password: hashedPassword,
                    level: "beginner"
                })
            )
            .then(user => {
                userId = user.id

                return Workout.create({
                    author: userId,
                    name: "Deadlift",
                    muscleGroup: "back",
                    feedImage: "https://example.com/deadlift.jpg",
                    description: "For lower back and legs",
                    difficulty: "hard",
                    type: "strength",
                    status: "accepted",
                    saves: []
                })
            })
            .then(workout => {
                workoutId = workout.id
                return toggleSaveWorkout(userId, workoutId)
            })
            .then(() => Workout.findById(workoutId).lean())
            .then(workout => {
                expect(workout?.saves).to.include.deep.members([new ObjectId(userId)])
                return toggleSaveWorkout(userId, workoutId)
            })
            .then(() => Workout.findById(workoutId).lean())
            .then(workout => {
                expect(workout?.saves).to.not.include.deep.members([new ObjectId(userId)])
            })
    })

    //--- NOTFOUND ERROR PATH ---
    it("fails with NotFoundError user or workout ", () => {
        return expect(
            toggleSaveWorkout(new ObjectId().toString(), new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({})
        ])
    })

    after(() => data.disconnect())
})