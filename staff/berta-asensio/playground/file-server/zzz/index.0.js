
const express = require('express')

const api = express()


api.get('/salute', (request, response) => {
    console.log('PATH', request.path)
    console.log('QUERY', request.query)

    const { how = 'Hello', to = 'World' } = request.query

    response.send(`${how}, ${to}!`)
})


api.get('/chanclas/:id/color/:color', (request, response) => {
    console.log('PATH', request.path)
    console.log('PARAMS', request.params)

    const { id = 'Adidas', color = 'black' } = request.params

    response.send(`Seeing chanclas ${id} ${black}👟`)
})

api.post('/content', (request, response) => {
    let content = ''
    let chunks = 0

    request.on('data', chunk => {
        content += chunk

        chunks++
    })

    request.on('end', () => {
        console.log('CONTENT', content)
        console.log('CHUNKS', chunks)

        response.send('Content received!')
    }) 
})

api.listen(8080, () => console.log('API running on post 8080'))