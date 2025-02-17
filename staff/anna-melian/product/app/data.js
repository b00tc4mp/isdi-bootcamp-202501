var data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        {
            id: 'm71tm7l3l5l',
            name: 'Harry Potter',
            email: 'harry@potter.com',
            username: 'GryffindorSeeker',
            password: 'harrypotter123',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null
        },
        {
            id: 'm71tml17ly',
            name: 'Hermione Granger',
            email: 'hermione@granger.com',
            username: 'theSmartestWitch',
            password: 'hermionegranger123',
            createdAt: new Date(2024, 5, 20),
            modifiedAt: null
        },
        {
            id: 'm71tmfd56b',
            name: 'Ron Weasly',
            email: 'ron@weasly.com',
            username: 'QuidditchFan',
            password: 'ronweasly123',
            createdAt: new Date(2024, 6, 12),
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
            modifiedAt: null,
            likes: ['m71tm7l3l5l', 'm71tml17ly']
        },
        {
            id: 'm737zabzix8',
            author: 'm71tml17ly',
            image: 'https://media.giphy.com/media/IWvuFVQICQIr6/giphy.gif?cid=790b76118lomln5febmjku33rteti54ptvt8t5jlohw9bday&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: "It's leviosa, not leviosaar",
            createdAt: new Date(2024, 11, 13),
            modifiedAt: null,
            likes: ['m71tml17ly']
        },
        {
            id: 'm737zkgn59f',
            author: 'm71tmfd56b',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExem80cHIwN21zaGZjNWo2OTYzcmU5bzZrc2szOG5jbmhwN2JrN29iZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pEPJCSLoHg400/giphy.gif',
            text: "Sunshine, daisies, butter mellow, turn this stupid, fat rat yellow!",
            createdAt: new Date(2024, 9, 30),
            modifiedAt: null,
            likes: ['m71tml17ly']
        }
    ],
    userId: null,
}