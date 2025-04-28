import { errors } from "com"
import { data } from "@/data"
import { RoutineType } from "com/types"

const { SystemError, AuthorizationError } = errors

const getSavedRoutines = (): Promise<RoutineType[]> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/routines/self/saved`, {
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

            return body as RoutineType[]
        })
}

export default getSavedRoutines