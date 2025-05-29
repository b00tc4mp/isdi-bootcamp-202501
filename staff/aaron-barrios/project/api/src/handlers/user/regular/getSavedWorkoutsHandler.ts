import { Request, Response } from "express"

import { createFunctionalHandler } from "../../../middlewares"
import { AuthHandlerRequest } from "../../../middlewares/types"
import { getSavedWorkouts } from "../../../services/user/regular"

const getSavedWorkoutsHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getSavedWorkouts(userId)
            .then(workouts => { res.status(200).json(workouts) })
    }
)

export default getSavedWorkoutsHandler