import { addPost } from "./addPost";
import { getUserInfo } from "./getUserInfo";
import { registerUser } from "./registerUser";
import { updatePostLike } from "./updatePostLike";
import { updateUser } from "./updateUser";
import { getPosts } from "./getPosts";
import { deletePost } from "./deletePost";
import { updatePostText } from "./updatePostText";
import { authenticateUser } from "./authenticateUser";
import isUserLoggedIn from "./isUserLoggedIn";
import { getUserPosts } from "./getUserPosts";
import { getUserId } from "./getUserId";
import { getIdByUsername } from "./getIdByUsername";

export const logic = {
  addPost,
  getUserInfo,
  registerUser,
  updatePostLike,
  updateUser,
  getPosts,
  deletePost,
  updatePostText,
  authenticateUser,
  isUserLoggedIn,
  getUserPosts,
  getUserId,
  getIdByUsername,
};
