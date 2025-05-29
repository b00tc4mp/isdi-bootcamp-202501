import createFunctionalHandler from '../../../middlewares/createFunctionalHandler'
import { Request, Response } from 'express'
import { generateAnonymUser } from '../../../services/user/anonym'

const generateAnonymUserHandler = createFunctionalHandler(
    (_req: Request, res: Response) => {
        return generateAnonymUser()
            .then(token => { res.status(201).json({ token }) })
    })

export default generateAnonymUserHandler
