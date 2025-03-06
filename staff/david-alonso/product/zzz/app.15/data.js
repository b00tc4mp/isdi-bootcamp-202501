// DATA
const data = {

    //  Creamos una Id de usuario aleatoria
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },

    // USERS
    //  Guardamos los datos de los usuarios
    get users() {
        const users = JSON.parse(localStorage.users || '[]')

        return users
    },
    set users(users) {
        const json = JSON.stringify(users)
    },

    // USER ID
    get userId() {
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },
    set userId(id) {
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    },

    // POSTS
    get posts() {
        const posts = JSON.parse(localStorage.posts || '[]')

        return posts
    },
    set posts(posts) {
        const json = JSON.stringify(posts)

        localStorage.posts = json
    }

}