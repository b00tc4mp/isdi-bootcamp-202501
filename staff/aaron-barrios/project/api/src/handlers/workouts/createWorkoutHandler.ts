import { Request, Response } from "express"

import { createWorkout } from "../../services/workout"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const createWorkoutHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const author = (req as AuthHandlerRequest).userId
        const { name, muscleGroup, feedImage, description, executionImages } = req.body

        return createWorkout(author, name, muscleGroup, feedImage, description, executionImages)
            .then(workout => { res.status(201).json(workout) })
    }
)

export default createWorkoutHandler