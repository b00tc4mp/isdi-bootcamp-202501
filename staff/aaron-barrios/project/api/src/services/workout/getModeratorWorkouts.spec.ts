import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout } from "../../data"
import getModeratorWorkouts from "./getModeratorWorkouts"
import { errors } from "com"

chai.use(chaiAsPromised)

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get Moderator Workouts", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({})
        ])
    })


    //--- HAPPY PATH ---
    it("succeeds on getting All Workouts", async () => {
        const hashedPassword = await bcrypt.hash("123123", 10)

        const [_user, _user2] = await User.insertMany([
            { name: "Manu", lastName: "Barzi", email: "ma@nu.com", alias: "manu", password: hashedPassword, role: "mod", level: "beginner", interests: [], createdAt: new Date(), modifiedAt: null },
            { name: "Frank", lastName: "Pereira", email: "fran@kie.com", alias: "frankie", password: hashedPassword, role: "mod", level: "intermediate", interests: [], createdAt: new Date(), modifiedAt: null }
        ])

        const user = { id: _user._id.toString() }
        const user2 = { id: _user2._id.toString() }

        await Workout.insertMany([
            { author: user.id, name: "bench press", muscleGroup: "chest", feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg", description: "workout 1", difficulty: "easy", type: "strength", status: "pending" },
            { author: user2.id, name: "bulgarian squat", muscleGroup: "buttocks", feedImage: "https://www.tonal.com/wp-content/uploads/2024/01/Bulgarian-Split-Squat-Hero.jpg", description: "workout 2", difficulty: "easy", type: "strength", status: "accepted" }
        ])

        const returnedWorkouts = await getModeratorWorkouts(user.id)

        expect(returnedWorkouts.workouts).to.be.instanceOf(Array)
        expect(returnedWorkouts.workouts).to.have.lengthOf(1)
        expect(returnedWorkouts.workouts[0].author.id).to.equal(user.id)

    })

    //--- NOTFOUND USER ERROR PATH ---
    it("fails on existingUser", () => {
        return expect(
            getModeratorWorkouts(new ObjectId().toString())
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