import { registerUser } from './registerUser.js'
import { loginUser } from './loginUser.js'
import { logoutUser } from './logoutUser.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'
import { getUserUsername } from './getUserUsername.js'
import { getUSerId } from './getUserId.js'

import { createPost } from './createPost.js'
import { getPosts } from './getPosts.js'
import { deletePost } from './deletePost.js'
import { updatePostText } from './updatePostText.js'
import { toggleLikePost } from './toggleLikePost.js'
import { getUserPosts } from './getUserPosts.js'

import { savePost } from './savePost.js'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserUsername,
    getUSerId,

    createPost,
    getPosts,
    deletePost,
    updatePostText,
    toggleLikePost,
    getUserPosts,

    savePost
}

