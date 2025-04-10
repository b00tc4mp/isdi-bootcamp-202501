import "dotenv/config"
import { data, User } from "../../data"
import registerUser from "./registerUser"
import { expect } from "chai"
import bcrypt from "bcryptjs"
import { errors } from "com"

const { DuplicityError } = errors

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe.only('registerUser', () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => User.deleteMany({}))

    //--- HAPPY PATH ---
    it('succeds on new user', () => {
        debugger
        let result2: void

        return registerUser('Manu', 'Barzi', 'manu@barzi.com', 'manu', 'mamama')
            .then(result => result2 = result)
            .finally(() => expect(result2).to.be.undefined)
            .then(() => User.findOne({ alias: 'manu' }).lean())
            .then(user => {
                expect(user).to.exist
                expect(user?.name).to.equal('Manu')
                expect(user?.lastName).to.equal('Barzi')
                expect(user?.email).to.equal('manu@barzi.com')
                expect(user?.alias).to.equal('manu')

                return bcrypt.compare('mamama', user!.password!)
            })
            .then(match => expect(match).to.be.true)
    })

    //--- DUPLICITY ERROR PATH ---
    it('fails on existing user', () => {
        let catchedError: Error

        return bcrypt.hash('mamama', 10)
            .then(hashedPassword => {
                return User.create({
                    name: 'Manu',
                    lastName: 'Barzi',
                    email: 'manu@barzi.com',
                    alias: 'manu',
                    password: hashedPassword
                })
            })

            .then(() => registerUser('Manu', 'Barzi', 'manu@barzi.com', 'manu', 'mamama'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('User already exists!')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})
