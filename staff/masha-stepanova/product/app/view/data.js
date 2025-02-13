var data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        {
            id: 'm7391122gmc',
            name: 'Rapunzel',
            email: 'rapunzel@princess.com',
            username: 'rapunzel',
            password: 'rapunzel',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null
        },
        {
            id: 'm739c6su73',
            name: 'Belle',
            email: 'belle@princess.com',
            username: 'belle',
            password: 'bellebeast',
            createdAt: new Date(2024, 6, 17),
            modifiedAt: null
        }
    ],
    userId: null,
    posts: [
        {
            id: 'm739kq43sr',
            author: 'm739c6su73',
            image: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Belle%27s_ball_gown_1991.jpg',
            text: 'My beautifull new dress',
            createdAt: new Date(2025, 1, 10).toLocaleDateString(),
            modifiedAt: null
        },
        {
            id: 'm739lfj0o5t',
            author: 'm7391122gmc',
            image: 'https://i.pinimg.com/736x/42/85/aa/4285aa2ae57fd188c9f9509fce0f5b36.jpg',
            text: 'Finally could see those ligths...',
            createdAt: new Date(2025, 1, 9).toLocaleDateString(),
            modifiedAt: null
        },

    ]
}