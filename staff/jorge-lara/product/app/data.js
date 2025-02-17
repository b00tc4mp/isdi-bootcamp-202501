const data = {
    uuid () {
        //return crypto.randomUUID()
        return (Math.random() * 10 ** 17).toString(36);
    },

    users: [{
        id: 'm71tm7l3l5l',
        name: 'James Hook',
        email: 'james@hook.com',
        username: 'admin',
        password: '12345678',
        createdAt: new Date(2024, 0, 10),
        modifiedAt: null
    }],
    userlogged: '',

    posts: [{
        id: 'm737z98ciyt',
        author: 'm71tm7l3l5l',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg',
        text: 'am i alive?',
        createdAt: new Date(2025, 0, 1),
        modifiedAt: null,
        likes: []
    },
    {
        id: 'm737zabzix8',
        author: 'm71tml17ly',
        image: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
        text: 'eclipsed with...',
        createdAt: new Date(2025, 1, 10),
        modifiedAt: null,
        likes: []
    }]
}