import { Request } from 'express'

export type User = {
    id: string
    name: string
    lastName: string
    alias: string
    email: string
    password: string
    level: string
}

export type UserFromRequest = Omit<User, "id">

export interface CustomRequestBody<T> extends Request {
    body: T;
}