import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { getUserWorkouts } from "../../services/workout"

const getUserWorkoutsHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { targetUserId } = req.params

        return getUserWorkouts(userId, targetUserId)
            .then(workouts => { res.status(200).json(workouts) })
    }
)

export default getUserWorkoutsHandler