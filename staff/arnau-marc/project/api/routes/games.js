import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { jsonBodyParser, withErrorHandling, authHandler } from '../middlewares/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env 

export const games = Router()


// Crear partida (solo admin)
games.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { title, date, place, season } = req.body
  
    return logic.createGame(userId, title, date, place, season)
      .then(gameId => res.status(201).json({ gameId }))
  }))
  
  /*
  // Unirse a una partida
  games.post('/:gameId/join', authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { gameId } = req.params
  
    return logic.joinGame(userId, gameId)
      .then(() => res.status(200).send())
  }))
  
  // Desapuntarse de una partida
  games.post('/:gameId/leave', authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { gameId } = req.params
  
    return logic.leaveGame(userId, gameId)
      .then(() => res.status(200).send())
  }))
  
  // Establecer ganador (solo admin)
  games.post('/:gameId/winner', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { gameId } = req.params
    const { winnerId } = req.body
  
    return logic.setGameWinner(userId, gameId, winnerId)
      .then(() => res.status(200).send())
  }))
*/