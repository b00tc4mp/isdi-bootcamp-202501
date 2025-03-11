const express = require('express');

const api = express();

const port = 8080;

api.get('/hello', (req, res) => {
    res.send('HelloWorld!');
})

api.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})