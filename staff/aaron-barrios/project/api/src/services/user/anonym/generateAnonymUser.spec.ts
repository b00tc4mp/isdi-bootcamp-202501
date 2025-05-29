import "dotenv/config"
import { expect } from "chai"
import jwt from "jsonwebtoken"

import { data, User } from "../../../data"
import generateAnonymUser from "./generateAnonymUser"

const { JWT_SECRET, MONGO_URI, MONGO_DB_NAME } = process.env

describe("generateAnonymUser", () => {
    before(() => data.connect(MONGO_URI!, MONGO_DB_NAME!))
    beforeEach(() => User.deleteMany({}))

    // --- HAPPY PATH ---
    it("succeeds on creating an Anonym User", () => {
        let returnedToken: string
        let decoded: any

        return generateAnonymUser()
            .then(token => {
                returnedToken = token
                decoded = jwt.verify(token, JWT_SECRET!)

                return User.findById(decoded.sub).lean()
            })
            .then(user => {
                expect(returnedToken).to.be.a("string")
                expect(decoded).to.have.property("role", "anonym")
                expect(user).to.not.be.null
                expect(user?.role).to.equal("anonym")
                expect(user?.alias).to.match(/^a/)
                expect(user?.email).to.match(/^anon.*@anon\.com$/)
            })
    })

    afterEach(() => User.deleteMany({}))
    after(() => data.disconnect())
})