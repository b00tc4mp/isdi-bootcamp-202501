import { constant } from './constant.js';
import errors from './errors.js';

const { ValidationError } = errors;

export const validate = {
    string(string, explain = 'string') {
        if (typeof string !== 'string') {
            throw new ValidationError(`invalid ${explain} type`);
        }
    },

    text(text, explain = 'text') {
        this.string(text, explain);
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) {
            throw new ValidationError(`invalid ${explain} syntax`);
        }
    },

    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) {
            throw new ValidationError(`invalid ${explain} maximum length`);
        }
    },

    minLength(value, minLength, explain) {
        if (value.length < minLength) {
            throw new ValidationError(`invalid ${explain} minimum length`);
        }
    },

    url(url, explain = 'url') {
        this.string(url, explain);
        if (!constant.URL_REGEX.test(url)) {
            throw new ValidationError(`invalid ${explain} url`);
        }
    },

    id(id, explain = 'id') {
        this.text(id, explain);
        if (id.length !== 24) {
            throw new ValidationError(`invalid ${explain} length`);
        }
    },

    number(number, explain = 'number') {
        if (typeof number !== 'number' || number < 0) {
            throw new ValidationError(`invalid ${explain} type`)
        }
    },

    //Validators for user

    username(username, explain = 'username') {
        this.text(username, explain);
        this.minLength(username, 3, explain);
        this.maxLength(username, 20, explain);
        if (!constant.USERNAME_REGEX.test(username)) {
            throw new ValidationError(`invalid ${explain} syntax`);
        }
    },

    email(email, explain = 'email') {
        this.string(email, explain);
        if (!constant.EMAIL_REGEX.test(email)) {
            throw new ValidationError(`invalid ${explain} syntax`);
        }
        this.maxLength(email, 30, explain);
    },

    password(password, explain = 'password') {
        this.text(password, explain);
        this.minLength(password, 8, explain);
        this.maxLength(password, 20, explain);
    },

    //Validators for exercises

    name(name, explain = 'name') {
        this.text(name, explain);
        this.minLength(name, 3, explain)
        this.maxLength(name, 40, explain)
    },

    muscleCategory(muscleCategory, explain = 'muscleCategory') {
        this.text(muscleCategory, explain)
        this.minLength(muscleCategory, 3, explain)
        this.maxLength(muscleCategory, 30, explain)
    },

    sets(sets, explain = 'sets') {
        this.number(sets, explain)
        if (!Number.isInteger(sets) || sets < 1 || sets > 10) {
            throw new ValidationError(`invalid ${explain} value`)
        }
    },
    reps(reps, explain = 'reps') {
        this.number(reps, explain)
        if (!Number.isInteger(reps) || reps < 1 || reps > 30) {
            throw new ValidationError(`invalid ${explain} value`)
        }
    },
    restTime(restTime, explain = 'restTime') {
        this.number(restTime, explain)
        if (!Number.isInteger(restTime) || restTime < 0 || restTime > 300) {
            throw new ValidationError(`invalid ${explain} value`)
        }
    },

    description(text, explain = 'description') {
        this.maxLength(text, 200, explain)
    },

    instructions(text, explain = 'instructions') {
        this.maxLength(text, 200, explain)
    },

    images(arr, explain = 'images') {
        if (!Array.isArray(arr)) {
            throw new ValidationError(`invalid ${explain} type`)
        }
        arr.forEach((url, i) => this.url(url, `${explain}`))
    },

    videos(arr, explain = 'videos') {
        if (!Array.isArray(arr)) {
            throw new ValidationError(`invalid ${explain} type`)
        }
        arr.forEach((url, i) => this.url(url, `${explain}`))
    },

    //Validators for routines

    duration(duration, explain = 'duration') {
        this.number(duration, explain)
        if (!Number.isInteger(duration) || duration < 1) {
            throw new ValidationError(`invalid ${explain} value`)
        }
    },

    difficulty(difficulty, explain = 'difficulty') {
        this.text(difficulty, explain)
        this.minLength(difficulty, 3, explain)
        this.maxLength(difficulty, 20, explain)
    },

    category(category, explain = 'category') {
        this.text(category, explain)
        this.minLength(category, 3, explain)
        this.maxLength(category, 30, explain)
    },

    type(type, explain = 'type') {
        this.text(type, explain)
        this.minLength(type, 3, explain)
        this.maxLength(type, 30, explain)
    },

    exercises(arr, explain = 'exercises') {
        if (!Array.isArray(arr)) {
            throw new ValidationError(`invalid ${explain} type`)
        }
        if (arr.length === 0) {
            throw new ValidationError(`invalid ${explain} syntax`)
        }
        arr.forEach((id, i) => this.id(id, `${explain}`))
    },

    startDate(dateStr, explain = 'startDate') {
        this.string(dateStr, explain)
        const time = Date.parse(dateStr)
        if (Number.isNaN(time)) {
            throw new ValidationError(`invalid ${explain} syntax`)
        }
    },

    endDate(dateStr, explain = 'endDate') {
        this.string(dateStr, explain)
        const time = Date.parse(dateStr)
        if (Number.isNaN(time)) {
            throw new ValidationError(`invalid ${explain} syntax`)
        }
    }
}