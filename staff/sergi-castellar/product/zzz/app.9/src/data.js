const data = {
    uuid(starting) {
        const array = new Uint8Array(16)
        crypto.getRandomValues(array)
        const ending = (Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('')).toString()
        starting = starting.toString()
        const id = starting + ending
        return id
    },
    get users() {
        const json = JSON.parse(localStorage.users || '[]')

        return json
    },
    set users(users) {
        const json = JSON.stringify(users)

        localStorage.users = json
    },

    get posts() {
        const posts = JSON.parse(localStorage.posts || '[]')

        return posts
    },
    set posts(posts) {
        const json = JSON.stringify(posts)

        localStorage.posts = json
    },

    get userId() {
        const userId = JSON.parse(sessionStorage.userId || 'null')

        return userId
    },
    set userId(userId) {
        const json = JSON.stringify(userId)

        sessionStorage.userId = json
    }
}