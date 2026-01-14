//Módulo de validación en Node para verificar si un valor es un string no vacío.

/*
-Declaramos un objeto llamado validate donde almacenamos las funciones de validación.
-Definimos un método text dentro del objeto validate con dos parámetros:
    -text: que es el valor que se quiere validar.
    -explain: una cadena opcional que decribe el valor que se está validando.
-Primer if: verifica si text NO es un string:
    -Si el tipo de texto no es un string, lanza un typeError.
-Segundo if:
    -Si la longitud del texto es 0 (no hay nada), lanza un RangeError.
-Exportamos el módulo de validate para poder ser usado en otros archivos.
 */

const validate = {
    text(text, explain = 'text') {
        if(typeof text !== 'string') throw new TypeError(`invalid ${explain} type`)
        if(!text.length) throw new RangeError(`invalid ${explain} length`)
    }
}

module.exports = validate
