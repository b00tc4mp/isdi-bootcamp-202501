import { Request, Response } from "express"

import { getCustomRoutineById } from "../../services/routines"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const getCustomRoutineByIdHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { routineId } = req.params

        return getCustomRoutineById(routineId, userId)
            .then(customRoutine => { res.status(200).json(customRoutine) })
    }
)

export default getCustomRoutineByIdHandler