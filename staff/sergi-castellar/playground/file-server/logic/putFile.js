const fs = require('fs')

const putFile = (uuid, filename, path) => {
    const json = fs.readFileSync('data/files.json')

    const files = JSON.parse(json)

    const file = files.find(file => file.uuid === uuid)

    if (!file) throw new Error('file not found')


}

module.exports = putFile