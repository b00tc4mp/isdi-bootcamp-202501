import { Collection } from './Collection.js'

const users = new Collection('users')
const posts = new Collection('posts')

// GET ALL = MUESTRA TODO LO QUE LE PIDES ->"USERS Y POSTS"

// console.log(users.getAll())
// console.log(posts.getAll())


// SET ALL = SOBREESCRIBE TODO LO QUE LE PEDIMOS -> "USERS"

// users.setAll([
//     {
//         "id": "m7yk28baa38",
//         "name": "Yuki",
//         "email": "fgg@poojr.com",
//         "username": "yuki",
//         "password": "123123123",
//         "createdAt": "7/3/2025, 10:10:32",
//         "modifiedAt": null
//     }
// ])


// GET BY ID = OBTIENE LOS DATOS DE USUARIO A PARTIR DEL "ID"

// console.log(users.getById('m7a771ui2b'))
// - PASA DATOS DE "LUNA"
// console.log(users.getById('m7yk28baa38'))
// - PASA DATOS DE "YUKI"


// INSERT ONE = AÑADE UN NUEVO PARAMETRO -> "USERS"

// users.insertOne(
//     {
//         name: "Paco",
//         email: "paco@paquete.com",
//         username: "paquete",
//         password: "123123123",
//         createdAt: new Date,
//         modifiedAt: null
//     }
// )


// FIND ONE = OBTIENES LOS DATOS DE UN USUARIO

// console.log(users.findOne(user => user.username === 'dallen'))


// UPDATE ONE = AZTUALIZA LOS DATOS DE USUARIO

// users.updateOne(user => user.username === 'dallen', {
//     "id": "m7313t7yhcl",
//     "name": "david",
//     "email": "david@31.com",
//     "username": "dallen",
//     "password": "0101010101",
//     "createdAt": "2024-02-22T23:00:00.000Z",
//     "modifiedAt": null
// })


// DELETE ONE = BORRA UN USUARIO

// users.deleteOne(user => user.name === 'Paco')
