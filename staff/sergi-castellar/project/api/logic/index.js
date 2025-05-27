// CALENDAR
import { createCalendarEvent } from "./calendar/createCalendarEvent.js"
import { updateCalendarEvent } from "./calendar/updateCalendarEvent.js"
import { deleteCalendarEvent } from "./calendar/deleteCalendarEvent.js"
import { retrieveCalendarEvents } from "./calendar/retrieveCalendarEvents.js"

// COUPLE
import { getCoupleInfo } from "./couple/getCoupleInfo.js"
import { getInviteCode } from "./couple/getInviteCode.js"
import { getOwnCouple } from "./couple/getOwnCouple.js"
import { joinWithInviteCode } from "./couple/joinWithInviteCode.js"
import { setCoupleStartDate } from "./couple/setCoupleStartDate.js"

// DIARY
import { createDiaryEntry } from "./diary/createDiaryEntry.js"
import { deleteDiaryEntry } from "./diary/deleteDiaryEntry.js"
import { retrieveDiaryEntries } from "./diary/retrieveDiaryEntries.js"
import { retrieveDiaryEntry } from "./diary/retrieveDiaryEntry.js"
import { updateDiaryEntry } from "./diary/updateDiaryEntry.js"

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
import { authenticateUser } from "./user/authenticateUser.js"
import { deleteUser } from "./user/deleteUser.js"
import { editUser } from "./user/editUser.js"
import { getIfUserIsInCouple } from "./user/getIfUserIsInCouple.js"
import { getSelfUser } from "./user/getSelfUser.js"
import { registerUser } from "./user/registerUser.js"

export const logic = {
    // CALENDAR
    createCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    retrieveCalendarEvents,

    // COUPLE
    getCoupleInfo,
    getInviteCode,
    getOwnCouple,
    joinWithInviteCode,
    setCoupleStartDate,

    // DIARY
    createDiaryEntry,
    deleteDiaryEntry,
    retrieveDiaryEntries,
    retrieveDiaryEntry,
    updateDiaryEntry,

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
    authenticateUser,
    deleteUser,
    editUser,
    getIfUserIsInCouple,
    getSelfUser,
    registerUser
}
