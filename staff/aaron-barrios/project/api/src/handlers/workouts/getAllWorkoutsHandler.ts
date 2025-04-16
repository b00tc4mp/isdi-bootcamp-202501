import { Request, Response } from "express"

import getAllWorkouts from "../../services/workout/getAllWorkouts"
import { AuthHandlerRequest } from "../../middlewares/types"

export default function getAllWorkoutsHandler(
    req: Request,
    res: Response
): void {
    const userId = (req as AuthHandlerRequest).userId

    getAllWorkouts(userId)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ error: "SystemError", message: "Failed to retrieve workouts" })
        })
}
