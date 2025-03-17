import { Collection } from './Collection.js'
const users = new Collection('users')
const posts = new Collection('posts')

console.log('Start')

//getAll
//console.log(users.getAll())
//console.log(posts.getAll())


//getById
//console.log(users.getById('m71tm7l3l5l'))
//console.log(posts.getById('m80herghpn'))

//insertOne
/*
users.insertOne(
    {
        name: "Cedric Diggory",
        email: "cedric@diggory.com",
        username: "hufflyCed",
        house: "hufflepuff",
        password: "HuffleWinning04",
        createdAt: new Date,
        modifiedAt: null
    }
)

console.log(users.getAll())

*/

//findOne
/*
console.log(users.findOne(user => user.username === 'Lony_Luna'))

*/

// updateOne
/*
console.log(posts.findOne(post => post.author.username === 'SilverSnake'))

posts.updateOne(post => post.author.username === 'SilverSnake', {
    author: {
        id: "m7uf0vvi8r",
        username: "SilverSnake"
    },
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDJzOTR0bXM2aXZtYXd6bmt0aGlta2oxbGtwYjc3ZmgwYjQzN3JrciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AEnmjpLdK4gyA/giphy.gif",
    text: "Stupid book and stupid subject",
    createdAt: "2025-03-08T17:45:46.019Z",
    modifiedAt: null,
    likes: [],
    id: "m80hwnqbrwl"
})

console.log(posts.findOne(post => post.author.username === 'SilverSnake'))
*/

//deleteOne
/*
users.deleteOne(user => user.name === 'Cedric Diggory')

console.log(users.getAll())
*/