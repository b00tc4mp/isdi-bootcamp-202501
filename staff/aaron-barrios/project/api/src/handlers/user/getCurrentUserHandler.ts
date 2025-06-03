import { Request, Response } from 'express'

import { AuthHandlerRequest } from '../../middlewares/types'
import createFunctionalHandler from '../../middlewares/createFunctionalHandler'
import { getCurrentUser } from '../../services/user'


const getCurrentUserHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const { userId } = req as AuthHandlerRequest

        return getCurrentUser(userId)
            .then(alias => { res.json(alias) })
    }
)

export default getCurrentUserHandler