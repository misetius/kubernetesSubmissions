const express = require('express')
const number = process.env.NUMBER
const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
    res.send(`Hello, from version ${number}`)
})

const PORT = process.env.PORT || 3023
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})

    