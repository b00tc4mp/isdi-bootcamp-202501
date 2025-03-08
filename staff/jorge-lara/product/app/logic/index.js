import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { getLoggedUser } from './getLoggedUser'

import { addPost } from './addPost'
import { getPosts } from './getPosts'
import { deletePost } from './deletePost'
import { updatePostText } from './updatePostText'
import { toggleLikePost } from './toggleLikePost'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getLoggedUser,

    addPost,
    getPosts,
    deletePost,
    updatePostText,
    toggleLikePost
}