import 'dotenv/config'
import { data, User, Vehicle } from '../data/index.js'
import { getVehicles } from './getVehicles.js'
import { expect } from 'chai'
import { NotFoundError } from '../../com/errors.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

describe('getVehicles', () => {
    let userId, vehicleId

    before(() => data.connect(MONGO_URL, MONGO_DB_TEST))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Vehicle.deleteMany({})
        ])
            .then(() => User.create({
                name: 'Dallen',
                email: 'dallen@31.com',
                password: '123123123'
            }))
            .then(user => {
                userId = user._id.toString()

                return Vehicle.create({
                    marca: 'Honda',
                    modelo: 'CBR 600',
                    año: 2023,
                    color: 'rojo',
                    matricula: '4869SDZ',
                    km: 15000,
                    itv: new Date('2024-05-02T00:00:00.000Z'),
                    author: userId
                })
            })
            .then(vehicle => {
                vehicleId = vehicle._id.toString()
            })
    })

    it('succeeds retrieving vehicles for existing user', () => {
        return getVehicles(userId)
            .then(vehicles => {
                expect(vehicles).to.be.an('array')
                expect(vehicles).to.have.lengthOf(1)

                const vehicle = vehicles[0]

                expect(vehicle).to.exist
                expect(vehicle.marca).to.equal('Honda')
                expect(vehicle.modelo).to.equal('CBR 600')
                expect(vehicle.año).to.equal(2023)
                expect(vehicle.color).to.equal('rojo')
                expect(vehicle.matricula).to.equal('4869SDZ')
                expect(vehicle.km).to.equal(15000)
                expect(vehicle.itv.toISOString()).to.equal('2024-05-02T00:00:00.000Z')
                expect(vehicle.id).to.equal(vehicleId)
            })
    })

    it('fails if user does not exist', () => {
        const fakeUserId = '6809f7edb2addc30bc503f49'
        let error

        return getVehicles(fakeUserId)
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([
        User.deleteMany({}),
        Vehicle.deleteMany({})
    ]))

    after(() => data.disconnect())
})
