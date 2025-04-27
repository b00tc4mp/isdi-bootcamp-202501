import { errors, validate } from "com"
import { RoutineType } from "com/types"
import { data } from "@/data"

const { SystemError, AuthorizationError } = errors

const getRoutineById = (
    routineId: string,
    userId?: string
): Promise<RoutineType> => {
    validate.id(routineId)

    if (userId)
        validate.id(userId)

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines/${routineId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => res.json())
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
            if ('error' in body) {
                const { error, message } = body
                const Constructor = (errors as any)[error] || AuthorizationError
                throw new Constructor(message)
            }

            return body as RoutineType
        })
}

export default getRoutineById