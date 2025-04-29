import { authenticateUser } from './authenticateUser.js'
import { registerUser } from './registerUser.js'
import { createTimer } from './createTimer.js'
import { startTimer } from './startTimer.js'
import { endTimer } from './endTimer.js'
import { pauseTimer } from './pauseTimer.js'
import { exitTimer } from './exitTimer.js'
import { resumeTimer } from './resumeTimer.js'
import { setAndStartExtraTime } from './setAndStartExtraTime.js'
import { getUserGems } from './getUserGems.js'
import { getTimer } from './getTimer.js'
import { deleteTimer } from './deleteTimer.js'
import { checkUserTimers } from './checkUserTimers.js'

export const logic = {
    authenticateUser,
    registerUser,
    createTimer,
    startTimer,
    endTimer,
    pauseTimer,
    exitTimer,
    resumeTimer,
    setAndStartExtraTime,
    getUserGems,
    getTimer,
    deleteTimer,
    checkUserTimers
}