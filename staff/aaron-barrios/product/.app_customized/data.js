var data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '');
    },

    createRandomUser: function () {
        var user = {
            id: 'casimepillascruck',
            name: 'Barrios',
            email: 'epi@blas.com',
            username: 'Sesamo',
            password: 'qqqqqq',
            createdAt: new Date(),
            modifiedAt: null,
        }

        data.users[data.users.length] = user
    },

    obtainLastUserId: function () {
        //Capa de seguridad por si no hay usuarios
        if (this.users.length === 0) {
            this.createRandomUser()
        }

        let lastUser = this.users[this.users.length - 1]
        return lastUser.username;
    },

    uniqueUserId: function () {
        //convierto el username obtenido previamente a base hexadecimal

        let targetUsername = this.obtainLastUserId(); //obtengo el username del último usuario

        return Array.from(targetUsername) //convierto el string en un array de caracteres
            .map(char => char.charCodeAt(0).toString(16)) //convierto cada carácter en su código hexadecimal
            .join('') //uno todos los valores hexadecimales en una sola cadena
    },

    users: [
        { id: 'm71tm7l3l5l', name: 'Masha', email: 'ma@sha.com', username: 'ma', password: 'mamama' },
        { id: 'm71tml17ly', name: 'Sergi', email: 'ser@gi.com', username: 'se', password: 'sesese' }
    ],

    userId: null
}
