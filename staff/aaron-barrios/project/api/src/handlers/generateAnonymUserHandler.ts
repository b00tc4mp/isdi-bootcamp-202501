// handlers/users/generateAnonymUserHandler.ts
import { Request, Response } from 'express'
import { generateAnonymUser } from '../services/user/anonym'

export default function generateAnonymUserHandler(_req: Request, res: Response) {
    generateAnonymUser()
        .then(token => res.status(201).json({ token }))
}
