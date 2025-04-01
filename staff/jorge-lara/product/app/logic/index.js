import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { getUserUsername } from './getUserUsername.js'

import { addPost } from './addPost'
import { getPosts } from './getPosts'
import { deletePost } from './deletePost'
import { updatePostText } from './updatePostText'
import { toggleLikePost } from './toggleLikePost'
import { getUserId } from './getUserId'
import { getUserPosts } from './getUserPosts.js'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserUsername,

    addPost,
    getPosts,
    getUserPosts,
    deletePost,
    updatePostText,
    toggleLikePost,
    getUserId
}