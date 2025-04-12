import "dotenv/config";
import { expect } from "chai";
import { data, User } from "../data";
import { registerUser } from "./index.js";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("registerUser", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return User.deleteMany({});
  });

  it("succeeds on registering user", () => {
    debugger;
    return registerUser("Eugeni", "euge", "eu@ge.com", "123123123")
      .then(() => User.findOne({ name: "Eugeni" }).lean())
      .then((user) => expect(user?.name).to.equal("Eugeni"));
  });

  afterEach(() => {
    return User.deleteMany({});
  });

  after(() => {
    return data.disconnect();
  });
});
