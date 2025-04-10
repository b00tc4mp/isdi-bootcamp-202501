import { Response } from "express"
import createFunctionalHandler from "../middlewares/createFunctionalHandler.js"
import { CustomRequestBody } from "../data/types.js"
import services from "../services/index.js"

type AuthUserData = {
    alias: string
    password: string
}

const authenticateUserHandler = createFunctionalHandler<AuthUserData>(
    (req, res: Response) => {
        const { alias, password } = (req as CustomRequestBody<AuthUserData>).body

        return services.authenticateUser(alias, password).then(userId => {
            res.json(userId)
        })
    }
)

export default authenticateUserHandler