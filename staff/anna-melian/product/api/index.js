const express = require('express')

const api = express()

api.use(express.json())

const users = [
    { name: 'Anna', age: 18 },
    { name: 'Eric', age: 19 }
]

api.get('/greeting', (request, response) => {
    console.log(request.path)
    let usersName = []
    for (let i = 0; i < users.length; i++) {
        currentUserName = users[i].name
        usersName.push(currentUserName)
    }

    const names = usersName.join(', ')


    response.send(`Hello ${names}!`)
})
api.get('/', (request, response) => {
    console.log(request.path)
    response.send('Hello, Api')
})

api.get('/greeting/:name', (request, response) => {
    const name = request.params.name
    console.log(request.path)

    const userExist = users.some(user => user.name === name);

    if (!userExist) {
        response.send(`No users with this name`)
    } else {
        response.send(`Hello ${name}!`)

    }

})

api.post('/newUser', (request, response) => {
    const { name, age } = request.body
    users.push({ name: name, age: age })
    response.send(`New user create, ${name} , and is ${age} years old!`)
})


api.post('/:name/:newInfo', (request, response) => {
    const name = request.params.name
    const newInfo = request.body
    const userIndex = users.findIndex(user => user.name === name)

    if (userIndex === -1) {
        return response.status(404).send(`User with name ${name} not found.`)
    } else {
        Object.assign(users[userIndex], newInfo)

        response.send(`New info about ${name}`)
    }

})

api.get('/:name', (request, response) => {
    const name = request.params.name

    const userIndex = users.findIndex(user => user.name === name)

    if (userIndex === undefined) {
        response.send(`No user found with this name`)
    } else {
        let info = []
        const user = users[userIndex]
        const numProperties = Object.keys(user).length;
        const keys = Object.keys(user)

        for (let i = 0; i < numProperties; i++) {
            const property = keys[i]
            const value = user[property]
            info.push(`${property}: ${value}`)
        }

        response.type('text/html')
        response.send(info.join('<br>'))
    }

})


api.listen(8080, () => console.log('API running on port 8080'))