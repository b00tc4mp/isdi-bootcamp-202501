// Variable que quenera los Regex para comprobar datos 
export const constant = {
    // Regex espacios en blanco
    EMPTY_OR_BLANK_REGEX: /^\s*$/,

    // Regex comprueba que sea email
    EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,

    // Regex comprueba que sea una Url valida
    URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,

    // Regex comprueba que el username contenga solo letras mayúsculas, minúsculas y números
    MATRICULA_REGEX: /^[0-9]{1,4}[BCDFGHJKLMNPRSTVWXYZ]{3}/,

    // Regex verifica si el nombre contiene solo palabras formadas por letras (mayúsculas o minúsculas) separadas por espacios simples, sin espacios al inicio ni al final
    NAME_REGEX: /^[A-Za-z]+(?: [A-Za-z]+)*$/
}