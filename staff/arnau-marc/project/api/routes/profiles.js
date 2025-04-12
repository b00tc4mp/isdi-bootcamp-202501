import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { jsonBodyParser, withErrorHandling, authHandler } from '../middlewares/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env 

export const profiles = Router()

// Endpoint para actualizar el rol a admin
profiles.patch('/admin-request', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { secretWord } = req.body  // Recibimos la palabra secreta desde el cuerpo de la solicitud
  
    // Llamar a la lógica para actualizar el rol a admin
    return logic.requestAdminRole(userId, secretWord)
      .then(() => res.status(200).send('User role updated to admin'))
      .catch((error) => {
        res.status(400).send(error.message)  // En caso de error, devolvemos el mensaje del error
      })
  }))

  // Endpoint para generar stats de usuario
  profiles.get('/stats', authHandler, withErrorHandling((req, res) => {
    const { userId } = req
  
    // Llamar a la lógica para generar stats del usuario
    return logic.getUserStats(userId)
      .then(stats => res.json(stats))
      .catch(error => res.status(400).send(error.message))
  }))