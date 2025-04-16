import { Request, Response } from "express"
import { errors } from "com"

import updateUserData from "../services/user/regular/updateUserData"
import { UserDocType } from "../data/types"
import { AuthHandlerRequest } from "../middlewares/types"

const { SystemError } = errors

export default function updateUserDataHandler(req: Request, res: Response) {
    const userId = (req as AuthHandlerRequest).userId as string
    const update: Partial<Omit<UserDocType, "_id" | "password" | "__v">> = req.body

    return updateUserData(userId, update)
        .then(() => res.status(204).send())
        .catch(error => {
            console.error(error)
            throw new SystemError(error.message)
        })
}