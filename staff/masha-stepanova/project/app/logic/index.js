import { loginUser } from './loginUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { registerUser } from './registerUser'
import { getUserUsername } from './getUserUsername'
import { getUserId } from './getUserId'
import { getLevels } from './getLevels'
import { logoutUser } from './logoutUser'
import { isLevelPassed } from './isLevelPassed'

export const logic = {
    loginUser,
    isUserLoggedIn,
    registerUser,
    getUserUsername,
    getUserId,
    logoutUser,

    getLevels,
    isLevelPassed
}