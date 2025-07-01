import { User, Post } from "../data/index.js";
import { validate, errors } from "com";

const { NotFoundError, OwnershipError, SystemError } = errors;
export const deletePost = (userId, postId) => {
  validate.id(postId, "postId");
  validate.id(userId, "userId");

 return Promise.all([
    User.findById(userId).lean(),
    Post.findById(postId).lean(),
  ])
    .then(([user, post]) => {
      if (!user) throw new NotFoundError("user not found");

      if (!post) throw new NotFoundError("post not found");

      if (post.author.toString() !== userId) throw new OwnershipError("user is not author of post");

      return Post.deleteOne({_id: postId})
      .catch((error) => {throw new SystemError("database error", error.message);});
    })
    .then(() => {})
 
};