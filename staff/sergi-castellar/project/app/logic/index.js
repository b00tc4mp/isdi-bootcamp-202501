import { generateInviteCode } from './generateInviteCode'
import { getCoupleEvents } from './getCoupleEvents'
import { getCoupleInfo } from './getCoupleInfo'
import { getCurrentUser } from './getCurrentUser'
import { isUserInCouple } from './isUserInCouple'
import { isUserLoggedIn } from './isUserLoggedIn'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { registerUser } from './registerUser'

export const logic = {
    generateInviteCode,
    getCoupleEvents,
    getCoupleInfo,
    getCurrentUser,
    isUserInCouple,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser
}