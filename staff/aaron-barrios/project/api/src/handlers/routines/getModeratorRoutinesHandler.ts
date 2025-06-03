import { Request, Response } from "express"

import { getModeratorRoutines } from "../../services/routines"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const getModeratorRoutinesHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getModeratorRoutines(userId)
            .then(routines => { res.status(200).json(routines) })
    }
)

export default getModeratorRoutinesHandler