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
            state: null,
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
            state: null,
            modifiedAt: null
        }
    ],

    userId: null,

    currentUser: null
}
