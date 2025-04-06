import "dotenv/config.js";
import { data, User } from "../data/index.js";
import { expect } from "chai";
import { testUser } from "./testUser.js";
import { getIdByUsername } from "./getIdByUsername.js";
import { NotFoundError } from "com/errors.js";

const { MONGO_URL, MONGO_DB_TEST } = process.env;

describe("getIdByUsername", () => {
  before(() => data.connect(MONGO_URL, MONGO_DB_TEST));

  beforeEach(() => User.deleteMany({}));

  it("succeeds on retrieving existing user", () => {
    let user2;

    return Promise.all([
      User.create(testUser),
      User.create({
        name: "Aaron",
        username: "aaronski",
        email: "a@ron.com",
        password: "123123123",
      }),
    ])
      .then(([_user1, _user2]) => {
        user2 = _user2;

        const user1Id = _user1._id.toString();

        const user2Username = _user2.username;

        return getIdByUsername(user1Id, user2Username);
      })
      .then((id) => {
        expect(id).to.equal(user2._id.toString());
      });
  });

  it("fails on non-existing username", () => {
    return User.create(testUser).then((user) => {
      const userId = user._id.toString();
      return expect(getIdByUsername(userId, "borisinsky")).to.be.rejectedWith(
        NotFoundError,
        "user not found"
      );
    });
  });

  afterEach(() => User.deleteMany({}));

  after(() => data.disconnect());
});
