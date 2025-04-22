import { data } from "@/data"
import { errors } from "com"

import { WorkoutType } from "com/types"

const { SystemError, AuthorizationError } = errors

const filterWorkouts = (
    filter: string
): Promise<WorkoutType[]> => {
    //validate filter
    if (filter !== "popular" && filter !== "saved" && filter !== "recent")
        return Promise.reject(new SystemError("Invalid filter value"))

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/workouts/filter?filter=${filter}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => res.json())
        .then(body => {
            if ('error' in body) {
                const { error, message } = body
                const Constructor = (errors as any)[error] || AuthorizationError
                throw new Constructor(message)
            }

            return body.workouts as WorkoutType[]
        })
}

export default filterWorkouts