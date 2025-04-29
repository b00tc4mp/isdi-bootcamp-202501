import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { getMyCustomRoutines } from "../../services/routines"

const getMyCustomRoutinesHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { originalRoutineId } = req.params
        console.log("[getMyCustomRoutinesHandler] userId received:", userId) // 🔥

        return getMyCustomRoutines(userId, originalRoutineId)
            .then(customRoutines => { res.status(200).json(customRoutines) })
    }
)

export default getMyCustomRoutinesHandler