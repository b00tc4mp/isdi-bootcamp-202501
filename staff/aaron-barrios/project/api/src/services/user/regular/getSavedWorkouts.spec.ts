import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout } from "../../../data"
import getSavedWorkouts from "./getSavedWorkouts"
import { errors } from "com"

chai.use(chaiAsPromised)

const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get SavedWorkouts", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({})
        ])
    })

    // --- HAPPY PATH ---
    it("succeeds on retrieving user's saved workouts", () => {
        return bcrypt.hash("mamama", 10)
            .then(hashedPassword => {
                return User.insertMany([
                    { alias: "User", email: "user@test.com", password: hashedPassword, createdAt: new Date() },
                    { alias: "User2", email: "user2@test.com", password: hashedPassword, createdAt: new Date() }
                ])
            })
            .then(([_user, _user2]) => {
                const user = { id: _user._id.toString() }
                const user2 = { id: _user2._id.toString() }

                return Workout.insertMany([
                    {
                        author: user2.id,
                        name: "Deadlift",
                        muscleGroup: "back",
                        feedImage: "https://www.thebxngclub.com/wp-content/uploads/2023/05/3Y3A1828-960x640.jpg",
                        description: "deadlift desc",
                        status: "accepted",
                        saves: [user.id]
                    },
                    {
                        author: user.id,
                        name: "Plank",
                        muscleGroup: "biceps",
                        feedImage: "https://www.thebxngclub.com/wp-content/uploads/2023/05/3Y3A1828-960x640.jpg",
                        description: "plank desc",
                        status: "accepted"
                    }
                ])
                    .then(() => getSavedWorkouts(user.id))
                    .then(saved => {
                        expect(saved).to.be.an("array")
                        expect(saved).to.have.lengthOf(1)
                        expect(saved[0].name).to.equal("Deadlift")
                        expect(saved[0].savedByMe).to.be.true
                    })
            })
    })

    //--- NOTFOUND USER ERROR PATH ---
    it("fails on existingUser", () => {
        return expect(
            getSavedWorkouts(new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    after(() => data.disconnect())
})