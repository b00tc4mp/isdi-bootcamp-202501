import { errors, validate } from "com"
import { data } from "@/data"
import { RoutineType, RoutineWorkoutType } from "com/types"

const { SystemError, AuthorizationError } = errors

const createRoutine = (
    userId: string,
    name: string,
    muscleGroup: string,
    feedImage: string,
    description: string,
    duration: number,
    workouts: RoutineWorkoutType[]
): Promise<RoutineType> => {
    validate.id(userId)
    validate.text(name)
    validate.text(muscleGroup)
    validate.url(feedImage)
    validate.text(description)
    validate.number(duration)
    validate.routineWorkouts(workouts, 4)

    if (duration <= 0) throw new errors.ValidationError("Duration must be positive")

    for (const workout of workouts) {
        validate.id(workout.workout.id) // o workout.workoutId según como tengas el type
        validate.number(workout.sets)
        validate.number(workout.reps)
        validate.number(workout.restTime)
        if (workout.sets <= 0 || workout.reps <= 0)
            throw new errors.ValidationError("Sets and reps must be greater than 0")
    }

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            const requestBody = {
                name,
                muscleGroup,
                feedImage,
                description,
                duration,
                workouts: workouts.map(w => ({
                    workout: w.workout.id,
                    sets: w.sets,
                    reps: w.reps,
                    restTime: w.restTime,
                    weight: w.weight || 0,
                    order: w.order
                }))
            }


            console.log("📦 Body que estoy enviando en createRoutine:", requestBody) // 🔥 AQUÍ

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    muscleGroup,
                    feedImage,
                    description,
                    duration,
                    workouts: workouts.map(w => ({
                        workout: w.workout.id, // Si tu tipo RoutineWorkoutType tiene workout como objeto
                        sets: w.sets,
                        reps: w.reps,
                        restTime: w.restTime,
                        weight: w.weight || 0,
                        order: w.order
                    }))
                })
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201) {
                return response.json()
                    .then(body => {
                        if (!body) throw new SystemError('Invalid response body')
                        return body as RoutineType
                    })
            }

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error as keyof typeof errors] || SystemError
                    throw new constructor(message)
                })
        })
}

export default createRoutine