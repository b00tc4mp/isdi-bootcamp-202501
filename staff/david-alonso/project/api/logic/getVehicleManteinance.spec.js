import 'dotenv/config'
import { data, Vehicle, Manteinance } from '../data/index.js'
import { getVehicleManteinances } from './getVehicleManteinance.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

describe('getVehicleManteinances', () => {
    let vehicleId

    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => {
        return Promise.all([
            Vehicle.deleteMany({}),
            Manteinance.deleteMany({})
        ])
            .then(() => Vehicle.create({

                marca: 'Yamaha',
                modelo: 'MT-07',
                año: 2022,
                color: 'azul',
                matricula: '7890XYZ',
                km: 10000,
                itv: new Date('2025-01-01T00:00:00.000Z'),
                author: '6809f7edb2addc30bc503f49'
            }))
            .then(vehicle => {
                vehicleId = vehicle._id.toString()

                return Manteinance.create({
                    vehicleId,
                    fecha: new Date('2024-04-01T00:00:00.000Z'),
                    descripcion: 'aceite',
                    texto: 'cambio de aceite'
                })
            })
    })

    it('succeeds retrieving manteinances for existing vehicle', () => {
        return getVehicleManteinances(vehicleId)
            .then(manteinances => {
                expect(manteinances).to.be.an('array')
                expect(manteinances).to.have.lengthOf(1)

                const m = manteinances[0]

                expect(m.descripcion).to.equal('aceite')
                expect(m.texto).to.equal('cambio de aceite')
                expect(new Date(m.fecha).toISOString()).to.equal('2024-04-01T00:00:00.000Z')
                expect(m.vehicleId.toString()).to.equal(vehicleId)
            })
    })

    it('fails if vehicle does not exist', () => {
        const fakeId = '6809f7edb2addc30bc503f84'
        let error

        return getVehicleManteinances(fakeId)
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('vehicle not found')
            })
    })

    afterEach(() => Promise.all([
        Vehicle.deleteMany({}),
        Manteinance.deleteMany({})
    ]))

    after(() => data.disconnect())
})
