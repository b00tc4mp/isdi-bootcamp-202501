import { data } from "@/data"
import { errors, validate } from "com"

const { SystemError, AuthorizationError } = errors

const reviewRoutine = (
    routineId: string,
    status: string
): Promise<void> => {
    validate.id(routineId)

    if (!["accepted", "declined"].includes(status))
        throw new SystemError("Invalid status value")

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines/review/${routineId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status })
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
                    const constructor = errors[error as keyof typeof errors] || SystemError
                    throw new constructor(message)
                })
        })
}

export default reviewRoutine