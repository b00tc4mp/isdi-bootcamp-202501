// CALENDAR
import { createCalendarEvent } from './calendar/createCalendarEvent.js'
import { deleteCalendarEvent } from './calendar/deleteCalendarEvent.js'
import { retrieveCalendarEvents } from "./calendar/retrieveCalendarEvents.js"
import { retrieveMonthCalendarEvents } from "./calendar/retrieveMonthCalendarEvents.js"
import { updateCalendarEvent } from './calendar/updateCalendarEvent.js'

// COUPLE
import { generateInviteCode } from "./couple/generateInviteCode.js"
import { getCoupleInfo } from "./couple/getCoupleInfo.js"
import { joinWithInviteCode } from "./couple/joinWithInviteCode.js"
import { setCoupleStartDate } from "./couple/setCoupleStartDate.js"

// DIARY
import { createDiaryEntry } from './diary/createDiaryEntry'
import { retrieveDiaryEntries } from './diary/retrieveDiaryEntries'
import { retrieveDiaryEntry } from './diary/retrieveDiaryEntry'
import { updateDiaryEntry } from './diary/updateDiaryEntry'
import { deleteDiaryEntry } from './diary/deleteDiaryEntry'

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
import { isUserInCouple } from "./user/isUserInCouple.js"
import { loginUser } from "./user/loginUser.js"
import { logoutUser } from "./user/logoutUser.js"
import { registerUser } from "./user/registerUser.js"
import { getCurrentUserId } from "./user/getCurrentUserId.js"

export const logic = {
    // CALENDAR
    createCalendarEvent,
    deleteCalendarEvent,
    retrieveCalendarEvents,
    retrieveMonthCalendarEvents,
    updateCalendarEvent,

    // COUPLE
    generateInviteCode,
    getCoupleInfo,
    joinWithInviteCode,
    setCoupleStartDate,

    // DIARY
    createDiaryEntry,
    retrieveDiaryEntries,
    retrieveDiaryEntry,
    updateDiaryEntry,
    deleteDiaryEntry,

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
    isUserInCouple,
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUserId
}
