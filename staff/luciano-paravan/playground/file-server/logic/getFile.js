const fs = require('fs')

const getFile = uuid => {
    // TODO validate input 

    const json = fs.readFileSync('data/files.json', 'utf8')

    const files = JSON.parse(json)

    const file = files.find(file => file.uuid === uuid)

    if (!file) throw new Error('file not found')

    const { filename, path } = file

    const content = fs.readFileSync(path, 'utf8')

    return {
        filename,
        content
    }
}

module.exports = getFile