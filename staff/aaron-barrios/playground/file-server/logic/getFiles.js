const fs = require('fs')

const getFiles = () => {
    const json = fs.readFileSync('data/files.json', 'utf8')

    return JSON.parse(json)
}

module.exports = getFiles