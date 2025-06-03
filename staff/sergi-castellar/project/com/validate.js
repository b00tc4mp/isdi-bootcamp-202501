import { constant } from './constant.js'

import { ValidationError } from './errors.js'

export const validate = {
    string(string, explain) {
        if (typeof string !== 'string') throw new ValidationError(`Invalid ${explain} type`)
    },
    notBlankString(text, explain) {
        this.string(text, explain)

        if (!constant.NOT_EMPTY_OR_BLANK_REGEX.test(text)) throw new ValidationError(`Invalid ${explain} syntax`)
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) throw new ValidationError(`Invalid ${explain} maximum length`)
    },
    minLength(value, minLength, explain) {
        if (value.length < minLength) throw new ValidationError(`Invalid ${explain} minimum length`)
    },
    exactLength(value, exactLength, explain) {
        if (value.length !== exactLength) throw new ValidationError(`Invalid ${explain} length`)
    },
    text(text, minLength, maxLength, explain) {
        this.notBlankString(text, explain)

        this.minLength(text, minLength, explain)

        this.maxLength(text, maxLength, explain)
    },
    number(number, min, max, explain) {
        if (typeof number !== 'number' || number < min || number > max) throw new ValidationError(`Invalid ${explain} type`)
    },
    // dedicated validations
    name(name, explain) {
        this.notBlankString(name, explain)

        this.maxLength(name, 50, explain)

        this.minLength(name, 1, explain)
    },
    email(email, explain) {
        this.notBlankString(email, explain)

        if (!constant.EMAIL_REGEX.test(email)) throw new ValidationError(`Invalid ${explain} syntax`)

        this.minLength(email, 6, explain)

        this.maxLength(email, 40, explain)
    },
    username(username, explain) {
        this.notBlankString(username, explain)

        this.minLength(username, 3, explain)

        this.maxLength(username, 20, explain)
    },
    password(password, explain) {
        this.notBlankString(password, explain)

        this.minLength(password, 8, explain)

        this.maxLength(password, 72, explain)
    },
    id(id, explain) {
        this.notBlankString(id, explain)

        this.exactLength(id, 24, explain)
    },
    inviteCode(inviteCode, explain) {
        this.notBlankString(inviteCode, explain)

        if (!constant.INVITE_CODE_REGEX.test(inviteCode)) throw new ValidationError(`Invalid ${explain} syntax`)
    },
    date(date, explain) {
        if (!(date instanceof Date) || isNaN(date.getTime()))
            throw new ValidationError(`Invalid ${explain} format`)
    },
    textDiaryEntry(textDiaryEntry, explain) {
        this.notBlankString(textDiaryEntry, explain)

        this.minLength(textDiaryEntry, 1, explain)

        this.maxLength(textDiaryEntry, 2000, explain)
    },
    titleCalendarEvent(titleCalendarEvent, explain) {
        this.notBlankString(titleCalendarEvent, explain)

        this.minLength(titleCalendarEvent, 1, explain)

        this.maxLength(titleCalendarEvent, 100, explain)
    },
    descriptionCalendarEvent(descriptionCalendarEvent, explain) {
        this.notBlankString(descriptionCalendarEvent, explain)

        this.minLength(descriptionCalendarEvent, 1, explain)

        this.maxLength(descriptionCalendarEvent, 1000, explain)
    },
    textListItem(textListItem, explain) {
        this.notBlankString(textListItem, explain)

        this.minLength(textListItem, 1, explain)

        this.maxLength(textListItem, 500, explain)
    },
    titleList(titleList, explain) {
        this.notBlankString(titleList, explain)

        this.minLength(titleList, 1, explain)

        this.maxLength(titleList, 100, explain)
    },
    color(color, explain) {
        this.notBlankString(color, explain)

        if (!constant.HEX_COLOR_REGEX.test(color)) throw new ValidationError(`Invalid ${explain} syntax`)
    },
    emotion(emotion, explain) {
        if (!constant.EMOTION_NUMBER_REGEX.test(emotion)) throw new ValidationError(`Invalid ${explain} syntax`)
    },
}

