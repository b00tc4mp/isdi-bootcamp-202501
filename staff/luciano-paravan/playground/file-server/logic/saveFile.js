const fs = require('fs')

const saveFile = (uuid, filename, path) => {
    //TODO validate inputs

    let json = fs.readFileSync('data/files.json', 'utf8')

    const files = JSON.parse(json)

    const file = {
        uuid,
        filename,
        path
    }

    files.push(file)

    json = JSON.stringify(files, null, 4)

    fs.writeFileSync('data/files.json', json)
}

module.exports = saveFile