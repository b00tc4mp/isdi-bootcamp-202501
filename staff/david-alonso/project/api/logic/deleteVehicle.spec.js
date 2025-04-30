import { expect } from 'chai'
import { deleteVehicle } from './deleteVehicle.js'
import { Vehicle } from '../data/index.js'
import { data } from '../data/index.js'
import { SystemError } from '../../com/errors.js'

describe('deleteVehicle', () => {
    let vehicleId

    before(() => data.connect(process.env.MONGO_URL, process.env.MONGO_DB_TEST))

    beforeEach(() => {
        return Vehicle.deleteMany()
            .then(() => Vehicle.create({
                marca: 'Yamaha',
                modelo: 'R1',
                año: 2022,
                color: 'azul',
                matricula: '1234XYZ',
                km: 12000,
                itv: new Date('2024-10-01T00:00:00.000Z'),
                author: '5f50c31f1c9d440000a6f4f2'
            }))
            .then(vehicle => {
                vehicleId = vehicle._id.toString()
            })
    })

    it('succeeds on valid vehicleId', () => {
        return deleteVehicle(vehicleId)
            .then(() => Vehicle.findById(vehicleId))
            .then(result => {
                expect(result).to.be.null
            })
    })

    it('fails on invalid vehicleId', () => {
        let error

        return deleteVehicle('5f50c31f1c9d440000a6f1e8')
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.exist
            })
    })

    afterEach(() => Vehicle.deleteMany())
    after(() => data.disconnect())
})
