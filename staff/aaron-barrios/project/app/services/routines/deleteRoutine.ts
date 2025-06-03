import { errors, validate } from "com"
import { data } from "@/data"

const { SystemError, AuthorizationError } = errors

const deleteRoutine = (
    userId: string,
    routineId: string
): Promise<void> => {
    validate.id(userId)
    validate.id(routineId)

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines/${routineId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 204)
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body
                    const Constructor = (errors as any)[error] || SystemError
                    throw new Constructor(message)
                })
        })
}

export default deleteRoutine