const data = {
    uuid() {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        {
            id: 'm71tm7l3l5l',
            name: 'Spider-man',
            email: 'spider@.com',
            username: 'spider_man',
            password: '123123123',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null
        },
        {
            id: 'm71tml17ly',
            name: 'iron-man',
            email: 'iron@.com',
            username: 'iron_man',
            password: '123123123',
            createdAt: new Date(2024, 5, 20),
            modifiedAt: null
        }
    ], // { name: ..., }
    posts: [
        {
            id: 'm737z98ciyt',
            author: 'm71tm7l3l5l',
            image: 'https://media1.giphy.com/media/4PUc9Vm4zW5JsX2ibu/200w.gif?cid=6c09b952x9hmim7gc8270th5sl5jg7jnkeb4ga2fc9256n7q&ep=v1_gifs_search&rid=200w.gif&ct=g',
            text: 'Bailamos?',
            createdAt: new Date(2025, 0, 1),
            modifiedAt: null,
            likes: []
        },
        {
            id: 'm737zabzix8',
            author: 'm71tml17ly',
            image: 'https://i.pinimg.com/originals/f4/ef/59/f4ef59dffa0c42293103e6523e9abc23.gif',
            createdAt: new Date(2025, 1, 10),
            modifiedAt: null,
            likes: ['m71tml17ly']
        }
    ],
    userId: null
}