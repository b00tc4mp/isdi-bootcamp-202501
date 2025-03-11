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
    let content = ''

    request.on('data', chunk => content += chunk)

    request.on('end', () => {
        let fromIndex
        let linebreaks = 0

        for (let i = 0; i < content.length && linebreaks < 4; i++) {
            const char = content[i]

            if (char === '\n') {
                linebreaks++

                if (linebreaks === 4)
                    fromIndex = i
            }
        }
        fromIndex++

        let toIndex
        linebreaks = 0

        for (let i = content.length - 1; i > 0 && linebreaks < 2; i--) {
            const char = content[i]

            if (char === '\n') {
                linebreaks++

                if (linebreaks === 2)
                    toIndex = i
            }
        }
        toIndex--

        content = content.slice(fromIndex, toIndex)

        fs.writeFileSync('files/file', content)

        response.send('Content received!')
    })
})

server.listen(8080, () => console.log('API running on post 8080'))