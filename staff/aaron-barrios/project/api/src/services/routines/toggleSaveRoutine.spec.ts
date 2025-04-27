import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Routine } from "../../data"
import toggleSaveRoutine from "./toggleSaveRoutine"
import { errors } from "com"

const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("toggle Save Routine", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Routine.deleteMany({})
        ])
    })

    //--- HAPPY PATH ---
    it("succeeds on toggle Save Routine", () => {
        let userId: string
        let routineId: string

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

                return Routine.create({
                    author: userId,
                    name: "Deadlift",
                    muscleGroup: "back",
                    feedImage: "https://example.com/deadlift.jpg",
                    description: "For lower back and legs",
                    difficulty: "hard",
                    duration: 30,
                    status: "accepted",
                    saves: []
                })
            })
            .then(routine => {
                routineId = routine.id
                return toggleSaveRoutine(userId, routineId)
            })
            .then(() => Routine.findById(routineId).lean())
            .then(routine => {
                expect(routine?.saves).to.include.deep.members([new ObjectId(userId)])
                return toggleSaveRoutine(userId, routineId)
            })
            .then(() => Routine.findById(routineId).lean())
            .then(routine => {
                expect(routine?.saves).to.not.include.deep.members([new ObjectId(userId)])
            })
    })

    //--- NOTFOUND ERROR PATH ---
    it("fails with NotFoundError user or routine ", () => {
        return expect(
            toggleSaveRoutine(new ObjectId().toString(), new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    afterEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Routine.deleteMany({})
        ])
    })

    after(() => data.disconnect())
})