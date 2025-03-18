import { registerUser } from './registerUser.js'
import { loginUser } from './loginUser.js'
import { getUserName } from './getUserName.js'
import { logoutUser } from './logoutUser.js'
import { getUserHouse } from './getUserHouse.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'

import { getPosts } from './getPosts.js'
import { createPost } from './createPost.js'
import { toggleLikePost } from './toggleLikePost.js'
import { getOwnPosts } from './getOwnPosts.js'
//import { updateUserProfile } from './updateUserProfile.js'
import { updatePostText } from './updatePostText.js'
//import { changePassword } from './changePassword.js'
import { deletePost } from './deletePost.js'
//import { deleteProfile } from './deleteProfile.js'

export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    getUserName,
    getUserHouse,
    isUserLoggedIn,

    getPosts,
    createPost,
    toggleLikePost,
    getOwnPosts,
    //updateUserProfile,
    updatePostText,
    //changePassword,


    //deleteProfile,
    deletePost


}

