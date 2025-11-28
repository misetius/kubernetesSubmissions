const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
app.use(express.json())


let randomString = require("randomstring")

const string = randomString.generate()
const directory = path.join('/', 'usr', 'src', 'app', 'files', "log.txt")
const filePath = path.join(directory)



setInterval(() => {
    let date_time = new Date()
    console.log(date_time, string);
    const logEntry = `${date_time} ${string};`
    fs.appendFileSync(filePath, logEntry)


}, 5000);




const PORT = process.env.PORT || 3007
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
