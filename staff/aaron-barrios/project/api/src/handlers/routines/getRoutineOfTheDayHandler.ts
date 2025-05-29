import { Request, Response } from "express"

import { getRoutineOfTheDay } from "../../services/routines"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const getRoutineOfTheDayHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getRoutineOfTheDay(userId)
            .then(routine => { res.status(200).json(routine) })
    }
)

export default getRoutineOfTheDayHandler