import 'dotenv/config'
import { data, User } from '../data/index.js'
import { registerUser } from './registerUser.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { DuplicityError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('registerUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on register user', () => {
        let result2

        return registerUser('Abeja Amarilla', 'abeja@amarilla.com', '123123aa')
            .then(result => result2 = result)
            .finally(() => expect(result2).to.be.undefined)
            .then(() => User.findOne({ name: 'Abeja Amarilla'}).lean())
            .then(user => {
                expect(user.name).to.equal('Abeja Amarilla')
                expect(user.email).to.equal('abeja@amarilla.com')
                
                return bcrypt.compare('123123aa', user.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('crear usuario existente', () => {
        let catchedError

        return User.create({
            name: 'Burro Blanco',
            email: 'burro@blanco.com',
            password: '123123aa' 
            
        })
            .then(() => registerUser('Burro Blanco', 'burro@blanco.com', '123123aa'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('user already exists')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})