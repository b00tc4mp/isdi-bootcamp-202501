import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const vehicles = Router()

// REGISTRAR VEHICULO
vehicles.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    const { marca, modelo, año, matricula, km, itv } = req.body

    return logic.registerVehicle(marca, modelo, parseInt(año), matricula, parseInt(km), new Date(itv))
        .then(() => res.status(201).send())
}))