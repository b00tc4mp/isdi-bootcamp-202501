import "dotenv/config"
import bcrypt from "bcryptjs"
import { expect } from "chai"

import { data, User } from "../../../data"
import getCurrentUser from "./getCurrentUser"

import { Types } from "mongoose"
import { errors } from "com"

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("getCurrentUser", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => User.deleteMany({}))

    // --- HAPPY PATH ---
    it("succeeds on returning full current user data", () => {
        let returnedUser: any

        return bcrypt.hash("123456", 10)
            .then(hashedPassword => User.create({
                name: "Aaron",
                lastName: "Barrios",
                email: "aaron@barrios.com",
                alias: "aaronb",
                level: "intermediate",
                interests: ["strength", "cardio"],
                password: hashedPassword,
                role: "regular",
                createdAt: new Date(),
                modifiedAt: null
            }))
            .then(user => getCurrentUser(user.id))
            .then(userData => returnedUser = userData)
            .finally(() => {
                expect(returnedUser.alias).to.equal("aaronb")
                expect(returnedUser.level).to.equal("intermediate")
                expect(returnedUser.email).to.equal("aaron@barrios.com")
                expect(returnedUser.name).to.equal("Aaron")
                expect(returnedUser.lastName).to.equal("Barrios")
                expect(returnedUser.role).to.equal("regular")
                expect(returnedUser.interests).to.include("cardio")
            })
    })

    // --- NOTFOUND ERROR PATH ---
    it("fails on NotFound error for non-existent user", () => {
        let catchedError: Error

        return getCurrentUser(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal("User not found!")
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})