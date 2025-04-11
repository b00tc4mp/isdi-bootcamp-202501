// import { constant } from 'com' TODO
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const user = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['regular', 'admin'],
        default: 'regular',
        // match: TODO
    },
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
        // match: TODO
    },
    surname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
        // match: TODO
    },
    email: {
        type: String,
        required: true,
        maxLength: 30,
        unique: true
        // match: TODO,
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        unique: true,
        // match: TODO
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
        // match: TODO
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

const game = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    season: {
        type: ObjectId,
        ref: 'Season',
        required: true
    },
    status: {
        type: String,
        required: true,
        // enum: scheduled | finished
        // match: TODO
    },
    title: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true
        // match: TODO
    },
    participants: [{
        type: ObjectId,
        ref: 'User'
    }],
    date: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true
        // match: TODO
    },
    winner: {
        type: ObjectId,
        ref: 'User',
    },
    points: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const season = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
        // match: TODO
    },
    games: {
        type: ObjectId,
        ref: 'Game'
    },
    maxGames: {
        type: Number,
        required: true
    },
    participants: [{
        type: ObjectId,
        ref: 'User'
    }],
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
const Game = model('Game', game)
const Season = model('Season', season)

export {
    User,
    Game,
    Season
}