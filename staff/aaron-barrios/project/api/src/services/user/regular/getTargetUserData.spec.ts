import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"

import { data, User } from "../../../data"
import getTargetUserData from "./getTargetUserData"

import { Types } from "mongoose"
import { errors } from "com"

const { ObjectId } = Types
const { NotFoundError } = errors

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("get Target User Data", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => User.deleteMany({}))

    // --- HAPPY PATH ---
    it("succeeds on retrieving target user data", () => {
        return bcrypt.hash("123456", 10)
            .then(hashedPassword => User.create({
                name: "Aaron",
                lastName: "Barrios",
                email: "aaron@bar.com",
                alias: "aa",
                level: "veteran",
                password: hashedPassword
            }))
            .then(user => getTargetUserData(user.id))
            .then(result => {
                expect(result).to.deep.equal({
                    name: "Aaron",
                    lastName: "Barrios",
                    alias: "aa",
                    email: "aaron@bar.com",
                    level: "veteran"
                })
            })
    })


    // --- NOT FOUND PATH ---
    it("fails on non existing user", () => {
        const fakeId = new ObjectId().toString()
        let error: Error

        return getTargetUserData(fakeId)
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("User not found")
            })
    })

    afterEach(() => User.deleteMany({}))
    after(() => data.disconnect())
})