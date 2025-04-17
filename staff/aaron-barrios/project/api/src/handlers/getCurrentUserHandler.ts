import { Request, Response } from 'express'

import { AuthHandlerRequest } from '../middlewares/types'
import { User } from '../data'
import { errors } from 'com'
import createFunctionalHandler from '../middlewares/createFunctionalHandler'

const { AuthorizationError, SystemError } = errors

const getCurrentUserHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return User.findById(userId)
            .then(user => {
                if (!user) throw new AuthorizationError('User not found')

                const {
                    id,
                    alias,
                    email,
                    role,
                    name,
                    lastName,
                    level,
                    interests,
                    createdAt,
                    modifiedAt
                } = user

                res.json({
                    id: id.toString(),
                    alias,
                    email,
                    role,
                    name: name || null,
                    lastName: lastName || null,
                    level: level || null,
                    interests: interests || [],
                    createdAt,
                    modifiedAt
                })
            })
            .catch(error => {
                console.error(error)
                throw new SystemError(error.message)
            })
    }
)

export default getCurrentUserHandler