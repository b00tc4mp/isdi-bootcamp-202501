import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const vehicles = Router()

// REGISTRAR VEHICULO
vehicles.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { marca, modelo, año, color, matricula, km, itv, author } = req.body

    return logic.registerVehicle(marca, modelo, parseInt(año), color, matricula, parseInt(km), new Date(itv), author)
        .then(() => res.status(201).send())
}))

// DEVOLVER LOS VEHICULOS GUARDADOS
vehicles.get('/:userId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getVehicles(userId)
        .then(vehicles => res.json(vehicles))
}))