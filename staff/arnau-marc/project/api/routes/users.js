import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { jsonBodyParser, withErrorHandling, authHandler } from '../middlewares/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env 

export const users = Router()

// Endpoint for register user
users.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    const { name, surname, email,  username ,  password } = req.body 

    return logic.registerUser(name, surname, email, username,  password )
        .then(() => res.status(201).send())
}))

// Endpoint for authenticate user
// users.post('/auth2', jsonBodyParser, withErrorHandling((req,res) => {
//     const { username, password } = req.body

//     return logic.authenticateUser(username, password)
//         .then(id => {
//             const token = jwt.sign({ sub: id }, JWT_SECRET)

//             res.json({ token })
//         })
// }))

users.post('/auth', jsonBodyParser, withErrorHandling((req,res) => {
    const { username, password } = req.body

    return logic.authenticateUser(username, password)
        .then(({id , role }) => {
            const token = jwt.sign({ sub: id , role}, JWT_SECRET)

            res.json({ token })
        })
}))

// Endpoint for getUsername
users.get('/self/username', authHandler, withErrorHandling((req,res) => {
    const { userId } = req

    return logic.getUsername(userId)
        .then(username => res.json({ username }))
}))

// GET user role
users.get('/self/role', authHandler, withErrorHandling((req, res) => {
    const { userId } = req
  
    return logic.getUserRole(userId)
      .then(role => res.json({ role }))
  }))

// Obtener info básica de un usuario por ID
users.get('/:id', authHandler, withErrorHandling((req, res) => {
    const { id } = req.params
  
    return User.findById(id).lean()
      .then(user => {
        if (!user) throw new NotFoundError('User not found')
        res.json({ id: user._id.toString(), username: user.username })
      })
  }))