import {Collection} from './collection.js'

export const data = {
    users: new Collection('users'),
    posts: new Collection('posts'),

    get userId() {
        return JSON.parse(sessionStorage.userId || 'null')
    },

    set userId(id) {
        sessionStorage.userId = JSON.stringify(id)
    },

    currentUser: null
}