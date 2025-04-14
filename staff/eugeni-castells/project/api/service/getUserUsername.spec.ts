import "dotenv/config";
import { expect } from "chai";
import { data, User } from "../data";
import { getUserUsername } from "./index.js";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("getUserUsername", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return User.deleteMany({});
  });

  it("succeeds on getting user username", () => {
    return User.create({
      name: "Eugeni",
      username: "euge",
      email: "eu@ge.com",
      location: "111111111111111111111111",
      password: "$2b$12$XePBJgFgYNcwFk9X2YFJK.MIEE7soiPZznIqeameT9PWuhDG3dHEa",
    }).then((_user) => {
      return getUserUsername(_user._id.toString()).then((username) => {
        expect(username).to.equal("euge");
      });
    });
  });
  afterEach(() => {
    return User.deleteMany({});
  });

  after(() => {
    return data.disconnect();
  });
});
