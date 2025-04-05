//se importan los módulos necesarios
import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserUserName } from './getUserUserName.js'

const { MONGO_URL, MONGO_DBNAME } = process.env

console.info('TEST getUserUserName')


/*
-Nos conectamos a Mongo en localhost, en la base de datos test.
-Cuando la conexión sea exitosa, iniciamos el then. En el caso que no hubiera 
sido exitosa, hubieramos pasado por el catch.
-Definimos el username como undefined ya que todabia no tenemos el nombre.
-Llamamos a getUsername con el id creado por Mongo del usuario al cual buscamos, 
esto devuelve una promesa con el nombre de usuario. 
-Cuando la promesa se resuelve, name es el resultado y se asigna a username.
-Se verifica que username es un string, si lo es no imprime nada. Si no lo es imprime un error (assert).
-Manejamos errores por si algo falla en el camino.
-Desconectamos data.
*/
data.connect(MONGO_URL, MONGO_DBNAME)
    .then(() => {
        try {
            let username //undefined
            return getUserUserName('67efd1cb665577c9cef1b2bf') //aqui pondremos un id Mongo
                .then(name => username = name) //
                .finally(() => console.assert(typeof username === 'string', 'username is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())


