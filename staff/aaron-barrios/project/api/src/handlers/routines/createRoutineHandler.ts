import { Request, Response } from "express"

import { createRoutine } from "../../services/routines"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const createRoutineHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const author = (req as AuthHandlerRequest).userId
        const { name, muscleGroup, feedImage, description, duration, workouts } = req.body

        return createRoutine(author, name, muscleGroup, feedImage, description, duration, workouts)
            .then(routine => { res.status(201).json(routine) })
    }
)

export default createRoutineHandler