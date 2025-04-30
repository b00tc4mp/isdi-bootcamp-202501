import 'dotenv/config'
import { data, Manteinance } from '../data/index.js'
import { registerManteinance } from './registerManteinance.js'
import { expect } from 'chai'
import { DuplicityError } from '../../com/errors.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

describe('registerManteinance', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => Manteinance.deleteMany({}))

    it('succeeds on new manteinance', () => {

        return registerManteinance('6809f7edb2addc30bc503f84', new Date('2024-05-02T00:00:00.000Z'), 'neumaticos', 'cambio de neumaticos')
            .then(() => Manteinance.findOne({ descripcion: 'neumaticos' }).lean())
            .then(manteinance => {
                expect(manteinance).to.exist
                expect(manteinance.vehicleId).to.equal('6809f7edb2addc30bc503f84')
                expect(manteinance.fecha.toISOString()).to.equal('2024-05-02T00:00:00.000Z')
                expect(manteinance.descripcion).to.equal('neumaticos')
                expect(manteinance.texto).to.equal('cambio de neumaticos')
            })
    })

    it('fails on existing manteinance', () => {
        let catchedError

        return Manteinance.create({
            vehicleId: '6809f7edb2addc30bc503f84',
            fecha: new Date('2024-05-02T00:00:00.000Z'),
            descripcion: 'neumaticos',
            texto: 'cambio de neumaticos'
        })

            .then(() => registerManteinance('6809f7edb2addc30bc503f84', new Date('2024-05-02T00:00:00.000Z'), 'neumaticos', 'cambio de neumaticos'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('maintenance already exists')
            })
    })

    afterEach(() => Manteinance.deleteMany({}))

    after(() => data.disconnect())
})