const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
app.use(express.json())


let pongs =-1




app.get('/pingpong',  (req, res) => {
    const directory = path.join('/', 'usr', 'src', 'app', 'pongs', "pongs.txt")
    const filePath = path.join(directory)
    pongs++
    const pings = pongs
    const pongdata = `Ping / Pongs: ${pings}`
    fs.writeFileSync(filePath, pongdata, "utf8")
    const data = fs.readFileSync(filePath)
    console.log(data)
    res.send(`<p>pong ${pongs} ${data}</p>`)
})


const PORT = process.env.PORT || 3006
app.listen(PORT, () => {
    console.log(`Server test started in port ${PORT}`)
})
