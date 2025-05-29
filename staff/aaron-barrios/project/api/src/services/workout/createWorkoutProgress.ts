import { WorkoutProgress } from "../../data"
import { validate, errors } from "com"

const { SystemError } = errors

const createWorkoutProgress = async (
    userId: string,
    workoutId: string,
    weightUsed: number
): Promise<void> => {
    validate.id(userId)
    validate.id(workoutId)

    const newProgress = {
        user: userId,
        workout: workoutId,
        weightUsed,
        date: new Date()
    }

    await WorkoutProgress.create(newProgress).catch(error => {
        throw new SystemError(error.message)
    })
}

export default createWorkoutProgress
