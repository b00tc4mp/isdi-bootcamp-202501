import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { toggleLikeWorkout } from "../../services/workout"

const toggleLikeWorkoutHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { workoutId } = req.params

        return toggleLikeWorkout(userId, workoutId)
            .then(() => { res.sendStatus(204) })

    }
)

export default toggleLikeWorkoutHandler