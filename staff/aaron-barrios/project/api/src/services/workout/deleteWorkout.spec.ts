import 'dotenv/config'
import { data, User, Workout } from '../../data'
import deleteWorkout from './deleteWorkout'
import { expect } from 'chai'
import { errors } from 'com'

const { NotFoundError } = errors

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe('createPost', () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => User.deleteMany({}))

    // --- HAPPY PATH ---
    it('succeeds on createWorkout', () => {
        return deleteWorkout('67eac3e1cb202d76cec69964', '67eac3e1cb202d76cec69965')
            .then(() => Workout.find({ author: '67eac3e1cb202d76cec69964' }).lean())
            .then(workout => {
                expect(workout).not.to.be.undefined
                expect(workout[0].name).to.equal('press bench')
                expect(workout[0].muscleGroup).to.equal('chest')
            })
    })


    // --- CASE DOES NOT FIND USER ---
    it('fails on existingUser', () => {
        let catchedError: Error

        return deleteWorkout('67eac3e1cb202d76cec69964', '67eac3e1cb202d76cec69968')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found!')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})