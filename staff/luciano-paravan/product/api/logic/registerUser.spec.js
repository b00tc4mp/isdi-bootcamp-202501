import 'dotenv/config'
import { data, User } from '../data/index.js'
import { registerUser } from './registerUser.js'
import { expect } from 'chai' //chai tiene varias herramientas para assertar cosas, expect es una
import bcrypt from 'bcryptjs'
import { DuplicityError, SystemError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('registeruser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeds on new user', () => {
        let result2

        return registerUser('Manu Barzi', 'manu@barzi.com', 'manubarzi', '123123123')
            .then(result => result2 = result)
            .finally(() => expect(result2).to.be.undefined)
            .then(() => User.findOne({ username: 'manubarzi' }).lean())
            .then(user => {
                expect(user.name).to.equal('Manu Barzi')
                expect(user.email).to.equal('manu@barzi.com')
                expect(user.username).to.equal('manubarzi')

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on existing user', () => {
        let catchedError

        //debugger
        return User.create({
            name: 'Manu Barzi',
            email: 'manu@barzi.com',
            username: 'mmanubarzi',
            password: '$2b$10$ERxBwIezegR8XtXQWM6eZeudwOvjSWqjFp4xsakzJqjQyiVCiSvAm'
        })
            .then(() => registerUser('Manu Barzi', 'manu@barzi.com', 'manubarzi', '123123123'))
            .catch(error => catchedError = error) //guardo el error en la variable catched error
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('user already exists')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
