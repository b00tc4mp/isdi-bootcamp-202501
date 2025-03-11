// requiero express
const express = require('express')

//montamos la api

const api = express()

api.get('/hello', (request, response) => {
    console.log(request.path)
    response.send('Hello, World!')
})


api.listen(8080, () => console.log('API running on post 8080'))