import { Request, Response } from "express"

import { reviewRoutine } from "../../services/routines"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"
const reviewRoutineHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { routineId } = req.params
        const { status } = req.body

        return reviewRoutine(userId, routineId, status)
            .then(() => { res.sendStatus(204) })
    }
)

export default reviewRoutineHandler