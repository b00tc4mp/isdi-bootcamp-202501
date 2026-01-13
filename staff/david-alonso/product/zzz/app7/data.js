// DATA
var data = {

    //  Creamos una Id de usuario aleatoria
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')

        console.log(uuid)
    },

    //  Guardamos los datos de los usuarios
    users: [
        { id: 'm7313t7yhcl', name: 'david', email: 'david@31.com', username: 'dallen', password: '123456789' },


    ],
    userId: null
}