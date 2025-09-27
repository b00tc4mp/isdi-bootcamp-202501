import 'dotenv/config'
import { data, User } from '../data/index.js'
import { registerUser } from './registerUser.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { DuplicityError } from 'com/errors.js'

const { MONGO_URL, DB_NAME } = process.env

describe('registerUser', () => {
    before(() => data.connect(MONGO_URL, DB_NAME))

    beforeEach(() => User.deleteMany({}))

    it('succeds on new user', () => {
        let result2

        debugger
        return registerUser('diego', 'maradona', 'diego@gmail.com', 'eldiez', '123123123')
            .then(result => result2 = result)
            .finally(() => expect(result2).to.be.undefined)
            .then(() => User.findOne({ username: 'eldiez' }).lean())
            .then(user => {
                expect(user.name).to.equal('diego')
                expect(user.lastname).to.equal('maradona')
                expect(user.email).to.equal('diego@gmail.com')
                expect(user.username).to.equal('eldiez')

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on existing user', () => {
        let catchedError

        return User.create({
            name: 'Diego Armando',
            lastname: 'Maradona',
            email: 'diego@gmail.com',
            username: 'maradona',
            password: '$2b$10$zPnAK0QgD1bnbMtWIEcHZug.2oG8ZE7WP48EBvGQYwGtDgeSfKAlO'
        })
            .then(() => registerUser('Diego Armando', 'Maradona', 'diego@gmail.com', 'maradona', '123123123'))
            .catch((error => catchedError = error))
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('user already exists')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})