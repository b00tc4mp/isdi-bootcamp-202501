import "dotenv/config"
import { data, User, Workout } from "../../data"
import getUserWorkouts from "./getUserWorkouts"
import { expect } from "chai"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { Types } from "mongoose"
import { errors } from "com"
import { IWorkout } from "../../data/types"

chai.use(chaiAsPromised)

const { NotFoundError, ValidationError } = errors

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe('getWorkouts', () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Workout.deleteMany({})
        ])


    })

    //--- HAPPY PATH ---
    it('succeds on getting Workouts', () => {
        let returnedWorkouts: Array<IWorkout>
        let user: { id: string }, user2: { id: string }
        let workout: object, workout2: object

        return User.insertMany([
            { name: 'Manu', lastName: 'Barzi', email: 'manu@barzi.com', alias: 'manu', password: 'mamama' },
            { name: 'Frank', lastName: 'Pereira', email: 'fran@kie.com', alias: 'frankie', password: 'fafafa' }
        ])
            .then(([_user, _user2]) => {
                user = _user
                user2 = _user2
            })
            .then(() => {
                return Workout.insertMany([
                    { author: user.id, name: 'bench press', muscleGroup: 'chest', description: 'workout 1' },
                    { author: user2.id, name: 'bench press', muscleGroup: 'chest', description: 'workout 2' }
                ])
            })
            .then(([_workout, _workout2]) => {
                workout = _workout
                workout2 = _workout2
            })
            .then(() => getUserWorkouts(user2.id))
            .then(workouts => returnedWorkouts = workouts as Array<IWorkout>)
            .finally(() => {
                expect(returnedWorkouts).to.be.instanceOf(Array)
                expect(returnedWorkouts).to.have.lengthOf(2)

                let returnedWorkout = returnedWorkouts[0]
                expect(returnedWorkout.author.toString()).to.equal(user2.id)
                // expect(returnedWorkout.name).to.equal(workout2.name)
                // expect(returnedWorkout.muscleGroup).to.equal(musc)
                // expect(returnedWorkout.description).to.equal()

            })
    })

    afterEach(() => {
        User.deleteMany({})
        Workout.deleteMany({})
    })

    after(() => data.disconnect())
})