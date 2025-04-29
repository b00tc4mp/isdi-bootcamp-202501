import { registerUser } from './registerUser.js'
import { loginUser } from './loginUser.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'
import { logoutUser } from './logoutUser.js'
import { createTimer } from './createTimer.js'
import { getTimer } from './getTimer.js'
import { getUserGems } from './getUserGems.js'
import { startTimer } from './startTimer.js'
import { deleteTimer } from './deleteTimer.js'
import { exitTimer } from './exitTimer.js'
import { pauseTimer } from './pauseTimer.js'
import { resumeTimer } from './resumeTimer.js'
import { checkUserTimers } from './checkUserTimers.js'
import { endTimer } from './endTimer.js'


export const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    createTimer,
    getTimer,
    getUserGems,
    startTimer,
    deleteTimer,
    exitTimer,
    pauseTimer,
    resumeTimer,
    checkUserTimers,
    endTimer
}