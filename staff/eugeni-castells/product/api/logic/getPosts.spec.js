import { getPosts } from "./getPosts.js";
import { User, Post } from "../data/index.js";
import { testHandler } from "./testHandler.js";
import { testUser, testPost } from "./index.js";
import { expect } from "chai";
import { NotFoundError } from "com/errors.js";

const getPostsWorks = () => {
  let returnedPosts;
  let userId;

  return User.create(testUser)
    .then((user) => {
      userId = user.id;
      testPost.author = user.id;

      return Post.create(testPost);
    })
    .then(() => {
      return getPosts(userId);
    })
    .then((posts) => (returnedPosts = posts))
    .finally(() => {
      expect(returnedPosts).to.be.instanceOf(Array);
      expect(returnedPosts[0]).to.include({
        text: testPost.text,
        image: testPost.image,
      });
      expect(returnedPosts[0].author.id).to.equal(userId);
      expect(returnedPosts[0].author.username).to.equal(testUser.username);
      expect(returnedPosts[0].likesCount).to.be.a("number");
      expect(returnedPosts[0].own).to.be.a("boolean");
    });
};

const getPostsFailsOnNonExistingUser = () => {
  let catchedError;

  return getPosts("4261f7a8c757ff053adb05a7")
    .catch((error) => (catchedError = error))
    .finally(() => {
      expect(catchedError).to.be.instanceOf(NotFoundError);
      expect(catchedError.message).to.equal("user not found");
    });
};

testHandler("getPosts", [getPostsWorks, getPostsFailsOnNonExistingUser]);
