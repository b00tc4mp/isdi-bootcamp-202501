import { EditRoutineType } from "com/types"
import { errors } from "com"
import { data } from "@/data"

const { AuthorizationError, SystemError } = errors

const editRoutine = (routineId: string, updates: EditRoutineType): Promise<void> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines/${routineId}/edit`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ updates }),
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) return res.json().then(body => { throw new SystemError(body.message) })
        })
}

export default editRoutine