import 'dotenv/config'
import { expect } from 'chai'
import { errors } from 'com'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'

import { data, User, Workout } from '../../data'
import editWorkout from './editWorkout'

const { NotFoundError, OwnershipError, StatusError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe('edit Workout', () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))


    //--- HAPPY PATH---
    it('should successfully edit a pending workout by its owner', function () {
        const hashedPassword = bcrypt.hashSync('123123', 10)

        return User.create({
            name: 'Manu',
            lastName: 'Barzi',
            email: 'ma@nu.com',
            alias: 'manu',
            password: hashedPassword,
            role: 'regular',
            level: 'beginner',
            interests: [],
            createdAt: new Date(),
            modifiedAt: null
        })
            .then(user => {
                return Workout.create({
                    author: user._id,
                    name: 'bench press',
                    muscleGroup: 'chest',
                    description: 'workout 1',
                    difficulty: 'easy',
                    type: 'strength',
                    status: 'pending',
                    createdAt: new Date()
                })
                    .then(workout => {
                        const updates = {
                            name: 'updated bench press',
                            description: 'updated description'
                        }

                        return editWorkout(user._id.toString(), workout._id.toString(), updates)
                            .then(() => Workout.findById(workout._id))
                            .then(updatedWorkout => {
                                expect(updatedWorkout).to.exist
                                expect(updatedWorkout!.name).to.equal('updated bench press')
                                expect(updatedWorkout!.description).to.equal('updated description')
                            })
                    })
            })
    })

    it('should fail if the user is not the owner of the workout', function () {
        const hashedPassword = bcrypt.hashSync('123123', 10)

        return Promise.all([
            User.create({
                name: 'Manu',
                lastName: 'Barzi',
                email: 'ma@nu.com',
                alias: 'manu',
                password: hashedPassword,
                role: 'regular',
                level: 'beginner',
                interests: [],
                createdAt: new Date(),
                modifiedAt: null
            }),
            User.create({
                name: 'Frank',
                lastName: 'Pereira',
                email: 'fran@kie.com',
                alias: 'frankie',
                password: hashedPassword,
                role: 'regular',
                level: 'intermediate',
                interests: [],
                createdAt: new Date(),
                modifiedAt: null
            })
        ])
            .then(([owner, otherUser]) => {
                return Workout.create({
                    author: owner._id,
                    name: 'bench press',
                    muscleGroup: 'chest',
                    description: 'workout 1',
                    difficulty: 'easy',
                    type: 'strength',
                    status: 'pending',
                    createdAt: new Date()
                })
                    .then(workout => {
                        const updates = {
                            name: 'updated bench press'
                        }

                        return expect(
                            editWorkout(otherUser._id.toString(), workout._id.toString(), updates)
                        ).to.be.rejectedWith(OwnershipError, "You are not the owner of this workout.")
                    })
            })
    })

    it('should fail if the workout status is not pending', function () {
        const hashedPassword = bcrypt.hashSync('123123', 10)

        return User.create({
            name: 'Manu',
            lastName: 'Barzi',
            email: 'ma@nu.com',
            alias: 'manu',
            password: hashedPassword,
            role: 'regular',
            level: 'beginner',
            interests: [],
            createdAt: new Date(),
            modifiedAt: null
        })
            .then(user => {
                return Workout.create({
                    author: user._id,
                    name: 'bench press',
                    muscleGroup: 'chest',
                    description: 'workout 1',
                    difficulty: 'easy',
                    type: 'strength',
                    status: 'accepted',
                    createdAt: new Date()
                })
                    .then(workout => {
                        const updates = {
                            name: 'updated bench press'
                        }

                        return expect(
                            editWorkout(user._id.toString(), workout._id.toString(), updates)
                        ).to.be.rejectedWith(StatusError, "Only pending workouts can be edited.")
                    })
            })
    })


    afterEach(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))

    after(() => data.disconnect())
})