const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
app.use(express.json())

const filePath =  path.join('/', 'usr', 'src', 'app', 'files', "log.txt")





app.get('/', (req, res) => {

    try {
    let data = fs.readFileSync(filePath, 'utf8')
    const realdata = data.split("\n")
    
    const listItems = realdata.map(line => `<p>${line}</p>`).join('')

    res.send(`<ul>${listItems}</ul>`)
    }
    catch (err) {
        console.error('Error reading a file:', err)
    }

})


const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
