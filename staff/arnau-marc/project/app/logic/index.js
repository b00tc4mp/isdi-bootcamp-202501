import { getUsername } from './getUsername.js'
import { loginUser } from './loginUser.js'
import { logoutUser } from './logoutUser.js'
import { registerUser } from './registerUser.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'
import { getUserId } from './getUserId.js'

import { createGame } from './games/createGame.js'
import { getGames } from './games/getGames.js'

export const logic = {
    loginUser,
    registerUser,
    logoutUser,
    getUsername,
    isUserLoggedIn,
    getUserId,

    createGame,
    getGames
}
