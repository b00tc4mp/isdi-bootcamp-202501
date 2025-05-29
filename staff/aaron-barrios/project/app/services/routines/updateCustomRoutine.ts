import { errors, validate } from "com"
import { UpdateCustomRoutineType } from "com/types"
import { data } from "@/data"

const { AuthorizationError, SystemError } = errors

const updateCustomRoutine = (
    routineId: string,
    updates: UpdateCustomRoutineType
): Promise<void> => {
    validate.id(routineId)

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines/${routineId}/custom`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            })
        })
        .then(res => {
            if (!res.ok) return res.json().then(body => { throw body })
        })
        .catch(error => {
            const { error: errName, message } = error
            const ErrorConstructor = (errors as any)[errName] || SystemError
            throw new ErrorConstructor(message || "Failed to update custom routine")
        })
}

export default updateCustomRoutine