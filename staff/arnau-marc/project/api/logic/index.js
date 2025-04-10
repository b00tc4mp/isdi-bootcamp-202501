import { authenticateUser } from "./users/authenticateUser.js"
import { registerUser } from './users/registerUser.js'
import { getUsername } from './users/getUsername.js'
import { getUserRole } from './users/getUserRole.js'

import { createGame } from "./games/createGame.js"
import { getGames } from "./games/getGames.js"
import { toggleParticipation } from "./games/toggleParticipation.js"
import { setGameWinner } from "./games/setGameWinner.js"

import { requestAdminRole } from "./profile/requestAdminRole.js"

export const logic = {
    authenticateUser,
    registerUser,
    getUsername,
    getUserRole,

    createGame,
    getGames,
    toggleParticipation,
    setGameWinner,

    requestAdminRole,
}