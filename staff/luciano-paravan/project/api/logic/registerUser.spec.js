import 'dotenv/config'
import { expect } from 'chai'
import { registerUser } from './registerUser.js'
import { data, User } from '../data/index.js'
import { brcypt } from 'bcryptjs'
import { SystemError } from 'com/errors.js'

const { MONGO_URL, DB_NAME } = process.env

describe('registerUSer', () => {
    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => User.deleteMany({}))

    it('succeds on new user', () => {
        let result2

        return registerUser('diego armando', 'maradona', 'diego@gmail.com', 'maradona', '123123123')
            .then(result => result2 = result)
            .finally(() => expect(result2).to.be.undefined)
            .then(() => User.findOne({ username: 'maradona' }).lean())
            .then((user => {
                expect(user.name).to.equal('diego armando')
                expect(user.lastname).to.equal('maradona')
                expect(user.email).to.equal('diego@gmail.com')
                expect(user.username).to.equal('maradona')

                return bcrypt.compare('123123123', user.password)
            }))
            .then(match => expect(match).to.be.true)

    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})