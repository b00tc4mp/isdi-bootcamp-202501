const express = require('express')
const bb = require('express-busboy')

const logic = require('./logic/index.js')

const server = express()
const port = 8080

bb.extend(server, {
    upload: true,
    path: './files',
    allowedPath: /./
})

server.post('/files', (req, res) => {
    try {
        const { file: { uuid, filename, file } } = req.files

        logic.saveFile(uuid, filename, file)

        res.send('File uploaded')
    } catch (error) {
        console.error(error)

        res.status(500).send('Error saving file')
    }
})

server.get('/files', (req, res) => {
    try {
        const files = logic.getFiles()

        const list = files.reduce((accum, file) => {
            return `${accum} ${file.filename} (${file.uuid})\n`
        }, '')

        res.send(list)
    } catch (error) {
        console.error(error)

        res.status(500).send('Error obtaining files')
    }
})

server.get('/files/:uuid', (req, res) => {
    try {
        const { file: { filename, path } } = req.files
        const { uuid } = req.params

        const file = logic.getFile(uuid, filename, path)

        res.send(`${file.filename} → ${file.content}`)
    } catch (error) {
        console.error(error)

        res.status(500).send('Error obtaining file')
    }
})

server.put('files/:uuid'), (req, res) => {
    try {
        const { uuid } = req.params

        const file = logic.putFile(uuid)
    } catch (error) {
        console.error(error)

        res.status(500).send('Error updating the file')
    }
}

server.listen(port, () => console.log(`server running on port ${port}`))