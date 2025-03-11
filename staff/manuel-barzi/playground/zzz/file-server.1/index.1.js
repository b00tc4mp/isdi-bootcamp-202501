const express = require('express')
const fs = require('fs')

const server = express()

server.get('/salute', (request, response) => {
    console.log('PATH', request.path)
    console.log('QUERY', request.query)

    const { how = 'Hello', to = 'World' } = request.query

    response.send(`${how}, ${to}!`)
})

server.get('/chanclas/:id/:color', (request, response) => {
    console.log('PATH', request.path)
    console.log('PARAMS', request.params)

    const { id, color } = request.params

    response.send(`Seeing chanclas ${id} ${color} 👀`)
})

server.post('/content', (request, response) => {
    //const chunks = []
    let chunks = ''

    //request.on('data', chunk => chunks.push(chunk))
    request.on('data', chunk => chunks += chunk)

    // request.on('end', () => {
    //     const length = chunks.reduce((accum, chunk) => accum + chunk.length, 0)

    //     const bytes = new Uint8Array(length)

    //     let offset = 0

    //     chunks.forEach(chunk => {
    //         bytes.set(chunk, offset)

    //         offset += chunk.length
    //     })

    //     const data = Buffer.alloc(bytes.length, bytes, 'utf8');

    //     fs.writeFileSync('files/giphy.gif', data)

    //     response.send('Content received!')
    // })

    request.on('end', () => {
        // const data = Buffer.alloc(chunks.length, chunks, 'utf8');

        fs.writeFileSync('files/giphy.gif', chunks)

        response.send('Content received!')
    })
})

server.listen(8080, () => console.log('API running on post 8080'))