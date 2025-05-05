import 'dotenv/config'
import { expect } from 'chai'
import { data, Manteinance } from '../../data/index.js'
import { updateVehicleManteinance } from './updateVehicleManteinance.js'
import { SystemError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

describe('updateVehicleManteinance', () => {
    let maintenanceId

    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => {
        return Manteinance.deleteMany({})
            .then(() => Manteinance.create({
                fecha: new Date('2024-01-01T00:00:00.000Z'),
                descripcion: 'Cambio de aceite',
                texto: 'Aceite 10W40, revisión general',
                vehicleId: '123456789012345678901234'
            }))
            .then(m => {
                maintenanceId = m._id.toString()
            })
    })

    it('succeeds updating maintenance record', () => {
        const updatedData = {
            fecha: new Date('2024-06-15T00:00:00.000Z'),
            descripcion: 'Cambio de neumáticos',
            texto: 'Neumáticos Michelin nuevos'
        }

        return updateVehicleManteinance(
            maintenanceId,
            updatedData.fecha,
            updatedData.descripcion,
            updatedData.texto
        )
            .then(() => Manteinance.findById(maintenanceId).lean())
            .then(m => {
                expect(m.descripcion).to.equal(updatedData.descripcion)
                expect(m.texto).to.equal(updatedData.texto)
                expect(m.fecha.toISOString()).to.equal(updatedData.fecha.toISOString())
            })
    })

    it('fails on invalid maintenanceId', () => {
        let error

        return updateVehicleManteinance(
            '5f50c31f1c9d440000a6f1',
            new Date(),
            'Revisión',
            'Cambio de filtro'
        )
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.exist
            })
    })

    afterEach(() => Manteinance.deleteMany({}))
    after(() => data.disconnect())
})
