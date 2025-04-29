import { Request, Response } from "express"

import { deleteCustomRoutine } from "../../services/routines"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const deleteCustomRoutineHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { routineId } = req.params

        return deleteCustomRoutine(userId, routineId)
            .then(() => { res.sendStatus(204) })
    }
)

export default deleteCustomRoutineHandler