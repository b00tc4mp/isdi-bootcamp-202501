import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types;

const user = new Schema({
    email: {
        type: String,
        required: true,
        maxLength: 30,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100
    }
})

const routine = new Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30
    },
    description: {
        type: String,
        maxLength: 100
    },
    duration: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 14
    },
    category: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    type: {
        type: String,
        required: true,
        minLength: 4,
        maxlLength: 20
    },
    exercises: [{
        type: ObjectId,
        ref: "Exercise",
        required: true
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }

})

const exercise = new Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    description: {
        type: String,
        maxLength: 200,
        default: ""
    },
    muscleCategory: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    instructions: {
        type: String,
        maxLength: 400,
        default: ""
    },
    images: [{
        type: String,
        maxLength: 500
    }],
    videos: [{
        type: String,
        maxLength: 500
    }],
    weight: {
        type: Number,
        default: 0
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    restTime: {
        type: Number,
        required: true
    }

})

const bodyTracker = new Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    trackDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    bodyweight: {
        type: Number,
        required: true
    },
    neck: {
        type: Number,
        default: 0
    },
    chest: {
        type: Number,
        default: 0
    },
    hips: {
        type: Number,
        default: 0
    },
    waist: {
        type: Number,
        default: 0
    },
    biceps: {
        type: Number,
        default: 0
    },
    legs: {
        type: Number,
        default: 0
    }

})

const User = model('User', user);
const Routine = model('Routine', routine);
const Exercise = model('Exercise', exercise);
const BodyTracker = model('BodyTracker', bodyTracker);

export {
    User,
    Routine,
    Exercise,
    BodyTracker
}