import { Request, Response } from "express"

import { getWorkoutById } from "../../services/workout"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const getWorkoutByIdHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { workoutId } = req.params

        return getWorkoutById(workoutId, userId)
            .then(workout => { res.status(200).json(workout) })
    }
)

export default getWorkoutByIdHandler