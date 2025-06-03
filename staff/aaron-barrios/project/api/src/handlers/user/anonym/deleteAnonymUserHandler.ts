import { Request, Response } from "express"
import createFunctionalHandler from "../../../middlewares/createFunctionalHandler"
import deleteAnonymUser from "../../../services/user/anonym/deleteAnonymUser"
import { AuthHandlerRequest } from "../../../middlewares/types"

const deleteAnonymUserHandler = createFunctionalHandler(
    (req: Request, res: Response): Promise<void> => {
        const userId = (req as AuthHandlerRequest).userId

        return deleteAnonymUser(userId)
            .then(() => { res.status(200).json({ message: "Anonym user deleted successfully" }) })
    }
)

export default deleteAnonymUserHandler