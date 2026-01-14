const { readFileSync, writeFileSync } = require('fs')

const [, , from, to] = process.argv

console.log(process.memoryUsage())

const content = readFileSync(from)

console.log(process.memoryUsage())

writeFileSync(to, content)

console.log(process.memoryUsage())

console.log('do other stuff')