import { errors } from "com"
import { data } from "@/data"
import { WorkoutType } from "com/types"

const { SystemError, AuthorizationError } = errors

const getSavedWorkouts = (): Promise<WorkoutType[]> => {
    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/workouts/self/saved`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        })
        .then(res => res.json())
        .then(body => {
            if ("error" in body) {
                const { error, message } = body
                const Constructor = (errors as any)[error] || SystemError
                throw new Constructor(message)
            }

            return body as WorkoutType[]
        })
        .catch(error => {
            console.error(error)
            throw new SystemError(error.message)
        })
}

export default getSavedWorkouts