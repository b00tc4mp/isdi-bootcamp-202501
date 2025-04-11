import "dotenv/config"
import bcrypt from "bcryptjs"
import { expect } from "chai"

import { data, User } from "../../../data"
import getUserData from "./getUserData"

import { Types } from "mongoose"
import { errors } from "com"
import { string } from "zod"
import { level } from "winston"

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("getUserData", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => User.deleteMany({}))

    // --- HAPPY PATH ---
    it("succeds on bringing User data", () => {
        let returnedUserAlias: string
        let returnedUserLevel: string

        return bcrypt.hash("dadada", 10)
            .then(hashedPassword => User.create({
                name: "David",
                lastName: "Alonso",
                email: "da@vid.com",
                alias: "david",
                level: "beginner",
                password: hashedPassword
            }))
            .then(user => getUserData(user.id))
            .then(userData => {
                returnedUserAlias = userData.alias
                returnedUserLevel = userData.level
            })
            .finally(() => {
                expect(returnedUserAlias).to.equal("david")
                expect(returnedUserLevel).to.equal("beginner")
            })
    })

    // --- NOTFOUND ERROR PATH ---
    it("fails on NotFound user path", () => {
        let catchedError: Error

        return getUserData(new ObjectId().toString())
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})