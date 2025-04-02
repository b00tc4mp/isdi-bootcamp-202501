const http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')

    if (req.method === 'EUGE') {
        res.end(JSON.stringify({ message: 'Cappooooooo... bou!' }))

        return
    }

    res.json(JSON.stringify({ message: 'Not eugeni, but ' + req.method }))
})

server.listen(8080, () => console.log('Server is running on port 8080'))