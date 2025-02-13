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
            author: 'Sergi',
            image: 'https://media.licdn.com/dms/image/v2/C4D03AQE4zK7r5gkL_w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1634638007252?e=1744848000&v=beta&t=t-0nX5tzCChxPLux8IqJHLPnglRIKTC6_pjlmHFcqCE',
            text: 'Soy el sacarino',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null
        },

        {
            id: 'm71tm7l3l5l',
            author: 'Masha',
            image: 'https://media.licdn.com/dms/image/v2/D4E03AQHASkg49BpGBA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1670796699248?e=1744848000&v=beta&t=L3NBlqGN4Y4_5Z9Jb2iZ5CLz3r6jguqRqqLqmALqxGk',
            text: 'Se utilizar el método reduce',
            createdAt: new Date(2024, 6, 22),
            modifiedAt: null
        }
    ],

    userId: null,

    currentUser: null
}
