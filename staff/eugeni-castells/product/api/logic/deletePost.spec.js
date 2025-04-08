import "dotenv/config";
import { deletePost } from "./deletePost.js";
import { data, Post, User } from "../data/index.js";
import { expect } from "chai";
import { NotFoundError } from "com/errors.js";
const { MONGO_URL, MONGO_DB_TEST } = process.env;

console.info("TEST deletePost");

describe("deletePost", () => {
  before(() => data.connect(MONGO_URL, MONGO_DB_TEST));

  beforeEach(() => {
    return Promise.all([User.deleteMany({}), User.deleteMany({})]);
  });

  it("succeeds on deleting post", () => {
    let result2;

    let beforeLength;

    let afterLength;

    let postId;

    let post;
    return Promise.all([
      User.create({
        name: "Sergi",
        username: "SerGi",
        email: "ser@gi.com",
        password:
          "$2b$12$p.S0qxtHvYzDf9LGnwsFfuuaHvgljEhFT2ldQ3qUM2cs90EDquSa2",
      }),
      Post.find({}),
    ]).then(([user, posts]) => {
      beforeLength = posts?.length;

      return Post.create({
        image:
          "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY1aTRmZnh3bGJsODgycmNucjdiZXpiNzc0aXFlMWluaDJ6d2MzNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gw3IWyGkC0rsazTi/giphy.gif",
        text: "Test",
        author: user._id,
      })
        .then((post) => {
          postId = post._id.toString();
          return deletePost(post.author.toString(), post._id.toString());
        })
        .then((result) => {
          result2 = result;
        })
        .then(() => Promise.all([Post.find({}), Post.findById(postId)]))
        .then(([posts, post]) => {
          afterLength = posts.length;
          post = post;
        })
        .finally(() => {
          expect(result2).to.equal(undefined);
          expect(afterLength).to.equal(beforeLength);
          expect(post).to.equal(undefined);
        });
    });
  });

  it("fails on non existing user", () => {
    let catchedError;

    return deletePost("2FDF93C125DEC91B087BF8C7", "2FDF93C125DEC91B087BF8C7")
      .catch((error) => {
        return (catchedError = error);
      })
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError);
        expect(catchedError.message).to.equal("user not found");
      });
  });

  it("fails on non existing post", () => {
    let catchedError;

    return User.create({
      name: "Sergi",
      username: "SerGi",
      email: "ser@gi.com",
      password: "$2b$12$p.S0qxtHvYzDf9LGnwsFfuuaHvgljEhFT2ldQ3qUM2cs90EDquSa2",
    }).then((user) => {
      return Post.create({
        image:
          "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY1aTRmZnh3bGJsODgycmNucjdiZXpiNzc0aXFlMWluaDJ6d2MzNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gw3IWyGkC0rsazTi/giphy.gif",
        text: "Test",
        author: user._id,
      })
        .then((post) => {
          return deletePost(post.author.toString(), "2FDF93C125DEC91B087BF8C7");
        })
        .catch((error) => {
          catchedError = error;
        })
        .finally(() => {
          expect(catchedError).to.be.instanceOf(NotFoundError);
          expect(catchedError.message).to.equal("post not found");
        });
    });
  });

  afterEach(() => {
    return Promise.all([User.deleteMany({}), Post.deleteMany({})]);
  });

  after(() => data.disconnect());
});
