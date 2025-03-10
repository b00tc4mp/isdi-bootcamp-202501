import { DuplicityError, NotFoundError, CredentialsError } from './errors.js'

import { data } from '../app/data/index.js'

import { registerUser } from './logic/registerUser.js'
import { loginUser } from './logic/loginUser.js'
import { getUserName } from './logic/getUserName.js'
import { logoutUser } from './logic/logoutUser.js'
import { getUserHouse } from './logic/getUserHouse.js'
import { isUserLoggedIn } from './logic/isUserLoggedIn.js'

import { getPosts } from './logic/getPosts.js'
import { createPost } from './logic/createPost.js'
import { toggleLikePost } from './logic/toggleLikePost.js'
import { getOwnPosts } from './logic/getOwnPosts.js'
import { updateUserProfile } from './logic/updateUserProfile.js'
import { editMyPost } from './logic/editMyPost.js'
import { changePassword } from './logic/changePassword.js'
import { deletePost } from './logic/deletePost.js'
import { deleteProfile } from './logic/deleteProfile.js'

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
    updateUserProfile,
    editMyPost,
    changePassword,


    deleteProfile,
    deletePost


}

