import { registerUser } from './registerUser.js'
import { loginUser } from './loginUser.js'
import { getUserUsername } from './getUserUsername.js'
import { logoutUser } from './logoutUser.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'
import { getUserId } from './getUserId.js'
import { getUserPosts } from './getUserPosts.js'

import { getPosts } from './getPosts.js'
import { createPost } from './createPost.js'
import { toggleLikePost } from './toggleLikePost.js'
import { updatePostText } from './updatePostText.js'
import { deletePost } from './deletePost.js'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    getUserUsername,
    isUserLoggedIn,
    getUserId,

    getPosts,
    createPost,
    toggleLikePost,
    updatePostText,
    getUserPosts,
    deletePost
}

