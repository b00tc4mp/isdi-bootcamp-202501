import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { editRoutine } from "../../services/routines"

const editRoutineHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { routineId } = req.params
        const { updates } = req.body

        return editRoutine(userId, routineId, updates)
            .then(() => { res.sendStatus(204) })
    }
)

export default editRoutineHandler