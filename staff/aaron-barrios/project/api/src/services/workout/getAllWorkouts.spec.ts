import "dotenv/config"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from 'bcryptjs'
import { Types } from "mongoose"

import { data, User, Workout } from "../../data"
import getAllWorkouts from "./getAllWorkouts"
import { errors } from "com"
import { debug } from "winston"

chai.use(chaiAsPromised)

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe('get All Workouts', () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({})
        ])
    })


    //--- HAPPY PATH ---
    it('succeeds on getting All Workouts', async () => {
        const hashedPassword = await bcrypt.hash('123123', 10)

        const [_user, _user2] = await User.insertMany([
            { name: 'Manu', lastName: 'Barzi', email: 'ma@nu.com', alias: 'manu', password: hashedPassword, role: 'regular', level: 'beginner', interests: [], createdAt: new Date(), modifiedAt: null },
            { name: 'Frank', lastName: 'Pereira', email: 'fran@kie.com', alias: 'frankie', password: hashedPassword, role: 'regular', level: 'intermediate', interests: [], createdAt: new Date(), modifiedAt: null }
        ])

        const user = { id: _user._id.toString() }
        const user2 = { id: _user2._id.toString() }

        await Workout.insertMany([
            { author: _user.id, name: 'bench press', muscleGroup: 'chest', description: 'workout 1', difficulty: 'easy', type: 'strength', status: 'accepted' },
            { author: _user2.id, name: 'idc', muscleGroup: 'chest', description: 'workout 2', difficulty: 'easy', type: 'strength', status: 'accepted' }
        ])

        const returnedWorkouts = await getAllWorkouts(user.id)

        expect(returnedWorkouts.workouts).to.be.instanceOf(Array)
        expect(returnedWorkouts.workouts).to.have.lengthOf(2)
        expect(returnedWorkouts.workouts[0].author.id).to.equal(user.id)

    })

    //--- NOTFOUND USER ERROR PATH ---
    it('fails on existingUser', () => {
        return expect(
            getAllWorkouts(new ObjectId().toString())
        ).to.be.rejectedWith(NotFoundError, 'User not found!')
    })

    afterEach(() => {
        User.deleteMany({})
        Workout.deleteMany({})
    })

    after(() => data.disconnect())
})