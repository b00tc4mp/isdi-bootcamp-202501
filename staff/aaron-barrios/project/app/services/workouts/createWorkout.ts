import { errors, validate } from "com"
import { data } from "@/data"
import defaultWorkoutExecutionImages from "./defaultWorkoutExecutionImages"
import { WorkoutType } from "com/types"

const { SystemError, AuthorizationError } = errors

const createWorkout = (
    userId: string,
    name: string,
    muscleGroup: string,
    feedImage: string,
    description: string
): Promise<WorkoutType> => {
    validate.id(userId)
    validate.text(name)
    validate.text(muscleGroup)
    validate.url(feedImage)
    validate.text(description)

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/workouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    muscleGroup,
                    description,
                    feedImage,
                    executionImages: defaultWorkoutExecutionImages[muscleGroup] ?? []
                })
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201) {
                return response.json()
                    .then(body => {
                        if (!body) throw new SystemError('Invalid response body')
                        return body as WorkoutType
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

export default createWorkout