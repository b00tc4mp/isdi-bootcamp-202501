import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { getUsername } from './getUsername'
import { getCurrentUser } from './getCurrentUser'
import { isCurrentAuthor } from './isCurrentAuthor'
import { formatedDate } from './formatedDate'

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
    getUsername,
    getCurrentUser,
    isCurrentAuthor,
    formatedDate,

    createPost,
    getPosts,
    deletePost,
    updatePostText,
    toggleLikePost
}