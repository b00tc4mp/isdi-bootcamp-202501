import { Request, Response } from 'express'

import { AuthHandlerRequest } from '../middlewares/types'
import { User } from '../data'
import { errors } from 'com'

const { AuthorizationError, SystemError } = errors

export default function getCurrentUserHandler(req: Request, res: Response): Promise<void> {
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
