import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUserName } from './getUsername.js';

import { addPost } from './addPost.js'
import { getPosts } from './getPosts.js'
import { deletePost } from './deletePost.js'
import { updatePostText } from './updatePostText.js'
import { toggleLikePost } from './toggleLikePost.js'

export const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    addPost,
    getPosts,
    deletePost,
    updatePostText,
    toggleLikePost
}