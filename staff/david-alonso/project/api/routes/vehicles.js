
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { ObjectId } from 'mongodb'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

import { Vehicle } from '../data/models.js'

const { JWT_SECRET } = process.env

export const vehicles = Router()

// REGISTRAR VEHICULO
vehicles.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { marca, modelo, año, color, matricula, km, itv, author } = req.body

    return logic.registerVehicle(marca, modelo, parseInt(año), color, matricula, parseInt(km), new Date(itv), author)
        .then(() => res.status(201).send())
}))

// EDITAR VEHICULO
vehicles.patch('/:id', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { marca, modelo, año, color, matricula, km, itv, author } = req.body
    const { id } = req.params

    return logic.updateVehicle(id, marca, modelo, parseInt(año), color, matricula, parseInt(km), new Date(itv), author)
        .then(() => res.status(201).send())
}))

// BORRAR UN VEHICULO
vehicles.delete('/:vehicleId', authHandler, withErrorHandling((req, res) => {
    const { vehicleId } = req.params

    return logic.deleteVehicle(vehicleId)
        .then(() => res.status(204).send())
}))

// DEVOLVER LOS VEHICULOS GUARDADOS DE UN USUARIO
vehicles.get('/user/:userId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req.params

    return logic.getVehicles(userId)
        .then(vehicles => res.json(vehicles))
}))

// OBTENER UN VEHICULO POR ID
vehicles.get('/:id', authHandler, withErrorHandling((req, res) => {
    const { id } = req.params;

    // Convierte el id de la URL a ObjectId
    const objectId = new ObjectId(id)

    return Vehicle.findById(objectId)  // Aquí usamos el objectId para la búsqueda
        .then(vehicle => {
            if (!vehicle) return res.status(404).send('No encontrado');
            res.json(vehicle);
        });
}))