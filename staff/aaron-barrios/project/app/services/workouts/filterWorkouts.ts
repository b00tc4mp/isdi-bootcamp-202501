import { data } from "@/data"
import { errors } from "com"

import { WorkoutType } from "com/types"

const { SystemError, AuthorizationError } = errors

const filterWorkouts = (
    filter: string,
    muscleGroup?: string
): Promise<WorkoutType[]> => {
    if (!["popular", "saved", "recent"].includes(filter))
        return Promise.reject(new SystemError("Invalid filter value"))

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            const params = new URLSearchParams({ filter })
            if (muscleGroup) params.append("muscleGroup", muscleGroup)

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/workouts/filter?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => res.json())
        .then(body => {
            if ("error" in body) {
                const { error, message } = body
                const Constructor = (errors as any)[error] || AuthorizationError
                throw new Constructor(message)
            }

            return body.workouts as WorkoutType[]
        })
}


export default filterWorkouts