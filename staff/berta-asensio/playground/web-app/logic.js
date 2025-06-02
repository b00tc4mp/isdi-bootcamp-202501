// LOGICA PARA MANEJAR USUARIOS EN UNA APLICACIÓN.

//Importación de módulos necesarios:
const { users, uuid } = require('./data.js')
const validate = require('./validate.js')

//Creación del objeto logic que contendrá las funciones.
/*
REGISTER USER:
-Función para registrar usuario que recibe tres parámetros.
-Validamos cada parámetro.
-Verificamos si el usuario existe (si ya está en la lista) comprobando
si username coincide:
    -users.find... busca un usuario dentro del array users.
    -user => user.username === username es una función de búsqueda:
        -recorre cada user de la lista.
        -compara su username con el valor de username recibido como parámetro.
        -Si lo encuentra, lo devuevle.
        -Si ningún usuario coincide, devuelve undefined.
-Creamos un usuario y lo pusheamos en el array de users.
 */

const logic = {
    registerUser(name, username, password) {
        validate.text(name, 'name')
        validate.text(username, 'username')
        validate.text(password, 'password')

        let user = users.find(user => user.username === username)

        if(user) throw new Error ('user already exists')

        user = {
            id: uuid(), 
            name, 
            username, 
            password
        }

        users.push(user)
    },

    /*
    AUTHENTICATE USER:
    -Validamos que username y password cumplan con unos requisitos.
    -Buscamos el usuario en el arrau de users usando find.
    -Si lo encuentra, lo guarda en la variable user.
    -Si no lo encuentra, user será undefined y lanzará un error.
    -Si el password de user introducido, no coincide con el password, lanzará error.
    -Si todo es correcto, devolvemos el id del usuario. Este id puede manejar sesiones o autenticar peticiones.
    */

    authenticateUser(username, password) {
        validate.text(username, 'username')
        validate.text(password, 'password')

        const user = users.find(user => user.username === username)

        if(!user) throw new Error ('user not found')

        if(user.password !== password) throw new Error('wrong credentials')

        return user.id
    },

    /*
    GET USER NAME
    -Ésta función tiene como objetivo obtener el nombre del usuario a partir de su ID.
    -Le pasamos a la función como parámetro el id que tenemos.
    -Validamos que cumpla los requisitos necesarios.
    -A través de find, buscamos en el array de users de data que algun id coincida con el id que nosotros le
    pasamos (user.id) y que se guardará en la variable user.
    -Si no lo encuentra, lanza error.
    -Si lo encuentra, devuelve el nombre del usuario.
    */
    getUserName(id) {
        validate.text(id, 'id')

        const user = users.find(user => user.id === id)

        if(!user) throw new Error('user not found')
        
        return user.name
    }
}

// EXPORTAMOS LOGIC

module.exports = logic
