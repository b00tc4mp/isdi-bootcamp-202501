import { errors } from "com"
import { data } from "@/data"
import { WorkoutType } from "com/types"

const { SystemError, AuthorizationError } = errors

const getUserWorkouts = (targetUserId: string): Promise<WorkoutType[]> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/workouts/user/${targetUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    if (!response.ok) {
                        const { error, message } = body
                        const Constructor = (errors as any)[error] || SystemError
                        throw new Constructor(message)
                    }

                    if (!Array.isArray(body)) throw new SystemError("Invalid workouts response")
                    return body
                })
        })
}

export default getUserWorkouts