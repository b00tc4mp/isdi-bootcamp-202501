import { errors, validate } from "com"
import { data } from "@/data"
import { CustomRoutineType } from "com/types"

const { SystemError, AuthorizationError } = errors

const saveCustomRoutine = (
    userId: string,
    routineId: string
): Promise<void> => {  // ← ya no prometes un CustomRoutineType real
    validate.id(userId)
    validate.id(routineId)

    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines/${routineId}/custom`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201) {
                return
            }

            return response.json()
                .then(body => {
                    const { error, message } = body
                    const Constructor = errors[error as keyof typeof errors] || SystemError
                    throw new Constructor(message)
                })
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default saveCustomRoutine