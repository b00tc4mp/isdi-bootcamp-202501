import { Request, Response } from "express"

import { deleteWorkout } from "../../services/workout"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const deleteWorkoutHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { workoutId } = req.params

        return deleteWorkout(userId, workoutId)
            .then(() => { res.sendStatus(204) })
    }
)

export default deleteWorkoutHandler