import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"

import { data, User } from "../../../data"
import updateUserData from "./updateUserData"
import { Types } from "mongoose"
import { errors } from "com"

const { NotFoundError } = errors
const { ObjectId } = Types

const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("updateUserData", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => User.deleteMany({}))

    // --- HAPPY PATH ---
    it("updates user fields successfully", () => {
        let userId: string

        return bcrypt.hash("password", 10)
            .then(hashedPassword => User.create({
                name: "David",
                lastName: "Alonso",
                email: "david@test.com",
                alias: "david",
                level: "beginner",
                interests: ["cardio"],
                password: hashedPassword
            }))
            .then(user => {
                userId = user.id
                return updateUserData(userId, {
                    name: "Updated",
                    level: "intermediate",
                    interests: ["strength", "mobility"]
                })
            })
            .then(() => User.findById(userId))
            .then(updated => {
                expect(updated).to.exist
                expect(updated!.name).to.equal("Updated")
                expect(updated!.level).to.equal("intermediate")
                expect(updated!.interests).to.include("strength")
                expect(updated!.interests).to.include("mobility")
            })
    })

    // --- USER NOT FOUND PATH ---
    it("fails when user does not exist", () => {
        let caughtError: Error

        return updateUserData(new ObjectId().toString(), { name: "Ghost" })
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.be.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal("User not found")
            })
    })

    afterEach(() => User.deleteMany({}))
    after(() => data.disconnect())
})
