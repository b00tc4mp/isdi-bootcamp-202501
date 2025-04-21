import { Schema, model, Types } from 'mongoose'
import { constant } from 'com'

const { ObjectId } = Types

const user = new Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        minLength: 6,
        maxLength: 40,
        required: true,
        unique: true,
        match: constant.EMAIL_REGEX
    },
    username: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 72,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const couple = new Schema({
    members: [{
        type: ObjectId,
        ref: 'User',
        required: true
    }],
    dateStart: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const inviteCode = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const diaryEntry = new Schema({
    couple: {
        type: ObjectId,
        ref: 'Couple',
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        minLength: 1,
        maxLength: 2000,
        required: true
    },
    reaction: {
        type: String,
        minLength: 1,
        maxLength: 10
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const calendarEvent = new Schema({
    couple: {
        type: ObjectId,
        ref: 'Couple',
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        minLength: 1,
        maxLength: 100,
        required: true
    },
    description: {
        type: String,
        minLength: 1,
        maxLength: 1000
    },
    eventDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const listItem = new Schema({
    text: {
        type: String,
        minLength: 1,
        maxLength: 500,
    },
    list: {
        type: ObjectId,
        ref: 'List',
        //required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const list = new Schema({
    couple: {
        type: ObjectId,
        ref: 'Couple',
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        minLength: 1,
        maxLength: 100,
        required: true
    },
    items: [{
        type: ObjectId,
        ref: 'ListItem'
    }],
    color: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const emotion = new Schema({
    couple: {
        type: ObjectId,
        ref: 'Couple',
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    emotion: {
        type: Number,
        min: 0,
        max: 8,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const User = model('User', user)
const Couple = model('Couple', couple)
const InviteCode = model('InviteCode', inviteCode)
const DiaryEntry = model('DiaryEntry', diaryEntry)
const CalendarEvent = model('CalendarEvent', calendarEvent)
const ListItem = model('ListItem', listItem)
const List = model('List', list)
const Emotion = model('Emotion', emotion)

export {
    User,
    Couple,
    InviteCode,
    DiaryEntry,
    CalendarEvent,
    ListItem,
    List,
    Emotion
}