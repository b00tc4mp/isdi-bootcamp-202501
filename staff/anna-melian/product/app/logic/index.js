import { registerUser } from './registerUser.js'
import { loginUser } from './loginUser.js'
import { getUserName } from './getUserName.js'
import { logoutUser } from './logoutUser.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'

import { getPosts } from './getPosts.js'
import { createPost } from './createPost.js'
import { toggleLikePost } from './toggleLikePost.js'
import { updatePostText } from './updatePostText.js'
import { deletePost } from './deletePost.js'


export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    getUserName,
    isUserLoggedIn,

    getPosts,
    createPost,
    toggleLikePost,
    updatePostText,

    deletePost


}

