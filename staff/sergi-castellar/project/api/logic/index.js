import { authenticateUser } from "./authenticateUser.js"
import { createCouple } from "./createCouple.js"
import { deleteUser } from "./deleteUser.js"
import { editUser } from "./editUser.js"
import { getCoupleInfo } from "./getCoupleInfo.js"
import { getOwnCouple } from "./getOwnCouple.js"
import { getSelfUser } from "./getSelfUser.js"
import { registerUser } from "./registerUser.js"

export const logic = {
    authenticateUser,
    createCouple,
    deleteUser,
    editUser,
    getCoupleInfo,
    getOwnCouple,
    getSelfUser,
    registerUser
}