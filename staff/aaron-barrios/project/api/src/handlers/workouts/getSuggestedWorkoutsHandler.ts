import { Request, Response } from "express"
import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"

import { getSuggestedWorkouts } from "../../services/workout"
import { WorkoutType } from "com/types"

const getSuggestedWorkoutsHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getSuggestedWorkouts(userId)
            .then(suggestedWorkouts => { res.status(200).json(suggestedWorkouts) })
    }
)

export default getSuggestedWorkoutsHandler