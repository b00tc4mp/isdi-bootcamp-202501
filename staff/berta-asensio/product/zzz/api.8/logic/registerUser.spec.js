//importamos los módulos necesarios
import 'dotenv/config'
import { data, User } from '../data/index.js'
import { registerUser } from './registerUser.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'   
import { DuplicityError } from 'com/errors.js'

//extraemos las variables de entorno
const { MONGO_URL, MONGO_DBNAME } = process.env

describe('registerUser', () => {
    before(() => data.connect(MONGO_URL, MONGO_DBNAME))

    beforeEach(() => User.deleteMany({}))

    it('crear usuario nuevo', () => {
        let result2

        return registerUser('Abeja Maya', 'MayaBee', '123123aa', 'abeja@maya.com')
            .then(result => result2 = result)
            .finally(() => expect(result2).to.be.undefined)
            .then(() => User.findOne({ username: 'MayaBee'}).lean())
            .then(user => {
                expect(user.name).to.equal('Abeja Maya')
                expect(user.username).to.equal('MayaBee')
                expect(user.email).to.equal('abeja@maya.com')

                return bcrypt.compare('123123aa', user.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('crear usuario existente', () => {
        let catchedError

        return User.create({
            name: 'Abeja Maya',
            username: 'MayaBee',
            password: '$2b$10$3VGV4ikMrowelNGSbtgGG.5nhJmWYJx8F3U4ZWVLnT/wiyHQNbQQm',
            email: 'abeja@maya.com'
        })
            .then(() => registerUser('Abeja Maya', 'MayaBee', '123123aa', 'abeja@maya.com'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('user already exists')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})

/*
-DESCRIBE: Ponemos el título de lo que vamos a testear y una callback para incluir dentro
los tests relacionados.
-BEFORE/CONECT: antes de las pruebas, conectamos a la base de datos.
-BEFORE EACH: antes de CADA prueba, se eliminan todos los documentos de la colección User
para empezar con una base de datos limpia.
-IT 1: HAPPY PATH: crear usuario nuevo
    -It define una prueba nueva llamada 'crear usuario nuevo' y verificará que registerUser pueda
    crear un nuevo usuario.
    -Se define result2 que se utilizará para verificar que la función no devuelve nada (undefined)
    -Se llama a la lógica con sus correspondientes datos y se crea el usuario.
    -Si registerUser se ejecuta correctamente, se guarda su resultado(undefined) en result2.
    -Finalmente, se espera y verifica que el resultado es undefined.
    -Se busca en la base de datos al usuario recien creado mediante su Username para comprobar que se haya creado.
    -Una vez encontrado, se verifica que sus datos coincidan con los que hemos introducido.
    -Se verifica la contraseña cifrada: 
        -se compara que la contraseña introducida coincida con la cifrada en la base de datos.
        -si se cifró correctamente, compare() devuelve true
    -Se verifica que match sea true, lo que confirma que la contraseña fue correctamente cifrada y
    almacenada.

-IT 2: UNHAPPY PATH: Crear usuario ya existente
    -It define una prueba llamada 'crear usuario existente
    -Se define una variable catchedError para almacenar todos los posibles errores
    -Creamos manualmente un usuario en la base de datos para simular que ya exista.
    -Llamamos a la lógica y le pasamos los parámetros para registrar un usuario.
    -Si registerUser falla, se va al catch y se almacena el error en la variable catchedError. (fallos diferentes al que queremos)
    -Si registerUser no lanza un error, el catchedError se queda undefined, lo que hará que el test falle más adelante(como queremos)
    -Finalmente, esperamos que cathcedError sea DuplicityError y que el mensaje lanzado sea el que pertoca (el que hemos puesto en la 
    función de logic). En este caso, el test se habrá pasado correctamente.

-AFTER EACH: limpiamos base de datos.

-AFTER: desconectamos de la base de datos.
*/
