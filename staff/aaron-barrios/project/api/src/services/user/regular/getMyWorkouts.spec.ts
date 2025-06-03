import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout } from "../../../data"
import getMyWorkouts from "./getMyWorkouts"
import { errors } from "com"

chai.use(chaiAsPromised)

const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get My Workouts", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({})
        ])
    })

    // --- HAPPY PATH ---
    it("succeeds on retrieving user's own workouts", () => {
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
                        feedImage: "https://res.cloudinary.com/hydrow/image/upload/f_auto/w_3840/q_100/v1725901168/Blog/can-you-do-a-full-body-workout-every-day.jpg",
                        description: "Push up desc",
                        status: "pending"
                    },
                    {
                        author: user.id,
                        name: "Squat",
                        muscleGroup: "legs",
                        feedImage: "https://res.cloudinary.com/hydrow/image/upload/f_auto/w_3840/q_100/v1725901168/Blog/can-you-do-a-full-body-workout-every-day.jpg",
                        description: "Squat desc",
                        status: "accepted"
                    }
                ])
                    .then(() => getMyWorkouts(user.id))
                    .then(myWorkouts => {
                        expect(myWorkouts).to.be.an("array")
                        expect(myWorkouts).to.have.lengthOf(2)
                        expect(myWorkouts.every(w => w.author.id === user.id)).to.be.true
                    })
            })
    })

    //--- NOTFOUND USER ERROR PATH ---
    it("fails on non-existing user", () => {
        return expect(
            getMyWorkouts(new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    after(() => data.disconnect())
})