import "dotenv/config"
import { expect } from "chai"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

import { data, User } from "../../../data"
import changePassword from "./changePassword"
import { errors } from "com"

const { NotFoundError, ValidationError } = errors
const { ObjectId } = Types
const { MONGO_URI, MONGO_DB_NAME } = process.env

describe("changePassword", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))

    beforeEach(() => User.deleteMany({}))

    // --- HAPPY PATH ---
    it("successfully changes the user's password", () => {
        let userId: string
        const oldPassword = "oldpass123"
        const newPassword = "newpass456"

        return bcrypt.hash(oldPassword, 10)
            .then(hashed => User.create({
                name: "Test",
                lastName: "User",
                alias: "testuser",
                email: "test@example.com",
                password: hashed
            }))
            .then(user => {
                userId = user.id
                return changePassword(userId, oldPassword, newPassword)
            })
            .then(() => User.findById(userId))
            .then(updated => {
                expect(updated).to.exist
                return bcrypt.compare(newPassword, updated!.password)
            })
            .then(isMatch => {
                expect(isMatch).to.be.true
            })
    })

    // --- WRONG CURRENT PASSWORD PATH ---
    it("fails if current password is incorrect", () => {
        return bcrypt.hash("correctpass", 10)
            .then(hashed => User.create({
                alias: "wrongpass",
                email: "wrong@pass.com",
                password: hashed
            }))
            .then(user =>
                changePassword(user.id, "wrongpass123", "newpass123")
                    .catch(error => {
                        expect(error).to.be.instanceOf(ValidationError)
                        expect(error.message).to.equal("Current password is incorrect")
                    })
            )
    })

    // --- USER NOT FOUND PATH ---
    it("fails if user does not exist", () => {
        const fakeId = new ObjectId().toString()
        return changePassword(fakeId, "irrelevant", "newpass123")
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("User not found!")
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})