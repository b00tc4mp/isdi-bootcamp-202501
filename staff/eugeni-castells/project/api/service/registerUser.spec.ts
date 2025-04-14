import "dotenv/config";
import { expect } from "chai";
import { data, User } from "../data";
import { registerUser } from "./index.js";
import { NewUserInfo } from "./types";
const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("registerUser", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return User.deleteMany({});
  });

  it("succeeds on registering user", () => {
    const newUserInfo: NewUserInfo = {
      name: "Eugeni",
      username: "euge",
      email: "eu@ge.com",
      password: "123123123",
      address: "gran de sant andreu 368",
      city: "Barcelona",
      country: "Spain",
      point: {
        type: "Point", // <-- ara TypeScript sap que això és el literal "Point"
        coordinates: [2.1734, 41.3851],
      },
    };
    debugger;
    return registerUser(newUserInfo)
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
