import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout } from "../../data"
import getUserWorkouts from "./getUserWorkouts"
import { errors } from "com"

chai.use(chaiAsPromised)

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get User Workouts", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({})
        ])
    })

    //--- HAPPY PATH ---
    it("succeeds on getting User Workouts", () => {
        debugger
        return bcrypt.hash("123123", 10)
            .then(hashedPassword => {
                return User.insertMany([
                    {
                        name: "Manu",
                        lastName: "Barzi",
                        email: "ma@nu.com",
                        alias: "manu",
                        password: hashedPassword,
                        role: "regular",
                        level: "beginner",
                        interests: [],
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        name: "Frank",
                        lastName: "Pereira",
                        email: "fran@kie.com",
                        alias: "frankie",
                        password: hashedPassword,
                        role: "regular",
                        level: "intermediate",
                        interests: [],
                        createdAt: new Date(),
                        modifiedAt: null
                    }
                ])
            })
            .then(([_user, _user2]) => {
                const user = { id: _user._id.toString() }
                const user2 = { id: _user2._id.toString() }

                /*return Workout.insertMany([
                    {
                        author: user.id,
                        name: "bench press",
                        muscleGroup: "chest",
                        feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg",
                        description: "workout 1",
                        difficulty: "easy",
                        type: "strength",
                        status: "accepted"
                    },
                    {
                        author: user2.id,
                        name: "bulgarian squat",
                        muscleGroup: "buttocks",
                        feedImage: "https://www.tonal.com/wp-content/uploads/2024/01/Bulgarian-Split-Squat-Hero.jpg",
                        description: "workout 2",
                        difficulty: "easy",
                        type: "strength",
                        status: "accepted"
                    }
                ])*/
                return Promise.all([
                    Workout.create({
                        author: user.id,
                        name: "bench press",
                        muscleGroup: "chest",
                        feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg",
                        description: "workout 1",
                        difficulty: "easy",
                        type: "strength",
                        status: "accepted"
                    }),
                    Workout.create({
                        author: user2.id,
                        name: "bulgarian squat",
                        muscleGroup: "buttocks",
                        feedImage: "https://www.tonal.com/wp-content/uploads/2024/01/Bulgarian-Split-Squat-Hero.jpg",
                        description: "workout 2",
                        difficulty: "easy",
                        type: "strength",
                        status: "accepted"
                    })
                ])
                    .then(() => getUserWorkouts(user.id, user.id))
                    .then(returnedWorkouts => {
                        expect(returnedWorkouts).to.be.instanceOf(Array)
                        expect(returnedWorkouts).to.have.lengthOf(1)
                        expect(returnedWorkouts[0].author.id).to.equal(user.id)
                    })
            })
    })

    //--- NOTFOUND USER ERROR PATH ---
    it("fails on existingUser", () => {
        return expect(
            getUserWorkouts(new ObjectId().toString(), new ObjectId().toString())
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