var data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        {id: 'm76eksz2o6', name: 'Vera', surname: 'Pintado', email: 'varaypintado@gmail.com', username: 'veraypintado', password: '11111111'},
        {id: 'm76elc08759', name: 'Ricardo', surname: 'Aldao', email: 'ricardo@gmail.com', username: 'richard123', password: '22222222'}
    ],
    userId: null, //para ver si el usuario esta conectado
}