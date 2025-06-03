import { Request, Response } from "express"
import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"

import { getSuggestedRoutines } from "../../services/routines"

const getSuggestedRoutinesHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getSuggestedRoutines(userId)
            .then(suggestedRoutines => { res.status(200).json(suggestedRoutines) })
    }
)

export default getSuggestedRoutinesHandler