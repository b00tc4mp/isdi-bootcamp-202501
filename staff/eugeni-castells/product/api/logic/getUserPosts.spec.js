import "dotenv/config.js";
import { data, User, Post } from "../data/index.js";
import { describe } from "mocha";
import { expect } from "chai";
import { testUser } from "./testUser.js";
import { testPost } from "./testPost.js";
import { getUserPosts } from "./getUserPosts.js";

const { MONGO_URL, MONGO_DB_TEST } = process.env;

describe("getUserPosts", () => {
  before(() => data.connect(MONGO_URL, MONGO_DB_TEST));

  beforeEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]));

  it("succeeds on retrieving other user posts", () => {
    let userId;
    let targetUserId;
    return Promise.all([
      User.create(testUser),
      User.create({
        name: "Aaron",
        username: "aaron",
        email: "a@aron.com",
        password: "123123123",
      }),
    ])
      .then(([user, targetUser]) => {
        userId = user._id.toString();
        targetUserId = targetUser._id.toString();
        return Post.create({ ...testPost, author: targetUserId });
      })
      .then((post) => {
        const authorId = post.author.toString();
        return getUserPosts(userId, authorId);
      })
      .then((returnedPosts) => {
        expect(returnedPosts).to.be.instanceOf(Array);
        expect(returnedPosts[0].author.id).to.equal(targetUserId);
        expect(returnedPosts[0].author.username).to.equal("aaron");
      });
  });

  afterEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]));

  after(() => data.disconnect());
});
