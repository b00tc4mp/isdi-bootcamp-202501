import { Collection } from './Collection.js'

const users = new Collection('users')
const posts = new Collection('posts')

console.log(users.getAll())
//console.log(posts.getAll())

/*users.setAll([
    {
        name: "Peter Pannnnnnnn",
        email: "peter@pan.com",
        username: "peterpan",
        password: "123123123",
        createdAt: "2025-03-07T11:31:12.786Z",
        modifiedAt: null,
        id: "m7yp34lurs6"
    },
    {
        name: "Wendy Darling",
        email: "wendy@darling.com",
        username: "wendydarling",
        password: "123123123",
        createdAt: "2025-03-07T11:49:28.393Z",
        modifiedAt: null,
        id: "m7ypqlzdwy"
    }
])
*/

//console.log(users.getById('m7yp34lurs6'))
//console.log(posts.getById('m7yp3nf12ep'))

/* users.insertOne(
    {
        name: "Campa Nilla",
        email: "campa@nilla.com",
        username: "campanilla",
        password: "123123123",
        createdAt: new Date,
        modifiedAt: null,
    }
) */

console.log(users.findOne(user => user.username === 'peterpan'))