import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUserName } from './getUserName.js'

import { createPost } from './createPost.js'
import { getPosts } from './getPosts.js'
import { deletePost } from './deletePost.js'
//import { updatePostText } from './updatePostText.js'
import { toggleLikePost } from './toggleLikePost.js'
//import { getOwnPosts } from './getOwnPosts.js'
//import { deleteProfile } from './deleteProfile.js'
//import { getUserInfo } from './getUserInfo.js'
//import { updateUserProfile } from './updateUserProfile.js'
//import { changePassword } from './changePassword.js'


export const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    createPost,
    getPosts,
    //getOwnPosts,
    deletePost,
    //updatePostText,
    toggleLikePost,
    //deleteProfile,
    //getUserInfo,
    //updateUserProfile,
    //changePassword
}