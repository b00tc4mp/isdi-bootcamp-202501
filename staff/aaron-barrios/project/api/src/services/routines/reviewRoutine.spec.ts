import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data } from "../../data"
import { User, Routine } from "../../data"
import reviewRoutine from "./reviewRoutine"
import { errors } from "com"

const { ObjectId } = Types
const { NotFoundError, AuthorizationError, ValidationError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("review Routine", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Routine.deleteMany({})
    ]))

    // --- HAPPY PATH: ACCEPTED ---
    it("succeeds on accepting a routine", () => {
        let userId: string
        let routineId: string

        return bcrypt.hash("123456", 10)
            .then(hashedPassword =>
                User.create({
                    name: "Mod",
                    lastName: "User",
                    email: "mod@example.com",
                    alias: "mod",
                    password: hashedPassword,
                    level: "advanced",
                    role: "mod"
                })
            )
            .then(user => {
                userId = user.id
                return Routine.create({
                    author: userId,
                    name: "Test Workout",
                    muscleGroup: "chest",
                    feedImage: "https://media.theeverygirl.com/wp-content/uploads/2020/07/little-things-you-can-do-for-a-better-workout-the-everygirl-1.jpg",
                    description: "Chest workout",
                    duration: 45,
                    status: "pending"
                })
            })
            .then(routine => {
                routineId = routine.id
                return reviewRoutine(userId, routineId, "accepted")
            })
            .then(() => Routine.findById(routineId).lean())
            .then(routine => {
                expect(routine?.status).to.equal("accepted")
            })
    })

    // --- HAPPY PATH: DECLINED ---
    it("succeeds on declining a routine", () => {
        let userId: string
        let routineId: string

        return bcrypt.hash("123456", 10)
            .then(hashedPassword =>
                User.create({
                    name: "Mod",
                    lastName: "User",
                    email: "mod2@example.com",
                    alias: "mod2",
                    password: hashedPassword,
                    level: "advanced",
                    role: "mod"
                })
            )
            .then(user => {
                userId = user.id
                return Routine.create({
                    author: userId,
                    name: "Decline routine",
                    muscleGroup: "back",
                    feedImage: "https://media.theeverygirl.com/wp-content/uploads/2020/07/little-things-you-can-do-for-a-better-routine-the-everygirl-1.jpg",
                    description: "Back routine",
                    duration: 30,
                    status: "pending"
                })
            })
            .then(routine => {
                routineId = routine.id
                return reviewRoutine(userId, routineId, "declined")
            })
            .then(() => Routine.findById(routineId).lean())
            .then(routine => {
                expect(routine).to.be.null
            })
    })

    // --- NOT FOUND USER PATH ---
    it("fails on non-existent user", () => {
        return expect(
            reviewRoutine(new ObjectId().toString(), new ObjectId().toString(), "accepted")
        ).to.be.rejectedWith(NotFoundError, "User not found!")
    })

    // --- NOT MODERATOR USER PATH ---
    it("fails on non-mod user", () => {
        return bcrypt.hash("123456", 10)
            .then(hashedPassword =>
                User.create({
                    name: "Regular",
                    lastName: "User",
                    email: "user@example.com",
                    alias: "regular",
                    password: hashedPassword,
                    level: "beginner",
                    role: "regular"
                })
            )
            .then(user =>
                Routine.create({
                    author: user.id,
                    name: "Unauthorized",
                    muscleGroup: "legs",
                    feedImage: "https://media.theeverygirl.com/wp-content/uploads/2020/07/little-things-you-can-do-for-a-better-routine-the-everygirl-1.jpg",
                    description: "Legs routine",
                    duration: 25,
                    status: "pending"
                })
                    .then(routine => reviewRoutine(user.id, routine.id, "accepted"))
            )
            .catch(error => {
                expect(error).to.be.instanceOf(AuthorizationError)
            })
    })

    // --- INVALID STATUS PATH ---
    it("fails on invalid status", () => {
        let catchedError: Error

        return bcrypt.hash("123456", 10)
            .then(hashedPassword =>
                User.create({
                    name: "Mod",
                    lastName: "User",
                    email: "mod3@example.com",
                    alias: "mod3",
                    password: hashedPassword,
                    level: "advanced",
                    role: "mod"
                })
            )
            .then(user =>
                Routine.create({
                    author: user.id,
                    name: "Invalid Status",
                    muscleGroup: "biceps",
                    feedImage: "https://media.theeverygirl.com/wp-content/uploads/2020/07/little-things-you-can-do-for-a-better-routine-the-everygirl-1.jpg",
                    description: "Biceps routine",
                    duration: 50,
                    status: "pending"
                })
                    .then(routine => reviewRoutine(user.id, routine.id, "other" as any))
                    .catch(error => catchedError = error)
                    .finally(() => {
                        expect(catchedError).to.be.instanceOf(ValidationError)
                        expect(catchedError.message).to.equal("Invalid status")
                    })
            )
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Routine.deleteMany({})
    ]))

    after(() => data.disconnect())
})