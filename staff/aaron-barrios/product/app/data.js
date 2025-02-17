const data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        {
            id: 'm71tm7l3l5l',
            name: 'Masha',
            email: 'ma@sha.com',
            username: 'ma',
            password: 'mamama',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null
        },
        {
            id: 'm71tml17ly',
            name: 'Sergi',
            email: 'ser@gi.com',
            username: 'se',
            password: 'sesese',
            createdAt: new Date(2024, 5, 20),
            modifiedAt: null
        }
    ],

    posts: [
        {
            id: 'm71tm7l3l5l',
            author: 'm71tm7l3l5l',
            image: 'https://media.giphy.com/media/vSbW8dAA1n516fYcbm/giphy.gif?cid=790b7611hu0cl161xv6ry8v3y8k3q20kfgm39htr8lqds3wt&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: 'aguacate',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null,
            likes: []
        },

        {
            id: 'm71tm7l3l5l',
            author: 'm71tm7l3l5l',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczQxY2Jlb25xNWN3bWo4MWR6dmM4cTR3Y3RqYjBqOThmYWJpNTIyayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0IpXwyCXikRK9Yl2/giphy.gif',
            text: 'orange',
            createdAt: new Date(2024, 6, 22),
            modifiedAt: null,
            likes: []
        }
    ],
    userId: null
}