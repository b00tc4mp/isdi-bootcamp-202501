import { Request, Response } from "express"

import { createFunctionalHandler } from "../../../middlewares"
import { AuthHandlerRequest } from "../../../middlewares/types"
import { getSavedRoutines } from "../../../services/user/regular"

const getSavedRoutinesHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getSavedRoutines(userId)
            .then(routines => { res.status(200).json(routines) })
    }
)

export default getSavedRoutinesHandler