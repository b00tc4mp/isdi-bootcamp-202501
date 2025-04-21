import { Request, Response } from "express"

import { getTargetUserData } from "../../../services/user/regular"
import { createFunctionalHandler } from "../../../middlewares"

const getTargetUserDataHandler = createFunctionalHandler(
    (req: Request, res: Response): Promise<void> => {
        const { targetUserId } = req.params

        return getTargetUserData(targetUserId)
            .then(userData => { res.status(200).json(userData) })
    }
)

export default getTargetUserDataHandler