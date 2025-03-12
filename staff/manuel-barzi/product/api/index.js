import express, { json } from 'express'

import { logic } from './logic/index.js'

import { CredentialsError, DuplicityError, NotFoundError, SystemError } from './errors.js'

const api = express()

const jsonBodyParser = json()

api.get('/hello', (req, res) => {
    console.log(req.path)

    res.send('Hello, World!')
})

api.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { name, email, username, password } = req.body

        logic.registerUser(name, email, username, password)

        res.status(201).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof DuplicityError) {
            status = 409
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body

        const id = logic.authenticateUser(username, password)

        res.json(id)
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof CredentialsError) {
            status = 401
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.listen(8080, () => console.log('API running on post 8080'))