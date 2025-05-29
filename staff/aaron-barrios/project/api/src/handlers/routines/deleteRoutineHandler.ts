import { Request, Response } from "express"

import { deleteRoutine } from "../../services/routines"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const deleteRoutineHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { routineId } = req.params

        return deleteRoutine(userId, routineId)
            .then(() => { res.sendStatus(204) })
    }
)

export default deleteRoutineHandler