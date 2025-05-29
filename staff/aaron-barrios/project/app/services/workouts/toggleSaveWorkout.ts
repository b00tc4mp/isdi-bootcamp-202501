import { data } from "@/data"
import { errors, validate } from "com"

const { SystemError, AuthorizationError } = errors

const toggleSaveWorkout = (
    workoutId: string
): Promise<void> => {
    validate.id(workoutId)

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/workouts/${workoutId}/saves`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 204)
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error as keyof typeof errors] || SystemError
                    throw new constructor(message)
                })
        })
}

export default toggleSaveWorkout