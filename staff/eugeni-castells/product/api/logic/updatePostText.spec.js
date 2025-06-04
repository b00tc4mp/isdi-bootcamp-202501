import { User, Post, ObjectId } from "../data/index.js";
import { testUser } from "./testUser.js";
import { testPost } from "./testPost.js";
import { updatePostText } from "./updatePostText.js";
import { expect } from "chai";
import { testHandler } from "./testHandler.js";
import { NotFoundError } from "com/errors.js";

const updateTextWorks = () => {
  let userId;
  let result2;
  let foundPost;

  return User.create(testUser)
    .then((user) => {
      userId = user._id;

      return Post.create({ ...testPost, author: user._id });
    })
    .then((post) => {
      return updatePostText(userId.toString(), post._id.toString(), "test");
    })
    .then((result) => {
      result2 = result;

      return Post.findOne({ text: "test" }).lean();
    })
    .then((post) => (foundPost = post))
    .finally(() => {
      expect(result2).to.be.undefined;
      expect(foundPost.text).to.equal("test");
    });
};

const updateTextDoesntWorkForUser = () => {
  return expect(
    updatePostText(new ObjectId().toString(), new ObjectId().toString(), "test")
  ).to.be.rejectedWith(NotFoundError, "user not found");
};

const updateTextDoesntWorkForPost = () => {
  return User.create(testUser).then((user) => {
    return expect(
      updatePostText(user._id.toString(), new ObjectId().toString(), "test")
    ).to.be.rejectedWith(NotFoundError, "post not found");
  });
};

testHandler("updatePostText", [
  updateTextWorks,
  updateTextDoesntWorkForUser,
  updateTextDoesntWorkForPost,
]);
