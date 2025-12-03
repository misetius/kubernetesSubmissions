const axios = require('axios')
const express = require('express')
const path = require('path')
const { buffer } = require('stream/consumers')
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(express.json())
let pictureTodelete = false


app.use(cors())

const directory = path.join('/', 'usr', 'src', 'app', 'images')
const filePath = path.join(directory, "image.jpg")


const firstTime = async () => {
    
        await removeFile()
    

    await new Promise(res => fs.mkdir(directory, (err) => res()))
    const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(filePath))
     console.log("test")
    pictureTodelete = true



   
    
}

app.get('/imageurl', (req, res) => {
    fs.readFile(filePath, (err, buffer) => {
    if (err) return console.log("you are a failure", err)
        console.log(buffer)
    let string = buffer.toString('base64')
    string = string.replace((/\s/g, ''))
    const data = "data:image/jpg;base64,"+string
    console.log(data)
    res.render("index.ejs",  {data: data})
})
})

// testing
app.get('/test', (req, res) => {
res.sendFile(path.join(__dirname,'index.html'))
})

const removeFile = async () => new Promise(res => fs.unlink(filePath, (err) => res()))

setInterval(async () => {
    if (pictureTodelete === true){
        await removeFile()
    }

    await new Promise(res => fs.mkdir(directory, (err) => res()))
    const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(filePath))
    console.log("intervalli")
    pictureTodelete = true
}, 600000);





const PORT = process.env.PORT || 3010
firstTime()
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
