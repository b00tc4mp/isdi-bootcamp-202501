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
                vehicleId: '6809f7edb2addc30bc503f84',
                fecha: new Date('2024-05-02T00:00:00.000Z'),
                km: 25000,
                descripcion: 'neumaticos',
                texto: 'cambio de neumaticos',
                image: 'https://rmsgestion.es/wp-content/uploads/2023/11/Factura-Rectificativa-de-Taller-724x1024.jpg'
            }))
            .then(m => {
                maintenanceId = m._id.toString()
            })
    })

    it('succeeds updating maintenance record', () => {
        const updatedData = {
            fecha: new Date('2024-05-02T00:00:00.000Z'),
            km: 25000,
            descripcion: 'neumaticos',
            texto: 'cambio de neumaticos',
            image: 'https://rmsgestion.es/wp-content/uploads/2023/11/Factura-Rectificativa-de-Taller-724x1024.jpg'
        }

        return updateVehicleManteinance(
            maintenanceId,
            updatedData.fecha,
            updatedData.km,
            updatedData.descripcion,
            updatedData.texto,
            updatedData.image
        )
            .then(() => Manteinance.findById(maintenanceId).lean())
            .then(m => {
                expect(m.fecha.toISOString()).to.equal(updatedData.fecha.toISOString())
                expect(m.km).to.equal(updatedData.km)
                expect(m.descripcion).to.equal(updatedData.descripcion)
                expect(m.texto).to.equal(updatedData.texto)
                expect(m.image).to.equal(updatedData.image)
            })
    })

    it('fails on invalid maintenanceId', () => {
        let error

        return updateVehicleManteinance(
            '5f50c31f1c9d440000a6f1',
            new Date(),
            25000,
            'neumaticos',
            'cambio de neumaticos',
            'https://rmsgestion.es/wp-content/uploads/2023/11/Factura-Rectificativa-de-Taller-724x1024.jpg'

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
