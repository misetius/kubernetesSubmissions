const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
app.use(express.json())

const filePath =  path.join('/', 'usr', 'src', 'app', 'files', "log.txt")
const filePathPong =  path.join('/', 'usr', 'src', 'app', 'pongs', "pongs.txt")




app.get('/', (req, res) => {

    try {
    let data = fs.readFileSync(filePath, 'utf8')
    const pongs = fs.readFileSync(filePathPong, 'utf8')
    const realdata = data.split(";")
    console.log(realdata)

   // const listItems = realdata.map(line => `<p>${line}</p>`).join('')

 // Not sure if I am meant to show only one logoutput or all of them   
    res.send(`<p>${realdata[realdata.length - 2]}</p> 
        <p> ${pongs} </p>`)
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
