const axios = require('axios')
const express = require('express')
const path = require('path')
const { buffer } = require('stream/consumers')
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(express.json())
let pictureTodelete = false
const backendservice = process.env.BACKEND_SERVICE
const backendurl = process.env.BACKEND_URL

app.use(cors())

const directory = path.join('/', 'usr', 'src', 'app', 'images')
const filePath = path.join(directory, "image.jpg")

//not needed really
const firstTime = async () => {
    let string = ""

    fs.readFile(filePath, (err, buffer) => {
    if (err) return console.log("you are a failure", err)
    console.log(buffer)
    string = buffer.toString('base64')
  
})

if (string.length < 1) {
    
    await removeFile()
    

    await new Promise(res => fs.mkdir(directory, (err) => res()))
    const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(filePath))
     console.log("test")
    pictureTodelete = true
}

else {


}


   
    
}

app.get('/', async (req, res) => {

    let data = ""

    fs.readFile(filePath, (err, buffer) => {
    if (err) return console.log("you are a failure", err)
        console.log(buffer)
    let string = buffer.toString('base64')
    string = string.replace((/\s/g, ''))
    data = "data:image/jpeg;base64, "+string.slice(9)
    console.log(data)


})

    let response = await axios.get(backendservice)
    
    const todos = response.data
   

    res.render("index.ejs",  {data: data, todos: todos,  backendurl: backendurl})

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

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
