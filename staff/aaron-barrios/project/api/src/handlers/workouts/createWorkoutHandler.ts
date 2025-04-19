import { Request, Response } from "express"

import { createWorkout } from "../../services/workout"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const createWorkoutHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const author = (req as AuthHandlerRequest).userId
        const { name, muscleGroup, description } = req.body

        return createWorkout(author, name, muscleGroup, description)
            .then(workout => { res.status(200).json(workout) })
    }
)

export default createWorkoutHandler