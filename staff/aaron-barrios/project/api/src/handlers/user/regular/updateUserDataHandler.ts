import { Request, Response } from "express"
import { errors } from "com"

import updateUserData from "../../../services/user/regular/updateUserData"
import { UserDocType } from "../../../data/types"
import { AuthHandlerRequest } from "../../../middlewares/types"
import createFunctionalHandler from "../../../middlewares/createFunctionalHandler"

const { SystemError } = errors

const updateUserDataHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId as string
        const update: Partial<Omit<UserDocType, "_id" | "password" | "__v">> = req.body

        return updateUserData(userId, update)
            .then(() => { res.status(204).send() })
            .catch(error => {
                console.error(error)
                throw new SystemError(error.message)
            })
    }
)

export default updateUserDataHandler