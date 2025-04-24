import { EditWorkoutType } from "com/types"
import { errors } from "com"
import { data } from "@/data"

const { AuthorizationError, SystemError } = errors

const editWorkout = (workoutId: string, updates: EditWorkoutType): Promise<void> => {
    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/workouts/${workoutId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ updates }),
            })
        })
        .then(res => {
            if (!res.ok) return res.json().then(body => { throw new SystemError(body.message) })
        })
}

export default editWorkout