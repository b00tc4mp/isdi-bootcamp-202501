import { Request, Response } from "express"
import createFunctionalHandler from "../../middlewares/createFunctionalHandler"
import services from "../../services"

const registerUserHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const { alias, email, password } = req.body

        console.log("📥 Body recibido en registerUserHandler:", req.body)
        return services.registerUser(alias, email, password).then(() => {
            res.status(201).send()
        })
    }
)

export default registerUserHandler
