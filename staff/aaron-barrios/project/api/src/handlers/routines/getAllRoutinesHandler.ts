import { Request, Response } from "express"

import { getAllRoutines } from "../../services/routines"
import { AuthHandlerRequest } from "../../middlewares/types"
import { createFunctionalHandler } from "../../middlewares"

const getAllRoutinesHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getAllRoutines(userId)
            .then(routines => { res.status(200).json(routines) })
    }
)

export default getAllRoutinesHandler