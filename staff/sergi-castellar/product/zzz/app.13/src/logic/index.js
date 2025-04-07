import { createNewPost } from './createNewPost'
import { deletePost } from './deletePost'
import { editPost } from './editPost'
import { getCurrentUser } from './getCurrentUser'
import { getLikesUsernames } from './getLikesUsernames'
import { getPosts } from './getPosts'
import { isUserLoggedIn } from './isUserLoggedIn'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { registerUser } from './registerUser'
import { toggleLike } from './toggleLike'

export const logic = {
    createNewPost,
    deletePost,
    editPost,
    getCurrentUser,
    getLikesUsernames,
    getPosts,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    toggleLike
}