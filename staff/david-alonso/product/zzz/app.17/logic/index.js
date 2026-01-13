import { registerUser } from './registerUser.js'
import { loginUser } from './loginUser.js'
import { logoutUser } from './logoutUser.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'
import { getUserName } from './getUserName.js'

import { createPost } from './createPost.js'
import { getPosts } from './getPosts.js'
import { deletePost } from './deletePosts.js'
import { updatePostText } from './updatePostText.js'
import { toggleLikePost } from './toggleLikePost.js'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserName,

    createPost,
    getPosts,
    deletePost,
    updatePostText,
    toggleLikePost
}