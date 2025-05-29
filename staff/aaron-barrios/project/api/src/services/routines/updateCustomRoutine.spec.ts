import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User, Workout, CustomRoutine } from "../../data"
import updateCustomRoutine from "./updateCustomRoutine"
import { errors } from "com"
import { CustomRoutineType } from "com/types"

chai.use(chaiAsPromised)

const { NotFoundError, OwnershipError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("update CustomRoutine", () => {
    let userId: string
    let routineId: string
    let workoutId: string

    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({}),
            CustomRoutine.deleteMany({})
        ])
    })

    // --- HAPPY PATH ---
    it("succeeds updating a custom routine's workouts", () => {
        return bcrypt.hash("123123", 10)
            .then(hashedPassword => {
                return User.create({
                    name: "User",
                    lastName: "Test",
                    email: "user@test.com",
                    alias: "usertest",
                    password: hashedPassword,
                    role: "regular",
                    level: "beginner",
                    interests: [],
                    createdAt: new Date(),
                    modifiedAt: null
                })
            })
            .then(user => {
                userId = user._id.toString()
                return Workout.create({
                    author: user._id,
                    name: "test workout",
                    muscleGroup: "chest",
                    feedImage: "https://images.ctfasseeeeeeeeeeets.net/test.jpg",
                    type: "strength",
                    difficulty: "easy",
                    description: "descr",
                    executionImages: ["img1", "img2"],
                    likes: [],
                    saves: [],
                    status: "accepted",
                    createdAt: new Date()
                })
            })
            .then(workout => {
                workoutId = workout._id.toString()
                return CustomRoutine.create({
                    userId: new ObjectId(userId),
                    originalRoutineId: new ObjectId(),
                    name: "My Custom Routine",
                    muscleGroup: "chest",
                    feedImage: "https://images.ctfasseeeeeeeeeets.net/test-routine.jpg",
                    description: "descr",
                    duration: 30,
                    createdAt: new Date(),
                    workouts: [
                        {
                            workoutId: workout._id,
                            sets: 3,
                            reps: 10,
                            weight: 50,
                            restTime: 60,
                            order: 1,
                            time: 90
                        }
                    ]
                })
            })
            .then(routine => {
                routineId = routine._id.toString()

                const updates: Partial<CustomRoutineType> = {
                    workouts: [
                        {
                            workoutId,
                            sets: 4,
                            reps: 12,
                            weight: 60,
                            restTime: 70,
                            order: 1,
                            time: 100,
                            workout: undefined as any
                        }
                    ]
                }

                return updateCustomRoutine(userId, routineId, updates)
            })
            .then(() => CustomRoutine.findById(routineId))
            .then(routine => {
                expect(routine!.workouts[0].sets).to.equal(4)
                expect(routine!.workouts[0].reps).to.equal(12)
                expect(routine!.workouts[0].weight).to.equal(60)
            })
    })

    // --- NOT FOUND USER PATH ---
    it("fails when the user does not exist", () => {
        let catchedError: Error

        return updateCustomRoutine(new ObjectId().toString(), routineId, { workouts: [] })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal("User not found!")
            })

    })

    // --- NOT FOUND ROUTINE PATH ---
    it("fails when the routine does not exist", () => {
        let catchedError: Error
        let userId: string

        return bcrypt.hash("123123", 10)
            .then(hashedPassword => User.create({
                name: "User",
                lastName: "Test",
                email: "user@test.com",
                alias: "usertest",
                password: hashedPassword,
                role: "regular",
                level: "beginner",
                interests: [],
                createdAt: new Date(),
                modifiedAt: null
            }))
            .then(user => {
                userId = user._id.toString()
                return updateCustomRoutine(userId, new ObjectId().toString(), { workouts: [] })
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal("Routine not found!")
            })
    })


    // --- NOT OWNER USER PATH ---
    it("fails when the user is not the owner", () => {
        let catchedError: Error
        let ownerId: string, attackerId: string, routineId: string

        return bcrypt.hash("123123", 10)
            .then(password => Promise.all([
                User.create({ alias: "owner", email: "owner@test.com", password, role: "regular" }),
                User.create({ alias: "attacker", email: "attacker@test.com", password, role: "regular" })
            ]))
            .then(([owner, attacker]) => {
                ownerId = owner._id.toString()
                attackerId = attacker._id.toString()

                return CustomRoutine.create({
                    userId: ownerId,
                    originalRoutineId: new ObjectId(),
                    name: "Routine",
                    muscleGroup: "chest",
                    feedImage: "https://imageeeeeeeeeeeeeeeeee.jpg",
                    description: "descr",
                    duration: 30,
                    createdAt: new Date(),
                    workouts: []
                })
            })
            .then(routine => {
                routineId = routine._id.toString()
                return updateCustomRoutine(attackerId, routineId, { workouts: [] })
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(OwnershipError)
                expect(catchedError.message).to.equal("You are not the owner of this routine!")
            })
    })


    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        CustomRoutine.deleteMany({})
    ]))

    after(() => data.disconnect())
})