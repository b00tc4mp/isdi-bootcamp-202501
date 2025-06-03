import { authenticateUser } from './authenticateUser.js'
import { registerUser } from './registerUser.js'
import { getUserUsername } from './getUserUsername.js'
import { getLevel } from './getLevel.js'
import { getLevels } from './getLevels.js'
import { isLevelPassed } from './isLevelPassed.js'
import { getUserRanking } from './getUserRanking.js'
import { getGlobalRanking } from './getGlobalRanking.js'
import { getCurrentLevel } from './getCurrentLevel.js'
import { getUser } from './getUser.js'

export const logic = {
  authenticateUser,
  registerUser,
  getUserUsername,
  getUserRanking,
  getGlobalRanking,
  getUser,

  getLevel,
  getLevels,
  getLevel,
  isLevelPassed,
  getCurrentLevel,
}
