import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout, Routine } from "../../data"
import getAllRoutines from "./getAllRoutines"
import { errors } from "com"

chai.use(chaiAsPromised)

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get All Routines", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    // --- HAPPY PATH ---
    it("succeeds on getting All Routines", () => {
        let userId: string, user2Id: string, workoutId: string, workout2Id: string

        return bcrypt.hash("123123", 10)
            .then(hashedPassword => User.insertMany([
                { name: "Manu", lastName: "Barzi", email: "ma@nu.com", alias: "manu", password: hashedPassword, role: "regular", level: "beginner", interests: [], createdAt: new Date(), modifiedAt: null },
                { name: "Frank", lastName: "Pereira", email: "fran@kie.com", alias: "frankie", password: hashedPassword, role: "regular", level: "intermediate", interests: [], createdAt: new Date(), modifiedAt: null }
            ]))
            .then(([user, user2]) => {
                userId = user._id.toString()
                user2Id = user2._id.toString()

                return Workout.insertMany([
                    { author: userId, name: "bench press", muscleGroup: "chest", feedImage: "https://images.ctfassets.net/bench.jpg", description: "workout 1", difficulty: "easy", type: "strength", status: "accepted" },
                    { author: user2Id, name: "bulgarian squat", muscleGroup: "buttocks", feedImage: "https://images.ctfassets.net/squat.jpg", description: "workout 2", difficulty: "easy", type: "strength", status: "accepted" }
                ])
            })
            .then(([workout, workout2]) => {
                workoutId = workout._id.toString()
                workout2Id = workout2._id.toString()

                return Routine.insertMany([
                    {
                        author: userId,
                        name: "bench press",
                        muscleGroup: "chest",
                        feedImage: "https://images.ctfasseeeeeeeets.net/bench.jpg",
                        description: "routine desc",
                        difficulty: "easy",
                        duration: 45,
                        status: "accepted",
                        workouts: [
                            { workout: workoutId, sets: 3, reps: 10, weight: 50, order: 1, restTime: 3 },
                            { workout: workout2Id, sets: 3, reps: 8, weight: 60, order: 2, restTime: 1 }
                        ]
                    },
                    {
                        author: user2Id,
                        name: "bulgarian squat",
                        muscleGroup: "buttocks",
                        feedImage: "https://images.ctfassets.net/squat.jpg",
                        description: "routine desc",
                        difficulty: "easy",
                        duration: 30,
                        status: "accepted",
                        workouts: [
                            { workout: workout2Id, sets: 3, reps: 8, weight: 60, order: 1, restTime: 1 }
                        ]
                    }
                ])
            })
            .then(() => getAllRoutines(userId))
            .then(({ routines }) => {
                expect(routines).to.be.an("array")
                expect(routines).to.have.lengthOf(2)
                expect(routines[0].workouts).to.have.length.above(0)
            })
    })


    // --- NOT FOUND USER ERROR PATH ---
    it("fails on non-existing user", () => {
        return expect(getAllRoutines(new ObjectId().toString())).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    after(() => data.disconnect())
})