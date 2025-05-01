import { Schema, model, Types } from 'mongoose'
import { constant } from 'com'
const { ObjectId } = Types

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
    },
    lastname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        maxLength: 30,
        unique: true,
        match: constant.EMAIL_REGEX
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const clothingItem = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['top', 'bottom', 'shoes', 'accesory']
    },
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    season: [{
        type: String,
        enum: ['summer', 'winter', 'spring', 'autumn']
    }],
    occasion: [{
        type: String,
        enum: ['formal', 'casual', 'sport', 'party']
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const lookRequest = new Schema({

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    contextOccasion: [{
        type: String,
        enum: ['formal', 'casual', 'party', 'sport']
    }],
    location: {
        type: String,
        enum: ['indoor', 'outdoor']
    },
    temperature: {
        type: String,
        enum: ['cold', 'warm', 'neutral']
    },
    timeOfDay: {
        type: String,
        enum: ['morning', 'afternoon', 'evening', 'night']
    },
    style: {
        type: String,
        enum: ['classic', 'trendy', 'minimalist', 'colorful']
    },
    additionalDetails: {
        type: String,
        enum: ['date', 'business', 'rain']
    },
    allowExternalSuggestions: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const lookSuggestion = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    request: {
        type: ObjectId,
        ref: 'LookRequest',
        required: true
    },
    selectedItems: [{
        type: ObjectId,
        ref: 'ClothingItem'
    }],
    reasoning: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const User = model('User', user)
const ClothingItem = model('ClothingItem', clothingItem)
const LookRequest = model('LookRequest', lookRequest)
const LookSuggestion = model('LookSuggestion', lookSuggestion)

export {
    User,
    ClothingItem,
    LookRequest,
    LookSuggestion
}