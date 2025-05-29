import { Request, Response } from "express"

import { getModeratorWorkouts } from "../../services/workout"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const getModeratorWorkoutsHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getModeratorWorkouts(userId)
            .then(workouts => { res.status(200).json(workouts) })
    }
)

export default getModeratorWorkoutsHandler