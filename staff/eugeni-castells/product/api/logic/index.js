import { addPost } from "./addPost.js";
import { authenticateUser } from "./authenticateUser.js";
import { deletePost } from "./deletePost.js";
import { getOnlineUserInfo } from "./getOnlineUserInfo.js";
import { getPosts } from "./getPosts.js";
import { registerUser } from "./registerUser.js";
import { updatePostLikes } from "./updatePostLikes.js";
import { updatePostText } from "./updatePostText.js";
import { updateUser } from "./updateUser.js";
import { testUser } from "./testUser.js";
import { testPost } from "./testPost.js";
import { getUserPosts } from "./getUserPosts.js";
import { getIdByUsername } from "./getIdByUsername.js";

export const logic = {
  addPost,
  authenticateUser,
  deletePost,
  getOnlineUserInfo,
  getPosts,
  registerUser,
  updatePostLikes,
  updatePostText,
  updateUser,
  getUserPosts,
  getIdByUsername,
};

export { testUser, testPost };
