import { errors, validate } from "com"
import { CustomRoutineType } from "com/types"
import { data } from "@/data"

const { SystemError, AuthorizationError } = errors

const getCustomRoutineById = (
    routineId: string,
    userId: string
): Promise<CustomRoutineType> => {
    validate.id(routineId)
    validate.id(userId)

    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines/custom/${routineId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
        .then(res => res.json())
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
            if ('error' in body) {
                const { error, message } = body
                const Constructor = (errors as any)[error] || AuthorizationError
                throw new Constructor(message)
            }

            return body as CustomRoutineType
        })
}

export default getCustomRoutineById