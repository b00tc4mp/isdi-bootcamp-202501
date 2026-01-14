const { createReadStream, createWriteStream } = require('fs')

const [, , from, to] = process.argv

console.log(process.memoryUsage())

const rs = createReadStream(from)
const ws = createWriteStream(to)

rs.on('data', chunk => {
    console.log(process.memoryUsage())

    ws.write(chunk)
})

rs.on('end', () => console.log(process.memoryUsage()))

console.log('do other stuff')