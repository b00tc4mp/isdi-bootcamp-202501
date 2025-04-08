import { Response } from 'express'
import { CustomRequestBody } from '../types.js'

export type StatusCode = 201 | 202 | 400 | 401 | 403 | 404 | 409 | 500

export type AsyncHandler<T> = (
    req: CustomRequestBody<T>,
    res: Response
) => Promise<void>
