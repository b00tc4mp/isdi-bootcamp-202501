const express = require('express')
const busboyExpress = require('express-busboy')

const PORT = 9090

const logic = require('./logic/index.js')

const server = express()

busboyExpress.extend(server, {
    upload: true,
    path: './files',
    allowedPath: /./
})

// --- SEND FILE METHOD ---
server.post('/files', (req, res) => {
    try {
        const { file: { uuid, filename, file } } = req.files

        logic.saveFile(uuid, filename, file)

        res.send('File uploaded successfully.')
    } catch (error) {
        console.error(error)

        res.status(500).send('Server Error')
    }
})

// --- OBTAIN FILES METHOD ---
server.get('/files', (req, res) => {
    try {
        const files = logic.getFiles()

        const list = files.reduce((acc, file) => {
            return `${acc} ${file.filename} (${file.uuid})\n`
        }, '')

        res.send(list)
    } catch (error) {
        console.error(error)

        res.status(500).send('Error listening files')
    }
})

// --- OBTAIN INDIVIDUAL FILE METHOD ---
server.get('/files/:uuid', (req, res) => {
    try {
        const { uuid } = req.params

        const file = logic.getFile(uuid)

        const content = `${file.filename}\n\n${file.content}`

        res.send(content)
    } catch (error) {
        console.error(error)

        res.status(500).send('Error retrieving file')
    }
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))