import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai' //chai tiene varias herramientas para assertar cosas, expect es una
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeds on existing user', () => {
        let returnedUserId

        debugger
        return User.create({
            name: 'Manu Barzi',
            email: 'manu@barzi.com',
            username: 'manubarzi',
            password: '$2b$10$ERxBwIezegR8XtXQWM6eZeudwOvjSWqjFp4xsakzJqjQyiVCiSvAm'
        })
            .then(() => authenticateUser('manubarzi', '123123123'))
            .then(userId => returnedUserId = userId)
            .finally(() => expect(returnedUserId).to.be.a.string)
            .then(() => User.findOne({ username: 'manubarzi' }).lean())
            .then(user => { debugger; expect(user._id.toString()).to.equal(returnedUserId) })
    })

    it('fails on non-existing user', () => {
        let catchedError

        return authenticateUser('manubarzi', '123123123')
            .catch(error => catchedError = error) //guardo el error en la variable catched error
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    it('fails on existing user but wrong password', () => {
        let catchedError

        debugger
        return User.create({
            name: 'Manu Barzi',
            email: 'manu@barzi.com',
            username: 'manubarzi',
            password: '$2b$10$ERxBwIezegR8XtXQWM6eZeudwOvjSWqjFp4xsakzJqjQyiVCiSvAm'
        })
            .then(() => authenticateUser('manubarzi', '123123144'))
            .catch(error => catchedError = error) //guardo el error en la variable catched error
            .finally(() => {
                expect(catchedError).to.be.instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('wrong credentials')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
