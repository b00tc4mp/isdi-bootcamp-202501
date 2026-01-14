/*
-Generamos un identificador único.
-Creamos un array de users como simulación.
-Exportamos el módulo entero (con uuid y users) para poder ser usados en otros archivos.
 */

const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

const users = [
    {
        id: 'm8mzaakew7',
        name: 'Abeja Maya',
        username: 'BeeMaya',
        password: '123123aaa'
    },
    {
        id: 'm8mzaakew8',
        name: 'Daisy Donald',
        username: 'DonnyDaisy',
        password: '123123aaa'
    },
    {
        id: 'm8mzaakew9',
        name: 'MinnieMouse',
        username: 'MouseMin',
        password: '123123aaa'
    }
]

module.exports = {
    users, 
    uuid
}

