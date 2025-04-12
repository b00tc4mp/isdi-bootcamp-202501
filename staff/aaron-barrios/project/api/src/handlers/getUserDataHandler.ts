import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createFunctionalHandler";
import { AuthHandlerRequest } from "../middlewares/types";
import getUserData from "../services/user/regular/getUserData";

const getUserDataHandler = createFunctionalHandler((req: Request, res: Response) => {
    const { userId } = req as AuthHandlerRequest

    return getUserData(userId)
        .then(data => { res.json(data) })
})

export default getUserDataHandler