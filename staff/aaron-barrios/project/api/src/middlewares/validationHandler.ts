import {Request, Response, NextFunction} from 'express'
import {ZodSchema} from 'zod'

const validationHandler = <T>(schema: ZodSchema<T>) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)

            next()
        } catch (error){
            next(error)
        }
    }
}

export default validationHandler