import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, Routine, User, Workout } from "../../data"
import editRoutine from "./editRoutine"
import { errors } from "com"

chai.use(chaiAsPromised)

const { NotFoundError, OwnershipError, StatusError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("edit Routine", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Routine.deleteMany({}),
        Workout.deleteMany({})
    ]))

    // --- HAPPY PATH ---
    it("succeeds on editing a pending Routine", () => {
        let manu: any
        let routine: any

        return bcrypt.hash("123123", 10)
            .then(hashedPassword => User.create({
                name: "Manu",
                lastName: "Barzi",
                email: "manu@test.com",
                alias: "manu",
                password: hashedPassword,
                role: "regular",
                level: "beginner",
                interests: [],
                createdAt: new Date(),
                modifiedAt: null
            }))
            .then(user => {
                manu = user
                return Routine.create({
                    author: manu._id,
                    name: "Old Routine",
                    muscleGroup: "chest",
                    feedImage: "https://fakeroutinesroutine.com/routine.jpg",
                    difficulty: "easy",
                    description: "Old description",
                    duration: 30,
                    status: "pending",
                    workouts: [],
                    createdAt: new Date(),
                    modifiedAt: null
                })
            })
            .then(r => {
                routine = r
                return editRoutine(manu._id.toString(), routine._id.toString(), {
                    name: "New Routine Name",
                    description: "Updated description",
                    duration: 45
                })
            })
            .then(() => Routine.findById(routine._id).lean())
            .then(updatedRoutine => {
                expect(updatedRoutine).to.exist
                expect(updatedRoutine!.name).to.equal("New Routine Name")
                expect(updatedRoutine!.description).to.equal("Updated description")
                expect(updatedRoutine!.duration).to.equal(45)
                expect(updatedRoutine!.modifiedAt).to.exist
            })
    })

    // --- NOT FOUND USER PATH ---
    it("fails if user does not exist", () => {
        return editRoutine(new ObjectId().toString(), new ObjectId().toString(), { name: "Routine" })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("User not found!")
            })
    })

    // --- NOT FOUND ROUTINE PATH ---
    it("fails if routine does not exist", () => {
        let user: any

        return bcrypt.hash("123123", 10)
            .then(hashedPassword => User.create({
                name: "Manu",
                lastName: "Barzi",
                email: "manu@test.com",
                alias: "manu",
                password: hashedPassword,
                role: "regular",
                level: "beginner",
                interests: [],
                createdAt: new Date(),
                modifiedAt: null
            }))
            .then(u => {
                user = u
                return editRoutine(user._id.toString(), new ObjectId().toString(), { name: "Routine" })
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("Routine not found!")
            })
    })

    // --- OWNERSHIP ERROR PATH ---
    it("fails if user is not the owner of the routine", () => {
        let manu: any, frankie: any, routine: any

        return bcrypt.hash("123123", 10)
            .then(hashedPassword => Promise.all([
                User.create({
                    name: "Manu",
                    lastName: "Barzi",
                    email: "manu@test.com",
                    alias: "manu",
                    password: hashedPassword,
                    role: "regular",
                    level: "beginner",
                    interests: [],
                    createdAt: new Date(),
                    modifiedAt: null
                }),
                User.create({
                    name: "Frank",
                    lastName: "Pereira",
                    email: "frankie@test.com",
                    alias: "frankie",
                    password: hashedPassword,
                    role: "regular",
                    level: "intermediate",
                    interests: [],
                    createdAt: new Date(),
                    modifiedAt: null
                })
            ]))
            .then(([user1, user2]) => {
                manu = user1
                frankie = user2

                return Routine.create({
                    author: manu._id,
                    name: "Routine to edit",
                    muscleGroup: "chest",
                    feedImage: "https://fakeroutinesroutine.com/routine.jpg",
                    difficulty: "easy",
                    description: "Routine",
                    duration: 30,
                    status: "pending",
                    workouts: [],
                    createdAt: new Date(),
                    modifiedAt: null
                })
            })
            .then(r => {
                routine = r
                return editRoutine(frankie._id.toString(), routine._id.toString(), { name: "Updated Name" })
            })
            .catch(error => {
                expect(error).to.be.instanceOf(OwnershipError)
                expect(error.message).to.equal("You are not the owner of this routine.")
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Routine.deleteMany({}),
        Workout.deleteMany({})
    ]))

    after(() => data.disconnect())
})