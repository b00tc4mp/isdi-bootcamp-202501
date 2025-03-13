const express = require('express')

const server = express()

server.use(express.json())


server.get('/hello', (request, response) => {
    console.log('Path', request.path)
    console.log('Query', request.query)

    const { to = 'World' } = request.query
    response.send(`Hello, ${to}!`)
})


server.listen(8080, () => console.log('SERVER running on port 8080'))