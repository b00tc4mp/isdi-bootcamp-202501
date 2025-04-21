// CALENDAR
import { getCoupleEvents } from "./calendar/getCoupleEvents.js"

// COUPLE
import { generateInviteCode } from "./couple/generateInviteCode.js"
import { getCoupleInfo } from "./couple/getCoupleInfo.js"
import { isUserInCouple } from "./couple/isUserInCouple.js"
import { joinWithInviteCode } from "./couple/joinWithInviteCode.js"
import { setCoupleStartDate } from "./couple/setCoupleStartDate.js"

// EMOTIONS
import { createEmotion } from "./emotions/createEmotion.js"
import { retrieveTodayEmotions } from "./emotions/retrieveTodayEmotions.js"

// ITEMS
import { createItem } from "./items/createItem.js"
import { deleteItem } from "./items/deleteItem.js"
import { retrieveItems } from "./items/retrieveItems.js"
import { updateItem } from "./items/updateItem.js"

// LISTS
import { createList } from "./lists/createList.js"
import { deleteList } from "./lists/deleteList.js"
import { retrieveLists } from "./lists/retrieveLists.js"
import { updateList } from "./lists/updateList.js"

// USER
import { getCurrentUser } from "./user/getCurrentUser.js"
import { isUserLoggedIn } from "./user/isUserLoggedIn.js"
import { loginUser } from "./user/loginUser.js"
import { logoutUser } from "./user/logoutUser.js"
import { registerUser } from "./user/registerUser.js"

export const logic = {
    // CALENDAR
    getCoupleEvents,

    // COUPLE
    generateInviteCode,
    getCoupleInfo,
    isUserInCouple,
    joinWithInviteCode,
    setCoupleStartDate,

    // EMOTIONS
    createEmotion,
    retrieveTodayEmotions,

    // ITEMS
    createItem,
    deleteItem,
    retrieveItems,
    updateItem,

    // LISTS
    createList,
    deleteList,
    retrieveLists,
    updateList,

    // USER
    getCurrentUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser
}
