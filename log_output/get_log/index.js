const express = require('express')
const path = require('path')
const fs = require('fs')
const axios = require("axios")
const app = express()
app.use(express.json())

const filePath =  path.join('/', 'usr', 'src', 'app', 'files', "log.txt")
// const filePathPong =  path.join('/', 'usr', 'src', 'app', 'pongs', "pongs.txt")
const filePathInformation =  path.join('/', 'usr', 'src', 'app', 'information', "information.txt")



app.get('/', async (req, res) => {

    try {
    let data = fs.readFileSync(filePath, 'utf8')
    const realdata = data.split(";")
    let pongs = 1
    const response = await axios.get("http://pingpong-svc:4567/")
    pongs = response.data['pings']
        
    if (pongs === -1){
        pongs = 0
    }
    const information = fs.readFileSync(filePathInformation)
    const message = process.env.MESSAGE
   // const listItems = realdata.map(line => `<p>${line}</p>`).join('')


 // Not sure if I am meant to show only one logoutput or all of them   
    res.send(`<p>file content: ${information}</p>
        <p>env variable: ${message}</p>
        <p>${realdata[realdata.length - 2 ]}</p> 
        <p> Ping / Pongs: ${pongs} </p>
        <p>Testi</p>`)
    }
    catch (err) {
        console.error('Error reading a file:', err)
    }

})


const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})

// misetius/getlog:1.11
