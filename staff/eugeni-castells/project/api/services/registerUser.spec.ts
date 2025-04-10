import "dotenv/config";
import { expect } from "chai";
import { data, User } from "../data";
import { registerUser } from "./index.js";

const { MONGO_URI, MONGO_DB } = process.env;

describe("registerUser", () => {
  before(() => {
    data.connect(MONGO_URI!, MONGO_DB!);
  });

  beforeEach(() => {
    User.deleteMany({});
  });

  it("succeeds on registering user", () => {
    return registerUser("Eugeni", "euge", "eu@ge.com", "123123123")
      .then(() => User.findOne({ name: "Eugeni" }).lean())
      .then((user) => expect(user?.name).to.equal("Eugeni"));
  });
  afterEach(() => {
    User.deleteMany({});
  });

  after(() => {
    data.disconnect();
  });
});
