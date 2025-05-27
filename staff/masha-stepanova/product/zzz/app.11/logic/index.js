import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { getUserName } from './getUserName'
import { getUserPosts } from './getUserPosts'

import { createPost } from './createPost'
import { getPosts } from './getPosts'
import { deletePost } from './deletePost'
import { updatePostText } from './updatePostText'
import { toggleLikePost } from './toggleLikePost'
import { isPostLikedByUser } from './isPostLikedByUser'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserName,
    getUserPosts,

    createPost,
    getPosts,
    deletePost,
    updatePostText,
    toggleLikePost,
    isPostLikedByUser
}