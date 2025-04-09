import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { logic } from '../logic/index.js'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

const { JWT_SECRET } = process.env

export const levels = Router()