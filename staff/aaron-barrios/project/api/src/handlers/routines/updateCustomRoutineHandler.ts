import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { updateCustomRoutine } from "../../services/routines"

const updateCustomRoutineHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { routineId } = req.params
        const updates = req.body

        return updateCustomRoutine(userId, routineId, updates)
            .then(() => { res.sendStatus(204) })
    }
)

export default updateCustomRoutineHandler