import 'dotenv/config'
import { data, User } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'
import { expect } from 'chai' //chai tiene varias herramientas para assertar cosas, expect es una
import { NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUserUsername', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeds on existing user', () => {
        let returnedUsername

        return User.create({
            name: 'Manu Barzi',
            email: 'manu@barzi.com',
            username: 'manubarzi',
            password: '$2b$10$ERxBwIezegR8XtXQWM6eZeudwOvjSWqjFp4xsakzJqjQyiVCiSvAm'
        })
            .then(user => getUserUsername(user.id))
            .then(username => returnedUsername = username)
            .finally(() => expect(returnedUsername).to.equal('Manu Barzi'))
    })

    it('fails on non-existing user', () => {
        let catchedError

        return getUserUsername(new ObjectId().toString())
            .catch(error => catchedError = error) //guardo el error en la variable catched error
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
