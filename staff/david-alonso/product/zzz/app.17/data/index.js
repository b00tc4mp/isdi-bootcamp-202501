import { Collection } from './collection.js'

export const data = {
    // USERS
    //  Llamamos a los datos de los Usuarios de LocalStorage
    users: new Collection('users'),
    // POSTS
    //  Llamamos a los datos de los Posts de LocalStorage
    posts: new Collection('posts'),

    // USER ID
    get userId() {
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },
    set userId(id) {
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    }
}