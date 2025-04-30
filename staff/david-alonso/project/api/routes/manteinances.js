
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

// EDITAR MANTENIMIENTO
manteinances.patch('/:maintenanceId', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { fecha, descripcion, texto } = req.body
    const { maintenanceId } = req.params

    return logic.updateVehicleManteinance(maintenanceId, new Date(fecha), descripcion, texto)
        .then(() => res.status(201).send())
}))

// BORRAR UN MANTENIMIENTO
manteinances.delete('/:maintenanceId', authHandler, withErrorHandling((req, res) => {

    const { maintenanceId } = req.params

    return logic.deleteVehicleManteinance(maintenanceId)
        .then(() => res.status(204).send())
}))