const { users, uuid } = require('./data.js') // importamos users y uuid de data
const validate = require('./validate.js') // importamos validate

const logic = { // creamos logic
    registerUser(name, username, password) { // creamos la logica de registerUser y validamos los campos de entrada
        validate.text(name, 'name')
        validate.text(username, 'username')
        validate.text(password, 'password')
        
        let user = users.find(user => user.username === username) // comprobamos si el username esta registrado previamente

        if (user) throw new Error('user already exists') // si es así, lanzamos error

        user = { // creamos un objeto user al cual le insertamos los datos obtenidos y creamos un id automaticamente
            id: uuid(),
            name,
            username,
            password
        }

        users.push(user) // pusheamos el user que acabamos de crear al array de users de data
    },

    authenticateUser(username, password) { // creamos authenticate user y validamos
        validate.text(username, 'username')
        validate.text(password, 'password')

        const user = users.find(user => user.username === username) // buscamos en users si hay un username igual al que ha insertado el usuario

        if (!user) throw new Error('user not found') // si no lo encontramos, lanzamos error 
        
        if (user.password !== password) throw new Error('wrong credentials') // si la password no es la correcta, lanzamos error
        
        return user.id // devolvemos el user id si todo ha ido bien
    },

    getUserName(id) { // creamos logica para devolver el nombre del usuario
        validate.text(id, 'id')

        const user = users.find(user => user.id === id) // buscamos en el user que tiene el id que le estamos pasando

        if (!user) throw new Error('user not found') // si no lo encontramos lanzamos error

        return user.name // devolvemos el name del usuario encontrado
    }
}

module.exports = logic // exportamos la logica para poder usarla en otros archivos