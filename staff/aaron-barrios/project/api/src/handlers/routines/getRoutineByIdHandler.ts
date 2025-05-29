import { Request, Response } from "express"

import { getRoutineById } from "../../services/routines"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const getRoutineByIdHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { routineId } = req.params

        return getRoutineById(routineId, userId)
            .then(routine => { res.status(200).json(routine) })
    }
)

export default getRoutineByIdHandler