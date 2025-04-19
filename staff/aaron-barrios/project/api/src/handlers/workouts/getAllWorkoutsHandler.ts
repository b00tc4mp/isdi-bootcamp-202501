import { Request, Response } from "express"

import { getAllWorkouts } from "../../services/workout"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const getAllWorkoutsHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getAllWorkouts(userId)
            .then(workouts => { res.status(200).json(workouts) })
    }
)

export default getAllWorkoutsHandler