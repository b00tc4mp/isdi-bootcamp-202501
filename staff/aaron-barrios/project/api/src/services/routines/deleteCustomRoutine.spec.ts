import "dotenv/config"
import { expect } from "chai"
import { errors } from "com"
import { Types } from "mongoose"
import bcrypt from "bcryptjs"

import { data, User, CustomRoutine } from "../../data"
import deleteCustomRoutine from "./deleteCustomRoutine"

const { NotFoundError, OwnershipError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("delete Custom Routine", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))

    // --- HAPPY PATH ---
    it("succeeds on delete Custom Routine", () => {
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
            .then(([manu, frankie]) => {
                return CustomRoutine.insertMany([
                    {
                        userId: manu._id,
                        originalRoutineId: new ObjectId(),
                        name: "Chest Builder",
                        muscleGroup: "chest",
                        feedImage: "https://cdn.example.com/images/chest1234567890.jpg",
                        duration: 45,
                        description: "Custom chest routine",
                        workouts: [],
                        createdAt: new Date(),
                        modifiedAt: null
                    },
                    {
                        userId: frankie._id,
                        originalRoutineId: new ObjectId(),
                        name: "Butt Master",
                        muscleGroup: "buttocks",
                        feedImage: "https://cdn.example.com/images/glutes1234567890.jpg",
                        duration: 50,
                        description: "Custom glute routine",
                        workouts: [],
                        createdAt: new Date(),
                        modifiedAt: null
                    }
                ])
                    .then(([routine1]) => deleteCustomRoutine(manu.id, routine1.id)
                        .then(() => CustomRoutine.findById(routine1.id))
                        .then(routineExists => {
                            expect(routineExists).to.be.null
                            return CustomRoutine.find()
                        })
                        .then(routines => {
                            expect(routines).to.have.lengthOf(1)
                        })
                    )
            })
    })

    // --- USER NOT FOUND ---
    it("fails when user does not exist", () => {
        let catchedError: Error

        return deleteCustomRoutine(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal("User not found!")
            })
    })

    // --- ROUTINE NOT OWNED ERROR PATH ---
    it("fails when user is not the owner", () => {
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
            .then(([manu, frankie]) => {
                return CustomRoutine.create({
                    userId: frankie._id,
                    originalRoutineId: new ObjectId(),
                    name: "Stolen Routine",
                    muscleGroup: "legs",
                    feedImage: "https://cdn.example.com/images/legs9876543210.jpg",
                    duration: 40,
                    description: "Unauthorized attempt",
                    workouts: [],
                    createdAt: new Date(),
                    modifiedAt: null
                })
                    .then(routine => {
                        let catchedError: Error

                        return deleteCustomRoutine(manu.id, routine.id)
                            .catch(error => catchedError = error)
                            .finally(() => {
                                expect(catchedError).to.be.instanceOf(OwnershipError)
                                expect(catchedError.message).to.equal("User is not author of routine")
                            })
                    })
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))

    after(() => data.disconnect())
})