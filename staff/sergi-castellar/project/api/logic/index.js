import { authenticateUser } from "./authenticateUser.js"
import { createItem } from "./createItem.js"
import { createList } from "./createList.js"
import { deleteItem } from "./deleteItem.js"
import { deleteList } from "./deleteList.js"
import { deleteUser } from "./deleteUser.js"
import { editUser } from "./editUser.js"
import { getCoupleInfo } from "./getCoupleInfo.js"
import { getIfUserIsInCouple } from "./getIfUserIsInCouple.js"
import { getInviteCode } from "./getInviteCode.js"
import { getOwnCouple } from "./getOwnCouple.js"
import { getSelfUser } from "./getSelfUser.js"
import { joinWithInviteCode } from "./joinWithInviteCode.js"
import { registerUser } from "./registerUser.js"
import { retrieveCoupleEvents } from "./retrieveCoupleEvents.js"
import { retrieveItems } from "./retrieveItems.js"
import { retrieveLists } from "./retrieveLists.js"
import { setCoupleStartDate } from "./setCoupleStartDate.js"
import { updateItem } from "./updateItem.js"
import { updateList } from "./updateList.js"

export const logic = {
    authenticateUser,
    createItem,
    createList,
    deleteItem,
    deleteList,
    deleteUser,
    editUser,
    getCoupleInfo,
    getIfUserIsInCouple,
    getInviteCode,
    getOwnCouple,
    getSelfUser,
    joinWithInviteCode,
    registerUser,
    retrieveCoupleEvents,
    retrieveItems,
    retrieveLists,
    setCoupleStartDate,
    updateItem,
    updateList
}