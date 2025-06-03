import { Request, Response } from "express"

import { createFunctionalHandler } from "../../../middlewares"
import { AuthHandlerRequest } from "../../../middlewares/types"
import { getMyRoutines } from "../../../services/user/regular"

const getMyRoutinesHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getMyRoutines(userId)
            .then(routines => { res.status(200).json(routines) })
    }
)

export default getMyRoutinesHandler