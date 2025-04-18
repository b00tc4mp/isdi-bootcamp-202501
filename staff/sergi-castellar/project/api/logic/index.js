import { authenticateUser } from "./authenticateUser.js"
import { createCouple } from "./createCouple.js"
import { deleteUser } from "./deleteUser.js"
import { editUser } from "./editUser.js"
import { getCoupleEvents } from "./getCoupleEvents.js"
import { getCoupleInfo } from "./getCoupleInfo.js"
import { getIfUserIsInCouple } from "./getIfUserIsInCouple.js"
import { getInviteCode } from "./getInviteCode.js"
import { getOwnCouple } from "./getOwnCouple.js"
import { getSelfUser } from "./getSelfUser.js"
import { joinWithInviteCode } from "./joinWithInviteCode.js"
import { registerUser } from "./registerUser.js"

export const logic = {
    authenticateUser,
    createCouple,
    deleteUser,
    editUser,
    getCoupleEvents,
    getCoupleInfo,
    getIfUserIsInCouple,
    getInviteCode,
    getOwnCouple,
    getSelfUser,
    joinWithInviteCode,
    registerUser
}