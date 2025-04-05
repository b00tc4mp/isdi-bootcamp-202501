import { createPost } from './createPost.js'
import { deletePost } from './deletePost.js'
import { getPosts } from './getPosts.js'
import { getUserName } from './getUserName.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'
import { loginUser } from './loginUser.js'
import { logoutUser } from './logoutUser.js'
import { registerUser } from './registerUser.js'
import { savePost } from './savePost.js'
import { toggleLikePost } from './toggleLikePost.js'
import { updatePostText } from './updatePostText.js'


export const logic = {
    createPost,
    deletePost,
    getPosts,
    getUserName,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    savePost,
    toggleLikePost,
    updatePostText
}

