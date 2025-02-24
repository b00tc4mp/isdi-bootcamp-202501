var data = {
    uuid: function () {
        return (Math.random() * 10 ** 17).toString(36);
    },

    users: [
        {
            id: 'm71tm7l3l5l',
            name: 'Masha',
            email: 'ma@sha.com',
            username: 'ma',
            password: 'mamama',
            createdAt: 'Ahora',
            role: 'user',
            state: 'Offline',
            modifiedAt: null
        },
        {
            id: 'm71tml17ly',
            name: 'Sergi',
            email: 'ser@gi.com',
            username: 'se',
            password: 'sesese',
            createdAt: 'Ahora',
            role: 'user',
            state: 'Offline',
            modifiedAt: null
        },
        {
            id: 'm71tml17lX',
            name: 'admin',
            email: 'ad@min.com',
            username: 'ad',
            password: 'adadad',
            createdAt: 'Ahora',
            role: 'admin',
            state: 'Offline',
            modifiedAt: null
        }
    ],

    posts: [
        {
            id: 'm71tm7l3l5l',
            author: 'm71tm7l3l5l',
            image: 'https://media.giphy.com/media/vSbW8dAA1n516fYcbm/giphy.gif?cid=790b76114tyobygwv1hqn9kcbc6blv6vhmx1szleak8oh6gg&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: 'Aguacate',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null,
            likes: []
        },

        {
            id: 'm71tm7l3l5S',
            author: 'm71tm7l3l5l',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzd0bmJ4eTB1c3o0aXV1ZnBtbWJlNXRlNGEzOW5uMWFzcTJzMDk1dyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0IpXwyCXikRK9Yl2/giphy.gif',
            text: 'Orange',
            createdAt: new Date(2024, 6, 22),
            modifiedAt: null,
            likes: []
        },
        {
            id: 'm71tm7l3l5W',
            author: 'm71tml17ly',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTJ5Y2Y4YjBiemRnbDI0eHprY2kwdXc5ZHJ4djRmbWhtbzlhMjk3ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/n1mNS67yQhtzzAN5H3/giphy.gif',
            text: 'Banana',
            createdAt: new Date(2024, 6, 22),
            modifiedAt: null,
            likes: []
        }
    ],

    userId: null,

    currentUser: null
}
