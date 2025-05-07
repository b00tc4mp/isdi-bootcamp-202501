import 'dotenv/config'
import { expect } from 'chai'
import { data, Vehicle } from '../../data/index.js'
import { updateVehicle } from './updateVehicle.js'
import { SystemError, DuplicityError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

describe('updateVehicle', () => {
    let vehicleId

    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => {
        return Vehicle.deleteMany({})
            .then(() => Vehicle.create({
                marca: 'Yamaha',
                modelo: 'MT-07',
                año: 2021,
                color: 'negro',
                matricula: '1234FBC',
                km: 10000,
                itv: new Date('2025-01-01T00:00:00.000Z'),
                author: '123456789012345678901234'
            }))
            .then(vehicle => {
                vehicleId = vehicle._id.toString()
            })
    })

    it('succeeds updating a vehicle', () => {
        const newData = {
            marca: 'Yamaha',
            modelo: 'MT-09',
            año: 2022,
            color: 'azul',
            matricula: '5678XYZ',
            km: 5000,
            itv: new Date('2025-06-01T00:00:00.000Z'),
            author: '123456789012345678901234'
        }

        return updateVehicle(vehicleId, newData.marca, newData.modelo, newData.año, newData.color, newData.matricula, newData.km, newData.itv, newData.author)
            .then(() => Vehicle.findById(vehicleId).lean())
            .then(vehicle => {
                expect(vehicle.marca).to.equal(newData.marca)
                expect(vehicle.modelo).to.equal(newData.modelo)
                expect(vehicle.año).to.equal(newData.año)
                expect(vehicle.color).to.equal(newData.color)
                expect(vehicle.matricula).to.equal(newData.matricula)
                expect(vehicle.km).to.equal(newData.km)
                expect(vehicle.itv.toISOString()).to.equal(newData.itv.toISOString())
            })
    })

    it('fails on invalid ID', () => {
        let error

        return updateVehicle('5f50c31f1c9d440000a6f1', 'Honda', 'CBR', 2023, 'rojo', '8888ZZZ', 2000, new Date(), '123')
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.exist
            })
    })

    afterEach(() => Vehicle.deleteMany({}))

    after(() => data.disconnect())
})
