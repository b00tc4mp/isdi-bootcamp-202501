import { authenticateUser } from "./users/authenticateUser.js"
import { registerUser } from './users/registerUser.js'
import { getUsername } from './users/getUsername.js'
import { getUserRole } from './users/getUserRole.js'

import { createGame } from "./games/createGame.js"
import { getGames } from "./games/getGames.js"
import { toggleParticipation } from "./games/toggleParticipation.js"
import { setGameWinner } from "./games/setGameWinner.js"
import { deleteGame } from "./games/deleteGame.js"

import { requestAdminRole } from "./profile/requestAdminRole.js"
import { getUserStats } from "./profile/getUserStats.js"

import { getSeasonLeaderboard } from "./season/getSeasonLeaderboard.js"
import { finishSeason } from "./season/finishSeason.js"
import { getLatestSeason } from "./season/getLatestSeason.js"
import { createSeason } from "./season/createSeason.js"
import { getSeasonById } from "./season/getSeasonById.js"

export const logic = {
    authenticateUser,
    registerUser,
    getUsername,
    getUserRole,

    createGame,
    getGames,
    toggleParticipation,
    setGameWinner,
    deleteGame,

    requestAdminRole,
    getUserStats,

    getSeasonLeaderboard,
    finishSeason,
    getLatestSeason,
    createSeason,
    getSeasonById
}