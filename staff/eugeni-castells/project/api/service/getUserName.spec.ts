import "dotenv/config";
import { expect } from "chai";
import { data, User } from "../data";
import { getUserName } from "./index.js";
import { ReturnedFullName } from "./types";
import { Types } from "com";
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
      lastName: "Castells",
      email: "eu@ge.com",
      location: "111111111111111111111111",
      password: "$2b$12$XePBJgFgYNcwFk9X2YFJK.MIEE7soiPZznIqeameT9PWuhDG3dHEa",
    }).then((_user) => {
      return getUserName(_user._id.toString()).then(
        (fullName: ReturnedFullName) => {
          expect(fullName.name).to.equal("Eugeni");
          expect(fullName.lastName).to.equal("Castells");
        }
      );
    });
  });

  it("fails because user doesnt exist", async () => {
    const fakeId = new Types.ObjectId();
    console.log(fakeId);
    try {
      await getUserName(fakeId.toString());
    } catch (error) {
      expect((error as Error).name).to.equal("NotFoundError");
    }
  });

  it("fails because invalid id", async () => {
    try {
      await getUserName("123");
    } catch (error) {
      expect((error as Error).name).to.equal("ValidationError");
    }
  });

  afterEach(() => {
    return User.deleteMany({});
  });

  after(() => {
    return data.disconnect();
  });
});
