import { errors, validate } from "com"
import { data } from "@/data"

const { SystemError, AuthorizationError } = errors

const createWorkout = (
    userId: string,
    name: string,
    muscleGroup: string,
    description: string
): Promise<void> => {
    validate.id(userId)
    validate.text(name)
    validate.text(muscleGroup)
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
                body: JSON.stringify({ name, muscleGroup, description })
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201) return // HAPPY PATH

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