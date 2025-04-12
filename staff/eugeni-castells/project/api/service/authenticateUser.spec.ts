import "dotenv/config";
import { expect } from "chai";
import { data, User } from "../data";
import { authenticateUser } from "./index.js";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("authenticateUser", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return User.deleteMany({});
  });

  it("succeeds on authenticating user", () => {
    return User.create({
      name: "Eugeni",
      username: "euge",
      email: "eu@ge.com",
      password: "$2b$12$XePBJgFgYNcwFk9X2YFJK.MIEE7soiPZznIqeameT9PWuhDG3dHEa",
    }).then((_user) => {
      return authenticateUser(_user.email, "123123123").then((id) => {
        expect(id).to.equal(_user._id.toString());
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
