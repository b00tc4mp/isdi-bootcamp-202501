var data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        {
            id: 'm71tm7l3l5l',
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'harrypotter',
            password: 'harrypotter123',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null
        },
        {
            id: 'm71tml17ly',
            name: 'Hermione Granger',
            email: 'hermione@granger.com',
            username: 'hermione.granger',
            password: 'hermionegranger123',
            createdAt: new Date(2024, 5, 20),
            modifiedAt: null
        }
    ], // { name: ..., }

    posts: [
        {
            id: 'm737z98ciyt',
            author: 'm71tm7l3l5l',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGxvbWxuNWZlYm1qa3UzM3J0ZXRpNTRwdHZ0OHQ1amxvaHc5YmRheSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mz1kJeDVueKC4/giphy.gif',
            text: 'Buying my first wand',
            createdAt: new Date(2025, 0, 1),
            modifiedAt: null
        },
        {
            id: 'm737z98ciyt',
            author: 'm71tml17ly',
            image: 'https://media.giphy.com/media/IWvuFVQICQIr6/giphy.gif?cid=790b76118lomln5febmjku33rteti54ptvt8t5jlohw9bday&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: "It's leviosa, not leviosaar",
            createdAt: new Date(2024, 11, 13),
            modifiedAt: null
        }
    ],
    userId: null,
}