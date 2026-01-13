import { Collection } from "./collection.js"; //importamos Collection

//PROBAMOS EL GET ALL
const users = new Collection("users"); //creamos un new COllection para users
const posts = new Collection("posts"); //new Collection para posts

//console.log(users.getAll()) //al llamar a users.getAll, me va a devolver todo el listado de usuarios que tenemos en la base de datos
//console.log(posts.getAll()) //me devolverá el listado de posts

//node data/Collection.test.js

//PROBAMOS EL SET ALL

//le pasamos dos usuarios y debería reemplazarlos en users.json
/*
users.setAll([
    {
      id: "m76fexkfwpd",
      name: "Abeja Maya",
      username: "MayaBee",
      password: "123123ss",
      email: "abeja@maya.com",
      createdAt: "2024-01-01T23:00:00.000Z",
      modifiedAt: null
    },
    {
      id: "m76fm39hq1u",
      name: "Bob Esponja",
      username: "SpongeBob",
      password: "456456ss",
      email: "bob@esponja.com",
      createdAt: "2024-04-19T22:00:00.000Z",
      modifiedAt: null
    }
])
*/
// node data/Collection.test.js

//PROBAMOS GET BY ID: le pide que me de un user por su id
/*
console.log(users.getById('m76fexkfwpd'))
console.log(posts.getById('m803cen9crr'))
*/

/* PROBAMOS INSERT ONE: 
-instertamos un usuario nuevo a la colección de usuarios
*/
/*
users.insertOne(
    {
        name: "Scooby Doo",
        username: "DooScooby",
        password: "456456",
        email: "scooby@doo.com",
        createdAt: new Date,
        modifiedAt: null
      }
)
*/

/*PROBAMOS FIND ONE:
-En este caso le pondremos un callback para poder poner una condicion.
Le diremos que busque un usuario el cual su nombre de usuario coincida
con MayaBee.
*/
/*
console.log(users.findOne(user => user.username === 'MayaBee'))  //me devuelve el usuario
console.log(users.findOne(user => user.username === 'Bella Durmiente'))  //me devuelve null
*/

/*
PROBAMOS updateOne:
-le pasamos una condición (que el usuario a buscar, su nombre de usuario
coincida con DooScooby).
-le pasamos el documento por el cual quiero que se sustituya.
*/
/*
users.updateOne(user => user.username === "DooScooby", {
    name: "Scooby Doo",
    username: "DooScooby",
    password: "123123aa",
    email: "scooby@doo.com",
    createdAt: "2025-03-14T11:37:48.471Z",
    modifiedAt: null,
    id: "m88pekl361"
})
*/

/*Probamos DELETE ONE:
-Eliminanos al usuario que su nombre coincida con Scooby Doo
*/
//users.deleteOne(user => user.name === "Scooby Doo")


//node data/Collection.test.js 