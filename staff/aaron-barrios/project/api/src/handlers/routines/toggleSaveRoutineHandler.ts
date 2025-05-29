import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { toggleSaveRoutine } from "../../services/routines"

const toggleSaveRoutineHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { routineId } = req.params

        return toggleSaveRoutine(userId, routineId)
            .then(() => { res.sendStatus(204) })

    }
)

export default toggleSaveRoutineHandler