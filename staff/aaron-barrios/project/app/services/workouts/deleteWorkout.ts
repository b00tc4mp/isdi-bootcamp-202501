import { errors, validate } from "com"
import { data } from "@/data"

const { SystemError, AuthorizationError } = errors

const deleteWorkout = (
    userId: string,
    workoutId: string
): Promise<void> => {
    validate.id(userId)
    validate.id(workoutId)

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/workouts/${workoutId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
                    const Constructor = (errors as any)[error] || SystemError
                    throw new Constructor(message)
                })
        })
}

export default deleteWorkout