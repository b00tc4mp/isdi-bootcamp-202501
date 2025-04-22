import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"
import { Types } from 'mongoose'

import { data } from '../../data'
import { User, Workout } from '../../data'
import toggleLikeWorkout from './toggleLikeWorkout'
import { errors } from 'com'


const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env


describe("toggle Like Workout", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({})
        ])
    })

    //--- HAPPY PATH ---
    it("succeeds on toggle Like workout", () => {
        let userId: string
        let workoutId: string

        return bcrypt.hash("123456", 10)
            .then(hashedPassword =>
                User.create({
                    name: "Test",
                    lastName: "User",
                    email: "test@like.com",
                    alias: "liker",
                    password: hashedPassword,
                    level: "beginner"
                })
            )
            .then(user => {
                userId = user.id

                return Workout.create({
                    author: userId,
                    name: "Push Ups",
                    muscleGroup: "chest",
                    feedImage: "https://example.com/push-ups.jpg",
                    description: "Great for chest",
                    difficulty: "medium",
                    type: "strength",
                    status: "accepted",
                    likes: []
                })
            })
            .then(workout => {
                workoutId = workout.id
                return toggleLikeWorkout(userId, workoutId)
            })
            .then(() => Workout.findById(workoutId).lean())
            .then(workout => {
                expect(workout?.likes).to.include.deep.members([new ObjectId(userId)])
                return toggleLikeWorkout(userId, workoutId)
            })
            .then(() => Workout.findById(workoutId).lean())
            .then(workout => {
                expect(workout?.likes).to.not.include.deep.members([new ObjectId(userId)])
            })
    })


    //--- NOTFOUND USER ERROR PATH ---
    it("fails on existingUser or Workout", () => {
        return expect(
            toggleLikeWorkout(new ObjectId().toString(), new ObjectId().toString())
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