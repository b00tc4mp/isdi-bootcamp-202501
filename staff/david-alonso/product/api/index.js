const express = require('express')
const api = express()

const port = 8080

api.use(express.json())

api.post('/users', (req, res) => {

    const { name, surname } = req.body

    res.send(`Users ${name} ${surname} create.`)
})


api.listen(port, () => {
    console.log(`API running on port ${port}`)
})

