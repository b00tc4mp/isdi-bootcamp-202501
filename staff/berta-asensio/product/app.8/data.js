const data = {
    //uuid sigue siendo una función pero en ES6 podemos quitar la palabra function
    uuid() {
        return (Date.now() + Math.random()).toString(36).replace('.', '') //creamos un id aleatorio
    },
    //guardamos un par de usuarios para hacer pruebas
    users: [
        {
            id: "m76fexkfwpd",
            name: "Abeja Maya",
            username: "MayaBee",
            password: "123123ss",
            email: "abeja@maya.com",
            createdAt: new Date(2024, 0, 2),
            modifiedAt: null
        },
        {
            id: "m76fm39hq1u",
            name: "Bob Esponja",
            username: "SpongeBob",
            password: "456456ss",
            email: "bob@esponja.com",
            createdAt: new Date(2024, 3, 20),
            modifiedAt: null
        }
    ],
    posts: [
        {
            id: 'm77g7pnf3tn',
            author: 'm76fexkfwpd',
            image: 'https://imgs.search.brave.com/2EcBw2UdTyJRdsx6Gp7xfBHA0A1__0QFLtCgvSXM8HE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jaGlj/YS1lbi1waWNvLWRl/LW1vbnRhJUMzJUIx/YS1taXJhbmRvLWhl/cm1vc2FzLW1vbnRh/JUMzJUIxYXMtYWwt/YXRhcmRlY2VyLWNv/bi1oaWVyYmEtdmVy/ZGUtaGVybW9zby12/YWxsZS1uaWVibGEt/dmVyYW5vLXBhaXNh/amUtbXVqZXItam92/ZW4tMjEyMzQyMDQ4/LmpwZw',
            text: 'Good day',
            createdAt: new Date(2025, 1, 2),
            modifiedAt: null
        },
        {
            id: 'm77g83tge37',
            author: 'm76fm39hq1u',
            image: 'https://imgs.search.brave.com/IECfcLf6yGbgIjkrA3ODeCopIIl7bBMn9KCd8-fWCn8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xNS8xNC9i/ZWFjaC0xODUzNDQy/XzY0MC5qcGc',
            text: 'Paradise',
            createdAt: new Date(2025, 1, 4),
            modifiedAt: null
        }

    ],
    userId: null

}