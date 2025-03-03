var data = {
    uuid() {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    get users() {
        const users = JSON.parse(localStorage.users || '[]')

        return users
    },
    set users(users) {
        const json = JSON.stringify(users)

        localStorage.user = json
    },
    get userId() {
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },
    set userId(id) {
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    },
    get posts() {
        const posts = JSON.parse(localStorage.posts || '[]')

        return posts
    },
    set posts(posts) {
        const json = JSON.stringify(posts)

        localStorage.posts = json
    }
}


// [
//     {
//         id: 'm739kq43sr',
//         author: 'm739c6su73',
//         image: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Belle%27s_ball_gown_1991.jpg',
//         text: 'My beautifull new dress',
//         createdAt: new Date(2025, 1, 10).toLocaleDateString(),
//         modifiedAt: null,
//         likes: [],
//         comments: [
//             {
//                 commentUserId: 'm7i1ignrq9r',
//                 commentText: 'You are so beautifull to me'
//             }]
//     },
//     {
//         id: 'm739lfj0o5t',
//         author: 'm7391122gmc',
//         image: 'https://i.pinimg.com/736x/42/85/aa/4285aa2ae57fd188c9f9509fce0f5b36.jpg',
//         text: 'Finally could see those ligths...',
//         createdAt: new Date(2025, 1, 9).toLocaleDateString(),
//         modifiedAt: null,
//         likes: [],
//         comments: []
//     }
// ],

