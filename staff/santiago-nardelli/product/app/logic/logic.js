import { registerUser } from "./functions/registerUser";
import { loginUser } from "./functions/loginUser";
import { logoutUser } from "./functions/logoutUser";
import { isUserLoggedIn } from "./functions/isUserLoggedIn";
import { getUserName } from "./functions/getUserName";

import { createPost } from "./functions/createPost";
import { getPosts } from "./functions/getPosts";
import { deletePost } from "./functions/deletePost";
import { modifyPost } from "./functions/modifyPost";
import { toggleLikePost } from "./functions/toggleLikePost";


export const logic = {
  registerUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
  getUserName,

  createPost,
  getPosts,
  deletePost,
  modifyPost,
  toggleLikePost
};