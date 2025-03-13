import express, { json } from 'express'

import { logic } from './logic/index.js'

import { CredentialsError, DuplicityError, NotFoundError, SystemError, ValidationError } from './errors.js'

const api = express()

const PORT = 8080

const jsonBodyParser = json()

api.listen(PORT, () => console.log(`API running on port ${PORT}`))