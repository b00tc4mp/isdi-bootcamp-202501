import { NextFunction, Request, Response } from "express"
import { AsyncHandler } from "./types.js"

const createFunctionalHandler = (callback: AsyncHandler) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction) => {
        return callback(req, res).catch(next)
    }
}

export default createFunctionalHandler