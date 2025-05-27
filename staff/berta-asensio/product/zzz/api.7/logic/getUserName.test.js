//se importan los módulos necesarios
import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserName } from './getUserName.js'

const { MONGO_URL, MONGO_DBNAME } = process.env

console.info('TEST getUserName')


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
            let userName //undefined
            return getUserName('67e7f752a1ce00e49b303365') //aqui pondremos un id Mongo
                .then(name => userName = name) //
                .finally(() => console.assert(typeof userName === 'string', 'username is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())


