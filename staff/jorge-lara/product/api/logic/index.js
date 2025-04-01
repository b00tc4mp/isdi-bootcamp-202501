import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUserUsername } from './getUserUsername.js';

import { addPost } from './addPost.js'
import { getPosts } from './getPosts.js'
import { deletePost } from './deletePost.js'
import { updatePostText } from './updatePostText.js'
import { toggleLikePost } from './toggleLikePost.js'
import { getUserPosts } from './getUserPosts.js'

export const logic = {
    registerUser,
    authenticateUser,
    getUserUsername,

    addPost,
    getPosts,
    getUserPosts,
    deletePost,
    updatePostText,
    toggleLikePost
}