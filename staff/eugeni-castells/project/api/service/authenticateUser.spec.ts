import "dotenv/config";
import { expect } from "chai";
import { data, User } from "../data";
import { authenticateUser } from "./index.js";
import bcrypt from "bcryptjs";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("authenticateUser", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return User.deleteMany({});
  });

  it("succeeds on authenticating user with correct credentials", () => {
    const password = "123123123";
    const hashedPassword = bcrypt.hashSync(password, 12);

    return User.create({
      name: "Eugeni",
      username: "euge",
      email: "eu@ge.com",
      address: "Carrer Gran",
      location: "111111111111111c111a1111",
      password: hashedPassword,
    }).then((_user) => {
      return authenticateUser(_user.email, password).then((authUser) => {
        expect(authUser).to.be.an("object");
        expect(authUser.id).to.equal(_user._id.toString());
        expect(authUser.role).to.equal("regular"); // si aquest és el valor per defecte
      });
    });
  });

  it("fails on wrong email", () => {
    return authenticateUser("wrong@ge.com", "123123123").catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal("user not found");
    });
  });

  it("fails on wrong password", () => {
    const password = "123123123";
    const hashedPassword = bcrypt.hashSync(password, 12);

    return User.create({
      name: "Eugeni",
      username: "euge",
      email: "eu@ge.com",
      address: "Carrer Gran",
      location: "111111111111111c111a1111",
      password: hashedPassword,
    }).then((_user) => {
      return authenticateUser(_user.email, "wrongpassword").catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal("wrong credentials");
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
