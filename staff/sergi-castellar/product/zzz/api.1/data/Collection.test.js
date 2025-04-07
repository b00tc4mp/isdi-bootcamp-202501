import { Collection } from "./Collection.js";

const users = new Collection('users')
const posts = new Collection('posts')

//users.setAll([])

console.log('users.getAll() :>> ', users.getAll());

users.setAll([
    {
        "name": "Masha Stepanova",
        "email": "masha@gmail.com",
        "username": "masha",
        "password": "123456",
        "createdAt": "2025-01-07T13:43:16.443666",
        "modifiedAt": null,
        "id": "0078dfd4e3168502717c19a4905d239202"
    },
    {
        "name": "Aaron Barrios",
        "email": "aaron@gmail.com",
        "username": "aaron",
        "password": "123456",
        "createdAt": "2025-01-17T03:45:25.155150",
        "modifiedAt": null,
        "id": "000f7843c33d74d6f04752b570d676097d"
    }
])

console.log('users.getAll() :>> ', users.getAll())

console.log('users.getById() :>> ', users.getById('0078dfd4e3168502717c19a4905d239202'));
console.log('users.getById() :>> ', users.getById('000f7843c33d74d6f04752b570d676097d'));

users.insertOne({
    "name": "Victor Alvarado",
    "email": "victor@gmail.com",
    "username": "victor",
    "password": "123456",
    "createdAt": "2025-01-20T03:27:55.422538",
    "modifiedAt": null
}, '00')

console.log('users.getAll() :>> ', users.getAll());

console.log('users.findOne(user => user.username === aaron) :>> ', users.findOne(user => user.username === 'aaron'));

