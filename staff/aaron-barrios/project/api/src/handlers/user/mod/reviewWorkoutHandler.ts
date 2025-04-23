import { Request, Response } from "express"

import { reviewWorkout } from "../../../services/workout"
import { AuthHandlerRequest } from "../../../middlewares/types"
import { createFunctionalHandler } from "../../../middlewares"

const reviewWorkoutHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { workoutId } = req.params
        const { status } = req.body

        return reviewWorkout(userId, workoutId, status)
            .then(() => { res.sendStatus(204) })
    }
)

export default reviewWorkoutHandler