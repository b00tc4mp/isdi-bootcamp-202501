import "dotenv/config";
import { addPost } from "./addPost.js";
import { data, Post, User } from "../data/index.js";
import { expect } from "chai";
import { NotFoundError } from "com/errors.js";

console.info("TEST addPost");

const { MONGO_URL, MONGO_DB } = process.env;

describe("addPost", () => {
  before(() => data.connect(MONGO_URL, MONGO_DB));

  beforeEach(() => {
    return Promise.all([Post.deleteMany({}), User.deleteMany({})]);
  });

  it("succeeds on existing user and correct post fields", () => {
    let result2;
    let beforeLength;
    let afterLength;

    return Post.find({})
      .then((posts) => (beforeLength = posts.length))
      .then(() => {
        return User.create({
          name: "Sergi",
          username: "SerGi",
          email: "ser@gi.com",
          password:
            "$2b$12$p.S0qxtHvYzDf9LGnwsFfuuaHvgljEhFT2ldQ3qUM2cs90EDquSa2",
        })
          .then((user) => {
            const id = user.id;

            return addPost(
              id,
              "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY1aTRmZnh3bGJsODgycmNucjdiZXpiNzc0aXFlMWluaDJ6d2MzNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gw3IWyGkC0rsazTi/giphy.gif",
              "Test Post"
            );
          })
          .then((result) => {
            result2 = result;
          })
          .then(() => {
            return Post.find({});
          })
          .then((posts) => {
            afterLength = posts.length;
          })
          .finally(() => {
            expect(result2).to.be.undefined;
            expect(afterLength).to.equal(beforeLength + 1);
          });
      });
  });

  it("fails on non-existing user", () => {
    let catchedError;

    return addPost(
      "67e9305dcfd7424524592e25",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY1aTRmZnh3bGJsODgycmNucjdiZXpiNzc0aXFlMWluaDJ6d2MzNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gw3IWyGkC0rsazTi/giphy.gif",
      "fail test"
    )
      .catch((error) => (catchedError = error))
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError);
        expect(catchedError.message).to.equal("user not found");
      });
  });

  afterEach(() => {
    return Promise.all([Post.deleteMany({}), User.deleteMany({})]);
  });

  after(() => data.disconnect());
});
