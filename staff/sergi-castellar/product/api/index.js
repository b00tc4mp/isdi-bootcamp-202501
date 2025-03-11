const express = require('express')
const api = express()
const port = 8080

const jsonParse = express.json()

const users = [
    {
        name: 'Sergi',
        age: 28
    },
    {
        name: 'Masha',
        age: 24
    }
]

api.get('/hello', (req, res) => {
    console.log(req.path)

    let hello = ''
    for (let i = 0; i < users.length; i++) {
        hello += `Hello, ${users[i].name}. `
    }
    res.send(hello)
})

api.get('/', (req, res) => {
    res.json(users)
})

api.post('/new', jsonParse, (req, res) => {
    const { name, age } = req.body

    const newUser = {
        name: name,
        age: age
    }

    users.push(newUser)

})

api.listen(port, () => console.log(`API running on post ${port}`))