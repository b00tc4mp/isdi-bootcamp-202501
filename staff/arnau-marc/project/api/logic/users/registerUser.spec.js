import 'dotenv/config'
import { data, User } from '../data/index.js'
import { registerUser } from './registerUser.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { DuplicityError, SystemError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('registerUser', () => { 
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({})) 
    
    // TEST 1: Add succesfuly new user
    it('succeeds on new user', () => { 
        let result2 

        return registerUser('arnau', 'ar@nau.com', 'arnau', '123123123') 
            .then(result => result2 = result)
            .finally(() => expect(result2).to.be.undefined) 
            .then(() => User.findOne({ username: 'arnau' }).lean()) 
            .then(user => {
               
                expect(user.name).to.equal('arnau') 
                expect(user.email).to.equal('ar@nau.com')
                expect(user.username).to.equal('arnau')

                return bcrypt.compare('123123123', user.password) 
            })
            .then(match => expect(match).to.be.true) 
    })

    // TEST 2: Verify RegisterUser does not allow create a duplicate User 
    it('fails on existing user', () => { 
        let catchedError 

      
        return User.create({
            name: 'Arnau',
            email: 'ar@nau.com',
            username: 'arnau',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => registerUser('Arnau', 'ar@nau.com', 'arnau', '123123123')) 
            .catch(error => catchedError = error)
            .finally(() => {
               
                expect(catchedError).to.be.instanceOf(DuplicityError) 
                expect(catchedError.message).to.equal('user already exists') 
            })
    })

    afterEach(() => User.deleteMany({})) 
    after(() => data.disconnect()) 
})

