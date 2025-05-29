import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { toggleLikeRoutine } from "../../services/routines"

const toggleLikeRoutineHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { routineId } = req.params

        return toggleLikeRoutine(userId, routineId)
            .then(() => { res.sendStatus(204) })

    }
)

export default toggleLikeRoutineHandler