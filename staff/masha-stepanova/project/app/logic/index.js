import { loginUser } from './loginUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { registerUser } from './registerUser'
import { getUserUsername } from './getUserUsername'
import { getUserId } from './getUserId'
import { getLevels } from './getLevels'
import { logoutUser } from './logoutUser'
import { isLevelPassed } from './isLevelPassed'
import { getUserRanking } from './getUserRanking'
import { getGlobalRanking } from './getGlobalRanking'
import { getCurrentLevel } from './getCurrentLevel'
import { getUser } from './getUser'

export const logic = {
  loginUser,
  isUserLoggedIn,
  registerUser,
  getUserUsername,
  getUserId,
  logoutUser,
  getUserRanking,
  getGlobalRanking,
  getUser,

  getLevels,
  isLevelPassed,
  getCurrentLevel,
}
