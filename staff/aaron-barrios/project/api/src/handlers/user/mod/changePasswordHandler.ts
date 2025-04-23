import { Request, Response } from "express"

import { createFunctionalHandler } from "../../../middlewares"
import { AuthHandlerRequest } from "../../../middlewares/types"
import { changePassword } from "../../../services/user/mod"

const changePasswordHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const { userId } = req as AuthHandlerRequest
        const { currentPassword, newPassword } = req.body.password

        return changePassword(userId, currentPassword, newPassword)
            .then(() => { res.sendStatus(204) })
    }
)

export default changePasswordHandler