import { createNewPost } from './createNewPost.js'
import { deletePost } from './deletePost.js'
import { getLikesUsernames } from './getLikesUsernames.js'
import { getPosts } from './getPosts.js'
import { authenticateUser } from './authenticateUser.js'
import { registerUser } from './registerUser.js'
import { toggleLike } from './toggleLike.js'
import { getUserById } from './getUserById.js'
import { editPost } from './editPost.js'
import { getUserPosts } from './getUserPosts.js'

export const logic = {
    createNewPost,
    deletePost,
    getLikesUsernames,
    getPosts,
    authenticateUser,
    registerUser,
    toggleLike,
    getUserById,
    editPost,
    getUserPosts
}