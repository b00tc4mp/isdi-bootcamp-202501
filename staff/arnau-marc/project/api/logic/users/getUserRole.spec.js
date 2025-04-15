import 'dotenv/config'
import { data, User } from '../../data/index.js'
import { getUserRole } from './getUserRole.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'


import { Error as MongooseError } from 'mongoose'

const { ValidationError} = MongooseError


const { NotFoundError } = errors

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUserRole', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))
    
    it('succeds on get user role', () => {
        let returnerUserRole

        return User.create({
            name: 'arnau',
            surname: 'romero',
            email: 'arnau@gmail.com',
            username: 'arnau_sots',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => getUserRole(user.id))
            .then(role => returnerUserRole = role)
            .finally(() => expect(returnerUserRole).to.equal('regular'))
    })

    it('fail on non existing user', () => {
        let catchedError

            return getUserRole(new ObjectId().toString())
                .catch(error => catchedError = error)
                .finally(() => {
                    expect(catchedError).to.be.instanceOf(NotFoundError),
                    expect(catchedError.message).to.equal('User not found')
                 })
    })



    it('fail on not expected role', () => {
        let catchedError

        return User.create({
            name: 'arnau',
            surname: 'romero',
            email: 'arnau@gmail.com',
            username: 'arnau_sots',
            role: 'master',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => getUserRole(user.id))
            .catch(error => catchedError = error)
            .finally(() => { 
            expect(catchedError).to.be.instanceOf(ValidationError),
            expect(catchedError.message).to.include('is not a valid enum value for path `role`')
            
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())

})