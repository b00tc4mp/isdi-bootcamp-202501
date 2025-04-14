import { Response, Request } from 'express'

export type StatusCode = 201 | 202 | 400 | 401 | 403 | 404 | 409 | 500

export type AsyncHandler = (
    req: Request,
    res: Response
) => Promise<void>

export type AuthHandlerRequest = Request & { userId: string }