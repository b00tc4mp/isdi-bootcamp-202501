import { Request, Response } from "express"
import createFunctionalHandler from "../middlewares/createFunctionalHandler.js"
import services from "../services/index.js"


const authenticateUserHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const { alias, password } = req.body

        return services.authenticateUser(alias, password).then(userId => {
            res.json(userId)
        })
    }
)

export default authenticateUserHandler