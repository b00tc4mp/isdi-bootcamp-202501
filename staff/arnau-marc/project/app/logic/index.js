import { getUsername } from './users/getUsername.js'
import { loginUser } from './users/loginUser.js'
import { logoutUser } from './users/logoutUser.js'
import { registerUser } from './users/registerUser.js'
import { isUserLoggedIn } from './users/isUserLoggedIn.js'
import { getUserId } from './users/getUserId.js'

import { createGame } from "./games/createGame.js"
import { getGames } from "./games/getGames.js"
import { toggleParticipation } from "./games/toggleParticipation.js"

export const logic = {
    loginUser,
    registerUser,
    logoutUser,
    getUsername,
    isUserLoggedIn,
    getUserId,

    createGame,
    getGames,
    toggleParticipation
}
