import { authenticateUser } from "./authenticateUser.js";
import { registerUser } from "./registerUser.js";
import { getPosts } from "./getPosts.js";
import { createPost } from "./createPost.js";
import { deletePost } from "./deletePost.js";
import { toggleLikePost } from "./toggleLikePost.js";
import { modifyPost } from "./modifyPost.js";
import { getUserName } from "./getUserName.js";

export const logic = {
  authenticateUser,
  registerUser,
  getUserName,

  getPosts,
  createPost,
  deletePost,
  toggleLikePost,
  modifyPost,
};
