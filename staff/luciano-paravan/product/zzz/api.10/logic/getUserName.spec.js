import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserName } from './getUserName.js'
import { expect } from 'chai' //chai tiene varias herramientas para assertar cosas, expect es una
import { CredentialsError, NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUserName', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeds on existing user', () => {
        let returnedName

        return User.create({
            name: 'Manu Barzi',
            email: 'manu@barzi.com',
            username: 'manubarzi',
            password: '$2b$10$ERxBwIezegR8XtXQWM6eZeudwOvjSWqjFp4xsakzJqjQyiVCiSvAm'
        })
            .then(user => getUserName(user.id))
            .then(name => returnedName = name)
            .finally(() => expect(returnedName).to.equal('Manu Barzi'))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return getUserName(new ObjectId().toString())
            .catch(error => catchedError = error) //guardo el error en la variable catched error
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
