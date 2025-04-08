import "dotenv/config.js";
import { User, Post } from "../data/index.js";
import { expect } from "chai";
import { updatePostLikes } from "./updatePostLikes.js";
import { testHandler } from "./testHandler.js";
import { testUser } from "./testUser.js";
import { testPost } from "./testPost.js";
import { NotFoundError } from "com/errors.js";
import { ObjectId } from "../data/index.js";

const updatePostLikeWorks = () => {
  let result2;
  let result3;
  let likesBefore, likesAfter, likesFinal;
  let likesId;
  let userId;

  return User.create(testUser)
    .then((user) => {
      testPost.author = user.id;
      return Post.create(testPost);
    })
    .then((post) => {
      likesBefore = post.likes.length;

      userId = post.author._id.toString();

      return updatePostLikes(post.author._id.toString(), post.id);
    })
    .then((result) => {
      result2 = result;
      return Post.findOne({ text: "Test Post" }).lean();
    })
    .then((post) => {
      likesAfter = post.likes.length;

      likesId = post.likes[0].toString();

      return Post.findById(post._id.toString()).lean();
    })
    .then((post) => {
      return updatePostLikes(post.author._id.toString(), post._id.toString());
    })
    .then((result) => (result3 = result))
    .then(() => Post.findOne({ text: "Test Post" }).lean())
    .then((post) => (likesFinal = post.likes.length))
    .finally(() => {
      expect(result2, "result2").to.equal(undefined);
      expect(result3).to.equal(undefined);
      expect(likesAfter).to.equal(likesBefore + 1);
      expect(likesFinal).to.equal(likesBefore);
      expect(likesId).to.equal(userId);
    });
};

const updateLikeNotWorksWithNoUser = () => {
  return expect(
    updatePostLikes("533A87C32513D036902F300D", "533A87C32513D036902F300D")
  ).to.be.rejectedWith(NotFoundError, "user not found");
};

const updateLikeNotWorksWithNoPost = () => {
  return User.create(testUser).then((user) => {
    return expect(
      updatePostLikes(user.id, new ObjectId().toString())
    ).to.be.rejectedWith(NotFoundError, "post not found");
  });
};
testHandler("updatePostLike", [
  updatePostLikeWorks,
  updateLikeNotWorksWithNoUser,
  updateLikeNotWorksWithNoPost,
]);
