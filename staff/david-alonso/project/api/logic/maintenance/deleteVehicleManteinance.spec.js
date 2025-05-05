import 'dotenv/config'
import { expect } from 'chai'
import { data, Manteinance } from '../../data/index.js'
import { deleteVehicleManteinance } from './deleteVehicleManteinance.js'
import { SystemError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

describe('deleteVehicleManteinance', () => {
    let maintenanceId

    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => {
        return Manteinance.deleteMany()
            .then(() => Manteinance.create({
                vehicleId: '6809f7edb2addc30bc503f84',
                fecha: new Date('2024-05-01'),
                descripcion: 'Cambio de aceite',
                texto: 'Se cambió el aceite del motor'
            }))
            .then(maintenance => {
                maintenanceId = maintenance._id.toString()
            })
    })

    it('succeeds deleting an existing maintenance', () => {
        return deleteVehicleManteinance(maintenanceId)
            .then(() => Manteinance.findById(maintenanceId))
            .then(result => {
                expect(result).to.be.null
            })
    })

    it('fails if maintenance does not exist', () => {
        const fakeId = '5f50c31f1c9d440000a6f1e8'
        return deleteVehicleManteinance(fakeId)
            .then(() => Manteinance.findById(fakeId))
            .then(result => {
                expect(result).to.be.null
            })
    })


    afterEach(() => Manteinance.deleteMany())

    after(() => data.disconnect())
})
