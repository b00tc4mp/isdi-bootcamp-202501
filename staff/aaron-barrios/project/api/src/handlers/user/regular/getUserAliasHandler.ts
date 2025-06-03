import { Request, Response } from "express"

import { createFunctionalHandler } from "../../../middlewares"
import { AuthHandlerRequest } from "../../../middlewares/types"
import { getUserAlias } from "../../../services/user/regular"

const getUserAliasHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const { userId } = req as AuthHandlerRequest

        return getUserAlias(userId).then(alias => {
            res.json(alias)
        })
    }
)

export default getUserAliasHandler