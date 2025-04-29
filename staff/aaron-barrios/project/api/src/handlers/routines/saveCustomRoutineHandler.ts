import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { saveCustomRoutine } from "../../services/routines"

const saveCustomRoutineHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { routineId } = req.params

        return saveCustomRoutine(userId, routineId)
            .then(() => { res.status(201).json({}) })
    }
)

export default saveCustomRoutineHandler