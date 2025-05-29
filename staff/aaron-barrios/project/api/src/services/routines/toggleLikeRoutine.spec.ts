import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"
import { Types } from 'mongoose'

import { data } from '../../data'
import { User, Routine } from '../../data'
import toggleLikeRoutine from './toggleLikeRoutine'
import { errors } from 'com'


const { ObjectId } = Types
const { NotFoundError } = errors
const { MONGO_URI, MONGO_DB_NAME } = process.env


describe("toggle Like Routine", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Routine.deleteMany({})
        ])
    })

    //--- HAPPY PATH ---
    it("succeeds on toggle Like Routine", () => {
        let userId: string
        let routineId: string

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

                return Routine.create({
                    author: userId,
                    name: "Push Ups",
                    muscleGroup: "chest",
                    feedImage: "https://example.com/push-ups.jpg",
                    description: "Great for chest",
                    difficulty: "medium",
                    duration: 30,
                    status: "accepted",
                    likes: []
                })
            })
            .then(routine => {
                routineId = routine.id
                return toggleLikeRoutine(userId, routineId)
            })
            .then(() => Routine.findById(routineId).lean())
            .then(routine => {
                expect(routine?.likes).to.include.deep.members([new ObjectId(userId)])
                return toggleLikeRoutine(userId, routineId)
            })
            .then(() => Routine.findById(routineId).lean())
            .then(routine => {
                expect(routine?.likes).to.not.include.deep.members([new ObjectId(userId)])
            })
    })


    //--- NOTFOUND USER ERROR PATH ---
    it("fails on existingUser or Routine", () => {
        return expect(
            toggleLikeRoutine(new ObjectId().toString(), new ObjectId().toString())
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