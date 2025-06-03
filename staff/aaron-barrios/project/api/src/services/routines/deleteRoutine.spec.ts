import 'dotenv/config'
import { expect } from 'chai'
import { errors } from 'com'
import { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { data, Routine, User, Workout } from '../../data'
import deleteRoutine from './deleteRoutine'

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("delete Routine", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    // --- HAPPY PATH ---
    it("succeeds on delete Routine", () => {
        let manuId: string
        let routineId: string

        return bcrypt.hash("123123", 10)
            .then(hashedPassword => {
                return User.create({
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
                })
            })
            .then(user => {
                manuId = user._id.toString()

                return Routine.create({
                    author: manuId,
                    name: "Routine Test",
                    muscleGroup: "chest",
                    feedImage: "https://test.com/feedimage.jpg",
                    description: "Routine description",
                    difficulty: "easy",
                    duration: 45,
                    status: "pending",
                    createdAt: new Date(),
                    workouts: []
                })
            })
            .then(routine => {
                routineId = routine._id.toString()

                return deleteRoutine(manuId, routineId)
            })
            .then(() => Routine.findById(routineId))
            .then(deletedRoutine => {
                expect(deletedRoutine).to.be.null
            })
    })

    // --- NOT FOUND USER PATH ---
    it("fails on existingUser", () => {
        let catchedError: Error

        return deleteRoutine(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found!')
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({})
    ]))

    after(() => data.disconnect())
})