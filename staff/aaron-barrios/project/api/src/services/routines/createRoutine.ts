import { Routine, User } from '../../data/models'
import { RoutineDocType, RoutineWorkoutDocType } from '../../data/types'
import { errors, validate } from 'com'
import { Types } from 'mongoose'

const { SystemError, NotFoundError } = errors

const createRoutine = (
    author: string,
    name: string,
    muscleGroup: string,
    feedImage: string,
    description: string,
    duration: number,
    workouts: RoutineWorkoutDocType[]
): Promise<RoutineDocType> => {
    validate.id(author)
    validate.name(name)
    validate.string(muscleGroup)
    validate.url(feedImage)
    validate.text(description)
    validate.number(duration)
    validate.routineWorkouts(workouts, 4, 'workouts')


    return User.findById(author).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            const newRoutine: Partial<RoutineDocType> = {
                author: new Types.ObjectId(author),
                name,
                muscleGroup: muscleGroup as RoutineDocType["muscleGroup"],
                feedImage,
                description,
                status: "pending",
                duration,
                workouts: workouts.map(workout => ({
                    workout: new Types.ObjectId(workout._id),
                    order: workout.order,
                    sets: workout.sets,
                    reps: workout.reps,
                    time: workout.time,
                    weight: workout.weight,
                    restTime: workout.restTime
                })) as RoutineWorkoutDocType[]
            }

            return Routine.create(newRoutine)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(routine => routine)
}

export default createRoutine

