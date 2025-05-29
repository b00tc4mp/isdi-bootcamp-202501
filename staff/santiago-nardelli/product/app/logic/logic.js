import { registerUser } from "./functions/registerUser";
import { loginUser } from "./functions/loginUser";
import { logoutUser } from "./functions/logoutUser";
import { isUserLoggedIn } from "./functions/isUserLoggedIn";
import { getUserUsername } from "./functions/getUserUsername";
import { getUserId } from "./functions/getUserId";

import { createPost } from "./functions/createPost";
import { getPosts } from "./functions/getPosts";
import { deletePost } from "./functions/deletePost";
import { modifyPost } from "./functions/modifyPost";
import { toggleLikePost } from "./functions/toggleLikePost";
import { getUserPosts } from "./functions/getUserPosts";



export const logic = {
  registerUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
  getUserUsername,
  getUserId,

  createPost,
  getPosts,
  deletePost,
  modifyPost,
  toggleLikePost,
  getUserPosts,
};