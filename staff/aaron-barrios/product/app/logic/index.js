import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { getUserUsername } from './getUserUsername.js'
import { getUserId } from './getUserId.js'
import { isCurrentAuthor } from './isCurrentAuthor.js'
import { getUserPosts } from './getUserPosts.js'

import { createPost } from './createPost'
import { getPosts } from './getPosts'
import { deletePost } from './deletePost'
import { updatePostText } from './updatePostText'
import { toggleLikePost } from './toggleLikePost'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserUsername,
    getUserId,
    isCurrentAuthor,
    getUserPosts,

    createPost,
    getPosts,
    deletePost,
    updatePostText,
    toggleLikePost
}