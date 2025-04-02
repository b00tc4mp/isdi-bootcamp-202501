const { createReadStream, createWriteStream } = require('fs')

const [, , from, to] = process.argv

console.log(process.memoryUsage())

const rs = createReadStream(from)
const ws = createWriteStream(to)

rs.pipe(ws)

rs.on('end', () => console.log(process.memoryUsage()))

console.log('do other stuff')