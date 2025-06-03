import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Routine, Workout } from "../../data"
import getModeratorRoutines from "./getModeratorRoutines"
import { errors } from "com"

chai.use(chaiAsPromised)

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get Moderator Routines", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    //--- HAPPY PATH ---
    it("succeeds on getting Moderator Routines", () => {
        let userId: string

        return bcrypt.hash("123123", 10)
            .then(hashedPassword => {
                return User.create({
                    name: "Moderator",
                    lastName: "Admin",
                    email: "mod@admin.com",
                    alias: "mod",
                    password: hashedPassword,
                    role: "mod",
                    level: "advanced",
                    interests: [],
                    createdAt: new Date(),
                    modifiedAt: null
                })
            })
            .then(user => {
                userId = user._id.toString()

                return Workout.create({
                    author: userId,
                    name: "test workout",
                    muscleGroup: "chest",
                    feedImage: "https://images.ctfassets.net/test.jpg",
                    type: "strength",
                    difficulty: "easy",
                    description: "test workout desc",
                    executionImages: ["img1", "img2"],
                    likes: [],
                    saves: [],
                    status: "accepted",
                    createdAt: new Date(),
                    modifiedAt: new Date()
                })
            })
            .then(workout => {
                return Routine.create({
                    author: workout.author,
                    name: "test routine",
                    muscleGroup: "chest",
                    feedImage: "https://images.ctfassets.net/routine.jpg",
                    difficulty: "easy",
                    description: "routine desc",
                    duration: 45,
                    status: "pending", // 👈 solo las pending deben salir
                    createdAt: new Date(),
                    workouts: [
                        {
                            workout: workout._id,
                            sets: 3,
                            reps: 10,
                            weight: 50,
                            order: 1,
                            restTime: 2
                        }
                    ]
                })
            })
            .then(() => getModeratorRoutines(userId))
            .then(({ routines }) => {
                expect(routines).to.be.an("array")
                expect(routines).to.have.lengthOf(1)

                const routine = routines[0]
                expect(routine.name).to.equal("test routine")
                expect(routine.status).to.equal("pending")
                expect(routine.workouts).to.have.lengthOf(1)
                expect(routine.workouts[0].workout.name).to.equal("test workout")
            })
    })

    //--- NOT FOUND USER PATH ---
    it("fails on non-existing user", () => {
        return expect(
            getModeratorRoutines(new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    after(() => data.disconnect())
})