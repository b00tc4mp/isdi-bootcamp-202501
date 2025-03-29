// Importación de módulos: se importa mongoose y se extrae Schema
import mongoose, { Schema } from 'mongoose'

//Conectamos con la base de datos (test) en un servidor de MongoDb
mongoose.connect('mongodb://127.0.0.1:27017/test')

/*
Creamos un Schema que define la estructura de la colección cats.
Dentro de este Schema, introducimos los campos que va a tener cada instancia de modelo
-Cada cat tendrá:
    -uid: Este uuid deberá ser un string, será obligatorio, sólo acepta números y letras
    y debe ser único (no puede haber dos gatos con el mismo uid).
    -name: El nombre deberá ser un string, de máximo 10 caracteres, solo de letras y obligatorio.
    -weight: Peso del gato en kg, debe ser un número y es obligatorio.

*/

const cat = new Schema ({
    uid: {
        type: String, 
        required: true, 
        match: /^[a-zA-Z0-9]+$/,
        unique: true
    },
    name: {
        type: String, 
        maxLength: 10, 
        match: /^[a-zA-Z]+$/,
        required: true
    },
    weight: {
        type: Number, 
        required: true
    }
})

/*
Creamos el modelo basado en el esquema cat.
Cat (en mayúscula) representa la colección de gatos en la base de datos.
*/

const Cat = mongoose.model('Cat', cat)

/*
Creamos un nuevo gato (una nueva instancia de modelo):
-Se crea un objeto kitty, usando el modelo Cat.
-Guardamos kitty en la colección cats dentro de la base de datos
*/
const kitty = new Cat({
    uid: 'abc123', 
    name: 'Cora',
    weight: 3
})

kitty.save()
.catch(error => { throw new Error(error.message) })  //si hay un error se captura y manda mensaje
.then(() => console.log('meow')) // happy path
.finally(() => mongoose.disconnect()) //desconectamos de la base de datos independientemente de si hubo error o no.