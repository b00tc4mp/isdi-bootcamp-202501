import 'dotenv/config'
import { expect } from 'chai'
import { errors } from 'com'
import { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { data, User, Workout } from '../../data'
import deleteWorkout from './deleteWorkout'

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("delete Workout", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    // --- HAPPY PATH ---
    it("succeeds on delete Workout", async () => {
        const hashedPassword = await bcrypt.hash("123123", 10)

        const [manu, frankie] = await User.insertMany([
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

        const [workout1, workout2] = await Workout.insertMany([
            {
                author: manu._id,
                name: "press bench",
                muscleGroup: "chest",
                feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg",
                description: "best workout to grow chest",
                difficulty: "easy",
                type: "strength",
                status: "pending",
                createdAt: new Date()
            },
            {
                author: manu._id,
                name: "bulgarian squat",
                muscleGroup: "buttocks",
                feedImage: "https://www.tonal.com/wp-content/uploads/2024/01/Bulgarian-Split-Squat-Hero.jpg",
                description: "best workout to grow buttocks",
                difficulty: "hard",
                type: "strength",
                status: "accepted",
                createdAt: new Date()
            }
        ])

        await deleteWorkout(manu.id, workout1.id)

        const workoutExists = await Workout.findById(workout1.id)
        expect(workoutExists).to.be.null // => como se ha borrado debe ser nulo

        const workouts = await Workout.find()
        expect(workouts).to.have.lengthOf(1)
    })


    // --- CASE DOES NOT FIND USER ---
    it('fails on existingUser', () => {
        let catchedError: Error

        return deleteWorkout(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found!')
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    after(() => data.disconnect())
})