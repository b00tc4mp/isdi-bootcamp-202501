var data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        {
            id: 'm71tm7l3l5l',
            name: 'James Hook',
            email: 'james@hook.com',
            username: 'jameshook',
            password: '123123123',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null
        },
        {
            id: 'm71tml17ly',
            name: 'Wendy Darling',
            email: 'wendy@darling.com',
            username: 'wendydarling',
            password: '123123123',
            createdAt: new Date(2024, 5, 20),
            modifiedAt: null
        }
    ], // { name: ..., }
    posts: [
        {
            id: 'm737z98ciyt',
            author: 'm71tm7l3l5l',
            image: 'https://media.giphy.com/media/o39U5VHcfNWhXb5JAd/giphy.gif?cid=790b7611xf982xikkmim43z9oppnx9x6qrsdnxsp1w8s9g3t&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: 'am i alive?',
            createdAt: new Date(2025, 0, 1),
            modifiedAt: null
        },
        {
            id: 'm737zabzix8',
            author: 'm71tml17ly',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2Z4OHhjZGdkbnl2d3Ayb20zaTB0cTgzYWg2Z3Y3YTl3eTB3bG44MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11NU4BxIpTYNGw/giphy.gif',
            text: 'eclipsed with...',
            createdAt: new Date(2025, 1, 10),
            modifiedAt: null
        }
    ],
    userId: null
}