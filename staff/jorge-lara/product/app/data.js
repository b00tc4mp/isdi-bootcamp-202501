const data = {
    uuid() {
        //return crypto.randomUUID()
        return (Math.random() * 10 ** 17).toString(36);
    },

    get users() {
        const users = JSON.parse(localStorage.users || '[]')

        return users;
    },

    set users(users) {
        const json = JSON.stringify(users)

        localStorage.users = json
    },

    get userId() {
        const id = JSON.parse(sessionStorage.userId || 'null');

        return id;
    },

    set userId(id) {
        const json = JSON.stringify(id);

        sessionStorage.userId = json
    },

    get posts() {
        const posts = JSON.parse(localStorage.posts || '[]');

        return posts;
    },

    set posts(posts) {
        const json = JSON.stringify(posts);

        localStorage.posts = json;
    }
}