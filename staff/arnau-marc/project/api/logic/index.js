import { authenticateUser } from "./authenticateUser.js"
import { registerUser } from './registerUser.js'
import { getUsername } from './getUsername.js'

import { createGame } from "./games/createGame.js"
import { getGames } from "./games/getGames.js"
import { toggleParticipation } from "./games/toggleParticipation.js"

export const logic = {
    authenticateUser,
    registerUser,
    getUsername,

    createGame,
    getGames,
    toggleParticipation
}