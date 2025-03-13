import data from "../data/index.js";
import { validate } from "./validate.js";

export const updatePostLikes = (userId, postId) => {
  validate.id(userId, "user id");

  const postFound = data.posts.getById(postId);

  if (!postFound) throw new Error("Post not found");

  let userIdFound;

  for (let i = 0; i < postFound.likes.length; i++) {
    if (userId === postFound.likes[i]) userIdFound = userId;
  }

  if (!userIdFound) {
    postFound.likes[postFound.likes.length] = userId;
  } else {
    let likes = [];

    for (let i = 0; i < postFound.likes.length; i++) {
      if (postFound.likes[i] !== userId)
        likes[likes.length] = postFound.likes[i];
    }
    postFound.likes = likes;
  }
  data.posts.updateOne((post) => post.id === postId, postFound);
};
