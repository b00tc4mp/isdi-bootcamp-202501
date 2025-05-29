import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { getUserRoutines } from "../../services/routines"

const getUserRoutinesHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { targetUserId } = req.params

        return getUserRoutines(userId, targetUserId)
            .then(routines => { res.status(200).json(routines) })
    }
)

export default getUserRoutinesHandler