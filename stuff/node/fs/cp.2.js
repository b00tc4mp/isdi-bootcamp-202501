const { readFile, writeFile } = require('fs')

const [, , from, to] = process.argv

console.log(process.memoryUsage())

readFile(from, (error, content) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(process.memoryUsage())

    writeFile(to, content, error => {
        if (error) {
            console.error(error)

            return
        }

        console.log(process.memoryUsage())
    })
})

console.log('do other stuff')