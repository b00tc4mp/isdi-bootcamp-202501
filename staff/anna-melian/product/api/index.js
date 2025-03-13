const express = require('express')

const api = express()

api.use(express.json())


api.get('/hello', (request, response) => {
    console.log('Path', request.path)
    console.log('Query', request.query)

    const { to = 'World' } = request.query
    response.send(`Hello, ${to}!`)
})


api.listen(8080, () => console.log('API running on port 8080'))