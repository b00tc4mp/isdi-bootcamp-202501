import "dotenv/config";
import { errors } from "com";
import { data, User } from "../data/index.js";
import { authenticateUser } from "./authenticateUser.js";
import { expect } from "chai";
import { CredentialsError, NotFoundError } from "com/errors.js";

const { MONGO_URL, MONGO_DB } = process.env;

const { SystemError } = errors;

console.info("TEST authenticateUser");

describe("authenticateUser", () => {
  before(() => {
    data.connect(MONGO_URL, MONGO_DB);
  });

  beforeEach(() => {
    return User.deleteMany({});
  });

  it("succeeds on existing user", () => {
    let returnedUserId;

    //we don't user registerUser logic because we want the logics to be separated
    //when we test
    return User.create({
      name: "Sergi",
      username: "SerGi",
      email: "ser@gi.com",
      password: "$2b$12$XePBJgFgYNcwFk9X2YFJK.MIEE7soiPZznIqeameT9PWuhDG3dHEa",
    })
      .then(() => authenticateUser("SerGi", "123123123"))
      .then((userId) => (returnedUserId = userId))
      .finally(() => expect(returnedUserId).to.be.a.string)
      .then(() => User.findOne({ username: "SerGi" }).lean())
      .then((user) => expect(user._id.toString()).to.equal(returnedUserId));
  });

  it("fails on non-existing user", () => {
    let catchedError;

    return authenticateUser("Ar Nau", "123123123")
      .catch((error) => (catchedError = error))
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError);
        expect(catchedError.message).to.equal("user not found");
      });
  });

  it("fails on existing user but wrong password", () => {
    let catchedError;

    return User.create({
      name: "Sergi",
      username: "SerGi",
      email: "ser@gi.com",
      password: "$2b$12$XePBJgFgYNcwFk9X2YFJK.MIEE7soiPZznIqeameT9PWuhDG3dHEa",
    })
      .then(() => authenticateUser("SerGi", "123123124"))
      .catch((error) => (catchedError = error))
      .finally(() => {
        expect(catchedError).to.be.instanceOf(CredentialsError);
        expect(catchedError.message).to.equal("wrong credentials");
      });
  });

  afterEach(() => {
    return User.deleteMany({});
  });

  after(() => data.disconnect());
});
