import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { editWorkout } from "../../services/workout"

const editWorkoutHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { workoutId } = req.params
        const { updates } = req.body

        return editWorkout(userId, workoutId, updates)
            .then(() => { res.sendStatus(204) })
    }
)

export default editWorkoutHandler