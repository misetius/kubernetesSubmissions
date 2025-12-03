const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const app = express()
app.use(express.json())

app.use(cors())

let pongs =-1

app.get('/', (req, res) => {
    res.json({"pings" : pongs})
})


app.get('/pingpong',  (req, res) => {
   // const directory = path.join('/', 'usr', 'src', 'app', 'pongs', "pongs.txt")
    //const filePath = path.join(directory)
    pongs++
    const pings = pongs
    const pongdata = `Ping / Pongs: ${pings}`
    //fs.writeFileSync(filePath, pongdata, "utf8")
    //const data = fs.readFileSync(filePath)
    
    res.send(`<p>pong ${pongs} ${pongdata}</p>`)
})


const PORT = process.env.PORT || 3006
app.listen(PORT, () => {
    console.log(`Server test started in port ${PORT}`)
})
