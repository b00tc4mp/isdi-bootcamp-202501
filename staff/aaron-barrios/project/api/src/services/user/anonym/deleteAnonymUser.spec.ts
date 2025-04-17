import "dotenv/config"
import { expect } from "chai"
import { Types } from "mongoose"
import bcrypt from "bcryptjs"

import { data, User } from "../../../data"
import deleteAnonymUser from "./deleteAnonymUser"

import { errors } from "com"

const { NotFoundError, AuthorizationError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("delete AnonymUser", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => User.deleteMany({}))

    // --- HAPPY PATH ---
    it("succeeds on deleting an Anonym User(yourself)", () => {
        const userId = new ObjectId().toString()

        return User.create({
            _id: userId,
            alias: `a${Date.now()}`,
            email: `anon${Date.now()}@anon.com`,
            password: "fakePassword123",
            role: "anonym"
        })
            .then(() => deleteAnonymUser(userId))
            .then(() => User.findById(userId).lean())
            .then(user => {
                expect(user).to.be.null
            })
    })

    // --- PATH: USER NOT FOUND ---
    it("fails when user does not exist", () => {
        let caughtError: Error

        return deleteAnonymUser(new ObjectId().toString())
            .catch(error => (caughtError = error))
            .finally(() => {
                expect(caughtError).to.be.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal("Anonym user not found")
            })
    })

    // --- PATH: USER IS NOT ANONYM ---
    it("fails when user is not anonym", () => {
        let userId: string
        let caughtError: Error

        return bcrypt.hash("123456", 10)
            .then(hash => User.create({
                alias: "nonAnonUser",
                email: "user@email.com",
                password: hash,
                role: "regular"
            }))
            .then(user => {
                userId = user.id
                return deleteAnonymUser(userId)
            })
            .catch(error => (caughtError = error))
            .finally(() => {
                expect(caughtError).to.be.instanceOf(AuthorizationError)
                expect(caughtError.message).to.equal("Only anonymous users can be deleted this way.")
            })
    })

    afterEach(() => User.deleteMany({}))
    after(() => data.disconnect())
})