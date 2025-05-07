import 'dotenv/config'
import { data, Manteinance } from '../../data/index.js'
import { registerManteinance } from './registerManteinance.js'
import { expect } from 'chai'
import { DuplicityError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

describe('registerManteinance', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => Manteinance.deleteMany({}))

    it('succeeds on new manteinance', () => {
        let manteinance2

        return registerManteinance('6809f7edb2addc30bc503f84', new Date('2024-05-02T00:00:00.000Z'), 25000, 'neumaticos', 'cambio de neumaticos', 'https://rmsgestion.es/wp-content/uploads/2023/11/Factura-Rectificativa-de-Taller-724x1024.jpg')
            .then(() => Manteinance.findOne({ descripcion: 'neumaticos' }).lean())
            .then(manteinance => manteinance2 = manteinance)
            .finally(() => {
                expect(manteinance2).to.exist
                expect(manteinance2.vehicleId).to.equal('6809f7edb2addc30bc503f84')
                expect(manteinance2.fecha.toISOString()).to.equal('2024-05-02T00:00:00.000Z')
                expect(manteinance2.km).to.equal(25000)
                expect(manteinance2.descripcion).to.equal('neumaticos')
                expect(manteinance2.texto).to.equal('cambio de neumaticos')
                expect(manteinance2.image).to.equal('https://rmsgestion.es/wp-content/uploads/2023/11/Factura-Rectificativa-de-Taller-724x1024.jpg')
            })
    })

    it('fails on existing manteinance', () => {
        let catchedError

        return Manteinance.create({
            vehicleId: '6809f7edb2addc30bc503f84',
            fecha: new Date('2024-05-02T00:00:00.000Z'),
            km: 25000,
            descripcion: 'neumaticos',
            texto: 'cambio de neumaticos',
            image: 'https://rmsgestion.es/wp-content/uploads/2023/11/Factura-Rectificativa-de-Taller-724x1024.jpg'
        })

            .then(() => registerManteinance('6809f7edb2addc30bc503f84', new Date('2024-05-02T00:00:00.000Z'), 25000, 'neumaticos', 'cambio de neumaticos', 'https://rmsgestion.es/wp-content/uploads/2023/11/Factura-Rectificativa-de-Taller-724x1024.jpg'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('maintenance already exists')
            })
    })

    afterEach(() => Manteinance.deleteMany({}))

    after(() => data.disconnect())
})