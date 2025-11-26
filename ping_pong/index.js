const express = require('express')
const app = express()
app.use(express.json())
let amountOfPings = -1





app.get('/pingpong', (req, res) => {
    amountOfPings++
    res.send(`<p>pong ${amountOfPings}</p>`)
})


const PORT = process.env.PORT || 3006
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
