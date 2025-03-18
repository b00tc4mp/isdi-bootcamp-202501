import { createNewPost } from './createNewPost.js'
import { deletePost } from './deletePost.js'
import { getLikesUsernames } from './getLikesUsernames.js'
import { getPosts } from './getPosts.js'
import { authenticateUser } from './authenticateUser.js'
import { registerUser } from './registerUser.js'
import { toggleLike } from './toggleLike.js'
import { getCurrentUser } from './getCurrentUser.js'
import { editPost } from './editPost.js'

export const logic = {
    createNewPost,
    deletePost,
    getLikesUsernames,
    getPosts,
    authenticateUser,
    registerUser,
    toggleLike,
    getCurrentUser,
    editPost
}