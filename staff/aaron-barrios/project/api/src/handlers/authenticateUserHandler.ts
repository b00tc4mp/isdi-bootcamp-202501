import 'dotenv/config'
import jwt from "jsonwebtoken"
import { Request, Response } from "express"

import createFunctionalHandler from "../middlewares/createFunctionalHandler.js"
import services from "../services/index.js"

const { JWT_SECRET } = process.env

const authenticateUserHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const { alias, password } = req.body

        return services.authenticateUser(alias, password)
            .then(user => {
                const payload = { sub: { id: user.id.toString(), role: user.role } }
                const token = jwt.sign(payload, JWT_SECRET!)

                res.json({
                    token,
                    //id: user.id.toString(),  //=> lo comento porque de momento no lo quiero
                    // role: user.role
                })
            })
    }
)

export default authenticateUserHandler