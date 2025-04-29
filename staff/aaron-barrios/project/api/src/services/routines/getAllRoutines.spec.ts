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

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({}),
            Routine.deleteMany({})
        ])
    })


    //--- HAPPY PATH ---
    it("succeeds on getting All Routines", async () => {
        const hashedPassword = await bcrypt.hash("123123", 10)

        const [_user, _user2] = await User.insertMany([
            { name: "Manu", lastName: "Barzi", email: "ma@nu.com", alias: "manu", password: hashedPassword, role: "regular", level: "beginner", interests: [], createdAt: new Date(), modifiedAt: null },
            { name: "Frank", lastName: "Pereira", email: "fran@kie.com", alias: "frankie", password: hashedPassword, role: "regular", level: "intermediate", interests: [], createdAt: new Date(), modifiedAt: null }
        ])

        const user = { id: _user._id.toString() }
        const user2 = { id: _user2._id.toString() }

        const [_workout, _workout2] = await Workout.insertMany([
            { author: user.id, name: "bench press", muscleGroup: "chest", feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg", description: "workout 1", difficulty: "easy", type: "strength", status: "accepted" },
            { author: user2.id, name: "bulgarian squat", muscleGroup: "buttocks", feedImage: "https://www.tonal.com/wp-content/uploads/2024/01/Bulgarian-Split-Squat-Hero.jpg", description: "workout 2", difficulty: "easy", type: "strength", status: "accepted" }
        ])

        const workout = { id: _workout._id.toString() }
        const workout2 = { id: _workout2._id.toString() }

        await Routine.insertMany([
            {
                author: user.id,
                name: "bench press",
                muscleGroup: "chest",
                feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg",
                description: "workout 1",
                difficulty: "easy",
                duration: 45,
                status: "accepted",
                workouts: [
                    {
                        workout: workout.id,
                        sets: 3,
                        reps: 10,
                        weight: 50,
                        order: 1,
                        restTime: 3
                    },
                    {
                        workout: workout2.id,
                        sets: 3,
                        reps: 8,
                        weight: 60,
                        order: 2,
                        restTime: 1
                    }
                ]
            },
            {
                author: user2.id,
                name: "bulgarian squat",
                muscleGroup: "buttocks",
                feedImage: "https://www.tonal.com/wp-content/uploads/2024/01/Bulgarian-Split-Squat-Hero.jpg",
                description: "workout 2",
                difficulty: "easy",
                duration: 30,
                status: "accepted",
                workouts: [
                    {
                        workout: workout2.id,
                        sets: 3,
                        reps: 8,
                        weight: 60,
                        order: 2,
                        restTime: 1
                    }]
            }
        ])

        const returnedRoutines = await getAllRoutines(user.id)

        expect(returnedRoutines.routines).to.be.instanceOf(Array)
        expect(returnedRoutines.routines).to.have.lengthOf(2)
        // expect(returnedRoutines.routines[0].author.id).to.equal(user2.id)
        expect(returnedRoutines.routines[0].workouts).to.have.lengthOf(2)

    })

    //--- NOTFOUND USER ERROR PATH ---
    it("fails on existingUser", () => {
        return expect(
            getAllRoutines(new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "User not found!")
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