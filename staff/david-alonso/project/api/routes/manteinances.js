
import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

export const manteinances = Router()

// REGISTRAR MANTENIMIENTO
manteinances.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { vehicleId, fecha, descripcion, texto } = req.body

    return logic.registerManteinance(vehicleId, new Date(fecha), descripcion, texto)
        .then(() => res.status(201).send())
}))

// DEVOLVER LOS MANTENIMIENTOS GUARDADOS DE UN VEHICULO
manteinances.get('/:vehicleId', authHandler, withErrorHandling((req, res) => {
    const { vehicleId } = req.params

    return logic.getVehicleManteinances(vehicleId)
        .then(manteinances => res.json(manteinances))
}))