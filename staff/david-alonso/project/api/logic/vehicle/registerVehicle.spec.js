import 'dotenv/config'
import { data, Vehicle } from '../../data/index.js'
import { registerVehicle } from './registerVehicle.js'
import { expect } from 'chai'
import { DuplicityError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

describe('registerVehicle', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => Vehicle.deleteMany({}))

    it('succeeds on new vehicle', () => {
        let vehicle2

        return registerVehicle('Honda', 'CBR 600', 2023, 'rojo', '2545DCS', 25000, new Date('2024-05-02T00:00:00.000Z'), '6809f7edb2addc30bc503f84')
            .then(() => Vehicle.findOne({ matricula: '2545DCS' }).lean())
            .then(vehicle => vehicle2 = vehicle)
            .finally(() => {
                expect(vehicle2).to.exist
                expect(vehicle2.marca).to.equal('Honda')
                expect(vehicle2.modelo).to.equal('CBR 600')
                expect(vehicle2.año).to.equal(2023)
                expect(vehicle2.color).to.equal('rojo')
                expect(vehicle2.matricula).to.equal('2545DCS')
                expect(vehicle2.km).to.equal(25000)
                expect(vehicle2.itv.toISOString()).to.equal('2024-05-02T00:00:00.000Z')
                expect(vehicle2.author).to.equal('6809f7edb2addc30bc503f84')

            })
    })

    it('fails on existing vehicle', () => {
        let catchedError

        return Vehicle.create({
            marca: 'Honda',
            modelo: 'CBR 600',
            año: 2023,
            color: 'rojo',
            matricula: '2545DCS',
            km: 25000,
            itv: new Date('2024-05-02T00:00:00.000Z'),
            author: '6809f7edb2addc30bc503f84'
        })

            .then(() => registerVehicle('Honda', 'CBR 600', 2023, 'rojo', '2545DCS', 25000, new Date('2024-05-02T00:00:00.000Z'), '6809f7edb2addc30bc503f84'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('vehicle already exists')
            })
    })

    afterEach(() => Vehicle.deleteMany({}))

    after(() => data.disconnect())
})