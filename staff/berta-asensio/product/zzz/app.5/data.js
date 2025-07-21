var data = {
    uuid: function() {
        return (Date.now() + Math.random()).toString(36).replace('.', '') //creamos un id aleatorio
    },
    //guardamos un par de usuarios para hacer pruebas
    users: [
        { id: "m76fexkfwpd",
        name: "Abeja Maya",
        username: "MayaBee",
        password: "123123ss",
        email: "abeja@maya.com"
        },
        { id: "m76fm39hq1u",
        name: "Bob Esponja",
        username: "SpongeBob",
        password: "456456ss",
        email: "bob@esponja.com"
        }
    ],
    userId: null

}