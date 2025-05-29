import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { toggleSaveWorkout } from "../../services/workout"

const toggleSaveWorkoutHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { workoutId } = req.params

        return toggleSaveWorkout(userId, workoutId)
            .then(() => { res.sendStatus(204) })

    }
)

export default toggleSaveWorkoutHandler