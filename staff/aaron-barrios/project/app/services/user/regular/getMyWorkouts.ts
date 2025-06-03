import { errors } from "com"
import { data } from "@/data"
import { WorkoutType } from "com/types"

const { SystemError, AuthorizationError } = errors

const getMyWorkouts = (): Promise<WorkoutType[]> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/workouts/self`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        })
        .then(res => res.json())
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
            if ("error" in body) {
                const { error, message } = body
                const Constructor = (errors as any)[error] || SystemError
                throw new Constructor(message)
            }

            return body as WorkoutType[]
        })
}

export default getMyWorkouts