import { errors } from "com"
import { data } from "@/data"
import { WorkoutType } from "com/types"

const { SystemError, AuthorizationError } = errors

const getUserWorkouts = (targetUserId: string): Promise<WorkoutType[]> => {
    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${targetUserId}/workouts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
        .then(response => {
            return response.json()
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
        .catch(error => {
            console.error("❌ getUserWorkouts error:", error)
            throw new SystemError("Invalid JSON response from server")
        })
}

export default getUserWorkouts